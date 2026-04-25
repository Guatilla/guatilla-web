import React from "react";
import { ArrowRight, ArrowDown } from "lucide-react";

interface TimelineFlowProps {
  steps: string[];
}

export default function TimelineFlow({ steps }: TimelineFlowProps) {
  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2">
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <div className="flex-1 flex justify-center items-center py-4 px-6 bg-white/50 border border-brand-coffee/10 rounded-sm text-center">
            <span className="text-sm md:text-base font-semibold text-brand-coffee uppercase tracking-wider">
              {step}
            </span>
          </div>
          
          {index < steps.length - 1 && (
            <div className="flex-shrink-0 text-brand-terracotta/50 p-2">
              <ArrowRight className="hidden md:block" size={24} />
              <ArrowDown className="block md:hidden" size={24} />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
