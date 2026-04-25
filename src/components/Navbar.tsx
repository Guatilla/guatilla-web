"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";
import NavLink from "./NavLink";
import MobileMenu from "./MobileMenu";
import { ShoppingBag, User, Menu } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        className={`fixed w-full z-[90] transition-all duration-500 ease-in-out h-20 md:h-[90px] flex items-center ${isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-brand-coffee/10"
            : "bg-white"
          }`}
      >
        <div className="max-w-[1440px] w-full mx-auto px-6 md:px-20 h-full">
          {/* Desktop Grid Layout - Perfect Centering */}
          <div className="hidden lg:grid grid-cols-[1fr_auto_1fr] items-center h-full w-full">
            
            {/* LEFT SECTION - Navigation Links */}
            <div className="flex items-center space-x-6 xl:space-x-8 whitespace-nowrap">
              <NavLink href="/shop">Butikk</NavLink>
              <NavLink href="/origen">Opprinnelse</NavLink>
              <NavLink href="/about">Om oss</NavLink>
              <NavLink href="/project-progress">Fremdrift</NavLink>
            </div>

            {/* CENTER SECTION - Brand Anchor (Stacked) */}
            <div className="px-12 flex justify-center">
              <Link 
                href="/" 
                className="flex flex-col items-center leading-[0.95]"
              >
                <span className="font-brand font-black text-2xl md:text-3xl tracking-[0.15em] text-brand-coffee uppercase">
                  KAFFE
                </span>
                <span className="font-brand font-light italic text-2xl md:text-3xl tracking-[0.1em] text-brand-terracotta uppercase">
                  GUATILLA
                </span>
              </Link>
            </div>

            {/* RIGHT SECTION - Utility Controls */}
            <div className="flex items-center justify-end space-x-6 xl:space-x-8 whitespace-nowrap">
              <LanguageSwitcher />
              
              <div className="flex items-center space-x-5 border-l border-brand-coffee/10 pl-6">
                <button className="text-brand-coffee hover:text-brand-terracotta transition-all duration-300 transform hover:scale-110" aria-label="Account">
                  <User size={22} strokeWidth={1.5} />
                </button>
                <button className="text-brand-coffee hover:text-brand-terracotta transition-all duration-300 relative group transform hover:scale-110" aria-label="Cart">
                  <ShoppingBag size={22} strokeWidth={1.5} />
                  <span className="absolute -top-1 -right-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-terracotta opacity-40"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-brand-terracotta text-[9px] text-white font-bold items-center justify-center">
                      2
                    </span>
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden flex items-center justify-between h-full w-full">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 text-brand-coffee hover:text-brand-terracotta transition-colors flex items-center gap-2 group"
              aria-label="Menu"
            >
              <Menu size={28} />
              <span className="hidden sm:block text-xs font-bold uppercase tracking-widest text-brand-coffee/60">Meny</span>
            </button>

            <Link 
              href="/" 
              className="flex flex-col items-center leading-[0.9] absolute left-1/2 -translate-x-1/2"
            >
              <span className="font-brand font-black text-2xl tracking-[0.15em] text-brand-coffee uppercase">KAFFE</span>
              <span className="font-brand font-light italic text-2xl tracking-[0.1em] text-brand-terracotta uppercase">GUATILLA</span>
            </Link>
            
            <button className="text-brand-coffee hover:text-brand-terracotta transition-all duration-300 relative" aria-label="Cart">
              <ShoppingBag size={24} strokeWidth={1.5} />
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="relative inline-flex rounded-full h-4 w-4 bg-brand-terracotta text-[9px] text-white font-bold items-center justify-center shadow-sm">
                  2
                </span>
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Component */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
