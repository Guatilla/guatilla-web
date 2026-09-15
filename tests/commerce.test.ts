import test from "node:test";
import assert from "node:assert/strict";

import {
  assertLotAllocation,
  buildCheckoutPlan,
  classifyManualPayment,
  CommerceRuleError,
  ensureProviderTransactionAvailable,
  getOrderTransitionPlan,
  normalizePhoneE164,
  parseNokToOre,
  resolveIdempotentCheckout,
  validateCheckoutPayload,
  type AvailableCheckoutVariant,
} from "../src/lib/commerceRules.ts";
import {
  checkAdminPassword,
  createSessionToken,
  verifySessionToken,
} from "../src/lib/sporbarhetAuth.ts";
import { localizeVariantName } from "../src/i18n/products.ts";

const VARIANT_ID = "11111111-1111-4111-8111-111111111111";
const PRODUCT_ID = "22222222-2222-4222-8222-222222222222";
const REQUEST_ID = "33333333-3333-4333-8333-333333333333";

function variant(
  overrides: Partial<AvailableCheckoutVariant> = {},
): AvailableCheckoutVariant {
  return {
    id: VARIANT_ID,
    productId: PRODUCT_ID,
    sku: "REAL-SKU-FROM-DATABASE",
    name: "Variant",
    grind: null,
    weightGrams: 250,
    priceOre: 24_900,
    currency: "NOK",
    inventory: 5,
    active: true,
    product: {
      slug: "database-product",
      name: "Database product",
      isPublished: true,
      categoryActive: true,
    },
    ...overrides,
  };
}

function validCheckoutPayload() {
  return {
    items: [{ variantId: VARIANT_ID, quantity: 2 }],
    customer: {
      fullName: "Test Customer",
      email: "CUSTOMER@EXAMPLE.COM",
      phone: "912 34 567",
      addressLine1: "Testveien 1",
      addressLine2: "",
      postalCode: "0150",
      city: "Oslo",
      countryCode: "no",
    },
    locale: "no",
    note: "",
    clientRequestId: REQUEST_ID,
  };
}

function expectRuleError(code: string, action: () => unknown) {
  assert.throws(action, (error: unknown) => {
    assert.ok(error instanceof CommerceRuleError);
    assert.equal(error.code, code);
    return true;
  });
}

test("checkout recalculates price and totals exclusively from server variants", () => {
  const result = buildCheckoutPlan(
    [variant()],
    [{ variantId: VARIANT_ID, quantity: 2 }],
  );
  assert.equal(result.lines[0].unitPriceOre, 24_900);
  assert.equal(result.lines[0].lineTotalOre, 49_800);
  assert.equal(result.subtotalOre, 49_800);
  assert.equal(result.totalOre, 49_800);
});

test("checkout rejects a browser-supplied manipulated price", () => {
  const payload = validCheckoutPayload();
  const manipulated = {
    ...payload,
    items: [{ ...payload.items[0], priceOre: 1 }],
  };
  expectRuleError("INVALID_CART", () => validateCheckoutPayload(manipulated));
});

test("checkout normalizes customer identity fields on the server", () => {
  const result = validateCheckoutPayload(validCheckoutPayload());
  assert.equal(result.customer.email, "customer@example.com");
  assert.equal(result.customer.phoneE164, "+4791234567");
  assert.equal(result.customer.countryCode, "NO");
});

test("duplicate clientRequestId returns the existing order without creating another", async () => {
  let creates = 0;
  const existing = { id: "existing-order" };
  const result = await resolveIdempotentCheckout(existing, async () => {
    creates += 1;
    return { id: "new-order" };
  });
  assert.deepEqual(result, existing);
  assert.equal(creates, 0);
});

test("checkout rejects insufficient inventory", () => {
  expectRuleError("INSUFFICIENT_STOCK", () =>
    buildCheckoutPlan(
      [variant({ inventory: 1 })],
      [{ variantId: VARIANT_ID, quantity: 2 }],
    ),
  );
});

test("phone validation normalizes Norwegian numbers and rejects invalid E.164", () => {
  assert.equal(normalizePhoneE164("912 34 567"), "+4791234567");
  assert.equal(normalizePhoneE164("0047 912 34 567"), "+4791234567");
  expectRuleError("INVALID_PHONE", () => normalizePhoneE164("123"));
});

test("checkout rejects unpublished products", () => {
  expectRuleError("PRODUCT_UNPUBLISHED", () =>
    buildCheckoutPlan(
      [variant({ product: { ...variant().product, isPublished: false } })],
      [{ variantId: VARIANT_ID, quantity: 1 }],
    ),
  );
});

test("checkout rejects inactive variants", () => {
  expectRuleError("VARIANT_INACTIVE", () =>
    buildCheckoutPlan(
      [variant({ active: false })],
      [{ variantId: VARIANT_ID, quantity: 1 }],
    ),
  );
});

test("manual payment classification covers exact, partial and excess amounts", () => {
  assert.equal(parseNokToOre("477,00"), 47_700);
  assert.equal(classifyManualPayment(10_000, 10_000).status, "PAID");
  assert.equal(classifyManualPayment(9_999, 10_000).status, "PARTIAL");
  assert.equal(classifyManualPayment(10_001, 10_000).status, "REVIEW_REQUIRED");
});

