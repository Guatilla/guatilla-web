import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { requireAdmin } from "@/lib/requireAdmin";
import type { CoffeeLotInput } from "@/types/coffeeLot";

export const dynamic = "force-dynamic";

interface RouteParams {
  params: Promise<{ id: string }>;
}

/** PATCH → oppdaterer ett eller flere felt på et parti (også aktiver/deaktiver). Admin only. */
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  const { id } = await params;

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: "Ikke konfigurert" }, { status: 503 });
  }

  let body: Partial<CoffeeLotInput>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ugyldig forespørsel" }, { status: 400 });
  }

  if (typeof body.lot_number === "string" && !body.lot_number.trim()) {
    return NextResponse.json({ error: "Lotnummer kan ikke være tomt" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("coffee_lots")
    .update(body)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ error: "Lotnummeret er allerede i bruk." }, { status: 409 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ lot: data });
}
