import { NextRequest, NextResponse } from "next/server";
import { isAdminCommerceConflict, setManualPaymentException } from "@/lib/adminCommerce";
import { isUuid } from "@/lib/catalogValidation";
import { requireAdminMutation } from "@/lib/requireAdmin";

interface RouteParams { params: Promise<{ id: string }> }

export async function POST(request: NextRequest, { params }: RouteParams) {
  const unauthorized = requireAdminMutation(request);
  if (unauthorized) return unauthorized;
  const { id } = await params;
  if (!isUuid(id)) return NextResponse.json({ error: "Pago no válido." }, { status: 400 });
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Solicitud no válida." }, { status: 400 }); }
  const input = body && typeof body === "object" ? body as Record<string, unknown> : {};
  if (input.status !== "FAILED" && input.status !== "REFUNDED") return NextResponse.json({ error: "Estado no permitido." }, { status: 400 });
  try {
    await setManualPaymentException(id, input.status, input.note);
    return NextResponse.json({ success: true });
  } catch (error) {
    if (isAdminCommerceConflict(error)) return NextResponse.json({ error: error.code === "NOT_FOUND" ? "Pago no encontrado." : "La transición del pago no está permitida." }, { status: error.code === "NOT_FOUND" ? 404 : 409 });
    return NextResponse.json({ error: "No se pudo actualizar el pago." }, { status: 500 });
  }
}
