import React from "react";
import { LucideIcon } from "lucide-react";

interface CardProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  tag?: string;
  className?: string;
}

export default function Card({
  title,
  description,
  icon: Icon,
  tag,
  className = "",
}: CardProps) {
  return (
    <div className={`bg-white/60 backdrop-blur-sm border border-brand-coffee/10 p-8 flex flex-col items-start transition-all duration-300 hover:shadow-lg ${className}`}>
      {Icon && (
        <div className="mb-6 text-brand-terracotta">
          <Icon size={32} strokeWidth={1.5} />
        </div>
      )}
      
      {tag && (
        <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold uppercase tracking-wider text-brand-coffee bg-brand-coffee/10 rounded-full">
          {tag}
        </span>
      )}
      
      <h3 className="text-xl md:text-2xl font-heading font-bold text-brand-coffee mb-4">
        {title}
      </h3>
      
      {description && (
        <p className="text-brand-coffee/70 font-light leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
