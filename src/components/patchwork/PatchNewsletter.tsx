"use client";

import { useState, FormEvent } from "react";

/**
 * "Bli med i lappeteppet" — patchwork newsletter patch, wired to /api/waitlist.
 */
export default function PatchNewsletter() {
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

  return (
    <section className="container-page pb-12">
      <div className="stitch pop bg-brand-gold px-6 py-10 text-brand-coffee sm:px-10 md:flex md:items-center md:justify-between md:gap-10 md:py-12 lg:px-14">
        <div>
          <h2 className="font-heading text-3xl font-extrabold sm:text-4xl">
            Bli med i lappeteppet
          </h2>
          <p className="mt-2 text-sm text-brand-coffee/80 sm:text-[15px]">
            Nye partier, brennedatoer og feltnotater — omtrent én gang i måneden.
          </p>
        </div>

        {status === "success" ? (
          <p className="stitch mt-6 bg-brand-cream px-5 py-4 text-sm font-semibold md:mt-0 md:shrink-0">
            Takk! Du er på listen — vi sier fra når neste parti er klart.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-6 flex flex-col gap-3 md:mt-0 md:shrink-0 md:flex-row"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              placeholder="Din e-postadresse"
              required
              disabled={status === "loading"}
              className="stitch w-full bg-brand-cream px-5 py-4 text-sm text-brand-coffee outline-none placeholder:text-brand-coffee/45 disabled:opacity-50 md:w-[300px]"
            />
            <button
              type="submit"
              disabled={status === "loading" || !email}
              className="stitch bg-brand-coffee px-7 py-4 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-cream transition-colors hover:bg-brand-coffee/90 disabled:opacity-50"
            >
              {status === "loading" ? "Sender…" : "Meld meg på"}
            </button>
          </form>
        )}
      </div>
      {status === "error" && errorMessage && (
        <p className="mt-3 px-2 text-sm text-brand-vichy">{errorMessage}</p>
      )}
    </section>
  );
}
