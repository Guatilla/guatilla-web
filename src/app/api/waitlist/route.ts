import { Resend } from "resend";
import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "E-postadresse må fylles ut" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Ugyldig e-postadresse" },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();

    if (supabase) {
      const { data: existing, error: fetchError } = await supabase
        .from("waitlist")
        .select("id")
        .eq("email", email)
        .single();

      if (fetchError && fetchError.code !== "PGRST116") {
        throw fetchError;
      }

      if (existing) {
        await sendConfirmationEmail(email);
        return NextResponse.json(
          { alreadyJoined: true },
          { status: 200 }
        );
      }

      const { error: insertError } = await supabase
        .from("waitlist")
        .insert({ email, source: "project-progress" });

      if (insertError) {
        if (insertError.code === "23505") {
          await sendConfirmationEmail(email);
          return NextResponse.json(
            { alreadyJoined: true },
            { status: 200 }
          );
        }
        throw insertError;
      }
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
