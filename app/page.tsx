"use client";

import Image from "next/image";
import type { CSSProperties } from "react";

const pageStyle: CSSProperties = {
  minHeight: "100vh",
  fontFamily:
    "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  color: "#f9fafb",
  backgroundColor: "#0b1120",
};

const maxWidthStyle: CSSProperties = {
  maxWidth: "1120px",
  margin: "0 auto",
  padding: "1.5rem",
};

export default function Home() {
  return (
    <main style={pageStyle}>
      <div style={maxWidthStyle}>
        {/* ---------------------------------------------------------------- */}
        {/* CABECERA CON LOGO + NOMBRE                                        */}
        {/* ---------------------------------------------------------------- */}
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1.5rem",
            padding: "1rem 1.25rem",
            borderRadius: "999px",
            background:
              "linear-gradient(90deg, rgba(56,189,248,0.12), rgba(250,204,21,0.08))",
            border: "1px solid rgba(148,163,184,0.25)",
            boxShadow: "0 18px 60px rgba(15,23,42,0.65)",
            marginBottom: "2rem",
          }}
        >
          {/* Logo + nombre */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "999px",
                overflow: "hidden",
                background:
                  "radial-gradient(circle at 30% 20%, #f97316, #facc15 35%, #22c55e 75%, #16a34a 100%)",
                border: "2px solid rgba(15,23,42,0.8)",
                boxShadow: "0 10px 40px rgba(15,23,42,0.85)",
                position: "relative",
              }}
            >
              {/* LOGO DISEÑO */}
              <Image
                src="/images/logo.jpg"
                alt="Logo Kaffe Guatilla"
                fill
                style={{ objectFit: "cover" }}
                sizes="56px"
              />
            </div>
            <div>
              <div
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                KAFFE GUATILLA
              </div>
              <div
                style={{
                  fontSize: "0.78rem",
                  opacity: 0.85,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Café especial del Perijá · Ruiz Gomez Import
              </div>
            </div>
          </div>

          {/* Localización y tagline */}
          <div
            style={{
              textAlign: "right",
              fontSize: "0.8rem",
              lineHeight: 1.5,
            }}
          >
            <div
              style={{
                fontWeight: 600,
                color: "#fbbf24",
                marginBottom: "0.1rem",
              }}
            >
              Stavanger · Noruega
            </div>
            <div style={{ opacity: 0.85 }}>
              Importación directa desde la Serranía del Perijá
            </div>
          </div>
        </header>

        {/* ---------------------------------------------------------------- */}
        {/* HERO PRINCIPAL                                                    */}
        {/* ---------------------------------------------------------------- */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,1.2fr) minmax(0,1fr)",
            gap: "2rem",
            marginBottom: "3rem",
          }}
        >
          {/* Texto principal */}
          <div>
            <h1
              style={{
                fontSize: "2.6rem",
                lineHeight: 1.1,
                marginBottom: "1.1rem",
              }}
            >
              Café de montaña, historias reales.
            </h1>
            <p
              style={{
                fontSize: "0.98rem",
                lineHeight: 1.6,
                color: "#e5e7eb",
                maxWidth: "36rem",
                marginBottom: "1.75rem",
              }}
            >
              Estamos construyendo una plataforma para conectar{" "}
              <strong>fincas de la Serranía del Perijá</strong> con
              compradores conscientes en Noruega. El primer lote se importará
              con <strong>Ruiz Gomez Import</strong> como comprador ancla, y a
              partir de esa experiencia abriremos la puerta a más productores y
              amantes del café.
            </p>

            {/* Botones */}
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a
                href="https://www.facebook.com/profile.php?id=100090938266173"
                target="_blank"
                rel="noreferrer"
                style={{
                  padding: "0.85rem 1.6rem",
                  borderRadius: "999px",
                  background:
                    "radial-gradient(circle at 0% 0%, #22c55e, #16a34a)",
                  color: "#0f172a",
                  fontWeight: 600,
                  fontSize: "0.92rem",
                  textDecoration: "none",
                  boxShadow: "0 18px 50px rgba(34,197,94,0.35)",
                }}
              >
                Seguir el proyecto en Facebook
              </a>
              <button
                type="button"
                style={{
                  padding: "0.85rem 1.6rem",
                  borderRadius: "999px",
                  border: "1px solid rgba(148,163,184,0.55)",
                  backgroundColor: "transparent",
                  color: "#e5e7eb",
                  fontSize: "0.9rem",
                  cursor: "default",
                }}
              >
                Quiero saber cuándo esté listo para comprar
              </button>
            </div>
          </div>

          {/* Card: historia del logo */}
          <article
            style={{
              borderRadius: "1.5rem",
              padding: "1.5rem 1.6rem",
              background:
                "radial-gradient(circle at 0% 0%, rgba(248,250,252,0.05), rgba(30,64,175,0.55))",
              border: "1px solid rgba(129,140,248,0.32)",
              boxShadow: "0 20px 60px rgba(15,23,42,0.95)",
              display: "flex",
              flexDirection: "column",
              gap: "1.1rem",
            }}
          >
            <div
              style={{
                borderRadius: "1rem",
                overflow: "hidden",
                height: "170px",
                position: "relative",
              }}
            >
              <Image
                src="/images/logo-realista1.jpg"
                alt="Estructura que inspira el logo Guatilla"
                fill
                sizes="(max-width: 900px) 100vw, 420px"
                style={{ objectFit: "contain" }}
              />
            </div>

            <div>
              <h2
                style={{
                  fontSize: "1rem",
                  marginBottom: "0.45rem",
                  fontWeight: 600,
                }}
              >
                De turismo a café de origen
              </h2>
              <p
                style={{
                  fontSize: "0.9rem",
                  lineHeight: 1.6,
                  color: "#e5e7eb",
                }}
              >
                El símbolo de Guatilla nace en un mirador de montaña en la
                Serranía del Perijá. Hoy se transforma en una puerta para
                acercar el paisaje, las comunidades y el café de altura directamente a Stavanger.
              </p>
            </div>
          </article>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* SERRANÍA DEL PERIJÁ - ORIGEN DEL CAFÉ                             */}
        {/* ---------------------------------------------------------------- */}
        <section
          style={{
            borderRadius: "1.6rem",
            padding: "1.6rem 1.8rem",
            background:
              "radial-gradient(circle at 0% 0%, rgba(59,130,246,0.15), rgba(15,23,42,0.85))",
            border: "1px solid rgba(96,165,250,0.35)",
            boxShadow: "0 18px 55px rgba(15,23,42,0.85)",
            marginBottom: "2.75rem",
          }}
        >
          <h2 style={{ fontSize: "1.35rem", marginBottom: "0.25rem" }}>
            Serranía del Perijá · Origen del café
          </h2>
          <p
            style={{
              fontSize: "0.92rem",
              lineHeight: 1.65,
              color: "#e5e7eb",
              marginBottom: "1.2rem",
            }}
          >
            La serranía se eleva hasta los <strong>3600 m s. n. m.</strong> y
            marca la frontera natural entre Colombia y Venezuela. Nuestra red de
            fincas piloto está en esta montaña, en la zona de{" "}
            <strong>Agustín Codazzi (Cesar)</strong>.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,minmax(0,1fr))",
              gap: "1rem",
            }}
          >
            <figure
              style={{
                borderRadius: "1rem",
                overflow: "hidden",
                position: "relative",
                height: "160px",
              }}
            >
              <Image
                src="/images/atardecer1.JPG"
                alt="Atardecer en la Serranía del Perijá"
                fill
                sizes="(max-width: 900px) 50vw, 260px"
                style={{ objectFit: "cover" }}
              />
            </figure>

            <figure
              style={{
                borderRadius: "1rem",
                overflow: "hidden",
                position: "relative",
                height: "160px",
              }}
            >
              <Image
                src="/images/atardecer2.JPG"
                alt="Montañas y nubes sobre el Perijá"
                fill
                sizes="(max-width: 900px) 50vw, 260px"
                style={{ objectFit: "cover" }}
              />
            </figure>

            <figure
              style={{
                borderRadius: "1rem",
                overflow: "hidden",
                position: "relative",
                height: "160px",
              }}
            >
              <Image
                src="/images/tres-tetas1.jpg"
                alt="Cumbres de la Serranía del Perijá"
                fill
                sizes="(max-width: 900px) 50vw, 260px"
                style={{ objectFit: "cover" }}
              />
            </figure>

            <figure
              style={{
                borderRadius: "1rem",
                overflow: "hidden",
                position: "relative",
                height: "160px",
              }}
            >
              <Image
                src="/images/plata-parque.jpg"
                alt="Vegetación y cafetales en el Perijá"
                fill
                sizes="(max-width: 900px) 50vw, 260px"
                style={{ objectFit: "cover" }}
              />
            </figure>
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
              Cómo se procesa el café
            </h2>
            <p
              style={{
                fontSize: "0.93rem",
                lineHeight: 1.65,
                color: "#e5e7eb",
                marginBottom: "1.1rem",
              }}
            >
              Empezamos con pequeños lotes lavados, trazables finca por finca.
              Esta fase piloto nos permite documentar cada paso: cosecha
              selectiva, despulpado, fermentación y secado en patios de altura.
            </p>
            <p
              style={{
                fontSize: "0.9rem",
                lineHeight: 1.65,
                color: "#cbd5f5",
              }}
            >
              El objetivo es construir una base técnica sólida para, en los
              próximos 12 meses, realizar la primera importación a Noruega y
              validar todo el recorrido logístico desde la serranía hasta
              Stavanger.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0,1.3fr) minmax(0,1fr)",
              gap: "0.9rem",
            }}
          >
            <figure
              style={{
                borderRadius: "1rem",
                overflow: "hidden",
                position: "relative",
                height: "150px",
              }}
            >
              <Image
                src="/images/fermentacion-cafe1.jpg"
                alt="Fermentación del café"
                fill
                sizes="(max-width: 900px) 60vw, 320px"
                style={{ objectFit: "cover" }}
              />
            </figure>

            <figure
              style={{
                borderRadius: "1rem",
                overflow: "hidden",
                position: "relative",
                height: "150px",
              }}
            >
              <Image
                src="/images/lavado-cafe1.jpg"
                alt="Lavado del café en canales"
                fill
                sizes="(max-width: 900px) 40vw, 220px"
                style={{ objectFit: "cover" }}
              />
            </figure>

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
                src="/images/lavado-cafe2.jpg"
                alt="Sistema de lavado de café en la serranía"
                fill
                sizes="(max-width: 900px) 100vw, 540px"
                style={{ objectFit: "cover" }}
              />
            </figure>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* COMUNIDADES Y PAISAJE                                             */}
        {/* ---------------------------------------------------------------- */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,1.1fr) minmax(0,1fr)",
            gap: "1.75rem",
            marginBottom: "2.75rem",
          }}
        >
          <article
            style={{
              borderRadius: "1.5rem",
              padding: "1.5rem 1.6rem",
              background:
                "radial-gradient(circle at 0% 0%, rgba(16,185,129,0.18), rgba(15,23,42,0.95))",
              border: "1px solid rgba(52,211,153,0.4)",
              boxShadow: "0 18px 60px rgba(6,95,70,0.85)",
            }}
          >
            <h2 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>
              Comunidades y territorio
            </h2>
            <p
              style={{
                fontSize: "0.93rem",
                lineHeight: 1.7,
                color: "#e5e7eb",
                marginBottom: "0.9rem",
              }}
            >
              Guatilla nace en un territorio habitado por comunidades campesinas
              y pueblos indígenas. La idea es que cada taza de café lleve
              consigo información clara sobre el origen y la historia de quienes
              lo producen.
            </p>
            <p
              style={{
                fontSize: "0.9rem",
                lineHeight: 1.7,
                color: "#cbd5f5",
              }}
            >
              Este proyecto no es solo un producto: es una documentación
              técnica, social y logística que permita, más adelante, que otras
              fincas del Perijá puedan exportar siguiendo un modelo ya probado.
            </p>
          </article>

          <div
            style={{
              borderRadius: "1.5rem",
              padding: "1.2rem 1.3rem",
              background:
                "radial-gradient(circle at 0% 0%, rgba(59,130,246,0.22), rgba(15,23,42,0.98))",
              border: "1px solid rgba(59,130,246,0.45)",
              boxShadow: "0 18px 60px rgba(15,23,42,0.9)",
              display: "flex",
              flexDirection: "column",
              gap: "0.9rem",
            }}
          >
            <div
              style={{
                position: "relative",
                borderRadius: "1rem",
                overflow: "hidden",
                height: "150px",
              }}
            >
              <Image
                src="/images/pueblos-indigenas.jpg"
                alt="Pueblo indígena en la serranía del Perijá"
                fill
                sizes="(max-width: 900px) 100vw, 320px"
                style={{ objectFit: "cover" }}
              />
            </div>

            <div
              style={{
                position: "relative",
                borderRadius: "1rem",
                overflow: "hidden",
                height: "150px",
              }}
            >
              <Image
                src="/images/fotografiando-realidades.JPG"
                alt="Documentando la realidad de las comunidades"
                fill
                sizes="(max-width: 900px) 100vw, 320px"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* VIDEO DE DESPULPADO                                               */}
        {/* ---------------------------------------------------------------- */}
        <section
          style={{
            marginBottom: "2.75rem",
            borderRadius: "1.6rem",
            padding: "1.6rem 1.8rem",
            background:
              "radial-gradient(circle at 0% 0%, rgba(248,250,252,0.05), rgba(15,23,42,0.95))",
            border: "1px solid rgba(148,163,184,0.45)",
            boxShadow: "0 18px 55px rgba(15,23,42,0.9)",
          }}
        >
          <h2 style={{ fontSize: "1.25rem", marginBottom: "0.6rem" }}>
            Un primer vistazo al proceso en finca
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
            Este es un registro simple del despulpado del café en una de las
            fincas piloto. Más adelante convertiremos este tipo de material en
            contenido educativo para compradores y productores.
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
          }}
        >
          <div>
            <div style={{ fontWeight: 600, marginBottom: "0.25rem" }}>
              Ruiz Gomez Import · Stavanger
            </div>
            <div>Correo: norgesdirektor@guatilla.no</div>
            <div>Teléfono: +47 936 94 817</div>
          </div>

          <div style={{ textAlign: "right" }}>
            <div style={{ marginBottom: "0.25rem" }}>
              Página piloto de Kaffe Guatilla · 2025
            </div>
            <a
              href="https://www.facebook.com/profile.php?id=100090938266173"
              target="_blank"
              rel="noreferrer"
              style={{
                color: "#38bdf8",
                textDecoration: "none",
              }}
            >
              Ver avances del proyecto en Facebook
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}

