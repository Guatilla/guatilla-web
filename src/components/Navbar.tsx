"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Menu } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileMenu from "./MobileMenu";
import { NAV_LINKS, SITE_ROUTES } from "@/lib/routes";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[90] h-[96px] transition-all duration-300 border-b border-brand-coffee/10 ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white"
          }`}
      >
        <div className="max-w-[1480px] mx-auto h-full px-8 lg:px-12 flex items-center justify-between">

          {/* LEFT */}
          <div className="flex items-center gap-12">

            {/* LOGO IMAGE */}
            <Link href={SITE_ROUTES.home} className="shrink-0">
              <Image
                src="/KAFFE-GUATILLA.png"
                alt="Kaffe Guatilla"
                width={80}
                height={80}
                className="h-[80px] w-auto object-contain"
                priority
              />
            </Link>

            {/* NAV LINKS */}
            <div className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-bold uppercase tracking-[0.14em] text-brand-coffee hover:text-brand-terracotta transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="hidden lg:flex items-center gap-7">

            <LanguageSwitcher />

            <Link href={SITE_ROUTES.cart} className="relative text-brand-coffee hover:text-brand-terracotta transition-colors">
              <ShoppingBag size={22} strokeWidth={1.7} />
            </Link>
          </div>

          {/* MOBILE */}
          <div className="lg:hidden flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-brand-coffee"
            >
              <Menu size={28} />
            </button>

            <Link href={SITE_ROUTES.cart} className="relative text-brand-coffee">
              <ShoppingBag size={24} />
            </Link>
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
