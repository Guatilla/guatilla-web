import React from "react";
import Image from "next/image";
import { MapPin, Calendar, Camera, Video, Info } from "lucide-react";

interface FieldRecordCardProps {
  title: string;
  type: "Bilde" | "Video" | "Bilde / Video";
  status: string;
  date: string;
  location: string;
  mediaSrc: string;
  isFeatured?: boolean;
}

export default function FieldRecordCard({
  title,
  type,
  status,
  date,
  location,
  mediaSrc,
  isFeatured = false,
}: FieldRecordCardProps) {
  const isVideo = type.includes("Video");

  return (
    <div className="bg-transparent border border-brand-coffee/10 flex flex-col transition-colors duration-300 hover:border-brand-coffee/30">
      <div className={`relative w-full bg-brand-cream border-b border-brand-coffee/10 ${isFeatured ? "h-80" : "h-60"}`}>
        <Image 
          src={mediaSrc} 
          alt={title} 
          fill 
          className="object-cover grayscale-[20%]" 
        />
        <div className="absolute top-3 right-3 bg-brand-linen/90 backdrop-blur-sm px-2.5 py-1 border border-brand-coffee/10 flex items-center gap-1.5 text-brand-coffee text-[10px] font-bold tracking-widest uppercase">
          {isVideo ? <Video size={12} /> : <Camera size={12} />}
          <span>{type}</span>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow space-y-4 bg-brand-linen/50">
        <div>
          <h3 className={`font-heading font-bold text-brand-coffee mb-1 ${isFeatured ? "text-2xl" : "text-xl"}`}>
            {title}
          </h3>
        </div>

        <div className="space-y-2.5 mt-auto pt-3 border-t border-brand-coffee/10">
          <div className="flex items-center gap-2 text-xs text-brand-coffee/80">
            <MapPin size={14} className="text-brand-terracotta flex-shrink-0" />
            <span className="font-bold uppercase tracking-wider">Sted:</span>
            <span className="font-medium">{location}</span>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-brand-coffee/80">
            <Info size={14} className="text-brand-olive flex-shrink-0" />
            <span className="font-bold uppercase tracking-wider">Status:</span>
            <span className="font-medium">{status}</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-brand-coffee/80">
            <Calendar size={14} className="text-brand-coffee/50 flex-shrink-0" />
            <span className="font-bold uppercase tracking-wider">Dato:</span>
            <span className="font-medium">{date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
