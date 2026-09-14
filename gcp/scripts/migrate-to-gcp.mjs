// One-off data migration: Supabase (Postgres + Storage) → Cloud SQL (Postgres) + Google Cloud Storage.
//
// Usage (run once, from the project root, after gcp/sql/001_init_coffee_lots_and_waitlist.sql
// has been applied to the Cloud SQL instance and gcp/SETUP.md's env vars are all set):
//
//   node gcp/scripts/migrate-to-gcp.mjs
//
// Requires in the environment:
//   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY   — source (old values, still in .env for now)
//   DATABASE_URL                               — target Cloud SQL Postgres (used by Prisma)
//   GCP_PROJECT_ID, GCS_SERVICE_ACCOUNT_KEY,
//   GCS_BUCKET_NAME                            — target Cloud Storage bucket
//
// Idempotent: re-running upserts lots by id and waitlist rows by email, and
// skips re-uploading an image if an object already exists at its target path.

import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Storage } from "@google-cloud/storage";

const SUPABASE_URL = requireEnv("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = requireEnv("SUPABASE_SERVICE_ROLE_KEY");
const GCS_BUCKET_NAME = requireEnv("GCS_BUCKET_NAME");

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    console.error(`Mangler miljøvariabel ${name}. Se gcp/SETUP.md.`);
    process.exit(1);
  }
  return value;
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: requireEnv("DATABASE_URL") }),
});
const storage = new Storage({
  projectId: requireEnv("GCP_PROJECT_ID"),
  credentials: JSON.parse(Buffer.from(requireEnv("GCS_SERVICE_ACCOUNT_KEY"), "base64").toString("utf-8")),
});
const bucket = storage.bucket(GCS_BUCKET_NAME);

async function supabaseSelect(table, query = "select=*") {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${query}`, {
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
    },
  });
  if (res.status === 404) {
    const body = await res.text();
    if (body.includes("PGRST205")) {
      console.log(`  (tabellen ${table} finnes ikke i Supabase, hopper over)`);
      return [];
    }
  }
  if (!res.ok) {
    throw new Error(`Supabase REST-feil på ${table}: ${res.status} ${await res.text()}`);
  }
  return res.json();
}

function toDate(value) {
  return value ? new Date(value) : null;
}

async function migrateImage(image, lotId) {
  const ext = image.url.split(".").pop()?.split("?")[0]?.toLowerCase() || "jpg";
  const path = `lots/${image.id}.${ext}`;
  const gcsFile = bucket.file(path);

  const [exists] = await gcsFile.exists();
  if (!exists) {
    const res = await fetch(image.url);
    if (!res.ok) {
      console.warn(`  ! kunne ikke laste ned bilde ${image.id} for parti ${lotId} (${res.status}), hopper over`);
      return image;
    }
    const contentType = res.headers.get("content-type") || "image/jpeg";
    await gcsFile.save(Buffer.from(await res.arrayBuffer()), { contentType, resumable: false });
  }

  return { ...image, url: `https://storage.googleapis.com/${GCS_BUCKET_NAME}/${path}` };
}

async function migrateCoffeeLots() {
  const lots = await supabaseSelect("coffee_lots", "select=*&order=created_at.asc");
  console.log(`Fant ${lots.length} kaffeparti(er) i Supabase.`);

  for (const lot of lots) {
    const images = [];
    for (const image of lot.images ?? []) {
      images.push(await migrateImage(image, lot.id));
    }

    await prisma.coffeeLot.upsert({
      where: { id: lot.id },
      create: {
        id: lot.id,
        lotNumber: lot.lot_number,
        active: lot.active,
        productName: lot.product_name,
        grind: lot.grind,
        netWeight: lot.net_weight,
        roastDegree: lot.roast_degree,
        roastDate: toDate(lot.roast_date),
        bestBefore: toDate(lot.best_before),
        country: lot.country,
        region: lot.region,
        municipality: lot.municipality,
        farm: lot.farm,
        producer: lot.producer,
        altitude: lot.altitude,
        harvestPeriod: lot.harvest_period,
        species: lot.species,
        variety: lot.variety,
        grade: lot.grade,
        process: lot.process,
        screenSize: lot.screen_size,
        moisture: lot.moisture,
        waterActivity: lot.water_activity,
        defects: lot.defects,
        labNotes: lot.lab_notes,
        cuppingScore: lot.cupping_score,
        flavourProfile: lot.flavour_profile,
        exporter: lot.exporter,
        exportDate: toDate(lot.export_date),
        importer: lot.importer,
        receivedDateNorway: toDate(lot.received_date_norway),
        roastedBy: lot.roasted_by,
        packingDate: toDate(lot.packing_date),
        productionNotes: lot.production_notes,
        storyText: lot.story_text,
        storyVideoUrl: lot.story_video_url,
        images,
        createdAt: toDate(lot.created_at) ?? undefined,
        updatedAt: toDate(lot.updated_at) ?? undefined,
      },
      update: { images },
    });
    console.log(`  ✓ parti ${lot.lot_number}`);
  }
}

async function migrateWaitlist() {
  const rows = await supabaseSelect("waitlist", "select=*&order=created_at.asc");
  console.log(`Fant ${rows.length} venteliste-rad(er) i Supabase.`);

  for (const row of rows) {
    await prisma.waitlist.upsert({
      where: { email: row.email },
      create: {
        id: row.id,
        email: row.email,
        source: row.source,
        createdAt: toDate(row.created_at) ?? undefined,
      },
      update: {},
    });
  }
  console.log(`  ✓ ${rows.length} venteliste-rad(er) migrert.`);
}

async function main() {
  await migrateCoffeeLots();
  await migrateWaitlist();
  await prisma.$disconnect();
  console.log("Ferdig. Sjekk /sporbarhet og /admin/sporbarhet mot Cloud SQL/GCS før dere fjerner Supabase.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
