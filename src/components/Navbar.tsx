"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, Search, ChevronRight } from "lucide-react";
import MobileMenu from "./MobileMenu";
import LanguageSwitcher from "./LanguageSwitcher";
import { SITE_ROUTES } from "@/lib/routes";
import { useCart } from "./CartProvider";

const NAV_ITEMS = [
  { href: "/kaffe", label: "Kaffe" },
  { href: "/shop", label: "Butikk", hasMenu: true },
  { href: "/origen", label: "Opprinnelse" },
  { href: "/about", label: "Om oss" },
];

const BUTIKK_MENU = [
  {
    heading: "Etter rist",
    links: [
      { label: "Lys", href: "/shop" },
      { label: "Medium", href: "/shop" },
      { label: "Medium-mørk", href: "/shop" },
      { label: "Mørk", href: "/shop" },
    ],
  },
  {
    heading: "Etter bryggemetode",
    links: [
      { label: "Filter", href: "/shop" },
      { label: "Espresso", href: "/shop" },
      { label: "Presskanne", href: "/shop" },
      { label: "Moka", href: "/shop" },
    ],
  },
  {
    heading: "Kjøp som",
    links: [
      { label: "Engangskjøp", href: "/shop" },
      { label: "Abonnement −15%", href: "/shop" },
      { label: "Smakspakke", href: "/shop" },
      { label: "Gavekort", href: "/shop" },
    ],
  },
];

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-coffee focus-visible:ring-offset-2 focus-visible:ring-offset-brand-cream";

const STITCH_RULE =
  "repeating-linear-gradient(90deg,#3C2A21 0 14px,transparent 14px 24px)";

function Logo({ small = false }: { small?: boolean }) {
  return (
    <Image
      src="/guatilla-emblem.webp"
      alt="Kaffe Guatilla"
      width={88}
      height={82}
      priority
      className={`object-contain motion-safe:transition-all ${
        small ? "h-9 w-9" : "h-11 w-11"
      }`}
    />
  );
}

function CartButton({ count }: { count: number }) {
  return (
    <Link
      href={SITE_ROUTES.cart}
      aria-label={count > 0 ? `Handlekurv, ${count} varer` : "Handlekurv"}
      className={`relative inline-flex bg-brand-coffee px-[15px] py-[13px] text-brand-cream ${FOCUS_RING}`}
    >
      <svg
        width="19"
        height="19"
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
      {count > 0 && (
        <span className="absolute -right-[7px] -top-[7px] flex h-[19px] min-w-[19px] items-center justify-center border-[1.5px] border-brand-coffee bg-brand-gold px-1 text-[10.5px] font-bold leading-none text-brand-coffee">
          {count}
        </span>
      )}
    </Link>
  );
}

