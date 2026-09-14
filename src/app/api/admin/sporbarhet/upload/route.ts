import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { getGcsBucket } from "@/lib/gcs";
import { requireAdmin } from "@/lib/requireAdmin";

export const dynamic = "force-dynamic";

const MAX_BYTES = 10 * 1024 * 1024; // 10 MB
const ALLOWED = new Set(["image/png", "image/jpeg", "image/webp", "image/gif"]);

/** POST multipart/form-data { file } → laster opp ett bilde og returnerer { id, url }. Kun for administratorer. */
export async function POST(request: NextRequest) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  const bucket = getGcsBucket();
  if (!bucket) {
    return NextResponse.json({ error: "Ikke konfigurert" }, { status: 503 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Ugyldig forespørsel" }, { status: 400 });
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Ingen fil mottatt" }, { status: 400 });
  }
  if (!ALLOWED.has(file.type)) {
    return NextResponse.json(
      { error: "Ugyldig filtype. Bruk PNG, JPEG, WEBP eller GIF." },
      { status: 400 }
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Filen er for stor (maks 10 MB)." }, { status: 400 });
  }

  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const id = randomUUID();
  const path = `lots/${id}.${ext}`;

  try {
    await bucket.file(path).save(Buffer.from(await file.arrayBuffer()), {
      contentType: file.type,
      resumable: false,
    });
  } catch {
    return NextResponse.json({ error: "Kunne ikke laste opp bildet." }, { status: 500 });
  }

  const url = `https://storage.googleapis.com/${bucket.name}/${path}`;

  return NextResponse.json({ id, url }, { status: 201 });
}
