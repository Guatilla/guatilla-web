import React from "react";
import Link from "next/link";
import { X, ShoppingBag, Coffee, User } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import NavLink from "./NavLink";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-brand-linen flex flex-col animate-in fade-in slide-in-from-top duration-500">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-6 border-b border-brand-coffee/5 bg-white">
        <div className="w-10" /> {/* Spacer to center brand */}
        
        <Link 
          href="/" 
          onClick={onClose} 
          className="flex flex-col items-center leading-[0.9] active:scale-95 transition-transform"
        >
          <span className="font-heading font-black text-2xl tracking-[0.15em] text-brand-coffee uppercase">KAFFE</span>
          <span className="font-heading font-light italic text-2xl tracking-[0.1em] text-brand-terracotta uppercase">GUATILLA</span>
        </Link>

        <button onClick={onClose} className="p-2 text-brand-coffee hover:text-brand-terracotta transition-colors">
          <X size={32} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-grow overflow-y-auto px-10 py-12 flex flex-col space-y-12 items-center text-center">
        <div className="flex flex-col space-y-6 w-full">
          <NavLink href="/shop" onClick={onClose} className="text-3xl font-medium tracking-tight normal-case py-2 border-b border-brand-coffee/5">Butikk</NavLink>
          <NavLink href="/origen" onClick={onClose} className="text-3xl font-medium tracking-tight normal-case py-2 border-b border-brand-coffee/5">Opprinnelse</NavLink>
          <NavLink href="/about" onClick={onClose} className="text-3xl font-medium tracking-tight normal-case py-2 border-b border-brand-coffee/5">Om oss</NavLink>
          <NavLink href="/project-progress" onClick={onClose} className="text-3xl font-medium tracking-tight normal-case py-2 border-b border-brand-coffee/5">Fremdrift</NavLink>
        </div>

        <div className="pt-6 w-full flex flex-col items-center space-y-8">
           <NavLink href="#" onClick={onClose} className="text-xl font-medium flex items-center gap-2">
             <User size={20} /> Konto
           </NavLink>
           <div className="scale-110">
             <LanguageSwitcher />
           </div>
        </div>

        <div className="pt-4 w-full max-w-xs space-y-4">
          <Link
            href="/shop"
            onClick={onClose}
            className="flex items-center justify-center gap-3 bg-brand-terracotta text-white py-5 rounded-full font-bold uppercase tracking-widest transition-transform active:scale-95 shadow-lg shadow-brand-terracotta/20"
          >
            <ShoppingBag size={20} />
            Handle kaffe
          </Link>
          <Link
            href="/origen"
            onClick={onClose}
            className="flex items-center justify-center gap-3 border-2 border-brand-coffee text-brand-coffee py-5 rounded-full font-bold uppercase tracking-widest transition-transform active:scale-95"
          >
            <Coffee size={20} />
            Utforsk opprinnelse
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="px-8 py-8 border-t border-brand-coffee/5 bg-brand-cream/50">
        <p className="text-center text-sm font-medium text-brand-coffee/60 italic">
          &quot;Direkte handel med colombiansk kaffe til Europa&quot;
        </p>
      </div>
    </div>
  );
}
