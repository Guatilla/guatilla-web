import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { requireSameOrigin } from "@/lib/requireAdmin";
import { notifyOwnerOfSporbarhetFeedback } from "@/lib/sporbarhetNotifications";

export const dynamic = "force-dynamic";

const LOT_NUMBER = "KG-202601";
const ROAST_REFERENCE = "202601-P02";
const PREPARATION_METHODS = new Set(["filter", "presskanne", "espresso", "aeropress", "mokkakanne", "annet"]);
const ALLOWED_KEYS = new Set([
  "lotNumber",
  "roastReference",
  "packagingDesign",
  "coffeeQuality",
  "preparationMethod",
  "coffeeComments",
  "coffeeWishes",
  "packagingComments",
  "pageComments",
  "norwegianCorrections",
  "notifyConsent",
  "contactEmail",
]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function optionalText(value: unknown, maxLength: number): string | null {
  if (value === null || value === undefined || value === "") return null;
  if (typeof value !== "string") throw new Error("INVALID_TEXT");
  const normalized = value.trim();
  if (!normalized) return null;
  if (normalized.length > maxLength) throw new Error("TEXT_TOO_LONG");
  return normalized;
}

export async function POST(request: NextRequest) {
  const invalidOrigin = requireSameOrigin(request);
  if (invalidOrigin) return invalidOrigin;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ugyldig forespørsel." }, { status: 400 });
  }

  if (!isRecord(body) || Object.keys(body).some((key) => !ALLOWED_KEYS.has(key))) {
    return NextResponse.json({ error: "Ugyldig forespørsel." }, { status: 400 });
  }

  if (body.lotNumber !== LOT_NUMBER || body.roastReference !== ROAST_REFERENCE) {
    return NextResponse.json({ error: "Tilbakemeldingen gjelder ikke dette partiet." }, { status: 400 });
  }

  if (!Number.isInteger(body.packagingDesign) || Number(body.packagingDesign) < 1 || Number(body.packagingDesign) > 6) {
    return NextResponse.json({ error: "Velg ett emballasjeforslag." }, { status: 400 });
  }

  if (!Number.isInteger(body.coffeeQuality) || Number(body.coffeeQuality) < 1 || Number(body.coffeeQuality) > 5) {
    return NextResponse.json({ error: "Gi kaffen en vurdering fra 1 til 5." }, { status: 400 });
  }

  if (typeof body.preparationMethod !== "string" || !PREPARATION_METHODS.has(body.preparationMethod)) {
    return NextResponse.json({ error: "Velg hvordan du laget kaffen." }, { status: 400 });
  }

  if (typeof body.notifyConsent !== "boolean") {
    return NextResponse.json({ error: "Ugyldig samtykke." }, { status: 400 });
  }

  let contactEmail: string | null = null;
  if (body.notifyConsent) {
    if (typeof body.contactEmail !== "string") {
      return NextResponse.json({ error: "Fyll inn e-postadressen din." }, { status: 400 });
    }
    contactEmail = body.contactEmail.trim().toLowerCase();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!contactEmail || contactEmail.length > 254 || !emailPattern.test(contactEmail)) {
      return NextResponse.json({ error: "Skriv inn en gyldig e-postadresse." }, { status: 400 });
    }
  } else if (body.contactEmail !== null && body.contactEmail !== undefined && body.contactEmail !== "") {
    return NextResponse.json({ error: "E-post krever eget samtykke." }, { status: 400 });
  }

  let optionalFields: {
    coffeeComments: string | null;
    coffeeWishes: string | null;
    packagingComments: string | null;
    pageComments: string | null;
    norwegianCorrections: string | null;
  };

  try {
    optionalFields = {
      coffeeComments: optionalText(body.coffeeComments, 1000),
      coffeeWishes: optionalText(body.coffeeWishes, 600),
      packagingComments: optionalText(body.packagingComments, 1000),
      pageComments: optionalText(body.pageComments, 1000),
      norwegianCorrections: optionalText(body.norwegianCorrections, 1000),
    };
  } catch {
    return NextResponse.json({ error: "En av tekstene er for lang eller ugyldig." }, { status: 400 });
  }

  try {
    const prisma = await getPrisma();
    const lot = await prisma.coffeeLot.findFirst({
      where: { lotNumber: LOT_NUMBER, active: true },
      select: { id: true },
    });

    if (!lot) {
      return NextResponse.json({ error: "Partiet er ikke tilgjengelig." }, { status: 404 });
    }

    const feedback = await prisma.lotFeedback.create({
      data: {
        coffeeLotId: lot.id,
        roastReference: ROAST_REFERENCE,
        packagingDesign: Number(body.packagingDesign),
        coffeeQuality: Number(body.coffeeQuality),
        preparationMethod: body.preparationMethod,
        ...optionalFields,
        notifyConsent: body.notifyConsent,
        contactEmail,
      },
      select: { id: true, createdAt: true },
    });

    try {
      await notifyOwnerOfSporbarhetFeedback(feedback.id, {
        lotNumber: LOT_NUMBER,
        roastReference: ROAST_REFERENCE,
        createdAt: feedback.createdAt,
        packagingDesign: Number(body.packagingDesign),
        coffeeQuality: Number(body.coffeeQuality),
        preparationMethod: body.preparationMethod,
        ...optionalFields,
        notifyConsent: body.notifyConsent,
        contactEmail,
      });
    } catch {
      // The feedback is already saved; notification failures must not lose it.
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Kunne ikke lagre svaret. Prøv igjen." }, { status: 500 });
  }
}
