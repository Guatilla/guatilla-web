import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FOOTER_LINKS } from "@/lib/routes";

export default function Footer() {
  return (
    <footer className="bg-brand-cream border-t border-brand-coffee/5 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-24">

          {/* Brand Info */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="block mt-2 mb-8">
              <Image
                src="/favicon-trimmed.png"
                alt="KAFFE GUATILLA"
                width={300}
                height={100}
                className="h-32 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-brand-coffee/60 leading-relaxed max-w-xs mb-8">
              Spesialkaffe av høy kvalitet direkte fra våre gårder i Colombia til ditt hjem i Europa.
            </p>
          </div>

          {/* KAFFE GUATILLA */}
          <div className="space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-brand-coffee">KAFFE GUATILLA</h4>
            <ul className="space-y-4 text-sm text-brand-coffee/70">
              {FOOTER_LINKS.brand.map((link) => (
                <li key={link.href + link.label}>
                  <Link href={link.href} className="hover:text-brand-terracotta transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Transparency */}
          <div className="space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-brand-coffee">Sporbarhet</h4>
            <ul className="space-y-4 text-sm text-brand-coffee/70">
              {FOOTER_LINKS.transparency.map((link, i) => (
                <li key={link.href + link.label + i}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 transition-colors duration-200 hover:text-brand-terracotta"
                  >
                    {link.label}
                    {link.href === "/journal" && (
                      <span className="transition-transform duration-200 group-hover:translate-x-1">
                        →
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-brand-coffee">Juridisk informasjon</h4>
            <div className="text-sm text-brand-coffee/70 space-y-4">
              <p>Guatilla AS (Norge)</p>
            </div>
          </div>

        </div>

        <div className="mt-20 pt-8 border-t border-brand-coffee/5 flex flex-col md:flex-row justify-between items-center text-xs text-brand-coffee/40 tracking-widest uppercase font-bold">
          <p>© {new Date().getFullYear()} KAFFE GUATILLA. ALLE RETTIGHETER FORBEHOLDT.</p>
          <p className="mt-4 md:mt-0">DESIGNET AV GUATILLA AS</p>
        </div>
      </div>
    </footer>
  );
}
