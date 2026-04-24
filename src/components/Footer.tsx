import React from "react";
import Link from "next/link";
import { Instagram, Linkedin, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-cream border-t border-brand-coffee/5 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-24">
          
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-1 space-y-6">
            <Link href="/" className="font-heading font-black text-2xl tracking-tighter text-brand-coffee">
              KAFFE <span className="text-brand-terracotta italic font-light">GUATILLA</span>
            </Link>
            <p className="text-sm text-brand-coffee/60 leading-relaxed max-w-xs">
              Premium specialty coffee directly from our farms in Colombia to your home in Europe.
            </p>
            <div className="flex space-x-4 text-brand-coffee/40">
              <Link href="#" className="hover:text-brand-terracotta transition-colors"><Instagram size={20} /></Link>
              <Link href="#" className="hover:text-brand-terracotta transition-colors"><Linkedin size={20} /></Link>
              <Link href="#" className="hover:text-brand-terracotta transition-colors"><Facebook size={20} /></Link>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-brand-coffee">Navigation</h4>
            <ul className="space-y-4 text-sm text-brand-coffee/70">
              <li><Link href="/" className="hover:text-brand-terracotta transition-colors">Home</Link></li>
              <li><Link href="#about" className="hover:text-brand-terracotta transition-colors">About</Link></li>
              <li><Link href="#origen" className="hover:text-brand-terracotta transition-colors">Origen</Link></li>
              <li><Link href="#shop" className="hover:text-brand-terracotta transition-colors">Shop</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-brand-coffee">Transparency</h4>
            <ul className="space-y-4 text-sm text-brand-coffee/70">
              <li><Link href="#transparencia" className="hover:text-brand-terracotta transition-colors">Our Model</Link></li>
              <li><Link href="#transparencia" className="hover:text-brand-terracotta transition-colors">Fair Trade</Link></li>
              <li><Link href="#contact" className="hover:text-brand-terracotta transition-colors">Contact</Link></li>
              <li><Link href="#" className="hover:text-brand-terracotta transition-colors">FAQs</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-brand-coffee">Legal info</h4>
            <div className="text-sm text-brand-coffee/70 space-y-4">
              <p>Guatilla AS (Norway)</p>
              <p>Organization No: 123 456 789</p>
              <ul className="space-y-4">
                <li><Link href="#" className="hover:text-brand-terracotta transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-brand-terracotta transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

        </div>

        <div className="mt-20 pt-8 border-t border-brand-coffee/5 flex flex-col md:flex-row justify-between items-center text-xs text-brand-coffee/40 tracking-widest uppercase font-bold">
          <p>© {new Date().getFullYear()} KAFFE GUATILLA. ALL RIGHTS RESERVED.</p>
          <p className="mt-4 md:mt-0">DESIGNED BY Guatilla AS</p>
        </div>
      </div>
    </footer>
  );
}
