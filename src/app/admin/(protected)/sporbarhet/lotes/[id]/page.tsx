import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdminCoffeeLotSummary, getLotOrderAllocations } from "@/lib/adminCommerce";
import { requireAdminPage } from "@/lib/adminPageAuth";
import { isUuid } from "@/lib/catalogValidation";

export const dynamic = "force-dynamic";

export default async function LotOrdersPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdminPage();
  const { id } = await params;
  if (!isUuid(id)) notFound();
  const [lot, allocations] = await Promise.all([getAdminCoffeeLotSummary(id), getLotOrderAllocations(id)]);
  if (!lot) notFound();
  return <section><Link href="/admin/sporbarhet" className="text-sm font-bold text-[#A94B2F] underline">← Volver a lotes</Link><p className="mt-5 font-mono text-[10px] uppercase tracking-[.16em] text-[#A94B2F]">Lote · {lot.active ? "activo" : "inactivo"}</p><h1 className="mt-2 font-heading text-4xl font-extrabold">{lot.lotNumber}</h1>{lot.productName && <p className="mt-2">{lot.productName}</p>}<div className="mt-7 border-2 border-[#2E2018] bg-[#FFF7EF]"><h2 className="bg-[#1F4B4B] px-5 py-3 font-heading text-xl font-extrabold text-white">Artículos de pedidos asignados</h2>{allocations.map((allocation) => <article key={allocation.id} className="border-t border-[#D8C8B6] p-5 first:border-0"><Link href={`/admin/pedidos/${allocation.orderItem.order.id}`} className="font-bold text-[#A94B2F] underline">{allocation.orderItem.order.orderNumber}</Link><p className="mt-1"><strong>{allocation.orderItem.productName}{allocation.orderItem.variantName ? ` · ${allocation.orderItem.variantName}` : ""}</strong></p><p className="text-sm">{allocation.quantity} unidades{allocation.allocatedWeightGrams ? ` · ${allocation.allocatedWeightGrams} g asignados` : ""} · {allocation.orderItem.order.customerName}</p><p className="text-xs text-[#4A382C]/60">{allocation.orderItem.order.createdAt.toLocaleString("es-ES")}</p></article>)}{allocations.length === 0 && <p className="p-8 text-center text-sm">No hay artículos asignados a este lote.</p>}</div></section>;
}
