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

export function requireSameOrigin(request: NextRequest): NextResponse | null {
  const origin = request.headers.get("origin");
  if (!origin) {
    return NextResponse.json({ error: "Origen no permitido" }, { status: 403 });
  }

  const forwardedHost = request.headers.get("x-forwarded-host");
  const forwardedProto = request.headers.get("x-forwarded-proto") ?? request.nextUrl.protocol.replace(":", "");
  const expectedOrigins = new Set([request.nextUrl.origin]);
  if (forwardedHost) expectedOrigins.add(`${forwardedProto}://${forwardedHost}`);

  try {
    if (!expectedOrigins.has(new URL(origin).origin)) {
      return NextResponse.json({ error: "Origen no permitido" }, { status: 403 });
    }
  } catch {
    return NextResponse.json({ error: "Origen no permitido" }, { status: 403 });
  }
  return null;
}

export function requireAdminMutation(request: NextRequest): NextResponse | null {
  return requireAdmin(request) ?? requireSameOrigin(request);
}
