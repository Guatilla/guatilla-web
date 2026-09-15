import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { getPrisma } from "@/lib/prisma";
import { requireSameOrigin } from "@/lib/requireAdmin";

export const dynamic = "force-dynamic";

const CONFIRMATION_HTML = `
  <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; color: #2c1e16;">
    <h1 style="font-size: 24px; margin-bottom: 16px;">Velkommen til ventelisten!</h1>
    <p style="font-size: 16px; line-height: 1.6; color: #5c4a3d;">
      Takk for at du har meldt deg p&aring; ventelisten til <strong>Kaffe Guatilla</strong>.
      Du blir blant de f&oslash;rste som f&aring;r beskjed n&aring;r v&aring;rt f&oslash;rste parti med spesialkaffe fra Serran&iacute;a del Perij&aacute; er klart for levering.
    </p>
    <p style="font-size: 16px; line-height: 1.6; color: #5c4a3d; margin-top: 16px;">
      Vi holder deg oppdatert om fremdriften og lanseringen.
    </p>
    <p style="font-size: 14px; color: #8c7a6d; margin-top: 32px;">
      Hilsen oss i<br />
      Kaffe Guatilla
    </p>
  </div>
`;

async function sendConfirmationEmail(email: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const resend = new Resend(apiKey);
  try {
    await resend.emails.send({
      from: "Kaffe Guatilla <onboarding@resend.dev>",
      to: email,
      subject: "Du står på ventelisten",
      html: CONFIRMATION_HTML,
    });
  } catch {
    void 0;
  }
}

export async function POST(request: NextRequest) {
  const invalidOrigin = requireSameOrigin(request);
  if (invalidOrigin) return invalidOrigin;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  try {
    if (
      !body ||
      typeof body !== "object" ||
      Array.isArray(body) ||
      Object.keys(body).some((key) => key !== "email")
    ) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const rawEmail = (body as { email?: unknown }).email;

    if (typeof rawEmail !== "string" || !rawEmail.trim()) {
      return NextResponse.json(
        { error: "E-postadresse må fylles ut" },
        { status: 400 }
      );
    }

    const email = rawEmail.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.length > 254 || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Ugyldig e-postadresse" },
        { status: 400 }
      );
    }

    try {
      const prisma = await getPrisma();
      await prisma.waitlist.create({
        data: { email, source: "project-progress" },
      });
    } catch (error) {
      const alreadyJoined =
        error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002";
      if (!alreadyJoined) throw error;

      return NextResponse.json({ alreadyJoined: true }, { status: 200 });
    }

    await sendConfirmationEmail(email);

    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Kunne ikke melde deg på ventelisten. Prøv igjen." },
      { status: 500 }
    );
  }
}
