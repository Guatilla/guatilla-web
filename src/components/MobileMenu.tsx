"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { SITE_ROUTES } from "@/lib/routes";
import { useCart } from "./CartProvider";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const LINKS = [
  { href: "/kaffe", label: "Kaffe" },
  { href: "/shop", label: "Butikk" },
  { href: "/origen", label: "Opprinnelse" },
  { href: "/about", label: "Om oss" },
];

const LOCALES = ["NO", "EN", "ES"];

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-coffee focus-visible:ring-offset-2 focus-visible:ring-offset-brand-linen";

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { cartCount } = useCart();
  const pathname = usePathname();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-brand-linen">
      {/* announcement */}
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-0.5 bg-brand-teal px-3 py-2.5 text-center text-brand-cream">
        <span className="text-[10px] font-bold uppercase tracking-[0.14em]">
          Fri frakt over 500 kr
        </span>
        <svg width="6" height="6" viewBox="0 0 8 8" aria-hidden="true" className="shrink-0 text-brand-gold">
          <path d="M4 0 8 4 4 8 0 4Z" fill="currentColor" />
        </svg>
        <span className="text-[10px] font-bold uppercase tracking-[0.14em]">
          Brent i Norge
        </span>
      </div>

      {/* header */}
      <div className="flex items-center justify-between px-4 py-3">
        <button
          onClick={onClose}
          className={`flex h-9 w-9 items-center justify-center text-brand-coffee transition-colors hover:text-brand-terracotta ${FOCUS_RING}`}
          aria-label="Lukk meny"
        >
          <X size={24} />
        </button>

        <Link
          href={SITE_ROUTES.home}
          onClick={onClose}
          aria-label="Kaffe Guatilla — forsiden"
          className={`flex items-center ${FOCUS_RING}`}
        >
          <Image
            src="/guatilla-emblem.webp"
            alt="Kaffe Guatilla"
            width={88}
            height={82}
            priority
            className="h-9 w-9 object-contain"
          />
        </Link>

        <Link
          href={SITE_ROUTES.cart}
          onClick={onClose}
          aria-label={cartCount > 0 ? `Handlekurv, ${cartCount} varer` : "Handlekurv"}
          className={`relative inline-flex bg-brand-coffee px-[13px] py-[11px] text-brand-cream ${FOCUS_RING}`}
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="20" r="1.4" />
            <circle cx="18" cy="20" r="1.4" />
            <path d="M2.5 3h2.2l2.6 12.4a1.8 1.8 0 0 0 1.8 1.4h8.8a1.8 1.8 0 0 0 1.8-1.4l1.6-7.4H6" />
          </svg>
          {cartCount > 0 && (
            <span className="absolute -right-[7px] -top-[7px] flex h-[18px] min-w-[18px] items-center justify-center border-[1.5px] border-brand-coffee bg-brand-gold px-1 text-[10px] font-bold leading-none text-brand-coffee">
              {cartCount}
            </span>
          )}
        </Link>
      </div>

      {/* stitched rule */}
      <div
        className="h-[3px] w-full"
        style={{ background: "repeating-linear-gradient(90deg,#3C2A21 0 14px,transparent 14px 24px)" }}
      />

      {/* links — stacked; active on its olive patch */}
      <div className="flex grow flex-col gap-1.5 overflow-y-auto px-4 py-6">
        {LINKS.map((link) => {
          const active =
            pathname === link.href || pathname.startsWith(`${link.href}/`);
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={`${FOCUS_RING} px-4 py-3 font-heading text-2xl font-semibold ${
                active
                  ? "-rotate-1 self-start bg-brand-olive text-brand-cream"
                  : "text-brand-coffee"
              }`}
            >
              {link.label}
            </Link>
          );
        })}

        <div className="mt-6 flex items-center gap-4 px-1">
          {LOCALES.map((code, i) => (
            <button
              key={code}
              className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${
                i === 0
                  ? "text-brand-terracotta"
                  : "text-brand-coffee/40 hover:text-brand-coffee"
              }`}
            >
              {code}
            </button>
          ))}
        </div>
      </div>

      <div className="border-[1.5px] border-dashed border-[color:rgba(60,42,33,0.55)] m-4 bg-brand-cream px-5 py-4 text-center text-sm font-medium italic text-brand-coffee/70">
        «Direkte handel med colombiansk kaffe til Norge»
      </div>
    </div>
  );
}
