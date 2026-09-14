import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { serializeCoffeeLot } from "@/lib/coffeeLotSerializer";

export const dynamic = "force-dynamic";

/** GET /api/sporbarhet/lookup?lot=KG-261015-01 — offentlig oppslag på lotnummer. */
export async function GET(request: NextRequest) {
  const lot = request.nextUrl.searchParams.get("lot")?.trim();

  if (!lot) {
    return NextResponse.json({ error: "Partinummer mangler" }, { status: 400 });
  }

  try {
    const prisma = await getPrisma();
    const found = await prisma.coffeeLot.findFirst({
      where: { active: true, lotNumber: { equals: lot, mode: "insensitive" } },
    });

    if (!found) {
      return NextResponse.json({ found: false });
    }

    return NextResponse.json({ found: true, lot: serializeCoffeeLot(found) });
  } catch {
    return NextResponse.json({ error: "Kunne ikke slå opp partinummeret." }, { status: 500 });
  }
}
