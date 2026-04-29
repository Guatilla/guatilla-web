import React from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import NavLink from "./NavLink";
import { NAV_LINKS } from "@/lib/routes";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-brand-linen flex flex-col animate-in fade-in slide-in-from-top duration-500">
      <div className="flex justify-between items-center px-6 py-5 border-b border-brand-coffee/5 bg-white">
        <div className="w-10" />

        <Link
          href="/"
          onClick={onClose}
          className="active:scale-95 transition-transform"
        >
          <Image
            src="/KAFFE-GUATILLA.png"
            alt="Kaffe Guatilla"
            width={100}
            height={80}
            className="h-[70px] w-auto object-contain"
            priority
          />
        </Link>

        <button
          onClick={onClose}
          className="p-2 text-brand-coffee hover:text-brand-terracotta transition-colors"
          aria-label="Close menu"
        >
          <X size={30} />
        </button>
      </div>

      <div className="flex-grow overflow-y-auto px-10 py-12 flex flex-col items-center text-center">
        <nav className="flex flex-col w-full space-y-6">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} href={link.href} onClick={onClose} className="text-3xl font-semibold tracking-tight normal-case py-2 border-b border-brand-coffee/5">
              {link.label}
            </NavLink>
          ))}
          <NavLink href="/journal" onClick={onClose} className="text-3xl font-semibold tracking-tight normal-case py-2 border-b border-brand-coffee/5">
            Feltjournal
          </NavLink>
        </nav>

        <div className="mt-12 flex flex-col items-center">
          <div className="scale-105">
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      <div className="px-8 py-8 border-t border-brand-coffee/5 bg-white/40">
        <p className="text-center text-sm font-medium text-brand-coffee/60 italic">
          &quot;Direkte handel med colombiansk kaffe til Europa&quot;
        </p>
      </div>
    </div>
  );
}
