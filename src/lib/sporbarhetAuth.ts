import crypto from "crypto";

/**
 * Enkel passordbeskyttelse for /admin/sporbarhet — "første versjon kan være
 * enkel": ett delt admin-passord (SPORBARHET_ADMIN_PASSWORD), en
 * HMAC-signert, httpOnly sesjonscookie (SPORBARHET_SESSION_SECRET) med 7
 * dagers levetid. Ingen brukertabell, ingen roller — akkurat nok til at
 * bare noen med passordet kan opprette/redigere partier.
 */

export const SPORBARHET_COOKIE = "sporbarhet_admin_session";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 dager

function getSecret(): string | null {
  return process.env.SPORBARHET_SESSION_SECRET || null;
}

function sign(payload: string, secret: string): string {
  return crypto.createHmac("sha256", secret).update(payload).digest("hex");
}

/** Sammenligner to strenger uten å lekke informasjon via svartid. */
function timingSafeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

export function checkAdminPassword(password: string): boolean {
  const expected = process.env.SPORBARHET_ADMIN_PASSWORD;
  if (!expected) return false;
  return timingSafeEqual(password, expected);
}

/** Lager en signert sesjonstoken: "<utløpstidspunkt>.<hmac>" */
export function createSessionToken(): string | null {
  const secret = getSecret();
  if (!secret) return null;
  const expires = Date.now() + SESSION_TTL_MS;
  const payload = String(expires);
  const sig = sign(payload, secret);
  return `${payload}.${sig}`;
}

/** Verifiserer en sesjonstoken fra cookien — gyldig signatur og ikke utløpt. */
export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const secret = getSecret();
  if (!secret) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  const expected = sign(payload, secret);
  if (!timingSafeEqual(sig, expected)) return false;
  const expires = Number(payload);
  if (!Number.isFinite(expires) || Date.now() > expires) return false;
  return true;
}

export const SESSION_MAX_AGE_SECONDS = SESSION_TTL_MS / 1000;
