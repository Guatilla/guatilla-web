-- Baseline for the tables that already existed in Cloud SQL before Prisma
-- migrations were introduced. On the existing production database this
-- migration must be marked as applied; it must not be executed again.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE "coffee_lots" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "lot_number" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "product_name" TEXT,
    "grind" TEXT,
    "net_weight" TEXT,
    "roast_degree" TEXT,
    "roast_date" DATE,
    "best_before" DATE,
    "country" TEXT DEFAULT 'Colombia',
    "region" TEXT,
    "municipality" TEXT,
    "farm" TEXT,
    "producer" TEXT,
    "altitude" TEXT,
    "harvest_period" TEXT,
    "species" TEXT DEFAULT '100 % Arabica',
    "variety" TEXT,
    "grade" TEXT,
    "process" TEXT,
    "screen_size" TEXT,
    "moisture" TEXT,
    "water_activity" TEXT,
    "defects" TEXT,
    "lab_notes" TEXT,
    "cupping_score" TEXT,
    "flavour_profile" TEXT,
    "exporter" TEXT DEFAULT 'CACE L&G S.A.S.',
    "export_date" DATE,
    "importer" TEXT DEFAULT 'GUATILLA AS',
    "received_date_norway" DATE,
    "roasted_by" TEXT DEFAULT 'GUATILLA AS',
    "packing_date" DATE,
    "production_notes" TEXT,
    "story_text" TEXT,
    "story_video_url" TEXT,
    "images" JSONB NOT NULL DEFAULT '[]'::jsonb,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "coffee_lots_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "coffee_lots_lot_number_key" ON "coffee_lots"("lot_number");
CREATE INDEX "coffee_lots_lot_number_idx" ON "coffee_lots"(lower("lot_number"));

CREATE OR REPLACE FUNCTION coffee_lots_set_updated_at()
RETURNS trigger AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER coffee_lots_set_updated_at
BEFORE UPDATE ON "coffee_lots"
FOR EACH ROW EXECUTE FUNCTION coffee_lots_set_updated_at();

CREATE TABLE "waitlist" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL,
    "source" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "waitlist_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "waitlist_email_key" ON "waitlist"("email");
