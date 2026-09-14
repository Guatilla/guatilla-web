"use client";

import { useState, FormEvent } from "react";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Noe gikk galt. Prøv igjen.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setEmail("");
    } catch {
      setErrorMessage("Tilkoblingsfeil. Prøv igjen senere.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 py-4">
        <div className="w-12 h-12 rounded-full bg-brand-olive/20 flex items-center justify-center">
          <svg className="w-6 h-6 text-brand-olive" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-brand-coffee font-medium">Takk! Du er på ventelisten.</p>
        <p className="text-sm text-brand-coffee/50">Vi sender deg beskjed når partiet er klart.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="din@epost.no"
          required
          disabled={status === "loading"}
          className="flex-1 h-14 px-6 rounded-full bg-white border border-brand-coffee/15 text-brand-coffee placeholder:text-brand-coffee/35 outline-none focus:border-brand-terracotta/40 transition-all disabled:opacity-50 text-sm"
        />
        <button
          type="submit"
          disabled={status === "loading" || !email}
          className="h-14 px-10 rounded-full bg-brand-coffee text-white font-bold uppercase tracking-widest text-xs hover:bg-brand-terracotta transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
        >
          {status === "loading" ? "Sender …" : "Bli med"}
        </button>
      </div>

      {status === "error" && errorMessage && (
        <p className="text-sm text-brand-terracotta text-center">{errorMessage}</p>
      )}

      <p className="text-xs text-brand-coffee/35 text-center">
        Vi sender deg én melding når lanseringen er nær.
      </p>
    </form>
  );
}
