import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface EditorialImageCardProps {
  image: string;
  alt: string;
  title?: string;
  description?: string;
  variant?: "default" | "large";
  grayscale?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export default function EditorialImageCard({
  image,
  alt,
  title,
  description,
  variant = "default",
  grayscale = true,
  className,
  children,
}: EditorialImageCardProps) {
  return (
    <div 
      className={cn(
        "group transition-all duration-500 ease-out hover:scale-[1.01] flex flex-col h-full",
        "bg-brand-cream border border-brand-coffee/10 rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.05)]",
        className
      )}
    >
      <div className={cn(
        "relative overflow-hidden shrink-0",
        variant === "large" ? "aspect-[3/4]" : "aspect-[4/5]"
      )}>
        <Image
          src={image}
          alt={alt}
          fill
          className={cn(
            "object-cover transition-all duration-700 ease-out",
            grayscale && "grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100"
          )}
        />
      </div>
      {(title || description || children) && (
        <div className="p-8 space-y-4 flex-grow">
          {title && (
            <h3 className="font-heading text-3xl text-brand-coffee">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-sm text-brand-coffee/60 leading-relaxed font-sans">
              {description}
            </p>
          )}
          {children && (
            <div className="pt-4 mt-4 border-t border-brand-coffee/10">
              {children}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
