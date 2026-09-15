import { NextRequest, NextResponse } from "next/server";
import {
  createProductVariant,
  isMissingRecordError,
  isUniqueConstraintError,
} from "@/lib/catalog";
import { validateProductVariantInput } from "@/lib/catalogValidation";
import { requireAdminMutation } from "@/lib/requireAdmin";

export async function POST(request: NextRequest) {
  const unauthorized = requireAdminMutation(request);
  if (unauthorized) return unauthorized;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Solicitud no válida." }, { status: 400 });
  }
  const parsed = validateProductVariantInput(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  try {
    await createProductVariant(parsed.data);
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      return NextResponse.json(
        { error: "Ya existe una variante con ese SKU." },
        { status: 409 },
      );
    }
    if (isMissingRecordError(error)) {
      return NextResponse.json(
        { error: "El producto seleccionado no existe." },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { error: "No se pudo crear la variante." },
      { status: 500 },
    );
  }
}
