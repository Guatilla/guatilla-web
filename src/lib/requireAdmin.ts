import { NextRequest, NextResponse } from "next/server";
import { SPORBARHET_COOKIE, verifySessionToken } from "@/lib/sporbarhetAuth";

/** Returnerer en 401-respons hvis forespørselen ikke har en gyldig admin-sesjon, ellers null. */
export function requireAdmin(request: NextRequest): NextResponse | null {
  const token = request.cookies.get(SPORBARHET_COOKIE)?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: "Ikke innlogget" }, { status: 401 });
  }
  return null;
}
