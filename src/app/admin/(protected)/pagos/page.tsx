import type { Metadata } from "next";
import Link from "next/link";
import AdminPaymentActions from "@/components/admin/AdminPaymentActions";
import { getAdminPayments } from "@/lib/adminCommerce";
import { requireAdminPage } from "@/lib/adminPageAuth";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Pagos Vipps — administración | Kaffe Guatilla", robots: { index: false, follow: false } };

function scalar(value: string | string[] | undefined) { return typeof value === "string" ? value : ""; }
function formatOre(ore: number) { return new Intl.NumberFormat("nb-NO", { style: "currency", currency: "NOK" }).format(ore / 100); }

export default async function AdminPaymentsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  await requireAdminPage();
  const params = await searchParams;
  const filters = { query: scalar(params.q), status: scalar(params.status), page: Number(scalar(params.page)) || 1 };
  let result: Awaited<ReturnType<typeof getAdminPayments>> | null = null;
  try { result = await getAdminPayments(filters); } catch { /* Mensaje genérico en la interfaz. */ }
  function pageHref(page: number) { const query = new URLSearchParams(); if (filters.query) query.set("q", filters.query); if (filters.status) query.set("status", filters.status); query.set("page", String(page)); return `/admin/pagos?${query}`; }

  return <section><p className="font-mono text-[10px] font-bold uppercase tracking-[.18em] text-[#A94B2F]">Conciliación manual</p><h1 className="mt-2 font-heading text-4xl font-extrabold sm:text-5xl">Pagos Vipps</h1><p className="mt-3 max-w-2xl text-sm text-[#4A382C]/70">Compara siempre el importe recibido con el total esperado. El servidor determina el estado; no se puede elegir PAID manualmente.</p>
    <form method="get" className="mt-7 grid gap-3 border-2 border-[#2E2018] bg-[#F2E6D8] p-4 md:grid-cols-[1fr_220px_auto]"><label className="text-xs font-bold">Pedido, referencia, transacción, teléfono, correo o importe<input name="q" defaultValue={filters.query} className="mt-1 w-full border border-[#6B5A4E] bg-white px-3 py-2 font-normal" /></label><label className="text-xs font-bold">Estado<select name="status" defaultValue={filters.status} className="mt-1 w-full border border-[#6B5A4E] bg-white px-3 py-2 font-normal"><option value="">Cola principal</option>{["NOT_REQUESTED", "REQUESTED", "PARTIAL", "REVIEW_REQUIRED", "PAID", "FAILED", "REFUNDED"].map((status) => <option key={status}>{status}</option>)}</select></label><button className="self-end bg-[#2E2018] px-5 py-2.5 text-xs font-bold text-white">Buscar</button></form>
    {!result ? <p className="mt-6 bg-[#A94B2F] p-4 text-white">No se pudo consultar Cloud SQL.</p> : <><p className="mt-5 text-sm text-[#4A382C]/70">{result.total} pagos · página {result.page} de {result.pageCount}</p><div className="mt-3 grid gap-4">{result.payments.map((payment) => <article key={payment.id} className="border-2 border-[#2E2018] bg-[#FFF7EF] p-5"><div className="flex flex-wrap justify-between gap-3"><div><Link href={`/admin/pedidos/${payment.order.id}`} className="font-heading text-2xl font-extrabold text-[#A94B2F] underline">{payment.order.orderNumber}</Link><p className="mt-1 text-sm">{payment.order.customerName} · {payment.order.customerEmail} · {payment.order.customerPhoneE164}</p></div><div className="text-right"><span className="inline-block border border-[#2E2018] bg-[#DDA83A] px-2 py-1 font-mono text-[10px] font-bold">{payment.status}</span><p className="mt-2 font-heading text-2xl font-extrabold">{formatOre(payment.amountOre)}</p></div></div><div className="mt-3 grid gap-1 text-sm md:grid-cols-2"><p>Referencia Vipps: <strong>{payment.providerReference}</strong></p><p>Transacción: <strong>{payment.providerTransactionId ?? "—"}</strong></p><p>Recibido: {payment.receivedAmountOre === null ? "—" : formatOre(payment.receivedAmountOre)}</p><p>Solicitado: {payment.requestedAt?.toLocaleString("es-ES") ?? "—"}</p></div><AdminPaymentActions paymentId={payment.id} status={payment.status} expectedOre={payment.amountOre} /></article>)}{result.payments.length === 0 && <p className="border-2 border-[#2E2018] bg-[#FFF7EF] p-8 text-center">No hay pagos para estos filtros.</p>}</div><div className="mt-5 flex justify-between">{result.page > 1 ? <Link href={pageHref(result.page - 1)} className="border-2 border-[#2E2018] px-4 py-2 font-bold">← Anterior</Link> : <span />}{result.page < result.pageCount && <Link href={pageHref(result.page + 1)} className="border-2 border-[#2E2018] px-4 py-2 font-bold">Siguiente →</Link>}</div></>}
  </section>;
}
