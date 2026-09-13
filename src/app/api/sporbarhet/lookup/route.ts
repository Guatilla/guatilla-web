import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

/** GET /api/sporbarhet/lookup?lot=KG-261015-01 — offentlig oppslag på lotnummer. */
export async function GET(request: NextRequest) {
  const lot = request.nextUrl.searchParams.get("lot")?.trim();

  if (!lot) {
    return NextResponse.json({ error: "Partinummer mangler" }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      { error: "Sporbarhet er ikke konfigurert på serveren ennå." },
      { status: 503 }
    );
  }

  const { data, error } = await supabase
    .from("coffee_lots")
    .select("*")
    .ilike("lot_number", lot)
    .eq("active", true)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: "Kunne ikke slå opp partinummeret." }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ found: false });
  }

  return NextResponse.json({ found: true, lot: data });
}
