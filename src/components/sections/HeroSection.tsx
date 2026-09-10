"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-brand-coffee">
      <div
        className="absolute inset-0"
        style={{
          transform: `translateY(${scrollY * 0.1}px) scale(${
            1 + scrollY * 0.00006
          })`,
        }}
      >
        <Image
          src="/assets/hero-coffee.jpg"
          alt="Kaffe Guatilla opprinnelseskaffe"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[60%_center] brightness-[0.92] contrast-[1.18] saturate-[1.08] lg:object-center"
        />
      </div>

      {/* cinematic overlays */}
      <div className="absolute inset-0 bg-brand-coffee/35" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/15 to-black/75" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-black/20" />
      <div className="absolute inset-0 bg-brand-terracotta/15 mix-blend-multiply" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1400px] items-center justify-center px-6 pt-32 text-center">
        <div className="animate-hero max-w-[760px] text-brand-cream">
          <p className="mb-6 text-[11px] font-bold uppercase tracking-[0.35em] text-brand-gold/90">
            Kaffe Guatilla · Opprinnelseskaffe
          </p>

          <h1 className="font-heading text-5xl font-bold leading-[1.02] tracking-tight md:text-6xl lg:text-7xl">
            Fra gården
            <br />
            til din <span className="text-brand-terracotta">kopp</span>
          </h1>

          <p className="mx-auto mt-7 max-w-[560px] text-base font-light leading-relaxed text-brand-cream/80 md:text-lg">
            Dyrket, prosessert og ivaretatt ved opprinnelsen.
            <br />
            Uten mellomledd. Uten kompromisser.
          </p>

          <div className="mt-9 flex justify-center">
            <Link
              href="/origen"
              className="group relative inline-flex items-center gap-6 overflow-hidden rounded-full border border-brand-gold/70 px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-cream transition-all duration-500 hover:text-brand-coffee"
            >
              <span className="absolute inset-0 rounded-full bg-brand-cream [clip-path:inset(0_100%_0_0_round_9999px)] transition-[clip-path] duration-500 ease-out group-hover:[clip-path:inset(0_0_0_0_round_9999px)]" />

              <span className="relative z-10">Oppdag mer</span>

              <ArrowRight
                size={18}
                className="relative z-10 transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="mx-auto mt-16 flex items-center justify-center gap-4 text-[10px] uppercase tracking-[0.24em] text-brand-cream/70">
            <span className="h-px w-10 bg-brand-gold/70" />
            Serranía del Perijá
            <span className="text-brand-gold">Colombia</span>
            <span className="h-px w-10 bg-brand-gold/70" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2">
        <div className="relative h-12 w-px overflow-hidden bg-brand-cream/20">
          <span className="animate-scroll-line absolute left-0 top-0 h-1/3 w-full bg-brand-cream/70" />
        </div>
      </div>
    </section>
  );
}