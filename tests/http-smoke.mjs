import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const baseUrl = new URL(process.env.TEST_BASE_URL ?? "http://127.0.0.1:3000");
if (!new Set(["127.0.0.1", "localhost"]).has(baseUrl.hostname)) {
  throw new Error("The HTTP smoke test is restricted to a local server.");
}

let passed = 0;

async function request(name, path, expectedStatus, options = {}) {
  const response = await fetch(new URL(path, baseUrl), {
    redirect: "manual",
    ...options,
  });
  assert.equal(response.status, expectedStatus, `${name}: unexpected HTTP status`);
  passed += 1;
  console.log(`PASS ${response.status} ${name}`);
  return response;
}

function json(body) {
  return {
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  };
}

function sameOriginJson(body) {
  const options = json(body);
  options.headers.Origin = baseUrl.origin;
  return options;
}

for (const [path, lang, title] of [
  ["/", "nb", "Kaffe Guatilla"],
  ["/en", "en", "From our own mountains"],
  ["/es", "es", "De nuestras montañas"],
  ["/shop", "nb", "Butikk | Kaffe Guatilla"],
  ["/en/shop", "en", "Shop | Kaffe Guatilla"],
  ["/es/shop", "es", "Tienda | Kaffe Guatilla"],
  ["/cart", "nb", "Handlekurv | Kaffe Guatilla"],
  ["/en/cart", "en", "Cart | Kaffe Guatilla"],
  ["/es/cart", "es", "Carrito | Kaffe Guatilla"],
  ["/checkout", "nb", "Fullfør bestillingen | Kaffe Guatilla"],
  ["/en/checkout", "en", "Checkout | Kaffe Guatilla"],
  ["/es/checkout", "es", "Finaliza tu compra | Kaffe Guatilla"],
  ["/sporbarhet", "nb", "Sporbarhet | Kaffe Guatilla"],
  ["/en/sporbarhet", "en", "Traceability | Kaffe Guatilla"],
  ["/es/sporbarhet", "es", "Trazabilidad | Kaffe Guatilla"],
]) {
  const response = await request(`page ${path}`, path, 200);
  const html = await response.text();
  assert.match(html, new RegExp(`<html[^>]+lang="${lang}"`));
  assert.ok(html.includes(title), `${path}: localized title/copy missing`);
}

const spoofed = await request("client locale header ignored", "/", 200, {
  headers: { "x-guatilla-locale": "es" },
});
assert.match(await spoofed.text(), /<html[^>]+lang="nb"/);

