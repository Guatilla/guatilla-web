import React from "react";
import { LucideIcon } from "lucide-react";
import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";

interface TimelineStepProps {
  number: number;
  title: string;
  description: string;
  isLast?: boolean;
  icon?: LucideIcon;
}

export default function TimelineStep({
  number,
  title,
  description,
  isLast = false,
  icon: Icon,
}: TimelineStepProps) {
  return (
    <div
      className={`group relative grid grid-cols-[56px_1fr_90px] gap-6 py-8 transition-all duration-300 md:grid-cols-[72px_1fr_120px] md:gap-8 ${
        !isLast ? "border-b border-brand-coffee/10" : ""
      }`}
    >
      {!isLast && (
        <div className="absolute left-[28px] top-[72px] h-full w-px bg-brand-terracotta/20 md:left-[36px]" />
      )}

      <div className="relative z-10 flex w-[56px] justify-center md:w-[72px]">
        <div className="flex size-14 items-center justify-center rounded-full border border-brand-coffee/15 bg-brand-cream font-heading text-xl font-bold text-brand-coffee shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:border-brand-terracotta group-hover:bg-brand-terracotta group-hover:text-white md:size-[72px] md:text-2xl">
          {number}
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <Heading
          variant="h3"
          className="leading-tight tracking-tight text-brand-coffee"
        >
          {title}
        </Heading>

        <Text className="mt-3 max-w-xl text-[15px] leading-relaxed text-brand-coffee/65 md:text-base">
          {description}
        </Text>
      </div>

      <div className="hidden items-center justify-center text-brand-coffee/30 transition-colors duration-300 group-hover:text-brand-terracotta md:flex">
        {Icon && <Icon size={54} strokeWidth={1.2} />}
      </div>
    </div>
  );
}
