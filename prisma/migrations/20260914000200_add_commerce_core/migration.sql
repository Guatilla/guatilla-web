-- Commerce core for the manual Vipps/Get Paid phase.
-- Monetary values are stored as integer øre, never floating point NOK.

BEGIN;

CREATE TYPE "order_status" AS ENUM ('DRAFT', 'CONFIRMED', 'CANCELLED', 'COMPLETED');
CREATE TYPE "payment_status" AS ENUM ('NOT_REQUESTED', 'REQUESTED', 'PAID', 'PARTIAL', 'REFUNDED', 'FAILED', 'REVIEW_REQUIRED');
CREATE TYPE "fulfillment_status" AS ENUM ('UNFULFILLED', 'PREPARING', 'SHIPPED', 'DELIVERED');
CREATE TYPE "payment_provider" AS ENUM ('VIPPS');
CREATE TYPE "payment_flow" AS ENUM ('MANUAL_REQUEST');
CREATE TYPE "order_source" AS ENUM ('WEB', 'ADMIN');
CREATE TYPE "order_event_actor_type" AS ENUM ('CUSTOMER', 'ADMIN', 'SYSTEM');
CREATE TYPE "order_event_type" AS ENUM (
    'ORDER_CREATED',
    'ORDER_CONFIRMED',
    'ORDER_CANCELLED',
    'ORDER_COMPLETED',
    'PAYMENT_REQUESTED',
    'PAYMENT_CONFIRMED',
    'PAYMENT_PARTIAL',
    'PAYMENT_FAILED',
    'PAYMENT_REVIEW_REQUIRED',
    'PAYMENT_REFUNDED',
    'PREPARATION_STARTED',
    'ORDER_SHIPPED',
    'ORDER_DELIVERED',
    'NOTE_ADDED'
);

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS trigger AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE "customers" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT,
    "email" TEXT NOT NULL,
    "phone_e164" TEXT,
    "locale" TEXT NOT NULL DEFAULT 'nb',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "customers_phone_e164_check" CHECK ("phone_e164" IS NULL OR "phone_e164" ~ '^\+[1-9][0-9]{7,14}$')
);

CREATE UNIQUE INDEX "customers_email_key" ON "customers"("email");

CREATE TABLE "categories" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "categories_slug_key" ON "categories"("slug");

CREATE TABLE "products" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "category_id" UUID,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "images" JSONB NOT NULL DEFAULT '[]'::jsonb,
    "metadata" JSONB NOT NULL DEFAULT '{}'::jsonb,
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "is_published" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE UNIQUE INDEX "products_slug_key" ON "products"("slug");
CREATE INDEX "products_category_id_idx" ON "products"("category_id");

CREATE TABLE "product_variants" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "product_id" UUID NOT NULL,
    "sku" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "grind" TEXT,
    "weight_grams" INTEGER,
    "price_ore" INTEGER NOT NULL,
    "currency" CHAR(3) NOT NULL DEFAULT 'NOK',
    "inventory" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "product_variants_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "product_variants_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "product_variants_price_ore_check" CHECK ("price_ore" >= 0),
    CONSTRAINT "product_variants_inventory_check" CHECK ("inventory" >= 0),
    CONSTRAINT "product_variants_weight_grams_check" CHECK ("weight_grams" IS NULL OR "weight_grams" > 0),
    CONSTRAINT "product_variants_currency_check" CHECK ("currency" = upper("currency"))
);

CREATE UNIQUE INDEX "product_variants_sku_key" ON "product_variants"("sku");
CREATE INDEX "product_variants_product_id_active_idx" ON "product_variants"("product_id", "active");

CREATE TABLE "order_number_counters" (
    "year" INTEGER NOT NULL,
    "last_value" INTEGER NOT NULL DEFAULT 0,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "order_number_counters_pkey" PRIMARY KEY ("year"),
    CONSTRAINT "order_number_counters_last_value_check" CHECK ("last_value" >= 0)
);

CREATE OR REPLACE FUNCTION next_guatilla_order_number()
RETURNS TEXT AS $$
DECLARE
    current_year INTEGER := EXTRACT(YEAR FROM CURRENT_DATE)::INTEGER;
    next_value INTEGER;