test("NOK and order totals cannot exceed PostgreSQL integer columns", () => {
  expectRuleError("INVALID_AMOUNT", () => parseNokToOre("21474836.48"));
  expectRuleError("INVALID_TOTAL", () =>
    buildCheckoutPlan(
      [variant({ priceOre: 1_100_000_000 })],
      [{ variantId: VARIANT_ID, quantity: 2 }],
    ),
  );
  expectRuleError("INVALID_AMOUNT", () =>
    classifyManualPayment(2_147_483_648, 10_000),
  );
});

test("duplicate Vipps transaction IDs are rejected", () => {
  expectRuleError("DUPLICATE_TRANSACTION", () =>
    ensureProviderTransactionAvailable("payment-a", "payment-b"),
  );
  assert.doesNotThrow(() =>
    ensureProviderTransactionAvailable("payment-a", "payment-a"),
  );
});

test("order state machine permits valid transitions and rejects invalid ones", () => {
  const prepare = getOrderTransitionPlan(
    {
      orderStatus: "CONFIRMED",
      paymentStatus: "PAID",
      fulfillmentStatus: "UNFULFILLED",
    },
    "PREPARE",
  );
  assert.deepEqual(prepare.data, { fulfillmentStatus: "PREPARING" });
  expectRuleError("INVALID_TRANSITION", () =>
    getOrderTransitionPlan(
      {
        orderStatus: "CONFIRMED",
        paymentStatus: "REQUESTED",
        fulfillmentStatus: "UNFULFILLED",
      },
      "PREPARE",
    ),
  );
});

test("cancellation restores inventory only on the first transition", () => {
  const first = getOrderTransitionPlan(
    {
      orderStatus: "CONFIRMED",
      paymentStatus: "REQUESTED",
      fulfillmentStatus: "UNFULFILLED",
    },
    "CANCEL",
  );
  const repeated = getOrderTransitionPlan(
    {
      orderStatus: "CANCELLED",
      paymentStatus: "REQUESTED",
      fulfillmentStatus: "UNFULFILLED",
    },
    "CANCEL",
  );
  assert.equal(first.restoreInventory, true);
  assert.equal(repeated.restoreInventory, false);
  assert.equal(repeated.idempotent, true);

  const preparing = getOrderTransitionPlan(
    {
      orderStatus: "CONFIRMED",
      paymentStatus: "PAID",
      fulfillmentStatus: "PREPARING",
    },
    "CANCEL",
  );
  assert.equal(preparing.restoreInventory, true);
});

test("lot allocation cannot exceed the purchased quantity", () => {
  assert.doesNotThrow(() => assertLotAllocation(3, 1, 2));
  expectRuleError("INVALID_ALLOCATION", () => assertLotAllocation(3, 2, 2));
  expectRuleError("INVALID_ALLOCATION", () => assertLotAllocation(3, 0, 0));
});

test("an unauthenticated public request has no valid admin session", () => {
  assert.equal(verifySessionToken(undefined), false);
  assert.equal(verifySessionToken("invalid-token"), false);
  assert.equal(verifySessionToken("invalid.token.with-extra-part"), false);
});

test("admin session tokens are signed, expire safely and reject malformed suffixes", () => {
  const previousPassword = process.env.SPORBARHET_ADMIN_PASSWORD;
  const previousSecret = process.env.SPORBARHET_SESSION_SECRET;
  process.env.SPORBARHET_ADMIN_PASSWORD = "correct horse battery staple";
  process.env.SPORBARHET_SESSION_SECRET = "test-only-session-secret";

  try {
    assert.equal(checkAdminPassword("correct horse battery staple"), true);
    assert.equal(checkAdminPassword("wrong"), false);
    const token = createSessionToken();
    assert.ok(token);
    assert.equal(verifySessionToken(token), true);
    assert.equal(verifySessionToken(`${token}.unexpected`), false);
    assert.equal(verifySessionToken(`0.${token.split(".")[1]}`), false);
  } finally {
    if (previousPassword === undefined) delete process.env.SPORBARHET_ADMIN_PASSWORD;
    else process.env.SPORBARHET_ADMIN_PASSWORD = previousPassword;
    if (previousSecret === undefined) delete process.env.SPORBARHET_SESSION_SECRET;
    else process.env.SPORBARHET_SESSION_SECRET = previousSecret;
  }
});

test("catalog variant names are localized from grind and weight", () => {
  const wholeBean250 = {
    name: "Hele bønner · 250 g",
    grind: "Hele bønner",
    weightGrams: 250,
  };
  const ground500 = {
    name: "Malt · 500 g",
    grind: "Malt",
    weightGrams: 500,
  };

  assert.equal(localizeVariantName(wholeBean250, "no"), "Hele bønner · 250 g");
  assert.equal(localizeVariantName(wholeBean250, "en"), "Whole bean · 250 g");
  assert.equal(localizeVariantName(wholeBean250, "es"), "En grano · 250 g");
  assert.equal(localizeVariantName(ground500, "no"), "Malt · 500 g");
  assert.equal(localizeVariantName(ground500, "en"), "Ground coffee · 500 g");
  assert.equal(localizeVariantName(ground500, "es"), "Molido · 500 g");
});
