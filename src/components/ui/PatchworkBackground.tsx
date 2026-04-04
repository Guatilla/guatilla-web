import React from "react";
import Image from "next/image";

interface PatchworkBackgroundProps {
  className?: string;
  variant?: 'border' | 'corner' | 'divider' | 'partial-bg' | 'frame';
  intensity?: 'vivid' | 'soft' | 'faded'; // Affects desaturation and opacity
  opacity?: number;
  blur?: 'none' | 'sm' | 'md' | 'lg';
  position?: string; // Optional custom position classes (e.g., 'top-0 right-0')
}

export default function PatchworkBackground({
  className = "",
  variant = 'partial-bg',
  intensity = 'soft',
  opacity = 0.2, // Default to subtle (20%)
  blur = 'sm',
  position = "inset-0",
}: PatchworkBackgroundProps) {
  
  // 1. Determine Desaturation intensity based on brand rules (60-75% desaturated normally)
  let saturationClass = "saturate-50 contrast-75"; // Default soft
  if (intensity === 'vivid') saturationClass = "saturate-100 contrast-100";
  if (intensity === 'faded') saturationClass = "saturate-0 contrast-50 opacity-50";

  // 2. Determine Blur level to keep it moving towards an editorial texture rather than a loud wallpaper
  let blurClass = "";
  if (blur === 'sm') blurClass = "blur-[2px]";
  if (blur === 'md') blurClass = "blur-[4px]";
  if (blur === 'lg') blurClass = "blur-md";

  // 3. Size constraints based on variant so it doesn't take over 100% of the screen
  let variantConstraints = "w-full h-full";
  if (variant === 'border') variantConstraints = "w-full h-8";
  if (variant === 'corner') variantConstraints = "w-64 h-64 rounded-bl-[100px]"; // Example organic corner
  if (variant === 'divider') variantConstraints = "w-full h-16";
  if (variant === 'frame') variantConstraints = "inset-0 w-full h-full border-8 border-transparent"; // Handled by parent generally

  return (
    <div className={`absolute ${position} ${variantConstraints} overflow-hidden pointer-events-none z-0 ${className}`} style={{ opacity }}>
      {/* 
        The primary patchwork source. 
        Using object-cover and applying our editorial desaturation/blur rules. 
      */}
      <Image
        src="/GUATILLA-01.png"
        alt="Vintage Patchwork Texture"
        fill
        className={`object-cover object-center ${saturationClass} ${blurClass}`}
        priority={variant === 'partial-bg'}
      />
      
      {/* Crucial: A translucent cream overlay to push it back and make it a texture, not a focal point */}
      <div className="absolute inset-0 bg-brand-cream/40 mix-blend-overlay"></div>
    </div>
  );
}
