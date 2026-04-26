import React from "react";
import Image from "next/image";
import { MapPin, Info, Calendar } from "lucide-react";

interface EditorialBlockProps {
  title: string;
  description: string;
  imageSrc: string;
  location: string;
  status: string;
  date: string;
  reverse?: boolean;
}

export default function EditorialBlock({
  title,
  description,
  imageSrc,
  location,
  status,
  date,
  reverse = false,
}: EditorialBlockProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center py-12 md:py-16">
      {/* Image Container */}
      <div className={`relative h-[500px] lg:h-[650px] w-full border border-brand-coffee/10 bg-brand-cream ${reverse ? "lg:order-2" : "lg:order-1"}`}>
        <Image 
          src={imageSrc} 
          alt={title} 
          fill 
          className="object-cover contrast-105 sepia-[.02]" 
        />
        {/* Subtle decorative corners to enhance the editorial/print feel */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-brand-coffee/30 -translate-x-1 -translate-y-1" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-brand-coffee/30 translate-x-1 translate-y-1" />
      </div>
      
      {/* Text Content */}
      <div className={`space-y-10 ${reverse ? "lg:order-1" : "lg:order-2"}`}>
        <div className="space-y-4">
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-brand-coffee leading-tight">
            {title}
          </h3>
          <p className="text-lg md:text-xl text-brand-coffee/75 font-light leading-relaxed max-w-lg">
            {description}
          </p>
        </div>

        {/* Editorial Metadata Block */}
        <div className="pt-8 border-t border-brand-coffee/10 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-brand-coffee/50 mb-1">
              <MapPin size={14} className="text-brand-terracotta" />
              <span className="text-[10px] font-bold tracking-widest uppercase">Sted</span>
            </div>
            <p className="text-sm font-medium text-brand-coffee/90">{location}</p>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-brand-coffee/50 mb-1">
              <Info size={14} className="text-brand-olive" />
              <span className="text-[10px] font-bold tracking-widest uppercase">Status</span>
            </div>
            <p className="text-sm font-medium text-brand-coffee/90">{status}</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-brand-coffee/50 mb-1">
              <Calendar size={14} className="text-brand-coffee/40" />
              <span className="text-[10px] font-bold tracking-widest uppercase">Dato</span>
            </div>
            <p className="text-sm font-medium text-brand-coffee/90">{date}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
