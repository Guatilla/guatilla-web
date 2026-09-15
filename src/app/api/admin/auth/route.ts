import { NextRequest, NextResponse } from "next/server";
import {
  SPORBARHET_COOKIE,
  SESSION_MAX_AGE_SECONDS,
  checkAdminPassword,
  createSessionToken,
  verifySessionToken,
} from "@/lib/sporbarhetAuth";
import { requireSameOrigin } from "@/lib/requireAdmin";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const invalidOrigin = requireSameOrigin(request);
  if (invalidOrigin) return invalidOrigin;

  let password: unknown;
  try {
    const body = await request.json();
    password = body?.password;
  } catch {
    return NextResponse.json({ error: "Solicitud no válida." }, { status: 400 });
  }

  if (typeof password !== "string" || !password) {
    return NextResponse.json({ error: "Falta la contraseña." }, { status: 400 });
  }

  if (
    !process.env.SPORBARHET_ADMIN_PASSWORD ||
    !process.env.SPORBARHET_SESSION_SECRET
  ) {
    return NextResponse.json(
      { error: "El acceso administrativo no está configurado en el servidor." },
      { status: 503 },
    );
  }

  if (!checkAdminPassword(password)) {
    return NextResponse.json({ error: "Contraseña incorrecta." }, { status: 401 });
  }

  const token = createSessionToken();
  if (!token) {
    return NextResponse.json(
      { error: "No se pudo crear la sesión." },
      { status: 500 },
    );
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(SPORBARHET_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
  return response;
}

export async function GET(request: NextRequest) {
  const token = request.cookies.get(SPORBARHET_COOKIE)?.value;
  return NextResponse.json({ authenticated: verifySessionToken(token) });
}

export async function DELETE(request: NextRequest) {
  const invalidOrigin = requireSameOrigin(request);
  if (invalidOrigin) return invalidOrigin;

  const response = NextResponse.json({ success: true });
  response.cookies.set(SPORBARHET_COOKIE, "", { path: "/", maxAge: 0 });
  return response;
}
