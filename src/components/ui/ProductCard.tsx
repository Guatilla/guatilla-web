import React from "react";
import Image from "next/image";

interface ProductCardProps {
  id: string | number;
  name: string;
  subtitle: string;
  price: number;
  currency?: string;
  imageSrc: string;
  badge?: "Featured" | "Limited" | "Best Seller" | "New" | "Bestselger" | "Begrenset" | "Anbefalt" | "Ny";
}

export default function ProductCard({
  name,
  subtitle,
  price,
  currency = "NOK",
  imageSrc,
  badge
}: ProductCardProps) {
  
  // Badge styling logic
  // Badge styling logic
  let badgeColor = "bg-brand-coffee text-white"; // default
  let displayBadge = badge;
  if (badge === "Best Seller" || badge === "Bestselger") {
    badgeColor = "bg-brand-terracotta text-white";
    displayBadge = "Bestselger";
  }
  else if (badge === "Limited" || badge === "Begrenset") {
    badgeColor = "bg-brand-vichy text-white";
    displayBadge = "Begrenset";
  }
  else if (badge === "Featured" || badge === "Anbefalt") {
    badgeColor = "bg-brand-olive text-white";
    displayBadge = "Anbefalt";
  }
  else if (badge === "New" || badge === "Ny") {
    badgeColor = "bg-brand-olive text-white";
    displayBadge = "Ny";
  }

  return (
    <div className="group bg-brand-cream rounded-[30px] p-6 lg:p-8 flex flex-col h-full border border-brand-coffee/5 transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] hover:shadow-[0_8px_30px_rgba(60,42,33,0.06)] hover:-translate-y-1 relative">
      
      {/* Optional Badge */}
      {badge && (
        <div className={`absolute top-6 left-6 z-20 px-3 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-full shadow-sm ${badgeColor}`}>
          {displayBadge}
        </div>
      )}
      
      {/* Image Container: Clean cream background, NO patchwork behind the product */}
      <div className="relative w-full aspect-[4/5] bg-transparent flex items-center justify-center mb-6 overflow-hidden">
        
        {/* Soft shadow anchor for the bag */}
        <div className="absolute bottom-10 w-2/3 h-6 bg-black/5 blur-xl rounded-[100%] transition-opacity duration-300 group-hover:opacity-60"></div>

        <Image 
          src={imageSrc} 
          alt={name} 
          width={400} 
          height={500}
          className="w-full h-[110%] object-contain filter drop-shadow-[0_15px_25px_rgba(60,42,33,0.08)] transform transition-transform duration-500 ease-out group-hover:scale-105 group-hover:-translate-y-1 z-10"
        />
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col justify-between pt-2">
        <div className="space-y-2 mb-6 text-center">
          <h3 className="text-2xl lg:text-3xl font-heading font-bold text-brand-coffee">{name}</h3>
          <p className="text-sm font-medium text-brand-coffee/60 uppercase tracking-widest">{subtitle}</p>
        </div>

        <div className="mt-auto space-y-5">
          <div className="flex items-end justify-center">
            <span className="text-2xl font-bold text-brand-coffee">{price}</span>
            <span className="text-sm font-bold text-brand-coffee/60 ml-1 mb-1">{currency}</span>
          </div>

          <button className="w-full py-4 rounded-full border-2 border-brand-coffee/10 bg-transparent text-brand-coffee font-bold tracking-widest uppercase text-sm transition-all duration-300 hover:border-brand-terracotta hover:bg-brand-terracotta hover:text-white hover:shadow-md">
            Legg i handlekurv
          </button>
        </div>
      </div>
    </div>
  );
}
