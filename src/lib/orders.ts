import "server-only";

import { Prisma } from "@prisma/client";
import { COMMERCE_CONFIG } from "@/config/commerce";
import { buildCatalogVersion } from "@/lib/catalogVersion";
import {
  buildCheckoutPlan,
  CommerceRuleError,
  resolveIdempotentCheckout,
} from "@/lib/commerceRules";
import { getPrisma } from "@/lib/prisma";
import type { CheckoutInput, PublicOrderResult } from "@/types/commerce";

const publicOrderSelect = {
  id: true,
  orderNumber: true,
  totalOre: true,
  currency: true,
  orderStatus: true,
  paymentStatus: true,
} satisfies Prisma.OrderSelect;

function toPublicOrder(order: {
  id: string;
  orderNumber: string;
  totalOre: number;
  currency: string;
  orderStatus: PublicOrderResult["orderStatus"];
  paymentStatus: PublicOrderResult["paymentStatus"];
}): PublicOrderResult {
  return {
    id: order.id,
    orderNumber: order.orderNumber,
    totalOre: order.totalOre,
    currency: "NOK",
    orderStatus: order.orderStatus,
    paymentStatus: order.paymentStatus,
  };
}

async function findExisting(clientRequestId: string): Promise<PublicOrderResult | null> {
  const prisma = await getPrisma();
  const existing = await prisma.order.findUnique({
    where: { clientRequestId },
    select: publicOrderSelect,
  });
  return existing ? toPublicOrder(existing) : null;
}

async function createInsideTransaction(
  input: CheckoutInput,
  expectedCatalogVersion: string,
): Promise<PublicOrderResult> {
  const prisma = await getPrisma();
  return prisma.$transaction(
    async (tx) => {
      const existing = await tx.order.findUnique({
        where: { clientRequestId: input.clientRequestId },
        select: publicOrderSelect,
      });
      if (existing) return toPublicOrder(existing);

      const variants = await tx.productVariant.findMany({
        where: { id: { in: input.items.map((item) => item.variantId) } },
        include: { product: { include: { category: true } } },
      });
      const requestedQuantity = new Map(
        input.items.map((item) => [item.variantId, item.quantity]),
      );
      const currentCatalogVersion = buildCatalogVersion(
        variants
          .filter(
            (variant) =>
              variant.active &&
              variant.product.isPublished &&
              (variant.product.category?.active ?? true),
          )
          .map((variant) => ({
            variantId: variant.id,
            priceOre: variant.priceOre,
            inStock:
              variant.inventory >= (requestedQuantity.get(variant.id) ?? 1),
          })),
      );
      if (currentCatalogVersion !== expectedCatalogVersion) {
        throw new CommerceRuleError(
          "CATALOG_CHANGED",
          "The catalogue changed after the cart was reviewed.",
        );
      }
      const plan = buildCheckoutPlan(
        variants.map((variant) => ({
          id: variant.id,
          productId: variant.productId,
          sku: variant.sku,
          name: variant.name,
          grind: variant.grind,
          weightGrams: variant.weightGrams,
          priceOre: variant.priceOre,
          currency: variant.currency,
          inventory: variant.inventory,
          active: variant.active,
          product: {
            slug: variant.product.slug,
            name: variant.product.name,
            isPublished: variant.product.isPublished,
            categoryActive: variant.product.category?.active ?? true,
          },
        })),
        input.items,
        COMMERCE_CONFIG.shippingOre,
        COMMERCE_CONFIG.discountOre,
      );

      for (const line of plan.lines) {
        const reserved = await tx.productVariant.updateMany({
          where: {
            id: line.variantId,
            active: true,
            inventory: { gte: line.quantity },
            product: {
              is: {
                isPublished: true,
                OR: [
                  { categoryId: null },
                  { category: { is: { active: true } } },
                ],
              },
            },
          },
          data: { inventory: { decrement: line.quantity } },
        });
        if (reserved.count !== 1) {
          throw new CommerceRuleError("INSUFFICIENT_STOCK", "Inventory changed during checkout.");
        }
      }

      const customer = await tx.customer.upsert({
        where: { email: input.customer.email },
        update: {
          name: input.customer.fullName,
          phoneE164: input.customer.phoneE164,
          locale: input.locale === "no" ? "nb" : input.locale,
        },
        create: {
          name: input.customer.fullName,
          email: input.customer.email,
          phoneE164: input.customer.phoneE164,
          locale: input.locale === "no" ? "nb" : input.locale,
        },
      });
      const now = new Date();
      const order = await tx.order.create({
        data: {
          clientRequestId: input.clientRequestId,
          customerId: customer.id,
          customerName: input.customer.fullName,
          customerEmail: input.customer.email,
          customerPhoneE164: input.customer.phoneE164,
          addressLine1: input.customer.addressLine1,
          addressLine2: input.customer.addressLine2,
          postalCode: input.customer.postalCode,
          city: input.customer.city,
          countryCode: input.customer.countryCode,
          currency: COMMERCE_CONFIG.currency,
          subtotalOre: plan.subtotalOre,
          shippingOre: plan.shippingOre,
          discountOre: plan.discountOre,
          totalOre: plan.totalOre,
          orderStatus: "CONFIRMED",
          paymentStatus: "NOT_REQUESTED",
          fulfillmentStatus: "UNFULFILLED",
          source: "WEB",
          customerNote: input.note,
          placedAt: now,
          confirmedAt: now,
        },
      });

      await tx.orderItem.createMany({
        data: plan.lines.map((line) => ({
          orderId: order.id,
          productId: line.productId,
          productVariantId: line.variantId,
          productSlug: line.productSlug,
          productName: line.productName,
          variantName: line.variantName,
          sku: line.sku,
          quantity: line.quantity,
          unitPriceOre: line.unitPriceOre,
          lineTotalOre: line.lineTotalOre,
          productSnapshot: {
            productName: line.productName,
            productSlug: line.productSlug,
            variantName: line.variantName,
            sku: line.sku,
            grind: line.grind,
            weightGrams: line.weightGrams,
            unitPriceOre: line.unitPriceOre,
            currency: COMMERCE_CONFIG.currency,
          },
        })),
      });
      await tx.payment.create({
        data: {
          orderId: order.id,
          provider: "VIPPS",
          flow: "MANUAL_REQUEST",
          status: "NOT_REQUESTED",
          amountOre: plan.totalOre,
          currency: COMMERCE_CONFIG.currency,
          customerPhoneE164: input.customer.phoneE164,
          providerReference: order.orderNumber,
        },
      });
      await tx.orderEvent.create({
        data: {
          orderId: order.id,
          type: "ORDER_CREATED",
          actorType: "CUSTOMER",
          metadata: {},
        },
      });
      return {
        id: order.id,
        orderNumber: order.orderNumber,
        totalOre: plan.totalOre,
        currency: "NOK",
        orderStatus: "CONFIRMED",
        paymentStatus: "NOT_REQUESTED",
      };
    },
    { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
  );
}

export async function createWebOrder(
  input: CheckoutInput,
  expectedCatalogVersion: string,
): Promise<PublicOrderResult> {
  const existing = await findExisting(input.clientRequestId);
  try {
    return await resolveIdempotentCheckout(existing, () =>
      createInsideTransaction(input, expectedCatalogVersion),
    );
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      (error.code === "P2002" || error.code === "P2034")
    ) {
      const racedOrder = await findExisting(input.clientRequestId);
      if (racedOrder) return racedOrder;
      if (error.code === "P2034") {
        return createInsideTransaction(input, expectedCatalogVersion);
      }
    }
    throw error;
  }
}
