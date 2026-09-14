"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useLocale } from "@/i18n/LocaleProvider";
import type { Locale } from "@/i18n/config";
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
  alt: Record<Locale, string>;
  objectPosition: string;
}

const SLIDES: Slide[] = [
  {
    src: slide01,
    alt: {
      no: "To barn fra familien går over kaffe som tørker i solen i Agustín Codazzi",
      en: "Two children from the family walk across coffee drying in the sun in Agustín Codazzi",
      es: "Dos niños de la familia caminan junto al café que se seca al sol en Agustín Codazzi",
    },
    objectPosition: "center 58%",
  },
  {
    src: slide02,
    alt: {
      no: "Familiemedlemmer med nyplukkede kaffebær på en av gårdene",
      en: "Family members hold freshly picked coffee cherries on one of the farms",
      es: "Miembros de la familia con cerezas de café recién recolectadas en una de las fincas",
    },
    objectPosition: "center 48%",
  },
  {
    src: slide03,
    alt: {
      no: "To barn fra familien sitter blant sekker med kaffe",
      en: "Two children from the family sit among bags of coffee",
      es: "Dos niños de la familia sentados entre sacos de café",
    },
    objectPosition: "center 46%",
  },
  {
    src: slide04,
    alt: {
      no: "Familien frakter kaffehøsten ned fra fjellgården med muldyr",
      en: "The family transports the coffee harvest down from the mountain farm by mule",
      es: "La familia transporta la cosecha desde la finca de montaña en mulas",
    },
    objectPosition: "center 50%",
  },
  {
    src: slide05,
    alt: {
      no: "Et familiemedlem undersøker modne kaffebær på gården",
      en: "A family member inspects ripe coffee cherries on the farm",
      es: "Un miembro de la familia revisa cerezas maduras de café en la finca",
    },
    objectPosition: "center 50%",
  },
];

const CAROUSEL_COPY = {
  no: {
    region: "Bilder fra familiegårdene",
    description: "karusell",
    select: "Velg bilde",
    show: (index: number, total: number) => `Vis bilde ${index} av ${total}`,
    reducedMotion:
      "Automatisk bildefremvisning er slått av fordi redusert bevegelse er aktivert",
    play: "Start bildefremvisningen",
    pause: "Sett bildefremvisningen på pause",
    manual: "Manuell",
    playLabel: "Spill av",
    pauseLabel: "Pause",
  },
  en: {
    region: "Photos from the family farms",
    description: "carousel",
    select: "Choose image",
    show: (index: number, total: number) => `Show image ${index} of ${total}`,
    reducedMotion:
      "Automatic slideshow is disabled because reduced motion is enabled",
    play: "Start slideshow",
    pause: "Pause slideshow",
    manual: "Manual",
    playLabel: "Play",
    pauseLabel: "Pause",
  },
  es: {
    region: "Fotos de las fincas familiares",
    description: "carrusel",
    select: "Elegir imagen",
    show: (index: number, total: number) => `Mostrar imagen ${index} de ${total}`,
    reducedMotion:
      "La presentación automática está desactivada porque el movimiento reducido está activo",
    play: "Iniciar presentación",
    pause: "Pausar presentación",
    manual: "Manual",
    playLabel: "Reproducir",
    pauseLabel: "Pausa",
  },
} as const;

export default function HeroFarmCarousel() {
  const locale = useLocale();
  const copy = CAROUSEL_COPY[locale];
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
      aria-label={copy.region}
      aria-roledescription={copy.description}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {SLIDES.map((slide, index) => {
        const isActive = index === activeIndex;

        return (
          <Image
            key={slide.src.src}
            src={slide.src}
            alt={isActive ? slide.alt[locale] : ""}
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
        aria-label={copy.select}
      >
        {SLIDES.map((slide, index) => (
          <button
            key={slide.src.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={copy.show(index + 1, SLIDES.length)}
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
              ? copy.reducedMotion
              : isPaused
                ? copy.play
                : copy.pause
          }
          disabled={prefersReducedMotion}
        >
          {prefersReducedMotion
            ? copy.manual
            : isPaused
              ? copy.playLabel
              : copy.pauseLabel}
        </button>
      </div>
    </div>
  );
}
