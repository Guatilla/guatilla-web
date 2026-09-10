import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "featured" | "limited" | "new" | "origin" | "process" | "impact";
  className?: string;
}

export default function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  const variants = {
    default: "bg-brand-coffee text-brand-cream",
    featured: "bg-brand-gold text-brand-coffee",
    limited: "bg-brand-terracotta-dark text-brand-cream",
    new: "bg-brand-olive text-brand-cream",

    origin: "bg-brand-olive text-brand-cream",
    process: "bg-brand-coffee text-brand-cream",
    impact: "bg-brand-terracotta text-white",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] shadow-sm md:text-xs ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}