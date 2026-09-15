"use client";

import { useState } from "react";

export default function AdminLoginForm() {
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data?.error || "No se pudo iniciar sesión.");
        return;
      }
      window.location.replace("/admin");
    } catch {
      setError("No se pudo contactar con el servidor.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid min-h-dvh place-items-center bg-[#FDF1E5] p-5 text-[#2E2018]">
      <form
        onSubmit={submit}
        className="w-full max-w-md border-2 border-[#2E2018] bg-[#1F4B4B] p-7 text-[#FFF7EF] shadow-[8px_8px_0_#DDA83A] sm:p-9"
      >
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#DDA83A]">
          Área protegida
        </p>
        <h1 className="mt-3 font-heading text-3xl font-extrabold italic">
          Administración Guatilla
        </h1>
        <p className="mt-3 text-sm leading-6 text-[#FFF7EF]/75">
          Usa la contraseña administrativa existente para gestionar el catálogo y la trazabilidad.
        </p>

        <label className="mt-7 block font-mono text-[10px] font-bold uppercase tracking-[0.1em]">
          Contraseña
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            autoFocus
            className="mt-2 w-full border-2 border-[#2E2018] bg-[#FFF7EF] px-4 py-3 font-sans text-base text-[#2E2018] outline-none focus:border-[#DDA83A]"
          />
        </label>

        <button
          type="submit"
          disabled={busy || !password}
          className="mt-4 w-full bg-[#2E2018] px-5 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-[#FFF7EF] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {busy ? "Comprobando…" : "Entrar"}
        </button>
        {error && (
          <p role="alert" className="mt-4 bg-[#A94B2F] px-4 py-3 text-sm">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}
