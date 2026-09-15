import "server-only";

import { Prisma } from "@prisma/client";
import {
  assertLotAllocation,
  classifyManualPayment,
  CommerceRuleError,
  ensureProviderTransactionAvailable,
  getOrderTransitionPlan,
  parseNokToOre,
  type OrderAction,
} from "@/lib/commerceRules";
import { getPrisma } from "@/lib/prisma";

const PAGE_SIZE = 20;
const ORDER_STATUSES = ["DRAFT", "CONFIRMED", "CANCELLED", "COMPLETED"] as const;
const PAYMENT_STATUSES = ["NOT_REQUESTED", "REQUESTED", "PAID", "PARTIAL", "REFUNDED", "FAILED", "REVIEW_REQUIRED"] as const;
const FULFILLMENT_STATUSES = ["UNFULFILLED", "PREPARING", "SHIPPED", "DELIVERED"] as const;

function oneOf<T extends readonly string[]>(value: string | undefined, values: T): T[number] | undefined {
  return value && (values as readonly string[]).includes(value) ? (value as T[number]) : undefined;
}

function dateBoundary(value: string | undefined, end: boolean): Date | undefined {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return undefined;
  const date = new Date(`${value}T${end ? "23:59:59.999" : "00:00:00.000"}Z`);
  return Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value
    ? undefined
    : date;
}

export interface AdminOrderFilters {
  query?: string;
  orderStatus?: string;
  paymentStatus?: string;
  fulfillmentStatus?: string;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
}

export async function getAdminOrders(filters: AdminOrderFilters) {
  const prisma = await getPrisma();
  const page = Number.isSafeInteger(filters.page) && Number(filters.page) > 0 ? Number(filters.page) : 1;
  const query = filters.query?.trim().slice(0, 160);
  const from = dateBoundary(filters.dateFrom, false);
  const to = dateBoundary(filters.dateTo, true);
  const where: Prisma.OrderWhereInput = {
    ...(query
      ? {
          OR: [
            { orderNumber: { contains: query, mode: "insensitive" } },
            { customerEmail: { contains: query, mode: "insensitive" } },
            { customerPhoneE164: { contains: query } },
          ],
        }
      : {}),
    orderStatus: oneOf(filters.orderStatus, ORDER_STATUSES),
    paymentStatus: oneOf(filters.paymentStatus, PAYMENT_STATUSES),
    fulfillmentStatus: oneOf(filters.fulfillmentStatus, FULFILLMENT_STATUSES),
    ...(from || to ? { createdAt: { gte: from, lte: to } } : {}),
  };
  const [total, orders] = await prisma.$transaction([
    prisma.order.count({ where }),
    prisma.order.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      select: {
        id: true,
        orderNumber: true,
        createdAt: true,
        customerName: true,
        customerEmail: true,
        customerPhoneE164: true,
        totalOre: true,
        currency: true,
        orderStatus: true,
        paymentStatus: true,
        fulfillmentStatus: true,
      },
    }),
  ]);
  return { orders, total, page, pageSize: PAGE_SIZE, pageCount: Math.max(1, Math.ceil(total / PAGE_SIZE)) };
}

export async function getAdminOrderDetail(id: string) {
  const prisma = await getPrisma();
  return prisma.order.findUnique({
    where: { id },
    include: {
      items: {
        orderBy: { createdAt: "asc" },
        include: {
          lotAllocations: {
            orderBy: { createdAt: "asc" },
            include: { coffeeLot: { select: { id: true, lotNumber: true, productName: true } } },
          },
        },
      },
      payments: { orderBy: { createdAt: "desc" } },
      events: { orderBy: { createdAt: "desc" } },
    },
  });
}

export async function getAssignableCoffeeLots() {
  const prisma = await getPrisma();
  return prisma.coffeeLot.findMany({
    where: { active: true },
    orderBy: { lotNumber: "desc" },
    select: { id: true, lotNumber: true, productName: true },
  });
}

export interface AdminPaymentFilters {
  query?: string;
  status?: string;
  page?: number;
}

