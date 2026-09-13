import { NextRequest, NextResponse } from "next/server";
import {
  SPORBARHET_COOKIE,
  SESSION_MAX_AGE_SECONDS,
  checkAdminPassword,
  createSessionToken,
  verifySessionToken,
} from "@/lib/sporbarhetAuth";

export const dynamic = "force-dynamic";

/** POST { password } → setter sesjonscookie hvis passordet stemmer. */
export async function POST(request: NextRequest) {
  let password: unknown;
  try {
    const body = await request.json();
    password = body?.password;
  } catch {
    return NextResponse.json({ error: "Ugyldig forespørsel" }, { status: 400 });
  }

  if (typeof password !== "string" || !password) {
    return NextResponse.json({ error: "Passord mangler" }, { status: 400 });
  }

  if (!process.env.SPORBARHET_ADMIN_PASSWORD || !process.env.SPORBARHET_SESSION_SECRET) {
    return NextResponse.json(
      { error: "Administratorinnlogging er ikke konfigurert på serveren ennå." },
      { status: 503 }
    );
  }

  if (!checkAdminPassword(password)) {
    return NextResponse.json({ error: "Feil passord" }, { status: 401 });
  }

  const token = createSessionToken();
  if (!token) {
    return NextResponse.json({ error: "Kunne ikke opprette sesjon" }, { status: 500 });
  }

  const res = NextResponse.json({ success: true });
  res.cookies.set(SPORBARHET_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
  return res;
}

/** GET → sjekker om nåværende cookie fortsatt er gyldig. */
export async function GET(request: NextRequest) {
  const token = request.cookies.get(SPORBARHET_COOKIE)?.value;
  return NextResponse.json({ authenticated: verifySessionToken(token) });
}

/** DELETE → logger ut (fjerner cookien). */
export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.set(SPORBARHET_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
