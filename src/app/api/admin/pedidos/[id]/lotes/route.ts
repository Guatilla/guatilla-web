import { NextRequest, NextResponse } from "next/server";
import { assignOrderItemLot, isAdminCommerceConflict } from "@/lib/adminCommerce";
import { isUuid } from "@/lib/catalogValidation";
import { requireAdminMutation } from "@/lib/requireAdmin";
import { DATABASE_INT_MAX } from "@/lib/numericLimits";

interface RouteParams { params: Promise<{ id: string }> }

export async function POST(request: NextRequest, { params }: RouteParams) {
  const unauthorized = requireAdminMutation(request);
  if (unauthorized) return unauthorized;
  const { id } = await params;
  if (!isUuid(id)) return NextResponse.json({ error: "Pedido no válido." }, { status: 400 });
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Solicitud no válida." }, { status: 400 }); }
  if (!body || typeof body !== "object") return NextResponse.json({ error: "Asignación no válida." }, { status: 400 });
  const input = body as Record<string, unknown>;
  const weight = input.allocatedWeightGrams;
  if (
    typeof input.orderItemId !== "string" || !isUuid(input.orderItemId) ||
    typeof input.coffeeLotId !== "string" || !isUuid(input.coffeeLotId) ||
    !Number.isSafeInteger(input.quantity) || Number(input.quantity) < 1 ||
    !(weight === null || weight === undefined || (Number.isSafeInteger(weight) && Number(weight) > 0 && Number(weight) <= DATABASE_INT_MAX))
  ) return NextResponse.json({ error: "Asignación no válida." }, { status: 400 });
  try {
    await assignOrderItemLot(id, {
      orderItemId: input.orderItemId,
      coffeeLotId: input.coffeeLotId,
      quantity: Number(input.quantity),
      allocatedWeightGrams: weight === null || weight === undefined ? null : Number(weight),
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    if (isAdminCommerceConflict(error)) return NextResponse.json({ error: error.code === "NOT_FOUND" ? "Pedido, artículo o lote no encontrado." : "La asignación supera la cantidad comprada o el pedido ya fue enviado." }, { status: error.code === "NOT_FOUND" ? 404 : 409 });
    return NextResponse.json({ error: "No se pudo asignar el lote." }, { status: 500 });
  }
}
