import React from "react";
import Link from "next/link";

/**
 * En «lappe» i lappeteppe-språket: farget felt (5px) rundt en indre boks med
 * 1.5px stiplet «søm». Fast, liten helning som rettes ut på hover/fokus.
 * Ingen radius, ingen skygge, ingen gradient. Tekst i full opasitet.
 */

export type PatchTone = "ink" | "cream";

const BORDER: Record<PatchTone, string> = {
  ink: "border-[color:rgba(60,42,33,0.55)]",
  cream: "border-[color:rgba(253,252,248,0.6)]",
};

const TEXT: Record<PatchTone, string> = {
  ink: "text-brand-coffee",
  cream: "text-brand-cream",
};

export interface PatchProps {
  /** Tailwind bakgrunnsklasse, f.eks. "bg-brand-orange" */
  bg: string;
  tone: PatchTone;
  /** Fast helning i grader (aldri tilfeldig) */
  tilt: number;
  href?: string;
  /** Ekstra klasser på det ytre lappe-feltet (flex-basis o.l.) */
  outerClassName?: string;
  /** Klasser på den indre, stiplede boksen — sett padding og justering her. */
  className?: string;
  children: React.ReactNode;
}

export default function Patch({
  bg,
  tone,
  tilt,
  href,
  outerClassName = "",
  className = "",
  children,
}: PatchProps) {
  const outer = [
    "group block h-full p-[5px]",
    bg,
    outerClassName,
    "[transform:rotate(var(--tilt))]",
    "hover:[transform:rotate(0deg)] focus-visible:[transform:rotate(0deg)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-coffee focus-visible:ring-offset-2 focus-visible:ring-offset-brand-linen",
    "motion-safe:[transition:transform_250ms_ease]",
  ].join(" ");

  const inner = [
    "flex h-full flex-col border-[1.5px] border-dashed",
    BORDER[tone],
    TEXT[tone],
    className,
  ].join(" ");

  const style = { "--tilt": `${tilt}deg` } as React.CSSProperties;
  const content = <span className={inner}>{children}</span>;

  return href ? (
    <Link href={href} className={outer} style={style}>
      {content}
    </Link>
  ) : (
    <div className={outer} style={style}>
      {content}
    </div>
  );
}

/** Faste helninger, syklet etter posisjon. */
export const PATCH_TILTS = [-1.4, 1.1, -0.9, 1.5];
