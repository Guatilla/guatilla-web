"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, FormEvent } from "react";
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

type InterestType = "sell" | "buy" | null;

export function HomePage({ locale }: { locale: HomeLocale }) {
  const t = getHomeStrings(locale);

  const handleInterestSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const name = (formData.get("name") ?? "").toString().trim();
    const email = (formData.get("email") ?? "").toString().trim();
    const location = (formData.get("location") ?? "").toString().trim();
    const message = (formData.get("message") ?? "").toString().trim();
    const interestType = (formData.get("interestType") ?? "").toString();

    const interestLabel =
      interestType === "sell"
        ? locale === "no"
          ? "Selge kaffe"
          : locale === "en"
          ? "Sell coffee"
          : "Quiero vender café"
        : locale === "no"
        ? "Kjøpe kaffe"
        : locale === "en"
        ? "Buy coffee"
        : "Quiero comprar café";

    try {
      const response = await fetch("https://formspree.io/f/xojndera", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          location,
          message,
          interestType: interestLabel,
        }),
      });

      if (response.ok) {
        alert(
          locale === "no"
            ? "Takk for interesse! Vi kontakter deg snart."
            : locale === "en"
            ? "Thank you for your interest! We'll contact you soon."
            : "¡Gracias por tu interés! Te contactaremos pronto."
        );
        (event.target as HTMLFormElement).reset();
        setSelectedInterest(null);
      } else {
        alert(
          locale === "no"
            ? "Det oppstod en feil. Prøv igjen."
            : locale === "en"
            ? "An error occurred. Please try again."
            : "Ocurrió un error. Intenta de nuevo."
        );
      }
    } catch (error) {
      alert(
        locale === "no"
          ? "Det oppstod en feil. Prøv igjen."
          : locale === "en"
          ? "An error occurred. Please try again."
          : "Ocurrió un error. Intenta de nuevo."
      );
    }
  };

  const [selectedInterest, setSelectedInterest] = useState<InterestType>(null);
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

  return (
    <main style={pageStyle} lang={getLangAttribute()}>
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
              <div className="ikm-logo-mark">
                <div className="ikm-logo-image" aria-hidden="true">
                  <Image
                    src="/images/logo.jpg"
                    alt="Logo Guatilla"
                    fill
                    sizes="36px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="ikm-logo-text">GUATILLA</div>
              </div>
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
                <button
                  type="button"
                  className="ikm-btn-primary"
                  onClick={() => setSelectedInterest("sell")}
                >
                  {t.interestOptionSell}
                </button>
                <button
                  type="button"
                  className="ikm-btn-outline"
                  onClick={() => setSelectedInterest("buy")}
                >
                  {t.interestOptionBuy}
                </button>
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
                "Productos y servicios",
                "Nuestro café",
                "Tiendas en línea",
                "Sobre Guatilla",
                "Empleo rural",
                "Sostenibilidad",
                "Iniciar sesión",
              ].map((item) => (
                <button
                  key={item}
                  type="button"
                  className="ikm-menu-item"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                  <span aria-hidden="true">›</span>
                </button>
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
        {/* ---------------------------------------------------------------- */}
        {/* FORMULARIO DE INTERÉS (VENDER / COMPRAR)                          */}
        {/* ---------------------------------------------------------------- */}
        {selectedInterest && (
          <section
            className="interest-form"
            style={{
              marginBottom: "2.5rem",
              borderRadius: "1.6rem",
              padding: "1.6rem 1.8rem",
              background:
                "radial-gradient(circle at 0% 0%, rgba(45,212,191,0.15), rgba(15,23,42,0.95))",
              border: "1px solid rgba(45,212,191,0.4)",
              boxShadow: "0 18px 55px rgba(15,23,42,0.9)",
            }}
          >
            <h2 style={{ fontSize: "1.2rem", marginBottom: "0.4rem" }}>
              {selectedInterest === "sell"
                ? isNorwegian
                  ? "Jeg vil selge kaffe"
                  : isEnglish
                  ? "I want to sell coffee"
                  : "Quiero vender café"
                : isNorwegian
                ? "Jeg vil kjøpe kaffe"
                : isEnglish
                ? "I want to buy coffee"
                : "Quiero comprar café"}
            </h2>
            <p
              style={{
                fontSize: "0.9rem",
                lineHeight: 1.6,
                color: "#e5e7eb",
                marginBottom: "1rem",
                maxWidth: "40rem",
              }}
            >
              {isNorwegian
                ? "Legg igjen kontaktinformasjon, så tar vi kontakt når vi har mer detaljer om volum, kvalitet og neste import."
                : isEnglish
                ? "Leave us your contact information, and we'll reach out when we have more details about volumes, quality, and the next import."
                : "Déjanos tus datos de contacto y te escribimos cuando tengamos más detalles sobre volúmenes, calidad y próxima importación."}
            </p>

            <form
              onSubmit={handleInterestSubmit}
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
                gap: "1rem",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label style={{ fontSize: "0.8rem", opacity: 0.9 }}>
                  {isNorwegian ? "Navn" : isEnglish ? "Name" : "Nombre"}
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  style={{
                    borderRadius: "0.75rem",
                    border: "1px solid rgba(148,163,184,0.6)",
                    backgroundColor: "rgba(15,23,42,0.9)",
                    padding: "0.55rem 0.75rem",
                    color: "#f9fafb",
                    fontSize: "0.9rem",
                  }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label style={{ fontSize: "0.8rem", opacity: 0.9 }}>
                  E-mail
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  style={{
                    borderRadius: "0.75rem",
                    border: "1px solid rgba(148,163,184,0.6)",
                    backgroundColor: "rgba(15,23,42,0.9)",
                    padding: "0.55rem 0.75rem",
                    color: "#f9fafb",
                    fontSize: "0.9rem",
                  }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label style={{ fontSize: "0.8rem", opacity: 0.9 }}>
                  {isNorwegian ? "Land / by" : isEnglish ? "Country / City" : "País / ciudad"}
                </label>
                <input
                  type="text"
                  name="location"
                  style={{
                    borderRadius: "0.75rem",
                    border: "1px solid rgba(148,163,184,0.6)",
                    backgroundColor: "rgba(15,23,42,0.9)",
                    padding: "0.55rem 0.75rem",
                    color: "#f9fafb",
                    fontSize: "0.9rem",
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  gridColumn: "span 2",
                }}
              >
                <label style={{ fontSize: "0.8rem", opacity: 0.9 }}>
                  {isNorwegian
                    ? "Kommentar (volum, type kaffe, osv.)"
                    : isEnglish
                    ? "Comment (volume, coffee type, etc.)"
                    : "Comentario (volumen, tipo de café, etc.)"}
                </label>
                <textarea
                  name="message"
                  rows={3}
                  style={{
                    borderRadius: "0.75rem",
                    border: "1px solid rgba(148,163,184,0.6)",
                    backgroundColor: "rgba(15,23,42,0.9)",
                    padding: "0.55rem 0.75rem",
                    color: "#f9fafb",
                    fontSize: "0.9rem",
                    resize: "vertical",
                  }}
                />
              </div>

              {/* Campo oculto con el tipo de interés */}
              <input
                type="hidden"
                name="interestType"
                value={selectedInterest}
              />

              <div style={{ gridColumn: "span 2", marginTop: "0.5rem" }}>
                <button
                  type="submit"
                  style={{
                    padding: "0.7rem 1.8rem",
                    borderRadius: "999px",
                    border: "none",
                    background:
                      "linear-gradient(90deg, #22c55e, #22d3ee, #38bdf8)",
                    color: "#0f172a",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    cursor: "pointer",
                  }}
                >
                  {isNorwegian ? "Send interesse" : isEnglish ? "Send Interest" : "Enviar interés"}
                </button>
              </div>
            </form>
          </section>
        )}

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
  
