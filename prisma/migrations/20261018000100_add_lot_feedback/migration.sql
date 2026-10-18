CREATE TABLE "lot_feedback" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "coffee_lot_id" UUID NOT NULL,
    "roast_reference" TEXT NOT NULL,
    "packaging_design" INTEGER NOT NULL,
    "coffee_quality" INTEGER NOT NULL,
    "preparation_method" TEXT NOT NULL,
    "coffee_comments" TEXT,
    "coffee_wishes" TEXT,
    "packaging_comments" TEXT,
    "page_comments" TEXT,
    "norwegian_corrections" TEXT,
    "notify_consent" BOOLEAN NOT NULL DEFAULT false,
    "contact_email" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lot_feedback_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "lot_feedback_packaging_design_check" CHECK ("packaging_design" BETWEEN 1 AND 6),
    CONSTRAINT "lot_feedback_coffee_quality_check" CHECK ("coffee_quality" BETWEEN 1 AND 5),
    CONSTRAINT "lot_feedback_preparation_method_check" CHECK (
        "preparation_method" IN ('filter', 'presskanne', 'espresso', 'aeropress', 'mokkakanne', 'annet')
    ),
    CONSTRAINT "lot_feedback_consent_email_check" CHECK (
        ("notify_consent" = true AND "contact_email" IS NOT NULL)
        OR ("notify_consent" = false AND "contact_email" IS NULL)
    ),
    CONSTRAINT "lot_feedback_coffee_lot_id_fkey"
        FOREIGN KEY ("coffee_lot_id") REFERENCES "coffee_lots"("id")
        ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE INDEX "lot_feedback_coffee_lot_id_roast_reference_created_at_idx"
    ON "lot_feedback"("coffee_lot_id", "roast_reference", "created_at");

CREATE INDEX "lot_feedback_notify_consent_created_at_idx"
    ON "lot_feedback"("notify_consent", "created_at");
