import { NextRequest, NextResponse } from "next/server";
import { isAdminCommerceConflict, transitionAdminOrder } from "@/lib/adminCommerce";
import type { OrderAction } from "@/lib/commerceRules";
import { isUuid } from "@/lib/catalogValidation";
import { requireAdminMutation } from "@/lib/requireAdmin";

interface RouteParams { params: Promise<{ id: string }> }
const ACTIONS = new Set<OrderAction>(["CANCEL", "PREPARE", "SHIP", "DELIVER", "COMPLETE"]);

export async function POST(request: NextRequest, { params }: RouteParams) {
  const unauthorized = requireAdminMutation(request);
  if (unauthorized) return unauthorized;
  const { id } = await params;
  if (!isUuid(id)) return NextResponse.json({ error: "Pedido no válido." }, { status: 400 });
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Solicitud no válida." }, { status: 400 }); }
  const action = body && typeof body === "object" && "action" in body ? (body as { action?: unknown }).action : null;
  if (typeof action !== "string" || !ACTIONS.has(action as OrderAction)) {
    return NextResponse.json({ error: "Transición no válida." }, { status: 400 });
  }
  try {
    await transitionAdminOrder(id, action as OrderAction);
    return NextResponse.json({ success: true });
  } catch (error) {
    if (isAdminCommerceConflict(error)) {
      return NextResponse.json({ error: error.code === "NOT_FOUND" ? "Pedido no encontrado." : "La transición no está permitida." }, { status: error.code === "NOT_FOUND" ? 404 : 409 });
    }
    return NextResponse.json({ error: "No se pudo actualizar el pedido." }, { status: 500 });
  }
}
