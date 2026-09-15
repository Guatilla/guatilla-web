import { NextRequest, NextResponse } from "next/server";
import { isAdminCommerceConflict, isDuplicatePaymentTransaction, verifyManualPayment } from "@/lib/adminCommerce";
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
  if (!body || typeof body !== "object") return NextResponse.json({ error: "Datos de pago no válidos." }, { status: 400 });
  const input = body as Record<string, unknown>;
  try {
    const result = await verifyManualPayment(id, {
      receivedAmountNok: input.receivedAmountNok,
      paidAt: input.paidAt,
      providerTransactionId: input.providerTransactionId,
      verificationSource: input.verificationSource,
      note: input.note,
    });
    return NextResponse.json({ success: true, status: result.status });
  } catch (error) {
    if (isDuplicatePaymentTransaction(error)) return NextResponse.json({ error: "Ese ID de transacción Vipps ya está registrado." }, { status: 409 });
    if (isAdminCommerceConflict(error)) {
      return NextResponse.json(
        {
          error: error.code === "NOT_FOUND" ? "Pago no encontrado." : error.message,
          code: error.code,
        },
        { status: error.code === "NOT_FOUND" ? 404 : 400 },
      );
    }
    return NextResponse.json({ error: "No se pudo verificar el pago." }, { status: 500 });
  }
}
