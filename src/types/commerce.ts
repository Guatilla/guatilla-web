export interface CheckoutCartItemInput {
  variantId: string;
  quantity: number;
}

export interface CheckoutCustomerInput {
  fullName: string;
  email: string;
  phoneE164: string;
  addressLine1: string;
  addressLine2: string | null;
  postalCode: string;
  city: string;
  countryCode: string;
}

export interface CheckoutInput {
  items: CheckoutCartItemInput[];
  customer: CheckoutCustomerInput;
  locale: "no" | "en" | "es";
  note: string | null;
  clientRequestId: string;
}

export interface PublicOrderResult {
  id: string;
  orderNumber: string;
  totalOre: number;
  currency: "NOK";
  orderStatus: "DRAFT" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  paymentStatus:
    | "NOT_REQUESTED"
    | "REQUESTED"
    | "PAID"
    | "PARTIAL"
    | "REFUNDED"
    | "FAILED"
    | "REVIEW_REQUIRED";
}

export interface CheckoutPlanLine {
  variantId: string;
  productId: string;
  productSlug: string;
  productName: string;
  variantName: string;
  sku: string;
  grind: string | null;
  weightGrams: number | null;
  quantity: number;
  unitPriceOre: number;
  lineTotalOre: number;
}

export interface CheckoutPlan {
  lines: CheckoutPlanLine[];
  subtotalOre: number;
  shippingOre: number;
  discountOre: number;
  totalOre: number;
}
