"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";
import slide01 from "../../public/assets/hero-guatilla-01.jpg";
import slide02 from "../../public/assets/hero-guatilla-02.jpeg";
import slide03 from "../../public/assets/hero-guatilla-03.jpeg";
import slide04 from "../../public/assets/hero-guatilla-04.jpg";
import slide05 from "../../public/assets/hero-guatilla-05.jpg";

const SLIDE_INTERVAL_MS = 5_000;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onStoreChange: () => void) {
  const motionPreference = window.matchMedia(REDUCED_MOTION_QUERY);
  motionPreference.addEventListener("change", onStoreChange);

  return () => motionPreference.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getReducedMotionServerSnapshot() {
  return true;
}

interface Slide {
  src: StaticImageData;
  alt: string;
  objectPosition: string;
}

const SLIDES: Slide[] = [
  {
    src: slide01,
    alt: "To barn fra familien går over kaffe som tørker i solen i Agustín Codazzi",
    objectPosition: "center 58%",
  },
  {
    src: slide02,
    alt: "Familiemedlemmer med nyplukkede kaffebær på en av gårdene",
    objectPosition: "center 48%",
  },
  {
    src: slide03,
    alt: "To barn fra familien sitter blant sekker med kaffe",
    objectPosition: "center 46%",
  },
  {
    src: slide04,
    alt: "Familien frakter kaffehøsten ned fra fjellgården med muldyr",
    objectPosition: "center 50%",
  },
  {
    src: slide05,
    alt: "Et familiemedlem undersøker modne kaffebær på gården",
    objectPosition: "center 50%",
  },
];

export default function HeroFarmCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
  const isAutoplayPaused = isPaused || prefersReducedMotion;

  useEffect(() => {
    if (isAutoplayPaused || isHovered) return;

    const timer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % SLIDES.length);
    }, SLIDE_INTERVAL_MS);

    return () => window.clearTimeout(timer);
  }, [activeIndex, isAutoplayPaused, isHovered]);

  return (
    <div
      className="absolute inset-0"
      role="region"
      aria-label="Bilder fra familiegårdene"
      aria-roledescription="karusell"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {SLIDES.map((slide, index) => {
        const isActive = index === activeIndex;

        return (
          <Image
            key={slide.src.src}
            src={slide.src}
            alt={isActive ? slide.alt : ""}
            aria-hidden={!isActive}
            fill
            priority={index === 0}
            className={`object-cover transition-opacity duration-700 motion-reduce:transition-none ${
              isActive ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            style={{ objectPosition: slide.objectPosition }}
            sizes="(max-width: 880px) 100vw, 40vw"
          />
        );
      })}

      <div
        className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 border border-brand-cream/70 bg-brand-coffee/80 px-2 py-1.5 text-brand-cream backdrop-blur-sm"
        aria-label="Velg bilde"
      >
        {SLIDES.map((slide, index) => (
          <button
            key={slide.src.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Vis bilde ${index + 1} av ${SLIDES.length}`}
            aria-current={index === activeIndex ? "true" : undefined}
            className={`h-2.5 w-2.5 rounded-full border border-brand-cream transition-colors motion-reduce:transition-none ${
              index === activeIndex ? "bg-brand-gold" : "bg-transparent hover:bg-brand-cream/60"
            }`}
          />
        ))}
        <span className="mx-0.5 h-4 w-px bg-brand-cream/50" aria-hidden="true" />
        <button
          type="button"
          onClick={() => setIsPaused((current) => !current)}
          className="px-1 font-sans text-[9px] font-bold uppercase tracking-[0.1em] hover:text-brand-gold"
          aria-label={
            prefersReducedMotion
              ? "Automatisk bildefremvisning er slått av fordi redusert bevegelse er aktivert"
              : isPaused
                ? "Start bildefremvisningen"
                : "Sett bildefremvisningen på pause"
          }
          disabled={prefersReducedMotion}
        >
          {prefersReducedMotion ? "Manuell" : isPaused ? "Spill av" : "Pause"}
        </button>
      </div>
    </div>
  );
}
