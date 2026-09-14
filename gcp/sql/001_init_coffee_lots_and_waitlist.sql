-- Sporbarhet + venteliste — kjør denne ÉN GANG mot Cloud SQL-instansen
-- (via Cloud SQL Studio i konsollen, eller `psql "$DATABASE_URL" -f gcp/sql/001_init_coffee_lots_and_waitlist.sql`).
--
-- Oppretter tabellene `coffee_lots` og `waitlist` med samme kolonnenavn som
-- Prisma-modellene CoffeeLot/Waitlist i prisma/schema.prisma forventer
-- (@map/@@map er satt opp til å matche dette skjemaet 1:1).

create extension if not exists pgcrypto;

create table if not exists coffee_lots (
  id uuid primary key default gen_random_uuid(),
  lot_number text not null unique,
  active boolean not null default true,

  -- Produkt
  product_name text,
  grind text,                  -- "Hele bønner" | "Malt"
  net_weight text,
  roast_degree text,
  roast_date date,
  best_before date,

  -- Opprinnelse
  country text default 'Colombia',
  region text,
  municipality text,
  farm text,
  producer text,
  altitude text,
  harvest_period text,

  -- Kaffen
  species text default '100 % Arabica',
  variety text,
  grade text,                  -- "Excelso" | "Especial"
  process text,
  screen_size text,

  -- Kvalitetskontroll
  moisture text,
  water_activity text,
  defects text,
  lab_notes text,
  cupping_score text,
  flavour_profile text,

  -- Fra Colombia til Norge
  exporter text default 'CACE L&G S.A.S.',
  export_date date,
  importer text default 'GUATILLA AS',
  received_date_norway date,

  -- Brenning og pakking
  roasted_by text default 'GUATILLA AS',
  packing_date date,
  production_notes text,

  -- Historien bak kaffen
  story_text text,
  story_video_url text,
  images jsonb not null default '[]'::jsonb,   -- [{ id, url, caption }]

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists coffee_lots_lot_number_idx
  on coffee_lots (lower(lot_number));

create or replace function coffee_lots_set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists coffee_lots_set_updated_at on coffee_lots;
create trigger coffee_lots_set_updated_at
before update on coffee_lots
for each row execute function coffee_lots_set_updated_at();

create table if not exists waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text,
  created_at timestamptz not null default now()
);

-- Merk: i motsetning til Supabase er det ingen "anon key"/PostgREST her —
-- appen leser og skriver kun via DATABASE_URL fra serveren (Prisma), så
-- Row Level Security trengs ikke for offentlig lesetilgang lenger.

-- Etter at dette er kjørt, baseline Prisma mot denne tabellen (kjøres lokalt,
-- med DATABASE_URL pekende mot Cloud SQL-instansen):
--   npx prisma migrate resolve --applied 0_init_coffee_lots_and_waitlist
-- (eller bare la Prisma introspektere skjemaet — se gcp/SETUP.md).
