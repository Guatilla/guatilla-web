"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface Item { id: string; label: string; quantity: number; allocated: number }
interface Lot { id: string; lotNumber: string; productName: string | null }

export default function AdminOrderActions({ orderId, orderStatus, paymentStatus, fulfillmentStatus, items, lots }: { orderId: string; orderStatus: string; paymentStatus: string; fulfillmentStatus: string; items: Item[]; lots: Lot[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  async function post(path: string, body: unknown) {
    setBusy(true); setMessage(null);
    try {
      const response = await fetch(path, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "No se pudo guardar.");
      setMessage({ ok: true, text: "Cambios guardados." });
      router.refresh();
    } catch (error) { setMessage({ ok: false, text: error instanceof Error ? error.message : "No se pudo guardar." }); }
    finally { setBusy(false); }
  }

  const actions: Array<[string, string]> = [];
  if (orderStatus === "CONFIRMED" && ["UNFULFILLED", "PREPARING"].includes(fulfillmentStatus)) actions.push(["CANCEL", "Cancelar pedido"]);
  if (orderStatus === "CONFIRMED" && paymentStatus === "PAID" && fulfillmentStatus === "UNFULFILLED") actions.push(["PREPARE", "Iniciar preparación"]);
  if (fulfillmentStatus === "PREPARING") actions.push(["SHIP", "Marcar enviado"]);
  if (fulfillmentStatus === "SHIPPED") actions.push(["DELIVER", "Marcar entregado"]);
  if (orderStatus === "CONFIRMED" && paymentStatus === "PAID" && fulfillmentStatus === "DELIVERED") actions.push(["COMPLETE", "Completar pedido"]);

  return <div className="mt-7 grid gap-5 lg:grid-cols-2">
    {message && <p className={`lg:col-span-2 border-2 border-[#2E2018] p-3 text-sm ${message.ok ? "bg-[#5C7148] text-white" : "bg-[#A94B2F] text-white"}`} role="status">{message.text}</p>}
    <section className="border-2 border-[#2E2018] bg-[#FFF7EF] p-5"><h2 className="font-heading text-2xl font-extrabold">Cambiar estado</h2><div className="mt-4 flex flex-wrap gap-2">{actions.map(([action, label]) => <button disabled={busy} key={action} type="button" onClick={() => post(`/api/admin/pedidos/${orderId}/estado`, { action })} className="border-2 border-[#2E2018] bg-[#DDA83A] px-4 py-3 text-xs font-bold">{label}</button>)}{actions.length === 0 && <p className="text-sm text-[#4A382C]/70">No hay transiciones disponibles para el estado actual.</p>}</div></section>
    <form className="border-2 border-[#2E2018] bg-[#FFF7EF] p-5" onSubmit={(event) => { event.preventDefault(); const data = new FormData(event.currentTarget); post(`/api/admin/pedidos/${orderId}/notas`, { note: data.get("note") }); event.currentTarget.reset(); }}><h2 className="font-heading text-2xl font-extrabold">Nota interna</h2><textarea required maxLength={2000} name="note" className="mt-4 min-h-24 w-full border border-[#6B5A4E] p-3" /><button disabled={busy} className="mt-2 bg-[#2E2018] px-4 py-3 text-xs font-bold text-white">Añadir nota</button></form>
    <form className="border-2 border-[#2E2018] bg-[#FFF7EF] p-5 lg:col-span-2" onSubmit={(event) => { event.preventDefault(); const data = new FormData(event.currentTarget); post(`/api/admin/pedidos/${orderId}/lotes`, { orderItemId: data.get("orderItemId"), coffeeLotId: data.get("coffeeLotId"), quantity: Number(data.get("quantity")), allocatedWeightGrams: data.get("weight") ? Number(data.get("weight")) : null }); }}><h2 className="font-heading text-2xl font-extrabold">Asignar lote</h2>{items.length === 0 || lots.length === 0 ? <p className="mt-3 text-sm">Se necesita un artículo y un lote activo para crear una asignación.</p> : <div className="mt-4 grid gap-3 md:grid-cols-4"><label className="text-xs font-bold">Artículo<select required name="orderItemId" className="mt-1 w-full border p-2">{items.map((item) => <option key={item.id} value={item.id}>{item.label} ({item.allocated}/{item.quantity})</option>)}</select></label><label className="text-xs font-bold">Lote<select required name="coffeeLotId" className="mt-1 w-full border p-2">{lots.map((lot) => <option key={lot.id} value={lot.id}>{lot.lotNumber}{lot.productName ? ` · ${lot.productName}` : ""}</option>)}</select></label><label className="text-xs font-bold">Cantidad<input required type="number" min="1" step="1" name="quantity" className="mt-1 w-full border p-2" /></label><label className="text-xs font-bold">Peso asignado (g, opcional)<input type="number" min="1" step="1" name="weight" className="mt-1 w-full border p-2" /></label><button disabled={busy} className="bg-[#2E2018] px-4 py-3 text-xs font-bold text-white md:col-span-4">Guardar asignación</button></div>}</form>
  </div>;
}
