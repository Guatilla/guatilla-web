import { DATABASE_INT_MAX } from "./numericLimits.ts";

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const E164_PATTERN = /^\+[1-9]\d{7,14}$/;

export class CommerceRuleError extends Error {
  readonly code: string;

  constructor(code: string, message: string) {
    super(message);
    this.code = code;
    this.name = "CommerceRuleError";
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasOnlyKeys(value: Record<string, unknown>, allowed: readonly string[]): boolean {
  return Object.keys(value).every((key) => allowed.includes(key));
}

function text(
  value: unknown,
  label: string,
  maxLength: number,
  optional = false,
): string | null {
  if (optional && (value === undefined || value === null || value === "")) return null;
  if (typeof value !== "string" || !value.trim()) {
    throw new CommerceRuleError("INVALID_CUSTOMER", `${label} is required.`);
  }
  const normalized = value.trim();
  if (normalized.length > maxLength) {
    throw new CommerceRuleError("INVALID_CUSTOMER", `${label} is too long.`);
  }
  return normalized;
}

export function normalizePhoneE164(value: unknown): string {
  if (typeof value !== "string") {
    throw new CommerceRuleError("INVALID_PHONE", "Invalid phone number.");
  }
  let normalized = value.trim().replace(/[\s().-]/g, "");
  if (normalized.startsWith("00")) normalized = `+${normalized.slice(2)}`;
  if (/^\d{8}$/.test(normalized)) normalized = `+47${normalized}`;
  if (!E164_PATTERN.test(normalized)) {
    throw new CommerceRuleError("INVALID_PHONE", "Invalid E.164 phone number.");
  }
  return normalized;
}

export function parseNokToOre(value: unknown): number {
  if (typeof value !== "string") {
    throw new CommerceRuleError("INVALID_AMOUNT", "Invalid NOK amount.");
  }
  const normalized = value.trim().replace(/[\s\u00a0]/g, "").replace(",", ".");
  if (!/^\d{1,9}(?:\.\d{1,2})?$/.test(normalized)) {
    throw new CommerceRuleError("INVALID_AMOUNT", "Invalid NOK amount.");
  }
  const [kroner, decimals = ""] = normalized.split(".");
  const ore = Number(kroner) * 100 + Number(decimals.padEnd(2, "0"));
  if (!Number.isSafeInteger(ore) || ore > DATABASE_INT_MAX) {
    throw new CommerceRuleError("INVALID_AMOUNT", "Invalid NOK amount.");
  }
  return ore;
}

export function validateCheckoutPayload(value: unknown) {
  if (!isRecord(value) || !hasOnlyKeys(value, ["items", "customer", "locale", "note", "clientRequestId"])) {
    throw new CommerceRuleError("INVALID_REQUEST", "Invalid checkout request.");
  }
  if (!Array.isArray(value.items) || value.items.length === 0 || value.items.length > 50) {
    throw new CommerceRuleError("INVALID_CART", "Invalid cart.");
  }

  const seen = new Set<string>();
  const items = value.items.map((item) => {
    if (!isRecord(item) || !hasOnlyKeys(item, ["variantId", "quantity"])) {
      throw new CommerceRuleError("INVALID_CART", "Invalid cart item.");
    }
    if (typeof item.variantId !== "string" || !UUID_PATTERN.test(item.variantId) || seen.has(item.variantId)) {
      throw new CommerceRuleError("INVALID_CART", "Invalid or duplicate variant ID.");
    }
    if (!Number.isSafeInteger(item.quantity) || Number(item.quantity) < 1 || Number(item.quantity) > 99) {
      throw new CommerceRuleError("INVALID_CART", "Invalid quantity.");
    }
    seen.add(item.variantId);
    return { variantId: item.variantId, quantity: Number(item.quantity) };
  });

  if (!isRecord(value.customer) || !hasOnlyKeys(value.customer, ["fullName", "email", "phone", "addressLine1", "addressLine2", "postalCode", "city", "countryCode"])) {
    throw new CommerceRuleError("INVALID_CUSTOMER", "Invalid customer data.");
  }
  const fullName = text(value.customer.fullName, "Full name", 160) as string;
  const rawEmail = text(value.customer.email, "Email", 254) as string;
  const email = rawEmail.toLowerCase();
  if (!EMAIL_PATTERN.test(email)) {
    throw new CommerceRuleError("INVALID_EMAIL", "Invalid email address.");
  }
  const phoneE164 = normalizePhoneE164(value.customer.phone);
  const addressLine1 = text(value.customer.addressLine1, "Address", 240) as string;
  const addressLine2 = text(value.customer.addressLine2, "Additional address", 240, true);
  const postalCode = text(value.customer.postalCode, "Postal code", 20) as string;
  const city = text(value.customer.city, "City", 120) as string;
  const countryRaw = text(value.customer.countryCode, "Country", 2) as string;
  const countryCode = countryRaw.toUpperCase();
  if (!/^[A-Z]{2}$/.test(countryCode) || (countryCode === "NO" && !/^\d{4}$/.test(postalCode))) {
    throw new CommerceRuleError("INVALID_ADDRESS", "Invalid country or postal code.");
  }
  if (!(["no", "en", "es"] as const).includes(value.locale as "no" | "en" | "es")) {
    throw new CommerceRuleError("INVALID_LOCALE", "Invalid locale.");
  }
  if (typeof value.clientRequestId !== "string" || !UUID_PATTERN.test(value.clientRequestId)) {
    throw new CommerceRuleError("INVALID_REQUEST_ID", "Invalid client request ID.");
  }
  const note = text(value.note, "Buyer note", 1000, true);

  return {
    items,
    customer: { fullName, email, phoneE164, addressLine1, addressLine2, postalCode, city, countryCode },
    locale: value.locale as "no" | "en" | "es",
    note,
    clientRequestId: value.clientRequestId,
  };
}

export interface AvailableCheckoutVariant {
  id: string;
  productId: string;
  sku: string;
  name: string;
  grind: string | null;
  weightGrams: number | null;
  priceOre: number;
  currency: string;
  inventory: number;
  active: boolean;
  product: {
    slug: string;
    name: string;
    isPublished: boolean;
    categoryActive: boolean;
  };
}

export function buildCheckoutPlan(
  variants: AvailableCheckoutVariant[],
  items: Array<{ variantId: string; quantity: number }>,
  shippingOre = 0,
  discountOre = 0,
) {
  if (!Number.isSafeInteger(shippingOre) || shippingOre < 0 || !Number.isSafeInteger(discountOre) || discountOre < 0) {
    throw new CommerceRuleError("INVALID_TOTAL_POLICY", "Invalid total policy.");
  }
  const byId = new Map(variants.map((variant) => [variant.id, variant]));
  const lines = items.map((item) => {
    const variant = byId.get(item.variantId);
    if (!variant) throw new CommerceRuleError("CATALOG_CHANGED", "A product is no longer available.");
    if (!variant.active) throw new CommerceRuleError("VARIANT_INACTIVE", "A variant is inactive.");
    if (!variant.product.isPublished || !variant.product.categoryActive) {
      throw new CommerceRuleError("PRODUCT_UNPUBLISHED", "A product is not published.");
    }
    if (variant.inventory < item.quantity) {
      throw new CommerceRuleError("INSUFFICIENT_STOCK", "Insufficient inventory.");
    }
    if (!Number.isSafeInteger(variant.priceOre) || variant.priceOre < 1 || variant.currency !== "NOK") {
      throw new CommerceRuleError("CATALOG_CHANGED", "Invalid catalogue price.");
    }
    const lineTotalOre = variant.priceOre * item.quantity;
    if (!Number.isSafeInteger(lineTotalOre) || lineTotalOre > DATABASE_INT_MAX) {
      throw new CommerceRuleError("INVALID_TOTAL", "Invalid total.");
    }
    return {
      variantId: variant.id,
      productId: variant.productId,
      productSlug: variant.product.slug,
      productName: variant.product.name,
      variantName: variant.name,
      sku: variant.sku,
      grind: variant.grind,
      weightGrams: variant.weightGrams,
      quantity: item.quantity,
      unitPriceOre: variant.priceOre,
      lineTotalOre,
    };
  });
  const subtotalOre = lines.reduce((sum, line) => sum + line.lineTotalOre, 0);
  const totalOre = subtotalOre + shippingOre - discountOre;
  if (!Number.isSafeInteger(totalOre) || totalOre < 1 || totalOre > DATABASE_INT_MAX) {
    throw new CommerceRuleError("INVALID_TOTAL", "Invalid total.");
  }
  return { lines, subtotalOre, shippingOre, discountOre, totalOre };
}

export function classifyManualPayment(receivedAmountOre: number, expectedAmountOre: number) {
  if (
    !Number.isSafeInteger(receivedAmountOre) ||
    receivedAmountOre < 1 ||
    receivedAmountOre > DATABASE_INT_MAX ||
    !Number.isSafeInteger(expectedAmountOre) ||
    expectedAmountOre < 1 ||
    expectedAmountOre > DATABASE_INT_MAX
  ) {
    throw new CommerceRuleError("INVALID_AMOUNT", "Invalid payment amount.");
  }
  if (receivedAmountOre === expectedAmountOre) return { status: "PAID" as const, event: "PAYMENT_CONFIRMED" as const };
  if (receivedAmountOre < expectedAmountOre) return { status: "PARTIAL" as const, event: "PAYMENT_PARTIAL" as const };
  return { status: "REVIEW_REQUIRED" as const, event: "PAYMENT_REVIEW_REQUIRED" as const };
}

export type OrderAction = "CANCEL" | "PREPARE" | "SHIP" | "DELIVER" | "COMPLETE";

export function getOrderTransitionPlan(
  current: { orderStatus: string; paymentStatus: string; fulfillmentStatus: string },
  action: OrderAction,
) {
  if (action === "CANCEL" && current.orderStatus === "CANCELLED") {
    return { idempotent: true, event: null, restoreInventory: false, data: {} };
  }
  if (
    action === "CANCEL" &&
    current.orderStatus === "CONFIRMED" &&
    ["UNFULFILLED", "PREPARING"].includes(current.fulfillmentStatus)
  ) {
    const paymentIsPending = ["NOT_REQUESTED", "REQUESTED"].includes(current.paymentStatus);
    return {
      idempotent: false,
      event: "ORDER_CANCELLED" as const,
      restoreInventory: true,
      data: {
        orderStatus: "CANCELLED" as const,
        ...(paymentIsPending ? { paymentStatus: "FAILED" as const } : {}),
      },
    };
  }
  if (action === "PREPARE" && current.orderStatus === "CONFIRMED" && current.paymentStatus === "PAID" && current.fulfillmentStatus === "UNFULFILLED") {
    return { idempotent: false, event: "PREPARATION_STARTED" as const, restoreInventory: false, data: { fulfillmentStatus: "PREPARING" as const } };
  }
  if (action === "SHIP" && current.orderStatus === "CONFIRMED" && current.fulfillmentStatus === "PREPARING") {
    return { idempotent: false, event: "ORDER_SHIPPED" as const, restoreInventory: false, data: { fulfillmentStatus: "SHIPPED" as const } };
  }
  if (action === "DELIVER" && current.orderStatus === "CONFIRMED" && current.fulfillmentStatus === "SHIPPED") {
    return { idempotent: false, event: "ORDER_DELIVERED" as const, restoreInventory: false, data: { fulfillmentStatus: "DELIVERED" as const } };
  }
  if (action === "COMPLETE" && current.orderStatus === "CONFIRMED" && current.paymentStatus === "PAID" && current.fulfillmentStatus === "DELIVERED") {
    return { idempotent: false, event: "ORDER_COMPLETED" as const, restoreInventory: false, data: { orderStatus: "COMPLETED" as const } };
  }
  throw new CommerceRuleError("INVALID_TRANSITION", "Order transition is not allowed.");
}

export function assertLotAllocation(purchasedQuantity: number, otherAllocatedQuantity: number, requestedQuantity: number) {
  if (![purchasedQuantity, otherAllocatedQuantity, requestedQuantity].every(Number.isSafeInteger) || requestedQuantity < 1 || otherAllocatedQuantity < 0 || purchasedQuantity < 1 || otherAllocatedQuantity + requestedQuantity > purchasedQuantity) {
    throw new CommerceRuleError("INVALID_ALLOCATION", "Allocated quantity exceeds purchased quantity.");
  }
}

export function ensureProviderTransactionAvailable(existingPaymentId: string | null, paymentId: string) {
  if (existingPaymentId && existingPaymentId !== paymentId) {
    throw new CommerceRuleError("DUPLICATE_TRANSACTION", "Vipps transaction ID already exists.");
  }
}

export function getPaymentRequestPlan(currentStatus: string) {
  if (currentStatus === "REQUESTED") return { idempotent: true };
  if (currentStatus === "NOT_REQUESTED") return { idempotent: false };
  throw new CommerceRuleError(
    "INVALID_PAYMENT_STATE",
    "The Vipps request cannot be sent in the current payment state.",
  );
}

export async function resolveIdempotentCheckout<T>(existing: T | null, create: () => Promise<T>): Promise<T> {
  return existing ?? create();
}
