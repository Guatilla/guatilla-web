"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function NavLink({ href, children, onClick, className = "" }: NavLinkProps) {
  const pathname = usePathname();
  
  // Logic to determine if active
  // 1. Exact match for /
  // 2. Starts with href for other routes (to handle subpages if any)
  // 3. Origen and Project Progress specific checks
  const isActive = 
    (href === "/" && pathname === "/") || 
    (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`relative text-sm font-bold tracking-widest uppercase transition-all duration-300 group py-2 ${
        isActive ? "text-brand-terracotta" : "text-brand-coffee hover:text-brand-terracotta"
      } ${className}`}
    >
      {children}
      {/* Animated underline */}
      <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-brand-terracotta transform transition-transform duration-300 ${
        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
      }`} />
    </Link>
  );
}
