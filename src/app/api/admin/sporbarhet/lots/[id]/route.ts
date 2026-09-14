import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { getPrisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/requireAdmin";
import { deserializeCoffeeLotInput, serializeCoffeeLot } from "@/lib/coffeeLotSerializer";
import type { CoffeeLotInput } from "@/types/coffeeLot";

export const dynamic = "force-dynamic";

interface RouteParams {
  params: Promise<{ id: string }>;
}

function isUniqueViolation(error: unknown): boolean {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002";
}

/** PATCH → oppdaterer ett eller flere felt på et parti (også aktiver/deaktiver). Kun for administratorer. */
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  const { id } = await params;

  let body: Partial<CoffeeLotInput>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ugyldig forespørsel" }, { status: 400 });
  }

  if (typeof body.lot_number === "string" && !body.lot_number.trim()) {
    return NextResponse.json({ error: "Partinummer kan ikke være tomt" }, { status: 400 });
  }

  try {
    const prisma = await getPrisma();
    const updated = await prisma.coffeeLot.update({
      where: { id },
      data: deserializeCoffeeLotInput(body),
    });
    return NextResponse.json({ lot: serializeCoffeeLot(updated) });
  } catch (error) {
    if (isUniqueViolation(error)) {
      return NextResponse.json({ error: "Partinummeret er allerede i bruk." }, { status: 409 });
    }
    return NextResponse.json({ error: "Kunne ikke oppdatere kaffepartiet." }, { status: 500 });
  }
}
