import { NextRequest, NextResponse } from "next/server";
import {
  isMissingRecordError,
  isUniqueConstraintError,
  updateProduct,
} from "@/lib/catalog";
import { isUuid, validateProductInput } from "@/lib/catalogValidation";
import { requireAdminMutation } from "@/lib/requireAdmin";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const unauthorized = requireAdminMutation(request);
  if (unauthorized) return unauthorized;

  const { id } = await params;
  if (!isUuid(id)) {
    return NextResponse.json({ error: "Producto no válido." }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Solicitud no válida." }, { status: 400 });
  }
  const parsed = validateProductInput(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  try {
    await updateProduct(id, parsed.data);
    return NextResponse.json({ success: true });
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      return NextResponse.json(
        { error: "Ya existe un producto con ese slug." },
        { status: 409 },
      );
    }
    if (isMissingRecordError(error)) {
      return NextResponse.json(
        { error: "El producto o la categoría ya no existe." },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { error: "No se pudo actualizar el producto." },
      { status: 500 },
    );
  }
}
