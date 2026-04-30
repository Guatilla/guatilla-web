import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "featured" | "limited" | "new";
  className?: string;
}

export default function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  const variants = {
    default: "bg-brand-coffee text-white",
    featured: "bg-brand-coffee text-white",
    limited: "bg-brand-vichy text-white",
    new: "bg-brand-olive text-white",
  };

  return (
    <span
      className={`inline-block px-3 py-1 text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-full shadow-sm ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
