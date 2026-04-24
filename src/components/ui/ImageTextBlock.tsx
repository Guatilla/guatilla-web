import React from "react";
import Image from "next/image";

interface ImageTextBlockProps {
  title: string;
  description: React.ReactNode;
  imageSrc: string;
  imageAlt: string;
  reverse?: boolean;
  children?: React.ReactNode;
}

export default function ImageTextBlock({
  title,
  description,
  imageSrc,
  imageAlt,
  reverse = false,
  children,
}: ImageTextBlockProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
      <div className={`relative h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-xl ${reverse ? "lg:order-2" : "lg:order-1"}`}>
        <Image 
          src={imageSrc} 
          alt={imageAlt} 
          fill 
          className="object-cover hover:scale-105 transition-transform duration-700" 
        />
      </div>
      <div className={`space-y-8 ${reverse ? "lg:order-1" : "lg:order-2"}`}>
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-brand-coffee leading-tight">
            {title}
          </h2>
          <div className="text-lg text-brand-coffee/70 font-light leading-relaxed">
            {description}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
