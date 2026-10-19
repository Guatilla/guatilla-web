import { NextRequest, NextResponse } from "next/server";
import { requireSameOrigin } from "@/lib/requireAdmin";
import { notifyOwnerOfSporbarhetVisit } from "@/lib/sporbarhetNotifications";

export const dynamic = "force-dynamic";

const LOT_NUMBER = "KG-202601";
const EVENT_ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function POST(request: NextRequest) {
  const invalidOrigin = requireSameOrigin(request);
  if (invalidOrigin) return invalidOrigin;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (
    !body ||
    typeof body !== "object" ||
    Array.isArray(body) ||
    Object.keys(body).some((key) => key !== "lotNumber" && key !== "eventId")
  ) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { lotNumber, eventId } = body as Record<string, unknown>;
  if (
    lotNumber !== LOT_NUMBER ||
    typeof eventId !== "string" ||
    !EVENT_ID_PATTERN.test(eventId)
  ) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  try {
    await notifyOwnerOfSporbarhetVisit(LOT_NUMBER, eventId);
  } catch {
    // A notification outage must not affect the visitor's experience.
  }

  return NextResponse.json({ success: true }, { status: 202 });
}
