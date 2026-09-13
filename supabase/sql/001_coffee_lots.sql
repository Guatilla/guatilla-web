-- Sporbarhet (/sporbarhet) — kjør denne ÉN GANG i Supabase SQL Editor
-- (Dashboard → SQL Editor → New query → lim inn → Run).
--
-- Oppretter tabellen `coffee_lots` som holder alle registrerte kaffepartier.
-- QR-koden på posene peker bare til /sporbarhet — kunden skriver selv inn
-- lotnummeret som er trykket på posen, så QR-koden trenger aldri endres når
-- dere registrerer nye partier.

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

-- RLS: appen leser/skriver via service-role-nøkkelen fra serveren (går
-- forbi RLS), men vi slår på RLS og gir kun lesetilgang til AKTIVE partier
-- i tilfelle noen spør direkte med anon-nøkkelen.
alter table coffee_lots enable row level security;

drop policy if exists "Public read active lots" on coffee_lots;
create policy "Public read active lots"
  on coffee_lots for select
  using (active = true);

-- Etter at dette er kjørt: lag også en Storage-bucket kalt "sporbarhet"
-- (Dashboard → Storage → New bucket → navn "sporbarhet" → Public bucket: PÅ).
-- Det er alt — /admin/sporbarhet og /sporbarhet fungerer fra da av.
