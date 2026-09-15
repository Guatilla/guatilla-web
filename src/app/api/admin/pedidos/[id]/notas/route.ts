import { NextRequest, NextResponse } from "next/server";
import { addInternalOrderNote, isAdminCommerceConflict } from "@/lib/adminCommerce";
import { isUuid } from "@/lib/catalogValidation";
import { requireAdminMutation } from "@/lib/requireAdmin";

interface RouteParams { params: Promise<{ id: string }> }

export async function POST(request: NextRequest, { params }: RouteParams) {
  const unauthorized = requireAdminMutation(request);
  if (unauthorized) return unauthorized;
  const { id } = await params;
  if (!isUuid(id)) return NextResponse.json({ error: "Pedido no válido." }, { status: 400 });
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Solicitud no válida." }, { status: 400 }); }
  const note = body && typeof body === "object" && "note" in body ? (body as { note?: unknown }).note : null;
  try {
    await addInternalOrderNote(id, note);
    return NextResponse.json({ success: true });
  } catch (error) {
    if (isAdminCommerceConflict(error)) return NextResponse.json({ error: "La nota no es válida." }, { status: 400 });
    return NextResponse.json({ error: "No se pudo guardar la nota." }, { status: 500 });
  }
}
