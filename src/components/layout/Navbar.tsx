"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, ShoppingBag, Menu, X, User } from "lucide-react"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-brand-bg/95 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex-between">
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-brand-dark"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Links (Left) */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/shop" className="text-brand-dark font-medium hover:text-brand-terracotta transition-colors text-sm uppercase tracking-widest">
            Butikk
          </Link>
          <Link href="/about" className="text-brand-dark font-medium hover:text-brand-terracotta transition-colors text-sm uppercase tracking-widest">
            Om oss
          </Link>
        </div>

        {/* Logo (Center) */}
        <div className="absolute left-1/2 -translate-x-1/2 flex justify-center">
          <Link href="/">
            <Image
              src="/KAFFE-GUATILLA.png"
              alt="Kaffe Guatilla Logo"
              width={140}
              height={140}
              className={cn(
                "transition-all duration-300",
                isScrolled ? "w-28 opacity-100" : "w-36 opacity-0 md:opacity-100"
              )}
            />
          </Link>
        </div>

        {/* Icons (Right) */}
        <div className="flex items-center gap-5">
          <button className="text-brand-dark hover:text-brand-terracotta transition-colors">
            <Search size={20} strokeWidth={1.5} />
          </button>
          <button className="hidden sm:block text-brand-dark hover:text-brand-terracotta transition-colors">
            <User size={20} strokeWidth={1.5} />
          </button>
          <button className="text-brand-dark hover:text-brand-terracotta transition-colors relative">
            <ShoppingBag size={20} strokeWidth={1.5} />
            <span className="absolute -top-1 -right-2 bg-brand-terracotta text-white text-[10px] font-bold w-4 h-4 rounded-full flex-center">
              0
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-brand-bg shadow-lg border-t border-brand-primary/20 py-6 px-6 flex flex-col gap-6">
          <Link href="/shop" className="text-brand-dark text-lg font-heading tracking-wide border-b border-brand-primary/10 pb-2">
            Butikk
          </Link>
          <Link href="/about" className="text-brand-dark text-lg font-heading tracking-wide border-b border-brand-primary/10 pb-2">
            Om oss
          </Link>
          <Link href="/contacto" className="text-brand-dark text-lg font-heading tracking-wide border-b border-brand-primary/10 pb-2">
            Kontakt
          </Link>
          <div className="pt-4 flex items-center gap-4 text-brand-dark">
             <User size={20} />
             <span>Min konto</span>
          </div>
        </div>
      )}
    </nav>
  )
}
