import type { Metadata } from "next";
import Link from "next/link";
import { requireAdminPage } from "@/lib/adminPageAuth";
import { getAdminSummary } from "@/lib/catalog";
import type { AdminSummary } from "@/types/catalog";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Resumen administrativo | Kaffe Guatilla",
  robots: { index: false, follow: false },
};

const EMPTY_SUMMARY: AdminSummary = {
  newOrders: 0,
  pendingPayments: 0,
  reviewPayments: 0,
  paidAwaitingPreparation: 0,
  preparingOrders: 0,
  lowInventoryProducts: 0,
};

export default async function AdminDashboardPage() {
  await requireAdminPage();

  let summary = EMPTY_SUMMARY;
  let unavailable = false;
  try {
    summary = await getAdminSummary();
  } catch {
    unavailable = true;
  }

  const metrics = [
    { label: "Pedidos nuevos", value: summary.newOrders, tone: "bg-[#DDA83A]", href: "/admin/pedidos?orderStatus=CONFIRMED&fulfillmentStatus=UNFULFILLED" },
    { label: "Pagos pendientes", value: summary.pendingPayments, tone: "bg-[#E8862A]", href: "/admin/pagos" },
    { label: "Pagos para revisión", value: summary.reviewPayments, tone: "bg-[#A94B2F] text-[#FFF7EF]", href: "/admin/pagos?status=REVIEW_REQUIRED" },
    {
      label: "Pagados · pendientes de preparación",
      value: summary.paidAwaitingPreparation,
      tone: "bg-[#5C7148] text-[#FFF7EF]",
      href: "/admin/pedidos?paymentStatus=PAID&fulfillmentStatus=UNFULFILLED",
    },
    {
      label: "Pedidos en preparación",
      value: summary.preparingOrders,
      tone: "bg-[#1F4B4B] text-[#FFF7EF]",
      href: "/admin/pedidos?fulfillmentStatus=PREPARING",
    },
    {
      label: "Productos con poco inventario",
      value: summary.lowInventoryProducts,
      tone: "bg-[#A94B2F] text-[#FFF7EF]",
      note: "5 unidades o menos",
      href: "/admin/catalogo",
    },
  ];

  return (
    <section>
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#A94B2F]">
        Administración
      </p>
      <h1 className="mt-2 font-heading text-4xl font-extrabold tracking-tight sm:text-5xl">
        Resumen
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-[#4A382C]/75">
        Estado operativo de catálogo, pedidos y pagos. Los valores se calculan en el servidor.
      </p>

      {unavailable && (
        <p role="alert" className="mt-6 border-2 border-[#2E2018] bg-[#A94B2F] p-4 text-sm text-[#FFF7EF]">
          No se pudo consultar Cloud SQL. No se muestran datos administrativos hasta recuperar la conexión.
        </p>
      )}

      <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {metrics.map((metric) => (
          <Link href={metric.href} key={metric.label} className={`border-2 border-[#2E2018] p-5 no-underline transition-transform hover:-translate-y-1 ${metric.tone}`}>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em]">
              {metric.label}
            </p>
            <p className="mt-5 font-heading text-5xl font-extrabold">{metric.value}</p>
            {metric.note && <p className="mt-2 text-xs opacity-75">{metric.note}</p>}
          </Link>
        ))}
      </div>
    </section>
  );
}
