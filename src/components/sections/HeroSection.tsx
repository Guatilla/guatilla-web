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
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-black">
      <div
        className="absolute inset-0"
        style={{
          transform: `translateY(${scrollY * 0.12}px) scale(${1 + scrollY * 0.00008})`,
        }}
      >
        <Image
          src="/assets/hero-coffee.jpg"
          alt="Kaffe Guatilla opprinnelseskaffe"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[60%_center] brightness-[0.95] contrast-[1.15] saturate-[1.1] lg:object-center"
        />
      </div>

      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70" />
      <div className="absolute inset-0 bg-[#7a3f18]/25 mix-blend-multiply" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1400px] items-center justify-center px-6 pt-32 text-center">
        <div className="max-w-[720px] text-brand-cream animate-hero">
          <p className="mb-6 text-[11px] uppercase tracking-[0.35em] text-[#d9ad7c]/90">
            Kaffe Guatilla · Opprinnelseskaffe
          </p>

          <h1 className="font-heading text-5xl leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            Fra gården
            <br />
            til din <span className="text-[#c78b62]">kopp</span>
          </h1>

          <p className="mx-auto mt-6 max-w-[520px] text-base leading-relaxed text-brand-cream/80 md:text-lg">
            Dyrket, prosessert og ivaretatt ved opprinnelsen.
            <br />
            Uten mellomledd. Uten kompromisser.
          </p>

          <div className="mt-8 flex justify-center">
            <Link
              href="/origen"
              className="
                group relative inline-flex items-center gap-6
                overflow-hidden rounded-full
                border border-[#d9ad7c]/70
                px-7 py-3
                text-[11px] font-bold uppercase tracking-[0.22em]
                text-[#f1d6b8]
                transition-all duration-500
                hover:text-brand-coffee
              "
            >
              <span
                className="
                  absolute inset-0 rounded-full bg-[#f1d6b8]
                  [clip-path:inset(0_100%_0_0_round_9999px)]
                  transition-[clip-path] duration-500 ease-out
                  group-hover:[clip-path:inset(0_0_0_0_round_9999px)]
                "
              />

              <span className="relative z-10">Oppdag mer</span>

              <ArrowRight
                size={18}
                className="relative z-10 transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="mt-16 flex items-center justify-center gap-4 text-[10px] uppercase tracking-[0.22em] text-brand-cream/70">
            <span className="h-px w-10 bg-[#d9ad7c]/70" />
            Serranía del Perijá
            <span className="text-[#d9ad7c]">Colombia</span>
            <span className="h-px w-10 bg-[#d9ad7c]/70" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2">
        <div className="relative h-12 w-px overflow-hidden bg-white/20">
          <span className="absolute left-0 top-0 h-1/3 w-full bg-white/60 animate-scroll-line" />
        </div>
      </div>
    </section>
  );
}