export async function getAdminPayments(filters: AdminPaymentFilters) {
  const prisma = await getPrisma();
  const page = Number.isSafeInteger(filters.page) && Number(filters.page) > 0 ? Number(filters.page) : 1;
  const query = filters.query?.trim().slice(0, 160);
  let amountOre: number | undefined;
  if (query) {
    try {
      amountOre = parseNokToOre(query);
    } catch {
      amountOre = undefined;
    }
  }
  const status = oneOf(filters.status, PAYMENT_STATUSES);
  const where: Prisma.PaymentWhereInput = {
    status: status ?? { in: ["REQUESTED", "PARTIAL", "REVIEW_REQUIRED", "PAID"] },
    ...(query
      ? {
          OR: [
            { providerReference: { contains: query, mode: "insensitive" } },
            { providerTransactionId: { contains: query, mode: "insensitive" } },
            { customerPhoneE164: { contains: query } },
            { order: { is: { orderNumber: { contains: query, mode: "insensitive" } } } },
            { order: { is: { customerEmail: { contains: query, mode: "insensitive" } } } },
            ...(amountOre === undefined ? [] : [{ amountOre }, { receivedAmountOre: amountOre }]),
          ],
        }
      : {}),
  };
  const [total, payments] = await prisma.$transaction([
    prisma.payment.count({ where }),
    prisma.payment.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      include: {
        order: {
          select: {
            id: true,
            orderNumber: true,
            customerName: true,
            customerEmail: true,
            customerPhoneE164: true,
            paymentStatus: true,
          },
        },
      },
    }),
  ]);
  return { payments, total, page, pageSize: PAGE_SIZE, pageCount: Math.max(1, Math.ceil(total / PAGE_SIZE)) };
}

function requiredAdminText(value: unknown, label: string, maxLength: number): string {
  if (typeof value !== "string" || !value.trim() || value.trim().length > maxLength) {
    throw new CommerceRuleError("INVALID_ADMIN_INPUT", `${label} is invalid.`);
  }
  return value.trim();
}

export async function verifyManualPayment(
  paymentId: string,
  input: {
    receivedAmountNok: unknown;
    paidAt: unknown;
    providerTransactionId: unknown;
    verificationSource: unknown;
    note?: unknown;
  },
) {
  const receivedAmountOre = parseNokToOre(input.receivedAmountNok);
  const transactionId = requiredAdminText(input.providerTransactionId, "Transaction ID", 160);
  const verificationSource = requiredAdminText(input.verificationSource, "Verification source", 120);
  let note: string | null = null;
  if (input.note !== undefined && input.note !== null && input.note !== "") {
    if (typeof input.note !== "string" || input.note.trim().length > 2000) {
      throw new CommerceRuleError("INVALID_ADMIN_INPUT", "Note is invalid.");
    }
    note = input.note.trim() || null;
  }
  if (typeof input.paidAt !== "string") throw new CommerceRuleError("INVALID_ADMIN_INPUT", "Payment date is invalid.");
  const paidAt = new Date(input.paidAt);
  if (Number.isNaN(paidAt.getTime()) || paidAt.getTime() > Date.now() + 5 * 60 * 1000) {
    throw new CommerceRuleError("INVALID_ADMIN_INPUT", "Payment date is invalid.");
  }

  const prisma = await getPrisma();
  return prisma.$transaction(async (tx) => {
    const payment = await tx.payment.findUnique({ where: { id: paymentId } });
    if (!payment) throw new CommerceRuleError("NOT_FOUND", "Payment not found.");
    if (!["REQUESTED", "PARTIAL", "REVIEW_REQUIRED"].includes(payment.status)) {
      throw new CommerceRuleError("INVALID_PAYMENT_STATE", "Payment cannot be verified in its current state.");
    }
    const duplicate = await tx.payment.findFirst({
      where: { provider: "VIPPS", providerTransactionId: transactionId },
      select: { id: true },
    });
    ensureProviderTransactionAvailable(duplicate?.id ?? null, payment.id);
    const result = classifyManualPayment(receivedAmountOre, payment.amountOre);
    const verifiedAt = new Date();
    const updated = await tx.payment.updateMany({
      where: { id: payment.id, status: payment.status, updatedAt: payment.updatedAt },
      data: {
        status: result.status,
        receivedAmountOre,
        providerTransactionId: transactionId,
        paidAt,
        verifiedAt,
        verifiedBy: "shared-admin",
        verificationSource,
        failureReason: null,
      },
    });
    if (updated.count !== 1) {
      throw new CommerceRuleError("INVALID_PAYMENT_STATE", "Payment changed concurrently.");
    }
    await tx.order.update({ where: { id: payment.orderId }, data: { paymentStatus: result.status } });
    await tx.orderEvent.create({
      data: {
        orderId: payment.orderId,
        paymentId: payment.id,
        type: result.event,
        actorType: "ADMIN",
        actorId: "shared-admin",
        note,
        metadata: {},
      },
    });
    return result;
  }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable });
}

