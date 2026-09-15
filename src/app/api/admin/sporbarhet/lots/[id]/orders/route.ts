import { NextRequest, NextResponse } from "next/server";
import { getLotOrderAllocations } from "@/lib/adminCommerce";
import { isUuid } from "@/lib/catalogValidation";
import { requireAdmin } from "@/lib/requireAdmin";

interface RouteParams { params: Promise<{ id: string }> }

export async function GET(request: NextRequest, { params }: RouteParams) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;
  const { id } = await params;
  if (!isUuid(id)) return NextResponse.json({ error: "Lote no válido." }, { status: 400 });
  try {
    return NextResponse.json({ allocations: await getLotOrderAllocations(id) });
  } catch {
    return NextResponse.json({ error: "No se pudieron consultar las asignaciones." }, { status: 500 });
  }
}
