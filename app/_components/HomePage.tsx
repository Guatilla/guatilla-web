"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { getHomeStrings, type HomeLocale } from "../_content/homeStrings";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import "../responsive.css";

const pageStyle: CSSProperties = {
  minHeight: "100vh",
  fontFamily: "var(--guatilla-font-body)",
  color: "#f5f1ed",
  backgroundColor: "var(--guatilla-bg)",
};

const maxWidthStyle: CSSProperties = {
  maxWidth: "1120px",
  margin: "0 auto",
  padding: "1.5rem",
};

const TEMP_IMAGES = [
  "/images/atardecer2.JPG",
  "/images/cascada3.jpg",
  "/images/cascada4.JPG",
];

const getTempImage = (index: number) =>
  TEMP_IMAGES[index % TEMP_IMAGES.length];

const tempCardImageStyle: CSSProperties = {
  objectFit: "cover",
  objectPosition: "center 35%",
};

export function HomePage({ locale }: { locale: HomeLocale }) {
  const t = getHomeStrings(locale);

  const bannerImageUrl =
    locale === "en"
      ? "/images/banner-enciende-english.png"
      : locale === "no"
      ? "/images/banner-enciende-norsk.png"
      : "/images/banner-enciende-español.png";

  const pageStyleWithBanner: CSSProperties = {
    ...pageStyle,
    ["--banner-enciende-url" as any]: `url("${bannerImageUrl}")`,
  };

  const [menuOpen, setMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);

  const isNorwegian = locale === "no";
  const isEnglish = locale === "en";
  const languageLabel = isNorwegian
    ? "Sprak"
    : isEnglish
    ? "Language"
    : "Idioma";
  const searchLabel = isNorwegian
    ? "Sok"
    : isEnglish
    ? "Search"
    : "Buscar";
  const menuLabel = isNorwegian ? "Meny" : isEnglish ? "Menu" : "Menu";

  const getLangAttribute = () => {
    if (locale === "no") return "no";
    if (locale === "en") return "en";
    return "es";
  };

  const valueCards = [
    {
      href: "/origen",
      block: t.valueBlocks[0],
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M3 18h18v2H3v-2Zm9-14 7 10h-4l-3-5-3 5H5l7-10Z"
            fill="currentColor"
          />
          <path d="M6.5 16h11" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      href: "/progreso",
      block: t.valueBlocks[1],
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M3 8h12a4 4 0 0 1 0 8H9a6 6 0 0 1-6-6V8Z"
            fill="currentColor"
          />
          <path
            d="M15 9h2.5a2.5 2.5 0 1 1 0 5H15"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
          <path d="M6 19h10" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      href: "/trazabilidad",
      block: t.valueBlocks[2],
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M6 3h8l4 4v14H6V3Z"
            fill="currentColor"
            opacity="0.9"
          />
          <path
            d="M14 3v5h5"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M8 12h8M8 16h8"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      ),
    },
  ];

  return (
    <main style={pageStyleWithBanner} lang={getLangAttribute()}>
      <div style={maxWidthStyle}>
        <section className="ikm-shell">
          <div className="ikm-hero-bg">
            <Image
              src={getTempImage(0)}
              alt="Paisaje del Guatilla al atardecer"
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="ikm-hero-overlay" />
          <div className="ikm-hero-angle" />

          <header className="ikm-header">
            <div className="ikm-logo-block">
              <div className="ikm-logo-mark" aria-hidden="true" />
              <div className="ikm-logo-sub">{t.logoSubLine}</div>
            </div>

            <div className="ikm-actions">
              <button
                type="button"
                className="ikm-icon-btn"
                aria-label={languageLabel}
                aria-expanded={languageOpen}
                onClick={() => setLanguageOpen((prev) => !prev)}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm7 9a7.02 7.02 0 0 1-1.2 3.95h-2.78a17.8 17.8 0 0 0 .58-3.95h3.4Zm-7-7c.92 1.2 1.68 2.95 2.13 5H9.87C10.32 7.95 11.08 6.2 12 5Zm0 14c-.92-1.2-1.68-2.95-2.13-5h4.26c-.45 2.05-1.2 3.8-2.13 5Zm-5.6-3.05A7.02 7.02 0 0 1 5 12h3.4c.07 1.35.26 2.67.58 3.95H6.4Zm1.2-9.9h2.78A17.8 17.8 0 0 0 10.8 10H7.4A7.02 7.02 0 0 1 7.6 6.05Zm6.62 0h2.78A7.02 7.02 0 0 1 18.6 10h-3.4a17.8 17.8 0 0 0-.58-3.95ZM8.4 12h7.2c-.08 1.36-.3 2.68-.64 3.95H9.04A16.6 16.6 0 0 1 8.4 12Z"
                    fill="currentColor"
                  />
                </svg>
                <span className="ikm-icon-text">{languageLabel}</span>
              </button>
              {languageOpen && (
                <div className="ikm-lang-popover">
                  <Link href="/en" onClick={() => setLanguageOpen(false)}>
                    English
                  </Link>
                  <Link href="/es" onClick={() => setLanguageOpen(false)}>
                    Español
                  </Link>
                  <Link href="/no" onClick={() => setLanguageOpen(false)}>
                    Norsk
                  </Link>
                </div>
              )}
              <button
                type="button"
                className="ikm-icon-btn"
                aria-label={searchLabel}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M10.5 3a7.5 7.5 0 1 0 4.69 13.36l4.22 4.22 1.06-1.06-4.22-4.22A7.5 7.5 0 0 0 10.5 3Zm0 2a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Z"
                    fill="currentColor"
                  />
                </svg>
                <span className="ikm-icon-text">{searchLabel}</span>
              </button>
              <button
                type="button"
                className="ikm-icon-btn"
                aria-label={menuOpen ? "Cerrar menu" : "Abrir menu"}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((prev) => !prev)}
              >
                {menuOpen ? (
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M6 6l12 12M18 6l-12 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M4 7h16M4 12h16M4 17h16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
                <span className="ikm-icon-text">{menuLabel}</span>
              </button>
            </div>
          </header>

          <div className="ikm-hero-grid">
            <div className="ikm-hero-content">
              <h1>{t.heroTitle}</h1>
              <p className="ikm-hero-copy">
                {t.heroBodyBefore}
                <strong>{t.heroBodyStrong1}</strong>
                {t.heroBodyMiddle}
                <strong>{t.heroBodyStrong2}</strong>
                {t.heroBodyAfter}
              </p>
              <div className="ikm-hero-actions">
                <Link href="/lista-espera" className="ikm-btn-primary">
                  {t.waitlistCta}
                </Link>
                <Link href="/progreso" className="ikm-btn-outline">
                  Ver avance del proyecto
                </Link>
              </div>
            </div>

            <aside className="ikm-hero-card">
              <div className="ikm-hero-card-image">
                <Image
                  src="/images/logo-realista1.jpg"
                  alt={t.cardImageAlt}
                  fill
                  sizes="(max-width: 900px) 100vw, 420px"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div>
                <h2>{t.cardTitle}</h2>
                <p>{t.cardBody}</p>
              </div>
            </aside>
          </div>
        </section>

        <div className={`ikm-menu ${menuOpen ? "is-open" : ""}`}>
          <div className="ikm-menu-panel">
            <div className="ikm-menu-top">
              <span>Menú</span>
              <button
                type="button"
                className="ikm-menu-close"
                onClick={() => setMenuOpen(false)}
                aria-label="Cerrar menú"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M6 6l12 12M18 6l-12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
            <nav className="ikm-menu-list">
              {[
                { label: "Inicio", href: "/" },
                { label: "Nuestro café", href: "/cafe" },
                { label: "Origen y territorio", href: "/origen" },
                { label: "Proceso y trazabilidad", href: "/trazabilidad" },
                { label: "Progreso del proyecto", href: "/progreso" },
                { label: "Lista de espera", href: "/lista-espera" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="ikm-menu-item"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                  <span aria-hidden="true">›</span>
                </Link>
              ))}
            </nav>
            <div className="ikm-menu-lang">
              <Link href="/en" onClick={() => setMenuOpen(false)}>
                English
              </Link>
              <Link href="/es" onClick={() => setMenuOpen(false)}>
                Español
              </Link>
              <Link href="/no" onClick={() => setMenuOpen(false)}>
                Norsk
              </Link>
            </div>
          </div>
        </div>
        <section
          style={{
            margin: "2rem 0 2.5rem",
            padding: "1.5rem",
            borderRadius: "1.25rem",
            background: "rgba(15,23,42,0.45)",
            border: "1px solid rgba(148,163,184,0.25)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: "1rem",
            }}
          >
            {valueCards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                style={{
                  padding: "1rem",
                  borderRadius: "0.9rem",
                  background: "rgba(2,6,23,0.45)",
                  border: "1px solid rgba(148,163,184,0.2)",
                  textDecoration: "none",
                  color: "inherit",
                  display: "block",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.6rem",
                    marginBottom: "0.4rem",
                    color: "#cbd5f5",
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      width: 18,
                      height: 18,
                      opacity: 0.9,
                    }}
                  >
                    {card.icon}
                  </span>
                  <h3 style={{ margin: 0, fontSize: "1rem" }}>
                    {card.block.title}
                  </h3>
                </div>
                <p style={{ margin: 0, fontSize: "0.9rem", color: "#e2e8f0" }}>
                  {card.block.body}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: "2.5rem" }}>
          <h2 style={{ fontSize: "1.25rem", marginBottom: "0.6rem" }}>
            {t.statusTitle}
          </h2>
          <ul style={{ paddingLeft: "1.2rem", margin: 0, color: "#e2e8f0" }}>
            {t.statusItems.map((item) => (
              <li key={item.label} style={{ marginBottom: "0.4rem" }}>
                <strong>{item.status}:</strong> {item.label}
              </li>
            ))}
          </ul>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* SERRANÍA DEL PERIJÁ - ORIGEN DEL CAFÉ                             */}
        {/* ---------------------------------------------------------------- */}
        <section
          className="grid-serran"
          style={{
            padding: "2.5rem 0",
            borderBottom: "1px solid rgba(148,163,184,0.15)",
            marginBottom: "2rem",
          }}
        >
          <h2 style={{ fontSize: "1.35rem", marginBottom: "0.25rem" }}>
            {t.perijaTitle}
          </h2>
          <p
            style={{
              fontSize: "0.92rem",
              lineHeight: 1.65,
              color: "#e5e7eb",
              marginBottom: "1.2rem",
            }}
          >
            {t.perijaBodyBefore}
            <strong>{t.perijaBodyStrong1}</strong>
            {t.perijaBodyMiddle}
            <strong>{t.perijaBodyStrong2}</strong>
            {t.perijaBodyAfter}
          </p>

          <div
            className="grid-serran"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,minmax(0,1fr))",
              gap: "1rem",
            }}
          >
            <Zoom>
              <figure
                style={{
                  borderRadius: "1rem",
                  overflow: "hidden",
                  position: "relative",
                  height: "160px",
                }}
              >
                <Image
                  src={getTempImage(1)}
                  alt={t.perijaImgAlt1}
                  fill
                  sizes="(max-width: 900px) 50vw, 260px"
                  style={tempCardImageStyle}
                />
              </figure>
            </Zoom>

            <Zoom>
              <figure
                style={{
                  borderRadius: "1rem",
                  overflow: "hidden",
                  position: "relative",
                  height: "160px",
                }}
              >
                <Image
                  src={getTempImage(2)}
                  alt={t.perijaImgAlt2}
                  fill
                  sizes="(max-width: 900px) 50vw, 260px"
                  style={tempCardImageStyle}
                />
              </figure>
            </Zoom>

            <Zoom>
              <figure
                style={{
                  borderRadius: "1rem",
                  overflow: "hidden",
                  position: "relative",
                  height: "160px",
                }}
              >
                <Image
                  src={getTempImage(3)}
                  alt={t.perijaImgAlt3}
                  fill
                  sizes="(max-width: 900px) 50vw, 260px"
                  style={tempCardImageStyle}
                />
              </figure>
            </Zoom>

            <Zoom>
              <figure
                style={{
                  borderRadius: "1rem",
                  overflow: "hidden",
                  position: "relative",
                  height: "160px",
                }}
              >
                <Image
                  src={getTempImage(4)}
                  alt={t.perijaImgAlt4}
                  fill
                  sizes="(max-width: 900px) 50vw, 260px"
                  style={tempCardImageStyle}
                />
              </figure>
            </Zoom>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* CÓMO SE PROCESA EL CAFÉ                                           */}
        {/* ---------------------------------------------------------------- */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,1.1fr) minmax(0,1fr)",
            gap: "1.75rem",
            marginBottom: "2.75rem",
          }}
        >
          <div>
            <h2 style={{ fontSize: "1.3rem", marginBottom: "0.4rem" }}>
              {t.processTitle}
            </h2>
            <p
              style={{
                fontSize: "0.93rem",
                lineHeight: 1.65,
                color: "#e5e7eb",
                marginBottom: "1.1rem",
              }}
            >
              {t.processBody1}
            </p>
            <p
              style={{
                fontSize: "0.9rem",
                lineHeight: 1.65,
                color: "#cbd5f5",
              }}
            >
              {t.processBody2}
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0,1.3fr) minmax(0,1fr)",
              gap: "0.9rem",
            }}
          >
            <Zoom zoomMargin={80}>
              <figure
                style={{
                  borderRadius: "1rem",
                  overflow: "hidden",
                  position: "relative",
                  height: "150px",
                }}
              >
                <Image
                  src={getTempImage(5)}
                  alt={t.processImgAlt1}
                  fill
                  sizes="(max-width: 900px) 60vw, 320px"
                  style={tempCardImageStyle}
                />
              </figure>
            </Zoom>

            <Zoom zoomMargin={80}>
              <figure
                style={{
                  borderRadius: "1rem",
                  overflow: "hidden",
                  position: "relative",
                  height: "150px",
                }}
              >
                <Image
                  src={getTempImage(6)}
                  alt={t.processImgAlt2}
                  fill
                  sizes="(max-width: 900px) 40vw, 220px"
                  style={tempCardImageStyle}
                />
              </figure>
            </Zoom>

            <Zoom zoomMargin={80}>
              <figure
                style={{
                  borderRadius: "1rem",
                  overflow: "hidden",
                  position: "relative",
                  height: "150px",
                  gridColumn: "span 2",
                }}
              >
                <Image
                  src={getTempImage(7)}
                  alt={t.processImgAlt3}
                  fill
                  sizes="(max-width: 900px) 100vw, 540px"
                  style={tempCardImageStyle}
                />
              </figure>
            </Zoom>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* COMUNIDADES Y PAISAJE                                             */}
        {/* ---------------------------------------------------------------- */}
        <section
          className="grid-comm"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,1.1fr) minmax(0,1fr)",
            gap: "1.75rem",
            marginBottom: "2rem",
            paddingBottom: "2.5rem",
            borderBottom: "1px solid rgba(148,163,184,0.15)",
          }}
        >
          <article
            style={{
              padding: "0",
            }}
          >
            <h2 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>
              {t.communitiesTitle}
            </h2>
            <p
              style={{
                fontSize: "0.93rem",
                lineHeight: 1.7,
                color: "#e5e7eb",
                marginBottom: "0.9rem",
              }}
            >
              {t.communitiesBody1}
            </p>
            <p
              style={{
                fontSize: "0.9rem",
                lineHeight: 1.7,
                color: "#cbd5f5",
              }}
            >
              {t.communitiesBody2}
            </p>
          </article>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.9rem",
            }}
          >
            <Zoom zoomMargin={80}>
              <div
                style={{
                  position: "relative",
                  borderRadius: "1rem",
                  overflow: "hidden",
                  height: "150px",
                }}
              >
                <Image
                  src={getTempImage(8)}
                  alt={t.communitiesImgAlt1}
                  fill
                  sizes="(max-width: 900px) 100vw, 320px"
                  style={tempCardImageStyle}
                />
              </div>
            </Zoom>

            <Zoom zoomMargin={80}>
              <div
                style={{
                  position: "relative",
                  borderRadius: "1rem",
                  overflow: "hidden",
                  height: "150px",
                }}
              >
                <Image
                  src={getTempImage(9)}
                  alt={t.communitiesImgAlt2}
                  fill
                  sizes="(max-width: 900px) 100vw, 320px"
                  style={tempCardImageStyle}
                />
              </div>
            </Zoom>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* VIDEO DE DESPULPADO                                               */}
        {/* ---------------------------------------------------------------- */}
        <section
          style={{
            marginBottom: "2rem",
            paddingBottom: "2.5rem",
            borderBottom: "1px solid rgba(148,163,184,0.15)",
            padding: "2.5rem 0",
          }}
        >
          <h2 style={{ fontSize: "1.25rem", marginBottom: "0.6rem" }}>
            {t.videoTitle}
          </h2>
          <p
            style={{
              fontSize: "0.9rem",
              lineHeight: 1.7,
              color: "#e5e7eb",
              marginBottom: "1rem",
              maxWidth: "40rem",
            }}
          >
            {t.videoBody}
          </p>

          <div
            style={{
              borderRadius: "1.2rem",
              overflow: "hidden",
              maxWidth: "640px",
            }}
          >
            <video
              src="/images/video-espulpando1.mp4"
              controls
              style={{ width: "100%", display: "block" }}
            />
          </div>
        </section>

        <section
          style={{
            marginBottom: "2.5rem",
            padding: "1.5rem",
            borderRadius: "1.2rem",
            border: "1px solid rgba(148,163,184,0.25)",
            background: "rgba(15,23,42,0.4)",
          }}
        >
          <h2 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>
            {t.finalCtaTitle}
          </h2>
          <p style={{ marginBottom: "1rem", color: "#e2e8f0" }}>
            {t.finalCtaBody}
          </p>
          <Link href="/lista-espera" className="ikm-btn-primary">
            {t.waitlistCta}
          </Link>
        </section>

            {/* ---------------------------------------------------------------- */}
        {/* CONTACTO Y DATOS DE RUIZ GOMEZ IMPORT                             */}
        {/* ---------------------------------------------------------------- */}
        <footer
          style={{
            borderTop: "1px solid rgba(30,64,175,0.65)",
            paddingTop: "1.7rem",
            paddingBottom: "1rem",
            fontSize: "0.86rem",
            color: "#e5e7eb",
            display: "flex",
            flexWrap: "wrap",
            gap: "1.5rem",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Datos de contacto */}
          <div>
            <div style={{ fontWeight: 600, marginBottom: "0.25rem" }}>
              {t.footerCompany}
            </div>
            <div>{t.footerEmailLabel}: norgesdirektor@guatilla.no</div>
            <div>{t.footerPhoneLabel}: +47 936 94 817</div>
          </div>

          {/* Iconos de redes */}
          <div className="ikm-socials">
            {/* 1. Finn.no */}
            <a
              href="https://www.finn.no/profile/ads?userid=1063000714"
              target="_blank"
              rel="noreferrer"
              className="ikm-social-link"
            >
              <Image
                src="/icons/finn.jpeg"
                alt="Guatilla en Finn.no"
                width={32}
                height={32}
              />
            </a>

            {/* 2. Facebook */}
            <a
              href="https://www.facebook.com/profile.php?id=100090938266173"
              target="_blank"
              rel="noreferrer"
              className="ikm-social-link"
            >
              <Image
                src="/icons/facebook.jpeg"
                alt="Facebook Guatilla"
                width={32}
                height={32}
              />
            </a>

            {/* 3. Instagram */}
            <a
              href="https://www.instagram.com/kaffeguatilla/"
              target="_blank"
              rel="noreferrer"
              className="ikm-social-link"
            >
              <Image
                src="/icons/instagram.jpeg"
                alt="Instagram Guatilla"
                width={32}
                height={32}
              />
            </a>

            {/* 4. LinkedIn */}
            <a
              href="https://www.linkedin.com/in/kaffe-guatilla-a18208234"
              target="_blank"
              rel="noreferrer"
              className="ikm-social-link"
            >
              <Image
                src="/icons/linkedin.jpeg"
                alt="LinkedIn Guatilla"
                width={32}
                height={32}
              />
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}
  
