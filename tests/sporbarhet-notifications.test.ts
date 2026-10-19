import test from "node:test";
import assert from "node:assert/strict";

import {
  buildSporbarhetFeedbackEmail,
  buildSporbarhetVisitEmail,
} from "../src/lib/sporbarhetNotificationContent.ts";

test("traceability visit notification identifies the lot without visitor data", () => {
  const email = buildSporbarhetVisitEmail(
    "KG-202601",
    new Date("2026-10-19T12:00:00Z"),
    "https://www.guatilla.no/sporbarhet",
  );

  assert.match(email.subject, /KG-202601/);
  assert.match(email.text, /Alguien abrió/);
  assert.doesNotMatch(email.text, /IP|user-agent|correo/i);
});

test("traceability feedback notification includes comments and escapes HTML", () => {
  const email = buildSporbarhetFeedbackEmail(
    {
      lotNumber: "KG-202601",
      roastReference: "202601-P02",
      createdAt: new Date("2026-10-19T12:00:00Z"),
      packagingDesign: 4,
      coffeeQuality: 5,
      preparationMethod: "filter",
      coffeeComments: "Muy bueno <script>alert(1)</script>",
      coffeeWishes: null,
      packagingComments: "Me gusta el color",
      pageComments: null,
      norwegianCorrections: null,
      notifyConsent: true,
      contactEmail: "visitor@example.com",
    },
    "https://www.guatilla.no/sporbarhet",
  );

  assert.match(email.subject, /café 5\/5/);
  assert.match(email.text, /propuesta 4/);
  assert.match(email.text, /visitor@example\.com/);
  assert.match(email.html, /Muy bueno &lt;script&gt;alert\(1\)&lt;\/script&gt;/);
  assert.doesNotMatch(email.html, /<script>/);
});
