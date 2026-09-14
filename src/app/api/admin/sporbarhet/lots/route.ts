import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { requireAdmin } from "@/lib/requireAdmin";
import type { CoffeeLotInput } from "@/types/coffeeLot";

export const dynamic = "force-dynamic";

/** GET → lister alle partier (aktive og deaktiverte), nyeste først. Kun for administratorer. */
export async function GET(request: NextRequest) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: "Ikke konfigurert" }, { status: 503 });
  }

  const { data, error } = await supabase
    .from("coffee_lots")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: "Kunne ikke hente kaffepartiene." }, { status: 500 });
  }
  return NextResponse.json({ lots: data ?? [] });
}

/** POST → oppretter et nytt parti. Kun for administratorer. */
export async function POST(request: NextRequest) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

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

  const lotNumber = body.lot_number?.trim();
  if (!lotNumber) {
    return NextResponse.json({ error: "Partinummer må fylles ut" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("coffee_lots")
    .insert({ ...body, lot_number: lotNumber })
    .select("*")
    .single();

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        { error: `Partinummeret «${lotNumber}» finnes allerede.` },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: "Kunne ikke opprette kaffepartiet." }, { status: 500 });
  }

  return NextResponse.json({ lot: data }, { status: 201 });
}
