import Link from "next/link";
import { notFound } from "next/navigation";
import AdminOrderActions from "@/components/admin/AdminOrderActions";
import { getAdminOrderDetail, getAssignableCoffeeLots } from "@/lib/adminCommerce";
import { requireAdminPage } from "@/lib/adminPageAuth";
import { isUuid } from "@/lib/catalogValidation";

export const dynamic = "force-dynamic";

export default async function AdminOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdminPage();
  const { id } = await params;
  if (!isUuid(id)) notFound();
  const [order, lots] = await Promise.all([getAdminOrderDetail(id), getAssignableCoffeeLots()]);
  if (!order) notFound();
  const format = (ore: number) => new Intl.NumberFormat("nb-NO", { style: "currency", currency: "NOK" }).format(ore / 100);

  return <section><Link href="/admin/pedidos" className="text-sm font-bold text-[#A94B2F] underline">← Volver a pedidos</Link><div className="mt-4 flex flex-wrap items-end justify-between gap-3"><div><p className="font-mono text-[10px] uppercase tracking-[.16em]">Pedido</p><h1 className="font-heading text-4xl font-extrabold sm:text-5xl">{order.orderNumber}</h1></div><p className="font-heading text-3xl font-extrabold">{format(order.totalOre)}</p></div>
    <div className="mt-6 grid gap-4 lg:grid-cols-3"><Info title="Cliente"><p><strong>{order.customerName}</strong></p><p>{order.customerEmail}</p><p>{order.customerPhoneE164}</p></Info><Info title="Dirección"><p>{order.addressLine1}</p>{order.addressLine2 && <p>{order.addressLine2}</p>}<p>{order.postalCode} {order.city}</p><p>{order.countryCode}</p></Info><Info title="Estados"><p>Pedido: <strong>{order.orderStatus}</strong></p><p>Pago: <strong>{order.paymentStatus}</strong></p><p>Preparación: <strong>{order.fulfillmentStatus}</strong></p></Info></div>
    {order.customerNote && <Info title="Nota del comprador" className="mt-4"><p>{order.customerNote}</p></Info>}
    <section className="mt-5 border-2 border-[#2E2018] bg-[#FFF7EF]"><h2 className="bg-[#1F4B4B] px-5 py-3 font-heading text-xl font-extrabold text-white">Artículos</h2>{order.items.map((item) => <article key={item.id} className="border-t border-[#D8C8B6] p-5 first:border-0"><div className="flex justify-between gap-3"><div><strong>{item.quantity} × {item.productName}{item.variantName ? ` · ${item.variantName}` : ""}</strong><p className="text-xs text-[#4A382C]/65">SKU {item.sku ?? "—"} · {format(item.unitPriceOre)} unidad</p></div><strong>{format(item.lineTotalOre)}</strong></div><div className="mt-3 flex flex-wrap gap-2">{item.lotAllocations.map((allocation) => <span key={allocation.id} className="border border-[#2E2018] bg-[#DDA83A] px-2 py-1 text-xs">Lote {allocation.coffeeLot.lotNumber}: {allocation.quantity} ud.{allocation.allocatedWeightGrams ? ` · ${allocation.allocatedWeightGrams} g` : ""}</span>)}{item.lotAllocations.length === 0 && <span className="text-xs text-[#4A382C]/60">Sin lote asignado</span>}</div></article>)}</section>
    <section className="mt-5 border-2 border-[#2E2018] bg-[#FFF7EF] p-5"><h2 className="font-heading text-2xl font-extrabold">Pago Vipps</h2>{order.payments.map((payment) => <div key={payment.id} className="mt-3 border-t border-[#D8C8B6] pt-3 text-sm"><p>Referencia: <strong>{payment.providerReference}</strong></p><p>Esperado: {format(payment.amountOre)} · recibido: {payment.receivedAmountOre === null ? "—" : format(payment.receivedAmountOre)}</p><p>Estado: <strong>{payment.status}</strong> · transacción: {payment.providerTransactionId ?? "—"}</p></div>)}<Link href={`/admin/pagos?q=${encodeURIComponent(order.orderNumber)}`} className="mt-4 inline-block font-bold text-[#A94B2F] underline">Abrir en conciliación de pagos</Link></section>
    <AdminOrderActions orderId={order.id} orderStatus={order.orderStatus} paymentStatus={order.paymentStatus} fulfillmentStatus={order.fulfillmentStatus} items={order.items.map((item) => ({ id: item.id, label: `${item.productName}${item.variantName ? ` · ${item.variantName}` : ""}`, quantity: item.quantity, allocated: item.lotAllocations.reduce((sum, allocation) => sum + allocation.quantity, 0) }))} lots={lots} />
    <section className="mt-5 border-2 border-[#2E2018] bg-[#FFF7EF] p-5"><h2 className="font-heading text-2xl font-extrabold">Historial</h2><ol className="mt-4 space-y-3">{order.events.map((event) => <li key={event.id} className="border-l-4 border-[#DDA83A] pl-3 text-sm"><strong>{event.type}</strong> · {event.createdAt.toLocaleString("es-ES")}<br /><span className="text-xs text-[#4A382C]/60">{event.actorType}{event.actorId ? ` · ${event.actorId}` : ""}</span>{event.note && <p className="mt-1">{event.note}</p>}</li>)}</ol></section>
  </section>;
}

function Info({ title, className = "", children }: { title: string; className?: string; children: React.ReactNode }) { return <section className={`border-2 border-[#2E2018] bg-[#FFF7EF] p-5 ${className}`}><h2 className="mb-3 font-heading text-xl font-extrabold">{title}</h2><div className="space-y-1 text-sm">{children}</div></section>; }
