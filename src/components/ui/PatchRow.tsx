import React from "react";
import Patch, { PatchTone, PATCH_TILTS } from "./Patch";

export interface PatchRowItem {
  label: string;
  /** Tailwind bakgrunnsklasse, f.eks. "bg-brand-orange" */
  bg: string;
  tone: PatchTone;
  href?: string;
}

/**
 * En rad med farge-lapper — kun kategorinavnet, ingen tall, ikoner eller piler.
 * 4 like felt på brede skjermer, 2 under ~900px, 1 under ~560px.
 */
export default function PatchRow({ items }: { items: PatchRowItem[] }) {
  return (
    <div className="flex flex-wrap gap-4">
      {items.map((item, i) => (
        <Patch
          key={`${i}-${item.label}`}
          bg={item.bg}
          tone={item.tone}
          tilt={PATCH_TILTS[i % PATCH_TILTS.length]}
          href={item.href}
          outerClassName="basis-full grow min-[560px]:basis-[calc(50%_-_8px)] min-[900px]:basis-0"
          className="items-center justify-center px-5 py-6 text-center"
        >
          <span className="block font-heading text-[20px] font-extrabold leading-none">
            {item.label}
          </span>
        </Patch>
      ))}
    </div>
  );
}