BEGIN
    INSERT INTO "order_number_counters" ("year", "last_value")
    VALUES (current_year, 1)
    ON CONFLICT ("year") DO UPDATE
       SET "last_value" = "order_number_counters"."last_value" + 1,
           "updated_at" = CURRENT_TIMESTAMP
    RETURNING "last_value" INTO next_value;

    RETURN format('GUA-%s-%s', current_year, lpad(next_value::TEXT, 6, '0'));
END;
$$ LANGUAGE plpgsql;

CREATE TABLE "orders" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "order_number" TEXT NOT NULL DEFAULT next_guatilla_order_number(),
    "client_request_id" TEXT,
    "customer_id" UUID,
    "customer_name" TEXT NOT NULL,
    "customer_email" TEXT NOT NULL,
    "customer_phone_e164" TEXT NOT NULL,
    "address_line_1" TEXT NOT NULL,
    "address_line_2" TEXT,
    "postal_code" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country_code" CHAR(2) NOT NULL DEFAULT 'NO',
    "currency" CHAR(3) NOT NULL DEFAULT 'NOK',
    "subtotal_ore" INTEGER NOT NULL,
    "shipping_ore" INTEGER NOT NULL DEFAULT 0,
    "discount_ore" INTEGER NOT NULL DEFAULT 0,
    "total_ore" INTEGER NOT NULL,
    "order_status" "order_status" NOT NULL DEFAULT 'DRAFT',
    "payment_status" "payment_status" NOT NULL DEFAULT 'NOT_REQUESTED',
    "fulfillment_status" "fulfillment_status" NOT NULL DEFAULT 'UNFULFILLED',
    "source" "order_source" NOT NULL DEFAULT 'WEB',
    "customer_note" TEXT,
    "internal_note" TEXT,
    "placed_at" TIMESTAMPTZ,
    "confirmed_at" TIMESTAMPTZ,
    "cancelled_at" TIMESTAMPTZ,
    "completed_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "orders_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "orders_amounts_check" CHECK (
        "subtotal_ore" >= 0 AND
        "shipping_ore" >= 0 AND
        "discount_ore" >= 0 AND
        "total_ore" >= 0 AND
        "discount_ore" <= "subtotal_ore" + "shipping_ore" AND
        "total_ore" = "subtotal_ore" + "shipping_ore" - "discount_ore"
    ),
    CONSTRAINT "orders_customer_phone_e164_check" CHECK ("customer_phone_e164" ~ '^\+[1-9][0-9]{7,14}$'),
    CONSTRAINT "orders_country_code_check" CHECK ("country_code" = upper("country_code")),
    CONSTRAINT "orders_currency_check" CHECK ("currency" = upper("currency"))
);

CREATE UNIQUE INDEX "orders_order_number_key" ON "orders"("order_number");
CREATE UNIQUE INDEX "orders_client_request_id_key" ON "orders"("client_request_id");
CREATE INDEX "orders_customer_id_created_at_idx" ON "orders"("customer_id", "created_at");
CREATE INDEX "orders_payment_status_created_at_idx" ON "orders"("payment_status", "created_at");
CREATE INDEX "orders_fulfillment_status_created_at_idx" ON "orders"("fulfillment_status", "created_at");
CREATE INDEX "orders_customer_email_idx" ON "orders"("customer_email");

CREATE TABLE "order_items" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "order_id" UUID NOT NULL,
    "product_id" UUID,
    "product_variant_id" UUID,
    "product_slug" TEXT NOT NULL,
    "product_name" TEXT NOT NULL,
    "variant_name" TEXT,
    "sku" TEXT,
    "quantity" INTEGER NOT NULL,
    "unit_price_ore" INTEGER NOT NULL,
    "line_total_ore" INTEGER NOT NULL,
    "product_snapshot" JSONB NOT NULL DEFAULT '{}'::jsonb,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "order_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "order_items_product_variant_id_fkey" FOREIGN KEY ("product_variant_id") REFERENCES "product_variants"("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "order_items_quantity_check" CHECK ("quantity" > 0),
    CONSTRAINT "order_items_amounts_check" CHECK ("unit_price_ore" >= 0 AND "line_total_ore" = "unit_price_ore" * "quantity")
);

CREATE INDEX "order_items_order_id_idx" ON "order_items"("order_id");
CREATE INDEX "order_items_product_id_idx" ON "order_items"("product_id");
CREATE INDEX "order_items_product_variant_id_idx" ON "order_items"("product_variant_id");

