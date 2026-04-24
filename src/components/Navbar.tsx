"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-brand-linen/90 backdrop-blur-md shadow-sm py-4 border-b border-brand-coffee/5"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo - Left */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="font-heading font-black text-2xl tracking-tighter text-brand-coffee">
              KAFFE <span className="text-brand-terracotta italic font-light">GUATILLA</span>
            </Link>
          </div>

          <div className="hidden md:flex flex-1 justify-center space-x-12">
            <Link href="/" className="text-sm font-bold tracking-widest text-brand-coffee hover:text-brand-terracotta transition-colors uppercase">
              Home
            </Link>
            <Link href="#about" className="text-sm font-bold tracking-widest text-brand-coffee hover:text-brand-terracotta transition-colors uppercase">
              About
            </Link>
            <Link href="#origen" className="text-sm font-bold tracking-widest text-brand-coffee hover:text-brand-terracotta transition-colors uppercase">
              Origen
            </Link>
            <Link href="#shop" className="text-sm font-bold tracking-widest text-brand-coffee hover:text-brand-terracotta transition-colors uppercase">
              Shop
            </Link>
            <Link href="#transparencia" className="text-sm font-bold tracking-widest text-brand-coffee hover:text-brand-terracotta transition-colors uppercase">
              Transparencia
            </Link>
            <Link href="#contact" className="text-sm font-bold tracking-widest text-brand-coffee hover:text-brand-terracotta transition-colors uppercase">
              Contact
            </Link>
          </div>

          {/* Icons & Actions - Right */}
          <div className="hidden md:flex items-center space-x-6">
            <LanguageSwitcher />
            
            {/* Account Icon */}
            <button className="text-brand-coffee hover:text-brand-terracotta transition-colors" aria-label="Account">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>

            {/* Cart Icon */}
            <button className="text-brand-coffee hover:text-brand-terracotta transition-colors relative" aria-label="Cart">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {/* Optional notification dot for cart */}
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-terracotta opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-terracotta"></span>
              </span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
             <LanguageSwitcher />
             <button
               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
               className="text-brand-coffee hover:text-brand-terracotta focus:outline-none"
             >
               <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 {isMobileMenuOpen ? (
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                 ) : (
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                 )}
               </svg>
             </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-brand-cream border-t border-brand-coffee/10 absolute w-full left-0 top-full shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-1 flex flex-col items-center">
            <Link 
              href="/" 
              className="block w-full text-center px-3 py-4 text-sm font-bold tracking-widest text-brand-coffee hover:bg-brand-linen hover:text-brand-terracotta transition-colors uppercase border-b border-brand-coffee/5"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="#about" 
              className="block w-full text-center px-3 py-4 text-sm font-bold tracking-widest text-brand-coffee hover:bg-brand-linen hover:text-brand-terracotta transition-colors uppercase border-b border-brand-coffee/5"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="#origen" 
              className="block w-full text-center px-3 py-4 text-sm font-bold tracking-widest text-brand-coffee hover:bg-brand-linen hover:text-brand-terracotta transition-colors uppercase border-b border-brand-coffee/5"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Origen
            </Link>
            <Link 
              href="#shop" 
              className="block w-full text-center px-3 py-4 text-sm font-bold tracking-widest text-brand-coffee hover:bg-brand-linen hover:text-brand-terracotta transition-colors uppercase border-b border-brand-coffee/5"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Shop
            </Link>
            <Link 
              href="#transparencia" 
              className="block w-full text-center px-3 py-4 text-sm font-bold tracking-widest text-brand-coffee hover:bg-brand-linen hover:text-brand-terracotta transition-colors uppercase border-b border-brand-coffee/5"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Transparencia
            </Link>
            <Link 
              href="#contact" 
              className="block w-full text-center px-3 py-4 text-sm font-bold tracking-widest text-brand-coffee hover:bg-brand-linen hover:text-brand-terracotta transition-colors uppercase border-b border-brand-coffee/5"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="flex justify-center w-full pt-4 space-x-8">
               <button className="text-brand-coffee p-2" aria-label="Account">
                 <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                 </svg>
               </button>
               <button className="text-brand-coffee p-2 relative" aria-label="Cart">
                 <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                 </svg>
                 <span className="absolute top-1 right-1 block w-2 h-2 rounded-full bg-brand-terracotta"></span>
               </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
