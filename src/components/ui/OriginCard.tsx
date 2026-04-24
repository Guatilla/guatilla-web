import React from "react";
import Image from "next/image";

interface OriginCardProps {
  title: string;
  description: string;
  imageSrc?: string;
  icon?: React.ReactNode;
  className?: string;
}

export default function OriginCard({
  title,
  description,
  imageSrc,
  icon,
  className = "",
}: OriginCardProps) {
  return (
    <div className={`bg-white p-8 rounded-2xl shadow-sm border border-brand-coffee/5 flex flex-col space-y-6 transition-all duration-300 hover:shadow-md hover:-translate-y-1 ${className}`}>
      {imageSrc ? (
        <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4">
          <Image src={imageSrc} alt={title} fill className="object-cover" />
        </div>
      ) : icon ? (
        <div className="flex-shrink-0 text-brand-terracotta size-12 flex items-center justify-center bg-brand-linen rounded-full mb-2 aspect-square">
          {icon}
        </div>
      ) : null}
      
      <div className="space-y-3">
        <h3 className="text-2xl font-heading font-bold text-brand-coffee">{title}</h3>
        <p className="text-brand-coffee/70 font-light leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
