"use client";

import Link from "./LocalizedLink";
import Image from "next/image";
import FooterNewsletter from "@/components/patchwork/FooterNewsletter";
import { useLocale } from "@/i18n/LocaleProvider";
import { SHARED_COPY } from "@/i18n/copy";
import { usePathname } from "next/navigation";
import { stripLocaleFromPathname } from "@/i18n/config";

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold";

function IgIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17" cy="7" r="1" />
    </svg>
  );
}

function FbIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8a1 1 0 0 1 1-1Z" />
    </svg>
  );
}

export default function Footer() {
  const locale = useLocale();
  const copy = SHARED_COPY[locale];
  const pathname = usePathname();
  const pathnameWithoutLocale = stripLocaleFromPathname(pathname);
  const columns = [
    {
      heading: copy.footer.shop,
      links: [
        { href: "/shop", label: copy.footer.wholeBean },
        { href: "/shop", label: copy.footer.ground },
        { href: "/shop", label: "Café de Montaña" },
        { href: "/shop", label: "Café Especial" },
      ],
    },
    {
      heading: copy.footer.guatilla,
      links: [
        { href: "/about", label: copy.footer.about },
        { href: "/origen", label: copy.footer.origin },
        { href: "/journal", label: copy.footer.journal },
        { href: "/sporbarhet", label: copy.footer.traceability },
      ],
    },
    {
      heading: copy.footer.help,
      links: [
        { href: "/contact", label: copy.footer.shippingReturns },
        { href: "/contact", label: copy.footer.contact },
        { href: "/about", label: copy.footer.terms },
        { href: "/about", label: copy.footer.privacy },
      ],
    },
  ];

  if (pathnameWithoutLocale.startsWith("/admin")) return null;

  return (
    <footer className="bg-brand-coffee">
      {/* 1) binding strip — the only patchwork gesture */}
      <div
        aria-hidden="true"
        className="grid h-[10px] grid-cols-[1.6fr_1fr_1.2fr_0.8fr]"
      >
        <span className="bg-brand-orange" />
        <span className="bg-brand-gold" />
        <span className="bg-brand-olive" />
        <span className="bg-brand-vichy" />
      </div>

      {/* 2) body */}
      <div className="container-frame pb-7 pt-[52px]">
        <div className="grid grid-cols-1 gap-x-11 gap-y-10 min-[620px]:grid-cols-3 min-[1000px]:grid-cols-[1.5fr_0.75fr_0.75fr_0.75fr] min-[1000px]:items-start min-[1000px]:gap-11">
          {/* brand column */}
          <div className="min-[620px]:col-span-3 min-[1000px]:col-span-1">
            <Link
              href="/"
              aria-label={copy.accessibility.home}
              className={`flex items-center gap-3 ${FOCUS}`}
            >
              <Image
                src="/guatilla-emblem.webp"
                alt=""
                width={48}
                height={48}
                className="h-10 w-10 shrink-0 object-contain"
              />
              <span className="font-heading text-[22px] font-extrabold italic leading-none text-brand-cream">
                Kaffe Guatilla
              </span>
            </Link>

            <p className="mt-5 max-w-[30ch] font-sans text-[15.5px] leading-[1.6] text-brand-linen">
              {copy.footer.intro}
            </p>

            <FooterNewsletter />
          </div>

          {/* link columns */}
          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="border-b-2 border-dashed border-[color:rgba(217,164,65,0.65)] pb-3 font-sans text-[10.5px] font-bold uppercase tracking-[0.16em] text-brand-gold">
                {col.heading}
              </h3>
              <div className="mt-4 flex flex-col items-start gap-2.5">
                {col.links.map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    className={`font-sans text-[14.5px] leading-tight text-brand-cream underline-offset-4 transition-colors hover:text-brand-gold hover:underline focus-visible:text-brand-gold motion-reduce:transition-none ${FOCUS}`}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 3) legal bar */}
        <div className="mt-10 flex flex-col items-start gap-4 border-t-[1.5px] border-dashed border-[color:rgba(253,252,248,0.4)] pt-[22px] min-[620px]:flex-row min-[620px]:items-center min-[620px]:justify-between">
          <p className="font-sans text-[12.5px] text-brand-linen">
            © {new Date().getFullYear()} Guatilla AS — {copy.footer.rights}
          </p>
          <div className="flex gap-2.5">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className={`flex h-[30px] w-[30px] items-center justify-center border-[1.5px] border-brand-cream text-brand-cream transition-colors hover:border-brand-gold hover:text-brand-gold motion-reduce:transition-none ${FOCUS}`}
            >
              <IgIcon />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className={`flex h-[30px] w-[30px] items-center justify-center border-[1.5px] border-brand-cream text-brand-cream transition-colors hover:border-brand-gold hover:text-brand-gold motion-reduce:transition-none ${FOCUS}`}
            >
              <FbIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
