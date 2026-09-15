"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminPaymentActions({ paymentId, status, expectedOre }: { paymentId: string; status: string; expectedOre: number }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  async function post(path: string, body: unknown) {
    setBusy(true); setMessage(null);
    try {
      const response = await fetch(path, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "No se pudo registrar el pago.");
      setMessage({ ok: true, text: data.status ? `Pago actualizado: ${data.status}.` : "Pago actualizado." });
      router.refresh();
    } catch (error) { setMessage({ ok: false, text: error instanceof Error ? error.message : "No se pudo registrar el pago." }); }
    finally { setBusy(false); }
  }

  return <div className="mt-4 border-t border-[#D8C8B6] pt-4">
    {message && <p role="status" className={`mb-3 p-3 text-sm ${message.ok ? "bg-[#5C7148] text-white" : "bg-[#A94B2F] text-white"}`}>{message.text}</p>}
    {status === "NOT_REQUESTED" && <div className="border-2 border-[#2E2018] bg-[#F2E6D8] p-4">
      <p className="mb-3 text-sm">Envía primero la solicitud desde Vipps al teléfono del cliente y por el importe indicado. Después registra aquí que ya fue enviada.</p>
      <button type="button" disabled={busy} onClick={() => post(`/api/admin/pagos/${paymentId}/solicitar`, {})} className="bg-[#2E2018] px-4 py-3 text-xs font-bold text-white">{busy ? "Guardando…" : "Ya envié la solicitud por Vipps"}</button>
    </div>}
    {["REQUESTED", "PARTIAL", "REVIEW_REQUIRED"].includes(status) && <form className="grid gap-3 md:grid-cols-2" onSubmit={(event) => { event.preventDefault(); const data = new FormData(event.currentTarget); const localPaidAt = new Date(String(data.get("paidAt") ?? "")); post(`/api/admin/pagos/${paymentId}/verificar`, { receivedAmountNok: data.get("amount"), paidAt: Number.isNaN(localPaidAt.getTime()) ? "" : localPaidAt.toISOString(), providerTransactionId: data.get("transactionId"), verificationSource: data.get("source"), note: data.get("note") }); }}>
      <label className="text-xs font-bold">Importe recibido (NOK)<input required name="amount" inputMode="decimal" placeholder={(expectedOre / 100).toFixed(2)} className="mt-1 w-full border border-[#6B5A4E] p-2" /></label>
      <label className="text-xs font-bold">Fecha y hora del pago<input required type="datetime-local" name="paidAt" className="mt-1 w-full border border-[#6B5A4E] p-2" /></label>
      <label className="text-xs font-bold">ID o referencia de transacción Vipps<input required name="transactionId" maxLength={160} className="mt-1 w-full border border-[#6B5A4E] p-2" /></label>
      <label className="text-xs font-bold">Fuente de verificación<select required name="source" className="mt-1 w-full border border-[#6B5A4E] p-2"><option value="Vipps portal">Portal Vipps</option><option value="Bank reconciliation">Conciliación bancaria</option><option value="Other manual verification">Otra verificación manual</option></select></label>
      <label className="text-xs font-bold md:col-span-2">Nota opcional<textarea name="note" maxLength={2000} className="mt-1 min-h-20 w-full border border-[#6B5A4E] p-2" /></label>
      <button disabled={busy} className="bg-[#2E2018] px-4 py-3 text-xs font-bold text-white md:col-span-2">{busy ? "Guardando…" : "Comparar importe y registrar"}</button>
    </form>}
    <div className="mt-3 flex flex-wrap gap-2">
      {["REQUESTED", "PARTIAL", "REVIEW_REQUIRED"].includes(status) && <ExceptionButton label="Marcar fallido" status="FAILED" busy={busy} onSubmit={(note) => post(`/api/admin/pagos/${paymentId}/estado`, { status: "FAILED", note })} />}
      {status === "PAID" && <ExceptionButton label="Registrar reembolso" status="REFUNDED" busy={busy} onSubmit={(note) => post(`/api/admin/pagos/${paymentId}/estado`, { status: "REFUNDED", note })} />}
    </div>
  </div>;
}

function ExceptionButton({ label, status, busy, onSubmit }: { label: string; status: string; busy: boolean; onSubmit: (note: string) => void }) {
  return <form onSubmit={(event) => { event.preventDefault(); const data = new FormData(event.currentTarget); onSubmit(String(data.get("note") ?? "")); }} className="flex flex-wrap gap-2"><input required name="note" maxLength={2000} placeholder={`Motivo de ${status.toLowerCase()}`} className="border border-[#6B5A4E] px-3 py-2 text-xs" /><button disabled={busy} className="border-2 border-[#2E2018] bg-[#DDA83A] px-3 py-2 text-xs font-bold">{label}</button></form>;
}
