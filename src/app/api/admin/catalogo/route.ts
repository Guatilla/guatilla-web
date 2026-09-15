import { NextRequest, NextResponse } from "next/server";
import { getAdminCatalog } from "@/lib/catalog";
import { requireAdmin } from "@/lib/requireAdmin";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    return NextResponse.json(await getAdminCatalog());
  } catch {
    return NextResponse.json(
      { error: "No se pudo consultar el catálogo." },
      { status: 503 },
    );
  }
}