export async function setManualPaymentException(
  paymentId: string,
  status: "FAILED" | "REFUNDED",
  rawNote: unknown,
) {
  const note = requiredAdminText(rawNote, "Note", 2000);
  const prisma = await getPrisma();
  return prisma.$transaction(async (tx) => {
    const payment = await tx.payment.findUnique({ where: { id: paymentId } });
    if (!payment) throw new CommerceRuleError("NOT_FOUND", "Payment not found.");
    const allowed =
      (status === "FAILED" && ["REQUESTED", "PARTIAL", "REVIEW_REQUIRED"].includes(payment.status)) ||
      (status === "REFUNDED" && payment.status === "PAID");
    if (!allowed) throw new CommerceRuleError("INVALID_PAYMENT_STATE", "Payment transition is not allowed.");
    const now = new Date();
    const updated = await tx.payment.updateMany({
      where: { id: payment.id, status: payment.status, updatedAt: payment.updatedAt },
      data: {
        status,
        verifiedAt: now,
        verifiedBy: "shared-admin",
        failureReason: status === "FAILED" ? note : null,
      },
    });
    if (updated.count !== 1) {
      throw new CommerceRuleError("INVALID_PAYMENT_STATE", "Payment changed concurrently.");
    }
    await tx.order.update({ where: { id: payment.orderId }, data: { paymentStatus: status } });
    await tx.orderEvent.create({
      data: {
        orderId: payment.orderId,
        paymentId: payment.id,
        type: status === "FAILED" ? "PAYMENT_FAILED" : "PAYMENT_REFUNDED",
        actorType: "ADMIN",
        actorId: "shared-admin",
        note,
        metadata: {},
      },
    });
  }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable });
}

export async function transitionAdminOrder(orderId: string, action: OrderAction) {
  const prisma = await getPrisma();
  return prisma.$transaction(async (tx) => {
    const order = await tx.order.findUnique({
      where: { id: orderId },
      include: { items: { select: { productVariantId: true, quantity: true } } },
    });
    if (!order) throw new CommerceRuleError("NOT_FOUND", "Order not found.");
    const plan = getOrderTransitionPlan(order, action);
    if (plan.idempotent) return;

    const now = new Date();
    const timestamps =
      action === "CANCEL"
        ? { cancelledAt: now }
        : action === "COMPLETE"
          ? { completedAt: now }
          : {};
    const changed = await tx.order.updateMany({
      where: {
        id: order.id,
        orderStatus: order.orderStatus,
        paymentStatus: order.paymentStatus,
        fulfillmentStatus: order.fulfillmentStatus,
      },
      data: { ...plan.data, ...timestamps },
    });
    if (changed.count !== 1) throw new CommerceRuleError("INVALID_TRANSITION", "Order changed concurrently.");

    if (plan.restoreInventory) {
      for (const item of order.items) {
        if (item.productVariantId) {
          await tx.productVariant.updateMany({
            where: { id: item.productVariantId },
            data: { inventory: { increment: item.quantity } },
          });
        }
      }
    }
    if (plan.event) {
      await tx.orderEvent.create({
        data: {
          orderId: order.id,
          type: plan.event,
          actorType: "ADMIN",
          actorId: "shared-admin",
          metadata: {},
        },
      });
    }
  });
}

