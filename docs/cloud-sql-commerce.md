# Guatilla commerce data model

## Confirmed infrastructure

- Google Cloud project: `kaffe-guatilla`
- Cloud SQL instance: `kaffe-guatilla-db`
- Database: `kaffe_guatilla`
- Engine: PostgreSQL 16
- Region: `europe-north1`
- Existing operational tables: `coffee_lots` and `waitlist`

## Production status (2026-09-14)

- An on-demand backup completed successfully before the migration. Description:
  `Antes de migración de pedidos y pagos Vipps - 2026-09-14`.
- `20260914000200_add_commerce_core` was executed manually in Cloud SQL Studio
  inside an explicit PostgreSQL transaction.
- Production now has 12 public tables: the 2 pre-existing tables and the 10
  commerce tables in this document.
- Verification returned 8 public enums, both required functions, 1 existing
  `coffee_lots` row, 0 `waitlist` rows, and 0 rows in all commerce tables.
- The order-number function was tested inside a transaction and rolled back;
  `order_number_counters` remains empty until the first real order.

Firestore is not the Guatilla data store. The project currently has no Firestore
database. Do not create commerce collections in the unrelated `My First Project`
Firestore database.

## Ownership of data

| Area | Tables | Purpose |
| --- | --- | --- |
| Traceability | `coffee_lots` | Existing coffee lots; must not be recreated or overwritten |
| Catalogue | `categories`, `products`, `product_variants` | Product and price source for the shop |
| Customers | `customers` | Customer contact profile; orders retain immutable snapshots |
| Orders | `orders`, `order_items` | Commercial order and line snapshots, all money in integer øre |
| Vipps | `payments` | Manual Get Paid requests and their verification details |
| Audit | `order_events` | Append-only business history written by the application |
| Traceability link | `order_item_lot_allocations` | Connects sold bags to one or more existing coffee lots |
| Numbering | `order_number_counters` | Atomic yearly `GUA-YYYY-000001` sequence |

## Status dimensions

Never use one status field for three different processes:

- `order_status`: `DRAFT`, `CONFIRMED`, `CANCELLED`, `COMPLETED`
- `payment_status`: `NOT_REQUESTED`, `REQUESTED`, `PAID`, `PARTIAL`,
  `REFUNDED`, `FAILED`, `REVIEW_REQUIRED`
- `fulfillment_status`: `UNFULFILLED`, `PREPARING`, `SHIPPED`, `DELIVERED`

## Manual Vipps flow

1. The server validates current catalogue prices and creates the customer,
   order, item snapshots, initial `REQUESTED` payment, `ORDER_CREATED`, and
   `PAYMENT_REQUESTED` in one transaction while reserving inventory atomically.
2. The confirmation page shows the exact total and instructs the customer to
   pay manually to Vipps number `66141` (`GUATILLA COMO`) using the generated
   order number as the payment reference. No Vipps deep link or ePayment API is
   used in this phase.
3. An administrator enters the received amount, payment time, and Vipps
   transaction/reference. The server compares integer øre amounts.
4. Matching amounts become `PAID`; mismatches become `PARTIAL` or
   `REVIEW_REQUIRED`. The payment, order summary, and event are updated in one
   transaction.
5. Preparation and shipment are separate fulfillment transitions. Never infer
   `PAID` from `SHIPPED`, or the reverse.

## Application invariants

- Never accept prices or totals supplied by the browser as authoritative.
- Store NOK as integer øre (`477 NOK` is `47700`).
- Normalize Vipps phones to E.164, for example `+4791234567`.
- Use `client_request_id` to make checkout creation idempotent.
- Keep product and customer snapshots on the order even when catalogue/profile
  records later change.
- Do not delete paid orders, payments, or events. Correct them with a new event
  and an explicit status transition.
- Never put credentials, Vipps secrets, or full provider payloads in event
  metadata.

## Prisma migration history reconciliation

The production schema is current, but it predates Prisma's `_prisma_migrations`
history and the commerce SQL was applied manually. Before running any future
`prisma migrate deploy` against production, use a secure production connection
and record both migrations as already applied:

```text
1. npx prisma migrate resolve --applied 20260914000100_baseline_cloud_sql
2. npx prisma migrate resolve --applied 20260914000200_add_commerce_core
3. npx prisma migrate status
4. Only after status is clean, use npx prisma migrate deploy for later migrations.
```

Do not execute either existing migration SQL again. Do not run
`prisma migrate reset`, `db push --force-reset`, or the baseline SQL against the
existing production database.

## Implemented application scope (2026-09-14)

- Cloud SQL is the authoritative source for the public catalogue, product
  detail pages, cart prices, stock validation, orders, and payments.
- The browser cart persists stable `ProductVariant` IDs and quantities only.
- `/api/orders` recalculates totals and creates the complete manual Vipps order
  atomically with `client_request_id` idempotency.
- `/admin/pedidos`, `/admin/pagos`, and the existing traceability administration
  share one server-validated session and protected mutation routes.
- Payment, order, and fulfillment transitions remain separate and create audit
  events. Cancellation before shipment restores inventory exactly once.
- Order items can be allocated to existing active coffee lots, and a protected
  lot view shows the assigned order items.

Before opening sales, the owner must enter and publish the approved real
categories, products, SKUs, variants, prices, and inventory; confirm the
shipping policy; and optionally provide the official Vipps QR asset. Do not seed
placeholder catalogue records in production.

The manual Vipps phase does not yet call a Vipps API from the website. The order
confirmation page should show the Guatilla order number, exact NOK total, and a
clear `payment pending` message. An administrator then sends or verifies the
request through the approved Vipps business workflow and records the result.
