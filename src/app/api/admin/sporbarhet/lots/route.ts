import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { getPrisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/requireAdmin";
import { deserializeCoffeeLotInput, serializeCoffeeLot } from "@/lib/coffeeLotSerializer";
import type { CoffeeLotInput } from "@/types/coffeeLot";

export const dynamic = "force-dynamic";

function isUniqueViolation(error: unknown): boolean {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002";
}

/** GET → lister alle partier (aktive og deaktiverte), nyeste først. Kun for administratorer. */
export async function GET(request: NextRequest) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const prisma = await getPrisma();
    const lots = await prisma.coffeeLot.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json({ lots: lots.map(serializeCoffeeLot) });
  } catch {
    return NextResponse.json({ error: "Kunne ikke hente kaffepartiene." }, { status: 500 });
  }
}

/** POST → oppretter et nytt parti. Kun for administratorer. */
export async function POST(request: NextRequest) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  let body: Partial<CoffeeLotInput>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ugyldig forespørsel" }, { status: 400 });
  }

  const lotNumber = body.lot_number?.trim();
  if (!lotNumber) {
    return NextResponse.json({ error: "Partinummer må fylles ut" }, { status: 400 });
  }

  try {
    const prisma = await getPrisma();
    const created = await prisma.coffeeLot.create({
      data: deserializeCoffeeLotInput({ ...body, lot_number: lotNumber }),
    });
    return NextResponse.json({ lot: serializeCoffeeLot(created) }, { status: 201 });
  } catch (error) {
    if (isUniqueViolation(error)) {
      return NextResponse.json(
        { error: `Partinummeret «${lotNumber}» finnes allerede.` },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: "Kunne ikke opprette kaffepartiet." }, { status: 500 });
  }
}