CREATE TABLE "payments" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "order_id" UUID NOT NULL,
    "provider" "payment_provider" NOT NULL DEFAULT 'VIPPS',
    "flow" "payment_flow" NOT NULL DEFAULT 'MANUAL_REQUEST',
    "status" "payment_status" NOT NULL DEFAULT 'REQUESTED',
    "amount_ore" INTEGER NOT NULL,
    "received_amount_ore" INTEGER,
    "currency" CHAR(3) NOT NULL DEFAULT 'NOK',
    "customer_phone_e164" TEXT NOT NULL,
    "provider_request_id" TEXT,
    "provider_transaction_id" TEXT,
    "provider_reference" TEXT NOT NULL,
    "requested_at" TIMESTAMPTZ,
    "paid_at" TIMESTAMPTZ,
    "verified_at" TIMESTAMPTZ,
    "verified_by" TEXT,
    "verification_source" TEXT,
    "failure_reason" TEXT,
    "metadata" JSONB NOT NULL DEFAULT '{}'::jsonb,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "payments_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "payments_amounts_check" CHECK ("amount_ore" >= 0 AND ("received_amount_ore" IS NULL OR "received_amount_ore" >= 0)),
    CONSTRAINT "payments_customer_phone_e164_check" CHECK ("customer_phone_e164" ~ '^\+[1-9][0-9]{7,14}$'),
    CONSTRAINT "payments_currency_check" CHECK ("currency" = upper("currency"))
);

CREATE INDEX "payments_order_id_status_idx" ON "payments"("order_id", "status");
CREATE INDEX "payments_status_created_at_idx" ON "payments"("status", "created_at");
CREATE UNIQUE INDEX "payments_provider_provider_transaction_id_key" ON "payments"("provider", "provider_transaction_id");

CREATE TABLE "order_events" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "order_id" UUID NOT NULL,
    "payment_id" UUID,
    "type" "order_event_type" NOT NULL,
    "actor_type" "order_event_actor_type" NOT NULL,
    "actor_id" TEXT,
    "note" TEXT,
    "metadata" JSONB NOT NULL DEFAULT '{}'::jsonb,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "order_events_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "order_events_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "order_events_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payments"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE INDEX "order_events_order_id_created_at_idx" ON "order_events"("order_id", "created_at");
CREATE INDEX "order_events_payment_id_idx" ON "order_events"("payment_id");

CREATE TABLE "order_item_lot_allocations" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "order_item_id" UUID NOT NULL,
    "coffee_lot_id" UUID NOT NULL,
    "quantity" INTEGER NOT NULL,
    "allocated_weight_grams" INTEGER,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "order_item_lot_allocations_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "order_item_lot_allocations_order_item_id_fkey" FOREIGN KEY ("order_item_id") REFERENCES "order_items"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "order_item_lot_allocations_coffee_lot_id_fkey" FOREIGN KEY ("coffee_lot_id") REFERENCES "coffee_lots"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "order_item_lot_allocations_quantity_check" CHECK ("quantity" > 0),
    CONSTRAINT "order_item_lot_allocations_weight_check" CHECK ("allocated_weight_grams" IS NULL OR "allocated_weight_grams" > 0)
);

CREATE UNIQUE INDEX "order_item_lot_allocations_order_item_id_coffee_lot_id_key" ON "order_item_lot_allocations"("order_item_id", "coffee_lot_id");
CREATE INDEX "order_item_lot_allocations_coffee_lot_id_idx" ON "order_item_lot_allocations"("coffee_lot_id");

CREATE TRIGGER customers_set_updated_at BEFORE UPDATE ON "customers" FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER categories_set_updated_at BEFORE UPDATE ON "categories" FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER products_set_updated_at BEFORE UPDATE ON "products" FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER product_variants_set_updated_at BEFORE UPDATE ON "product_variants" FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER orders_set_updated_at BEFORE UPDATE ON "orders" FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER payments_set_updated_at BEFORE UPDATE ON "payments" FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER order_number_counters_set_updated_at BEFORE UPDATE ON "order_number_counters" FOR EACH ROW EXECUTE FUNCTION set_updated_at();

COMMIT;
