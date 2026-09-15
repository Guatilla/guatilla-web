import type { Metadata } from "next";
import Link from "next/link";
import { getAdminOrders } from "@/lib/adminCommerce";
import { requireAdminPage } from "@/lib/adminPageAuth";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Pedidos — administración | Kaffe Guatilla", robots: { index: false, follow: false } };

const ORDER_STATUSES = ["", "DRAFT", "CONFIRMED", "CANCELLED", "COMPLETED"];
const PAYMENT_STATUSES = ["", "NOT_REQUESTED", "REQUESTED", "PAID", "PARTIAL", "REFUNDED", "FAILED", "REVIEW_REQUIRED"];
const FULFILLMENT_STATUSES = ["", "UNFULFILLED", "PREPARING", "SHIPPED", "DELIVERED"];

function scalar(value: string | string[] | undefined): string { return typeof value === "string" ? value : ""; }

export default async function AdminOrdersPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  await requireAdminPage();
  const params = await searchParams;
  const filters = {
    query: scalar(params.q),
    orderStatus: scalar(params.orderStatus),
    paymentStatus: scalar(params.paymentStatus),
    fulfillmentStatus: scalar(params.fulfillmentStatus),
    dateFrom: scalar(params.dateFrom),
    dateTo: scalar(params.dateTo),
    page: Number(scalar(params.page)) || 1,
  };
  let result: Awaited<ReturnType<typeof getAdminOrders>> | null = null;
  try { result = await getAdminOrders(filters); } catch { /* No se exponen detalles de conexión. */ }

  function pageHref(page: number) {
    const query = new URLSearchParams();
    Object.entries({ ...filters, page }).forEach(([key, value]) => { if (value) query.set(key === "query" ? "q" : key, String(value)); });
    return `/admin/pedidos?${query.toString()}`;
  }

  return <section>
    <p className="font-mono text-[10px] font-bold uppercase tracking-[.18em] text-[#A94B2F]">Operaciones</p>
    <h1 className="mt-2 font-heading text-4xl font-extrabold sm:text-5xl">Pedidos</h1>
    <form className="mt-7 grid gap-3 border-2 border-[#2E2018] bg-[#F2E6D8] p-4 md:grid-cols-3 xl:grid-cols-6" method="get">
      <label className="md:col-span-2 xl:col-span-2 text-xs font-bold">Número, correo o teléfono<input name="q" defaultValue={filters.query} className="mt-1 w-full border border-[#6B5A4E] bg-white px-3 py-2 font-normal" /></label>
      <FilterSelect name="orderStatus" label="Pedido" value={filters.orderStatus} options={ORDER_STATUSES} />
      <FilterSelect name="paymentStatus" label="Pago" value={filters.paymentStatus} options={PAYMENT_STATUSES} />
      <FilterSelect name="fulfillmentStatus" label="Preparación" value={filters.fulfillmentStatus} options={FULFILLMENT_STATUSES} />
      <div className="flex items-end"><button className="w-full bg-[#2E2018] px-4 py-2.5 font-mono text-[10px] font-bold uppercase text-[#FFF7EF]">Filtrar</button></div>
      <label className="text-xs font-bold">Desde<input type="date" name="dateFrom" defaultValue={filters.dateFrom} className="mt-1 w-full border border-[#6B5A4E] bg-white px-3 py-2 font-normal" /></label>
      <label className="text-xs font-bold">Hasta<input type="date" name="dateTo" defaultValue={filters.dateTo} className="mt-1 w-full border border-[#6B5A4E] bg-white px-3 py-2 font-normal" /></label>
    </form>
    {!result ? <p className="mt-6 border-2 border-[#2E2018] bg-[#A94B2F] p-4 text-[#FFF7EF]">No se pudo consultar Cloud SQL.</p> : <>
      <p className="mt-5 text-sm text-[#4A382C]/70">{result.total} pedidos · página {result.page} de {result.pageCount}</p>
      <div className="mt-3 overflow-x-auto border-2 border-[#2E2018]"><table className="w-full min-w-[850px] border-collapse bg-[#FFF7EF] text-left text-sm"><thead className="bg-[#1F4B4B] text-[#FFF7EF]"><tr>{["Número", "Fecha", "Cliente", "Total", "Pedido", "Pago", "Preparación"].map((label) => <th key={label} className="px-4 py-3 font-mono text-[10px] uppercase tracking-[.08em]">{label}</th>)}</tr></thead><tbody>{result.orders.map((order) => <tr key={order.id} className="border-t border-[#D8C8B6]"><td className="px-4 py-3"><Link className="font-bold text-[#A94B2F] underline" href={`/admin/pedidos/${order.id}`}>{order.orderNumber}</Link></td><td className="px-4 py-3 whitespace-nowrap">{order.createdAt.toLocaleString("es-ES")}</td><td className="px-4 py-3"><strong>{order.customerName}</strong><br /><span className="text-xs text-[#4A382C]/65">{order.customerEmail}</span></td><td className="px-4 py-3 font-bold">{formatOre(order.totalOre)}</td><td className="px-4 py-3"><Status value={order.orderStatus} /></td><td className="px-4 py-3"><Status value={order.paymentStatus} /></td><td className="px-4 py-3"><Status value={order.fulfillmentStatus} /></td></tr>)}</tbody></table>{result.orders.length === 0 && <p className="bg-[#FFF7EF] p-8 text-center">No hay pedidos para estos filtros.</p>}</div>
      <div className="mt-5 flex justify-between">{result.page > 1 ? <Link className="border-2 border-[#2E2018] px-4 py-2 text-sm font-bold" href={pageHref(result.page - 1)}>← Anterior</Link> : <span />}{result.page < result.pageCount && <Link className="border-2 border-[#2E2018] px-4 py-2 text-sm font-bold" href={pageHref(result.page + 1)}>Siguiente →</Link>}</div>
    </>}
  </section>;
}

function FilterSelect({ name, label, value, options }: { name: string; label: string; value: string; options: string[] }) { return <label className="text-xs font-bold">{label}<select name={name} defaultValue={value} className="mt-1 w-full border border-[#6B5A4E] bg-white px-3 py-2 font-normal">{options.map((option) => <option key={option || "all"} value={option}>{option || "Todos"}</option>)}</select></label>; }
function Status({ value }: { value: string }) { return <span className="inline-block border border-[#2E2018] bg-[#F2E6D8] px-2 py-1 font-mono text-[9px] font-bold">{value}</span>; }
function formatOre(ore: number) { return new Intl.NumberFormat("nb-NO", { style: "currency", currency: "NOK" }).format(ore / 100); }
