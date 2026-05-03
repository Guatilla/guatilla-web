"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Menu } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileMenu from "./MobileMenu";
import { SITE_ROUTES } from "@/lib/routes";
import { useCart } from "./CartProvider";

export default function Navbar() {
  const { cartCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const navState = isScrolled
    ? "bg-brand-linen text-brand-coffee border-brand-coffee/10 shadow-md backdrop-blur-xl"
    : "bg-black/60 text-white border-white/35 shadow-[0_10px_35px_rgba(0,0,0,0.2)] backdrop-blur-xl";

  const linkClass =
    "text-[11px] uppercase tracking-[0.18em] font-medium transition hover:text-brand-terracotta";

  return (
    <>
      <nav className="fixed left-0 top-0 z-[90] w-full px-4 pt-5 lg:px-0 lg:pt-6">
        <div
          className={`mx-auto flex h-[60px] w-full max-w-[360px] items-center justify-between rounded-full border px-5 transition-all duration-500 lg:h-[58px] lg:max-w-[820px] lg:px-6 ${navState}`}
        >
          {/* LOGO */}
          <Link href={SITE_ROUTES.home} className="flex shrink-0 items-center">
            <Image
              src="/KAFFE-GUATILLA.png"
              alt="Kaffe Guatilla"
              width={120}
              height={40}
              priority
              className="h-[38px] w-auto object-contain lg:h-[50px]"
            />
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden items-center gap-7 lg:flex">
            <Link href="/about" className={linkClass}>
              Om oss
            </Link>
            <Link href="/shop" className={linkClass}>
              Butikk
            </Link>
            <Link href="/project-progress" className={linkClass}>
              Fremdrift
            </Link>
            <Link href="/origen" className={linkClass}>
              Opprinnelse
            </Link>
          </div>

          {/* DESKTOP RIGHT */}
          <div className="hidden items-center gap-5 lg:flex">
            <div className="relative z-[100]">
              <LanguageSwitcher />
            </div>

            <Link
              href={SITE_ROUTES.cart}
              className="relative flex h-8 w-8 items-center justify-center transition hover:text-brand-terracotta"
            >
              <ShoppingBag size={18} strokeWidth={1.7} />

              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-terracotta text-[9px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* MOBILE RIGHT */}
          <div className="flex items-center gap-4 lg:hidden">
            <Link
              href={SITE_ROUTES.cart}
              className="relative flex h-8 w-8 items-center justify-center"
            >
              <ShoppingBag size={20} strokeWidth={1.7} />

              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-terracotta text-[9px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
              className="flex h-8 w-8 items-center justify-center"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