export default function Navbar() {
  const { cartCount } = useCart();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className="sticky top-0 z-50 bg-brand-cream"
        onMouseLeave={() => setIsMenuOpen(false)}
      >
        {/* 1) announcement bar */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-0.5 bg-brand-teal px-4 py-2.5 text-center text-brand-cream sm:gap-x-[26px]">
          <span className="text-[10.5px] font-bold uppercase tracking-[0.16em]">
            Fri frakt over 500 kr
          </span>
          <svg
            width="7"
            height="7"
            viewBox="0 0 8 8"
            aria-hidden="true"
            className="hidden shrink-0 text-brand-gold sm:block"
          >
            <path d="M4 0 8 4 4 8 0 4Z" fill="currentColor" />
          </svg>
          <span className="text-[10.5px] font-bold uppercase tracking-[0.16em]">
            Ristet på bestilling i Norge
          </span>
        </div>

        {/* 2) main nav */}
        <div
          className={`container-frame flex items-center gap-4 motion-safe:transition-all lg:gap-[34px] ${
            scrolled ? "py-3" : "pb-5 pt-[22px]"
          }`}
        >
          {/* mobile: hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Åpne meny"
            className={`flex h-9 w-9 items-center justify-center text-brand-coffee lg:hidden ${FOCUS_RING}`}
          >
            <Menu size={22} />
          </button>

          {/* logo */}
          <Link
            href={SITE_ROUTES.home}
            onMouseEnter={() => setIsMenuOpen(false)}
            aria-label="Kaffe Guatilla — forsiden"
            className={`flex shrink-0 items-center ${FOCUS_RING}`}
          >
            <Logo small={scrolled} />
          </Link>

          {/* left optical spacer */}
          <div className="hidden flex-1 lg:block" />

          {/* center: links */}
          <div className="hidden items-center gap-1.5 lg:flex">
            {NAV_ITEMS.map((item) => {
              const active =
                pathname === item.href ||
                pathname.startsWith(`${item.href}/`);
              const cls = `${FOCUS_RING} block px-4 py-2.5 font-heading text-[17px] font-semibold motion-safe:transition-colors ${
                active
                  ? "-rotate-1 bg-brand-olive text-brand-cream"
                  : "text-brand-coffee hover:bg-brand-gold hover:text-brand-coffee"
              }`;
              return item.hasMenu ? (
                <div key={item.label} onMouseEnter={() => setIsMenuOpen(true)}>
                  <Link href={item.href} className={cls}>
                    {item.label}
                  </Link>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  onMouseEnter={() => setIsMenuOpen(false)}
                  className={cls}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* right optical spacer */}
          <div className="hidden flex-1 lg:block" />

          {/* right: actions */}
          <div className="hidden items-center gap-4 lg:flex">
            <button
              type="button"
              aria-label="Søk kaffe"
              className={`p-1 text-brand-coffee transition-colors hover:text-brand-terracotta ${FOCUS_RING}`}
            >
              <Search size={18} strokeWidth={1.8} />
            </button>
            <LanguageSwitcher />
            <CartButton count={cartCount} />
          </div>

          {/* mobile: cart */}
          <div className="ml-auto lg:hidden">
            <CartButton count={cartCount} />
          </div>
        </div>

        {/* desktop: butikk mega-menu */}
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-full z-50 hidden border-t-[3px] border-dashed border-brand-coffee/30 bg-brand-cream pb-8 pt-6 lg:block">
            <div className="container-frame lg:flex lg:gap-9">
              <div className="flex flex-1 gap-12">
                {BUTIKK_MENU.map((col) => (
                  <div key={col.heading}>
                    <p className="mb-3.5 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-coffee/45">
                      {col.heading}
                    </p>
                    <div className="flex flex-col gap-2.5">
                      {col.links.map((l) => (
                        <Link
                          key={l.label}
                          href={l.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={`text-[13px] font-medium text-brand-coffee transition-colors hover:text-brand-terracotta ${FOCUS_RING}`}
                        >
                          {l.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/shop/encuentro"
                onClick={() => setIsMenuOpen(false)}
                className={`flex min-h-[170px] w-[320px] shrink-0 -rotate-1 flex-col justify-between border-[1.5px] border-dashed border-[color:rgba(253,252,248,0.6)] bg-brand-teal px-[22px] py-5 text-brand-cream ${FOCUS_RING}`}
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold">
                    Nyhet
                  </span>
                  <h3 className="mt-2 font-heading text-[22px] font-bold">
                    Encuentro — Honey
                  </h3>
                  <p className="mt-1.5 text-[12px] leading-relaxed text-brand-cream/80">
                    Honning, nøtter, krydder. Mikroparti fra Serranía del Perijá.
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em]">
                  Handle nå
                  <ChevronRight size={14} strokeWidth={2.4} />
                </span>
              </Link>
            </div>
          </div>
        )}

        {/* 3) stitched bottom rule */}
        <div className="h-[3px] w-full" style={{ background: STITCH_RULE }} />
      </nav>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
