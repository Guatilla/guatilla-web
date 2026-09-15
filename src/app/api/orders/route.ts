import { NextRequest, NextResponse } from "next/server";
import { CommerceRuleError, validateCheckoutPayload } from "@/lib/commerceRules";
import { notifyOwnerOfOrder } from "@/lib/orderNotifications";
import { createWebOrder } from "@/lib/orders";
import { requireSameOrigin } from "@/lib/requireAdmin";

export const dynamic = "force-dynamic";

const CONFLICT_CODES = new Set([
  "CATALOG_CHANGED",
  "VARIANT_INACTIVE",
  "PRODUCT_UNPUBLISHED",
  "INSUFFICIENT_STOCK",
]);

export async function POST(request: NextRequest) {
  const invalidOrigin = requireSameOrigin(request);
  if (invalidOrigin) return invalidOrigin;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request.", code: "INVALID_REQUEST" }, { status: 400 });
  }

  try {
    const input = validateCheckoutPayload(body);
    const catalogVersion = request.headers.get("if-match");
    if (!catalogVersion || !/^[a-f0-9]{64}$/.test(catalogVersion)) {
      throw new CommerceRuleError("CATALOG_CHANGED", "A current catalogue version is required.");
    }
    const order = await createWebOrder(input, catalogVersion);
    try {
      const notificationStatus = await notifyOwnerOfOrder(order.id);
      if (notificationStatus !== "sent") {
        console.error(`Order notification was not sent: ${notificationStatus}.`);
      }
    } catch {
      console.error("Order notification could not be sent.");
    }
    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    if (error instanceof CommerceRuleError) {
      return NextResponse.json(
        {
          error: CONFLICT_CODES.has(error.code)
            ? "The catalogue or inventory changed. Review your cart and try again."
            : "The checkout information is invalid.",
          code: error.code,
        },
        { status: CONFLICT_CODES.has(error.code) ? 409 : 400 },
      );
    }
    return NextResponse.json(
      { error: "The order could not be created.", code: "ORDER_UNAVAILABLE" },
      { status: 503 },
    );
  }
}
