import { NextRequest, NextResponse } from "next/server";
import { isAdminCommerceConflict, markManualPaymentRequested } from "@/lib/adminCommerce";
import { isUuid } from "@/lib/catalogValidation";
import { requireAdminMutation } from "@/lib/requireAdmin";

interface RouteParams { params: Promise<{ id: string }> }

export async function POST(request: NextRequest, { params }: RouteParams) {
  const unauthorized = requireAdminMutation(request);
  if (unauthorized) return unauthorized;
  const { id } = await params;
  if (!isUuid(id)) return NextResponse.json({ error: "Pago no válido." }, { status: 400 });

  try {
    const result = await markManualPaymentRequested(id);
    return NextResponse.json({ success: true, status: result.status });
  } catch (error) {
    if (isAdminCommerceConflict(error)) {
      return NextResponse.json(
        { error: error.code === "NOT_FOUND" ? "Pago no encontrado." : "La solicitud Vipps no se puede registrar en este estado." },
        { status: error.code === "NOT_FOUND" ? 404 : 409 },
      );
    }
    return NextResponse.json({ error: "No se pudo registrar la solicitud Vipps." }, { status: 500 });
  }
}