export async function addInternalOrderNote(orderId: string, rawNote: unknown) {
  const note = requiredAdminText(rawNote, "Note", 2000);
  const prisma = await getPrisma();
  await prisma.$transaction([
    prisma.order.update({ where: { id: orderId }, data: { internalNote: note } }),
    prisma.orderEvent.create({
      data: {
        orderId,
        type: "NOTE_ADDED",
        actorType: "ADMIN",
        actorId: "shared-admin",
        note,
        metadata: {},
      },
    }),
  ]);
}

export async function assignOrderItemLot(
  orderId: string,
  input: { orderItemId: string; coffeeLotId: string; quantity: number; allocatedWeightGrams: number | null },
) {
  const prisma = await getPrisma();
  return prisma.$transaction(async (tx) => {
    const item = await tx.orderItem.findFirst({
      where: { id: input.orderItemId, orderId },
      include: { order: true, lotAllocations: true },
    });
    if (!item) throw new CommerceRuleError("NOT_FOUND", "Order item not found.");
    if (item.order.orderStatus !== "CONFIRMED" || !["UNFULFILLED", "PREPARING"].includes(item.order.fulfillmentStatus)) {
      throw new CommerceRuleError("INVALID_ALLOCATION", "Lots cannot be changed after shipment or cancellation.");
    }
    const lot = await tx.coffeeLot.findFirst({
      where: { id: input.coffeeLotId, active: true },
      select: { id: true },
    });
    if (!lot) throw new CommerceRuleError("NOT_FOUND", "Coffee lot not found.");
    const otherAllocated = item.lotAllocations
      .filter((allocation) => allocation.coffeeLotId !== input.coffeeLotId)
      .reduce((sum, allocation) => sum + allocation.quantity, 0);
    assertLotAllocation(item.quantity, otherAllocated, input.quantity);
    if (input.allocatedWeightGrams !== null && (!Number.isSafeInteger(input.allocatedWeightGrams) || input.allocatedWeightGrams < 1)) {
      throw new CommerceRuleError("INVALID_ALLOCATION", "Allocated weight is invalid.");
    }
    return tx.orderItemLotAllocation.upsert({
      where: { orderItemId_coffeeLotId: { orderItemId: item.id, coffeeLotId: input.coffeeLotId } },
      update: { quantity: input.quantity, allocatedWeightGrams: input.allocatedWeightGrams },
      create: {
        orderItemId: item.id,
        coffeeLotId: input.coffeeLotId,
        quantity: input.quantity,
        allocatedWeightGrams: input.allocatedWeightGrams,
      },
    });
  }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable });
}

export async function getLotOrderAllocations(coffeeLotId: string) {
  const prisma = await getPrisma();
  return prisma.orderItemLotAllocation.findMany({
    where: { coffeeLotId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      quantity: true,
      allocatedWeightGrams: true,
      orderItem: {
        select: {
          productName: true,
          variantName: true,
          sku: true,
          order: {
            select: { id: true, orderNumber: true, customerName: true, createdAt: true },
          },
        },
      },
    },
  });
}

export async function getAdminCoffeeLotSummary(id: string) {
  const prisma = await getPrisma();
  return prisma.coffeeLot.findUnique({
    where: { id },
    select: { id: true, lotNumber: true, productName: true, active: true },
  });
}

export function isAdminCommerceConflict(error: unknown): error is CommerceRuleError {
  return error instanceof CommerceRuleError;
}

export function isDuplicatePaymentTransaction(error: unknown): boolean {
  return (
    (error instanceof CommerceRuleError && error.code === "DUPLICATE_TRANSACTION") ||
    (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002")
  );
}
