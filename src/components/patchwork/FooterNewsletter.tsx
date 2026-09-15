"use client";

import { useId, useState, type FormEvent } from "react";
import { useLocale } from "@/i18n/LocaleProvider";
import { SHARED_COPY } from "@/i18n/copy";

/** Nyhetsbrev-skjema i footeren, koblet til /api/waitlist. */
export default function FooterNewsletter() {
  const locale = useLocale();
  const copy = SHARED_COPY[locale].newsletter;
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const inputId = useId();

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <p className="mt-6 max-w-[330px] font-sans text-[14px] leading-relaxed text-brand-cream">
        {copy.success}
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="mt-6 max-w-[330px]">
      <label htmlFor={inputId} className="sr-only">
        {copy.label}
      </label>
      <div className="flex border-[1.5px] border-brand-cream">
        <input
          id={inputId}
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder={copy.placeholder}
          disabled={status === "loading"}
          className="min-w-0 flex-1 bg-transparent px-3.5 py-[13px] font-sans text-[14px] text-brand-cream outline-none placeholder:text-[#D8C7B8] focus-visible:outline focus-visible:-outline-offset-2 focus-visible:outline-2 focus-visible:outline-brand-gold disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === "loading" || !email}
          className="shrink-0 bg-brand-gold px-[18px] py-[13px] font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-brand-coffee transition-opacity hover:opacity-90 focus-visible:outline focus-visible:-outline-offset-2 focus-visible:outline-2 focus-visible:outline-brand-coffee disabled:opacity-60 motion-reduce:transition-none"
        >
          {status === "loading" ? copy.loading : copy.submit}
        </button>
      </div>
      {status === "error" && (
        <p className="mt-2 font-sans text-[12px] text-brand-gold">
          {copy.error}
        </p>
      )}
    </form>
  );
}