const productPath = "/shop/guatilla-excelso-f6-monserrate";
const productResponse = await request("published product page", productPath, 200);
const productHtml = await productResponse.text();
const candidateIds = [...new Set(productHtml.match(/[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/gi) ?? [])];
assert.ok(candidateIds.length >= 4, "product page did not expose its stable variant IDs");

const catalogLines = [];
for (const candidateId of candidateIds) {
  const response = await request(
    "cart resolves a public page identifier",
    "/api/catalog/cart",
    200,
    json({ items: [{ variantId: candidateId, quantity: 1 }] }),
  );
  const data = await response.json();
  catalogLines.push(...data.lines);
}
assert.equal(catalogLines.length, 4, "expected exactly four active variants");
assert.deepEqual(
  catalogLines.map((line) => line.priceOre).sort((a, b) => a - b),
  [18_000, 18_000, 29_900, 29_900],
);
assert.ok(catalogLines.every((line) => line.inStock));

const variantId = catalogLines[0].variantId;
const outOfStockAt99 = await request(
  "cart recalculates stock for requested quantity",
  "/api/catalog/cart",
  200,
  json({ items: [{ variantId, quantity: 99 }] }),
);
assert.equal((await outOfStockAt99.json()).lines[0].inStock, false);

await request("cart accepts an empty cart", "/api/catalog/cart", 200, json({ items: [] }));
await request("cart rejects an extra top-level field", "/api/catalog/cart", 400, json({ items: [], extra: true }));
await request("cart rejects malformed JSON", "/api/catalog/cart", 400, {
  method: "POST",
  body: "{",
  headers: { "Content-Type": "application/json" },
});
await request("cart rejects duplicate variants", "/api/catalog/cart", 400, json({
  items: [
    { variantId, quantity: 1 },
    { variantId, quantity: 2 },
  ],
}));
await request("cart rejects zero quantity", "/api/catalog/cart", 400, json({ items: [{ variantId, quantity: 0 }] }));
await request("cart rejects quantity over limit", "/api/catalog/cart", 400, json({ items: [{ variantId, quantity: 100 }] }));
await request("cart rejects unsupported GET", "/api/catalog/cart", 405);

await request("traceability requires a lot number", "/api/sporbarhet/lookup", 400);
const traceResponse = await request("traceability finds lot case-insensitively", "/api/sporbarhet/lookup?lot=kg-202601", 200);
const trace = await traceResponse.json();
assert.equal(trace.found, true);
assert.equal(trace.lot.lot_number, "KG-202601");
const unknownTrace = await request("traceability handles an unknown lot", "/api/sporbarhet/lookup?lot=DOES-NOT-EXIST", 200);
assert.equal((await unknownTrace.json()).found, false);

await request("waitlist rejects missing Origin", "/api/waitlist", 403, json({ email: "invalid" }));
await request("waitlist rejects a foreign Origin", "/api/waitlist", 403, {
  ...json({ email: "invalid" }),
  headers: { "Content-Type": "application/json", Origin: "https://example.invalid" },
});
await request("waitlist rejects malformed JSON", "/api/waitlist", 400, {
  method: "POST",
  body: "{",
  headers: { "Content-Type": "application/json", Origin: baseUrl.origin },
});
await request("waitlist rejects extra fields", "/api/waitlist", 400, sameOriginJson({ email: "nobody@example.invalid", extra: true }));
await request("waitlist rejects invalid email", "/api/waitlist", 400, sameOriginJson({ email: "invalid" }));

const fakeId = "11111111-1111-4111-8111-111111111111";
const orderBody = {
  items: [{ variantId: fakeId, quantity: 1 }],
  customer: {
    fullName: "Functional Test",
    email: "nobody@example.invalid",
    phone: "91234567",
    addressLine1: "Test 1",
    addressLine2: "",
    postalCode: "0150",
    city: "Oslo",
    countryCode: "NO",
  },
  locale: "no",
  note: "",
  clientRequestId: "22222222-2222-4222-8222-222222222222",
};
await request("order rejects missing Origin", "/api/orders", 403, json({}));
await request("order rejects a foreign Origin", "/api/orders", 403, {
  ...json({}),
  headers: { "Content-Type": "application/json", Origin: "https://example.invalid" },
});
await request("order rejects malformed JSON", "/api/orders", 400, {
  method: "POST",
  body: "{",
  headers: { "Content-Type": "application/json", Origin: baseUrl.origin },
});
await request("order requires a current catalog version", "/api/orders", 409, sameOriginJson(orderBody));

const anonymousAuth = await request("anonymous auth state", "/api/admin/auth", 200);
assert.equal((await anonymousAuth.json()).authenticated, false);
const adminRedirect = await request("anonymous admin page redirect", "/admin", 307);
assert.equal(adminRedirect.headers.get("location"), "/admin/login");
await request("anonymous admin catalog denied", "/api/admin/catalogo", 401);
await request("anonymous admin lot list denied", "/api/admin/sporbarhet/lots", 401);
await request("anonymous admin mutation denied", `/api/admin/pedidos/${fakeId}/notas`, 401, sameOriginJson({ note: "test" }));
await request("login rejects missing Origin", "/api/admin/auth", 403, json({ password: "wrong" }));
await request("login rejects a foreign Origin", "/api/admin/auth", 403, {
  ...json({ password: "wrong" }),
  headers: { "Content-Type": "application/json", Origin: "https://example.invalid" },
});
await request("login rejects malformed JSON", "/api/admin/auth", 400, {
  method: "POST",
  body: "{",
  headers: { "Content-Type": "application/json", Origin: baseUrl.origin },
});
await request("login rejects a wrong password", "/api/admin/auth", 401, sameOriginJson({ password: "definitely-wrong-functional-test" }));

const envText = await readFile(new URL("../.env.local", import.meta.url), "utf8").catch(() => "");
const passwordMatch = envText.match(/^SPORBARHET_ADMIN_PASSWORD\s*=\s*(.*)$/m);
if (passwordMatch) {
  const password = passwordMatch[1].trim().replace(/^(["'])(.*)\1$/, "$2");
  const login = await request("login accepts configured local password", "/api/admin/auth", 200, sameOriginJson({ password }));
  const setCookie = login.headers.get("set-cookie") ?? "";
  assert.match(setCookie, /HttpOnly/i);
  assert.match(setCookie, /SameSite=Lax/i);
  const cookie = setCookie.split(";", 1)[0];

  const authenticated = await request("authenticated admin state", "/api/admin/auth", 200, { headers: { Cookie: cookie } });
  assert.equal((await authenticated.json()).authenticated, true);

  const catalog = await request("authenticated catalog read", "/api/admin/catalogo", 200, { headers: { Cookie: cookie } });
  const catalogData = await catalog.json();
  assert.equal(catalogData.products.length, 1);
  assert.equal(catalogData.products.flatMap((product) => product.variants).length, 4);

  await request("catalog rejects unexpected category fields", "/api/admin/catalogo/categories", 400, {
    ...sameOriginJson({ name: "Test", slug: "test", active: true, unexpected: true }),
    headers: {
      "Content-Type": "application/json",
      Cookie: cookie,
      Origin: baseUrl.origin,
    },
  });
  await request("catalog rejects integer overflow", "/api/admin/catalogo/variants", 400, {
    ...sameOriginJson({
      productId: catalogData.products[0].id,
      sku: "TEST-NOT-SAVED",
      name: "Test",
      grind: null,
      weightGrams: 250,
      priceOre: 2_147_483_648,
      inventory: 0,
      active: false,
    }),
    headers: {
      "Content-Type": "application/json",
      Cookie: cookie,
      Origin: baseUrl.origin,
    },
  });

  const lots = await request("authenticated lot read", "/api/admin/sporbarhet/lots", 200, { headers: { Cookie: cookie } });
  assert.ok((await lots.json()).lots.some((lot) => lot.lot_number === "KG-202601"));

  for (const path of ["/admin", "/admin/catalogo", "/admin/sporbarhet", "/admin/pedidos", "/admin/pagos"]) {
    await request(`authenticated page ${path}`, path, 200, { headers: { Cookie: cookie } });
  }

  const logout = await request("logout", "/api/admin/auth", 200, {
    method: "DELETE",
    headers: { Cookie: cookie, Origin: baseUrl.origin },
  });
  assert.match(logout.headers.get("set-cookie") ?? "", /Max-Age=0/i);
} else {
  console.log("SKIP authenticated admin checks: no local admin password configured");
}

const security = await request("security headers", "/shop", 200);
assert.equal(security.headers.get("x-content-type-options"), "nosniff");
assert.equal(security.headers.get("x-frame-options"), "DENY");
assert.equal(security.headers.get("referrer-policy"), "strict-origin-when-cross-origin");

console.log(`HTTP smoke suite passed: ${passed} requests`);
