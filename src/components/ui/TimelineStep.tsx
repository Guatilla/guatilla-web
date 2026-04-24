import React from "react";

interface TimelineStepProps {
  number: number;
  title: string;
  description: string;
  isLast?: boolean;
}

export default function TimelineStep({
  number,
  title,
  description,
  isLast = false,
}: TimelineStepProps) {
  return (
    <div className="flex group">
      <div className="flex flex-col items-center mr-6 md:mr-10">
        <div className="flex-shrink-0 flex items-center justify-center size-10 md:size-12 rounded-full border-2 border-brand-terracotta bg-brand-linen text-brand-terracotta font-heading font-bold text-lg md:text-xl z-10 transition-colors group-hover:bg-brand-terracotta group-hover:text-white aspect-square">
          {number}
        </div>
        {!isLast && (
          <div className="w-0.5 h-full bg-brand-coffee/10 group-hover:bg-brand-terracotta/30 transition-colors my-2"></div>
        )}
      </div>
      <div className={`pb-12 ${isLast ? "pb-0" : ""}`}>
        <h3 className="text-xl md:text-2xl font-heading font-bold text-brand-coffee mb-2">{title}</h3>
        <p className="text-brand-coffee/70 font-light leading-relaxed max-w-xl">{description}</p>
      </div>
    </div>
  );
}
