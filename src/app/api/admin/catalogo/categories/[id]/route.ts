import { NextRequest, NextResponse } from "next/server";
import {
  isMissingRecordError,
  isUniqueConstraintError,
  updateCategory,
} from "@/lib/catalog";
import { isUuid, validateCategoryInput } from "@/lib/catalogValidation";
import { requireAdminMutation } from "@/lib/requireAdmin";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const unauthorized = requireAdminMutation(request);
  if (unauthorized) return unauthorized;

  const { id } = await params;
  if (!isUuid(id)) {
    return NextResponse.json({ error: "Categoría no válida." }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Solicitud no válida." }, { status: 400 });
  }
  const parsed = validateCategoryInput(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  try {
    await updateCategory(id, parsed.data);
    return NextResponse.json({ success: true });
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      return NextResponse.json(
        { error: "Ya existe una categoría con ese slug." },
        { status: 409 },
      );
    }
    if (isMissingRecordError(error)) {
      return NextResponse.json(
        { error: "La categoría ya no existe." },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { error: "No se pudo actualizar la categoría." },
      { status: 500 },
    );
  }
}
