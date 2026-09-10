import React from "react";

/**
 * Stoff-etikett sydd på en stiplet søm — samme seksjonsskille som «Om oss».
 */
export default function Seam({ label }: { label: string }) {
  return (
    <div className="relative border-t-[2.5px] border-dashed border-[color:rgba(60,42,33,0.32)]">
      <span className="stitch pop-sm absolute -top-[24px] left-6 -rotate-[1.4deg] whitespace-nowrap bg-brand-cream px-[22px] py-[10px] font-heading text-[19px] font-bold tracking-tight text-brand-coffee sm:left-9 sm:text-[21px]">
        {label}
      </span>
    </div>
  );
}
