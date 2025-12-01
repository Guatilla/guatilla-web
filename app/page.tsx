"use client";

import type { CSSProperties } from "react";

const pageStyle: CSSProperties = {
  minHeight: "100vh",
  fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  color: "#111827",
  backgroundColor: "#0b1120",
};

const maxWidthStyle: CSSProperties = {
  maxWidth: "1120px",
  margin: "0 auto",
  padding: "1.5rem",
};

/**
 * Página principal Kaffe Guatilla
 */
export default function Home() {
  return (
    <main style={pageStyle}>
      <div style={maxWidthStyle}>
        {/* ------------------------------------------------------------------
           CABECERA CON LOGO + NOMBRE
        ------------------------------------------------------------------- */}
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1.5rem",
            padding: "1rem 1.5rem",
            marginBottom: "2rem",
            borderRadius: "9999px",
            background:
              "linear-gradient(135deg, rgba(15,118,110,0.8), rgba(180,83,9,0.8))",
            boxShadow: "0 20px 45px rgba(0,0,0,0.45)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {/* LOGO DISEÑADO */}
            <img
              src="/imagenes/logo.jpg"
              alt="Logo Kaffe Guatilla"
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "9999px",
                objectFit: "cover",
                border: "2px solid rgba(255,255,255,0.7)",
                backgroundColor: "#020617",
              }}
            />
            <div>
              <h1
                style={{
                  fontSize: "1.6rem",
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#f9fafb",
                }}
              >
                Kaffe Guatilla
              </h1>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "rgba(226,232,240,0.9)",
                }}
              >
                Café especial del Perijá · Ruiz Gomez Import
              </p>
            </div>
          </div>

          <div style={{ textAlign: "right", fontSize: "0.85rem", color: "#e5e7eb" }}>
            <div>Stavanger · Noruega</div>
            <div style={{ opacity: 0.8 }}>
              Importación directa desde la Serranía del Perijá
            </div>
          </div>
        </header>

        {/* ------------------------------------------------------------------
           HERO PRINCIPAL
        ------------------------------------------------------------------- */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)",
            gap: "1.5rem",
            alignItems: "center",
            marginBottom: "3rem",
          }}
        >
          {/* Texto principal */}
          <div>
            <h2
              style={{
                fontSize: "2.4rem",
                lineHeight: 1.1,
                fontWeight: 800,
                color: "#f9fafb",
                marginBottom: "1rem",
              }}
            >
              Café de montaña, historias reales.
            </h2>
            <p
              style={{
                fontSize: "1rem",
                lineHeight: 1.6,
                color: "#e5e7eb",
                marginBottom: "1.5rem",
              }}
            >
              Estamos construyendo una plataforma para conectar{" "}
              <strong>fincas de la Serranía del Perijá</strong> con
              compradores conscientes en Noruega.
              El primer lote se importará con{" "}
              <strong>Ruiz Gomez Import</strong> como comprador ancla, y a partir
              de esa experiencia abriremos la puerta a más productores y
              amantes del café.
            </p>

            {/* CTA principal: Facebook + info proyecto */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
              <a
                href="https://www.facebook.com/profile.php?id=100090938266173"
                target="_blank"
                rel="noreferrer"
                style={{
                  padding: "0.7rem 1.2rem",
                  borderRadius: "9999px",
                  background:
                    "linear-gradient(135deg, #22c55e, #16a34a)",
                  color: "#0b1120",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  textDecoration: "none",
                  boxShadow: "0 15px 30px rgba(34,197,94,0.35)",
                }}
              >
                Seguir el proyecto en Facebook
              </a>

              <a
                href="#contacto"
                style={{
                  padding: "0.7rem 1.1rem",
                  borderRadius: "9999px",
                  border: "1px solid rgba(148,163,184,0.7)",
                  color: "#e5e7eb",
                  fontSize: "0.9rem",
                  textDecoration: "none",
                  backgroundColor: "rgba(15,23,42,0.8)",
                }}
              >
                Quiero saber cuándo esté listo para comprar
              </a>
            </div>
          </div>

          {/* Imagen hero: círculo / logo realista */}
          <div
            style={{
              position: "relative",
              height: "260px",
              borderRadius: "1.5rem",
              overflow: "hidden",
              boxShadow: "0 30px 60px rgba(0,0,0,0.75)",
            }}
          >
            <img
              src="/imagenes/logo-realista1.jpg"
              alt="Instalación que inspira el logo Guatilla"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "saturate(1.2)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(15,23,42,0.85), transparent 45%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "1rem",
                left: "1rem",
                right: "1rem",
                color: "#f9fafb",
                fontSize: "0.85rem",
              }}
            >
              <div style={{ fontWeight: 700 }}>De turismo a café de origen</div>
              <div style={{ opacity: 0.9 }}>
                El símbolo de Guatilla nace en un mirador de montaña en la Serranía del Perijá.
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------
           SECCIÓN: PAISAJE & ORIGEN
        ------------------------------------------------------------------- */}
        <section
          style={{
            marginBottom: "3rem",
            padding: "1.5rem",
            borderRadius: "1.5rem",
            background:
              "radial-gradient(circle at top, rgba(15,118,110,0.25), rgba(15,23,42,0.95))",
            border: "1px solid rgba(148,163,184,0.4)",
          }}
        >
          <div style={{ marginBottom: "1.2rem" }}>
            <h3
              style={{
                fontSize: "1.4rem",
                color: "#f9fafb",
                marginBottom: "0.4rem",
              }}
            >
              Serranía del Perijá · Origen del café
            </h3>
            <p style={{ fontSize: "0.95rem", color: "#e5e7eb" }}>
              La serranía se eleva hasta los <strong>3600 m s. n. m.</strong> y
              marca la frontera natural entre Colombia y Venezuela. Nuestra
              red de fincas piloto está en esta montaña, en la zona de
              <strong> Agustín Codazzi (Cesar)</strong>.
            </p>
          </div>

          {/* Galería sencilla de paisajes */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              gap: "0.75rem",
            }}
          >
            {[
              "/imagenes/atardecer1.JPG",
              "/imagenes/atardecer2.JPG",
              "/imagenes/atardecer3.JPG",
              "/imagenes/tres-tetas1.jpg",
            ].map((src) => (
              <div
                key={src}
                style={{
                  position: "relative",
                  height: "120px",
                  borderRadius: "0.9rem",
                  overflow: "hidden",
                  boxShadow: "0 15px 35px rgba(0,0,0,0.65)",
                }}
              >
                <img
                  src={src}
                  alt="Paisaje de la Serranía del Perijá"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------------
           SECCIÓN: PROCESO DEL CAFÉ (LAVADO, FERMENTACIÓN, VIDEO)
        ------------------------------------------------------------------- */}
        <section
          style={{
            marginBottom: "3rem",
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 1fr)",
            gap: "1.5rem",
            alignItems: "flex-start",
          }}
        >
          {/* Texto y puntos clave */}
          <div
            style={{
              padding: "1.5rem",
              borderRadius: "1.5rem",
              backgroundColor: "rgba(15,23,42,0.95)",
              border: "1px solid rgba(75,85,99,0.9)",
            }}
          >
            <h3
              style={{
                fontSize: "1.4rem",
                color: "#f9fafb",
                marginBottom: "0.5rem",
              }}
            >
              Cómo se procesa el café
            </h3>
            <p
              style={{
                fontSize: "0.95rem",
                color: "#e5e7eb",
                marginBottom: "0.9rem",
              }}
            >
              Empezamos con pequeños lotes lavados, trazables finca por finca.
              Esta primera fase servirá para documentar:
            </p>
            <ul
              style={{
                fontSize: "0.9rem",
                color: "#e5e7eb",
                lineHeight: 1.7,
                paddingLeft: "1.1rem",
              }}
            >
              <li>Variedades y altitud de cada finca piloto.</li>
              <li>Fermentación y lavado con registros simples pero claros.</li>
              <li>Costos reales de producción, beneficio y transporte.</li>
              <li>Cata en Noruega con retroalimentación directa al productor.</li>
            </ul>
            <p
              style={{
                fontSize: "0.9rem",
                color: "#9ca3af",
                marginTop: "0.9rem",
              }}
            >
              La meta de los próximos 12 meses es completar un ciclo: compra
              desde la web, importación con Ruiz Gomez Import y entrega a los
              primeros clientes en Noruega.
            </p>
          </div>

          {/* Imágenes de proceso + video corto */}
          <div
            style={{
              display: "grid",
              gridTemplateRows: "repeat(2, minmax(0, 1fr))",
              gap: "0.75rem",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
                gap: "0.75rem",
              }}
            >
              {[
                "/imagenes/fermentacion-cafe1.jpg",
                "/imagenes/lavado-cafe2.jpg",
              ].map((src) => (
                <div
                  key={src}
                  style={{
                    borderRadius: "1rem",
                    overflow: "hidden",
                    height: "140px",
                    boxShadow: "0 15px 35px rgba(0,0,0,0.7)",
                  }}
                >
                  <img
                    src={src}
                    alt="Proceso del café en finca"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Video de despulpado */}
            <div
              style={{
                borderRadius: "1rem",
                overflow: "hidden",
                border: "1px solid rgba(75,85,99,0.8)",
                boxShadow: "0 20px 45px rgba(0,0,0,0.8)",
              }}
            >
              <video
                src="/imagenes/video-espulpando1.mp4"
                style={{ width: "100%", display: "block" }}
                controls
                muted
                loop
              >
                Tu navegador no soporta el video de proceso del café.
              </video>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------
           SECCIÓN: FINCAS PILOTO Y COMPRADOR ANCLA
        ------------------------------------------------------------------- */}
        <section
          style={{
            marginBottom: "3rem",
            padding: "1.5rem",
            borderRadius: "1.5rem",
            background:
              "linear-gradient(135deg, rgba(30,64,175,0.35), rgba(15,23,42,0.95))",
            border: "1px solid rgba(96,165,250,0.5)",
          }}
        >
          <h3
            style={{
              fontSize: "1.4rem",
              color: "#f9fafb",
              marginBottom: "0.6rem",
            }}
          >
            Tres fincas piloto · Un comprador ancla en Noruega
          </h3>
          <p
            style={{
              fontSize: "0.95rem",
              color: "#e5e7eb",
              marginBottom: "1rem",
            }}
          >
            Empezamos con tres fincas de la Serranía del Perijá. Cada finca
            tendrá su propio lote identificado, pero todos serán comprados en la
            primera fase por <strong>Ruiz Gomez Import</strong> para simplificar
            la logística y documentar bien todo el proceso.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: "0.9rem",
              marginBottom: "1rem",
            }}
          >
            {[
              {
                title: "Finca 1",
                text: "Zona alta, enfoque en lavado tradicional y sombra natural.",
              },
              {
                title: "Finca 2",
                text: "Café con vista al valle, ideal para micro-lotes experimentales.",
              },
              {
                title: "Finca 3",
                text: "Productores con interés en visitas y turismo de café.",
              },
            ].map((card) => (
              <div
                key={card.title}
                style={{
                  padding: "0.9rem",
                  borderRadius: "1rem",
                  backgroundColor: "rgba(15,23,42,0.95)",
                  border: "1px solid rgba(55,65,81,0.9)",
                  fontSize: "0.85rem",
                  color: "#e5e7eb",
                }}
              >
                <div
                  style={{
                    fontWeight: 700,
                    color: "#f9fafb",
                    marginBottom: "0.25rem",
                  }}
                >
                  {card.title}
                </div>
                <div>{card.text}</div>
              </div>
            ))}
          </div>

          {/* Imagen de productores / pueblos indígenas */}
          <div
            style={{
              position: "relative",
              height: "180px",
              borderRadius: "1.2rem",
              overflow: "hidden",
              boxShadow: "0 25px 50px rgba(0,0,0,0.75)",
            }}
          >
            <img
              src="/imagenes/pueblos-indigenas.jpg"
              alt="Encuentro con comunidades de la Serranía del Perijá"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(15,23,42,0.95), transparent 55%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "0.75rem",
                left: "0.9rem",
                right: "0.9rem",
                color: "#f9fafb",
                fontSize: "0.9rem",
              }}
            >
              Esta iniciativa parte de una historia real de retorno a la montaña
              y de diálogo con familias productoras que quieren vender su café
              con identidad clara, precio justo y trazabilidad.
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------
           SECCIÓN: GALERÍA RÁPIDA DE CASCADAS Y RÍOS
        ------------------------------------------------------------------- */}
        <section
          style={{
            marginBottom: "3rem",
            padding: "1.5rem",
            borderRadius: "1.5rem",
            backgroundColor: "rgba(15,23,42,0.95)",
            border: "1px solid rgba(55,65,81,0.9)",
          }}
        >
          <h3
            style={{
              fontSize: "1.3rem",
              color: "#f9fafb",
              marginBottom: "0.6rem",
            }}
          >
            Agua, montaña y cafetales
          </h3>
          <p
            style={{
              fontSize: "0.95rem",
              color: "#e5e7eb",
              marginBottom: "0.9rem",
            }}
          >
            Parte de la identidad de Guatilla viene de sus cascadas y ríos.
            Son también la base del beneficio húmedo del café en la zona.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              gap: "0.75rem",
            }}
          >
            {[
              "/imagenes/cascada1.JPG",
              "/imagenes/cascada2.JPG",
              "/imagenes/cascada3.jpg",
              "/imagenes/cascada4.JPG",
            ].map((src) => (
              <div
                key={src}
                style={{
                  height: "120px",
                  borderRadius: "0.9rem",
                  overflow: "hidden",
                  boxShadow: "0 15px 35px rgba(0,0,0,0.7)",
                }}
              >
                <img
                  src={src}
                  alt="Cascada de la Serranía del Perijá"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------------
           SECCIÓN DE CONTACTO (ANCLA #contacto)
        ------------------------------------------------------------------- */}
        <section
          id="contacto"
          style={{
            marginBottom: "2.5rem",
            padding: "1.5rem",
            borderRadius: "1.5rem",
            background:
              "linear-gradient(135deg, rgba(22,163,74,0.3), rgba(15,23,42,0.95))",
            border: "1px solid rgba(52,211,153,0.6)",
          }}
        >
          <h3
            style={{
              fontSize: "1.3rem",
              color: "#f9fafb",
              marginBottom: "0.5rem",
            }}
          >
            Mantente al tanto
          </h3>
          <p
            style={{
              fontSize: "0.95rem",
              color: "#e5e7eb",
              marginBottom: "0.9rem",
            }}
          >
            Si quieres seguir el avance del proyecto, recibir noticias cuando
            llegue el primer lote a Noruega o explorar cómo participar, puedes
            escribirnos o seguir la página en Facebook.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.3fr) minmax(0, 1fr)",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            {/* Datos de contacto */}
            <div
              style={{
                fontSize: "0.95rem",
                color: "#f9fafb",
              }}
            >
              <div style={{ marginBottom: "0.4rem" }}>
                <strong>Correo:</strong>{" "}
                <a
                  href="mailto:norgesdirektor@guatilla.no"
                  style={{
                    color: "#bbf7d0",
                    textDecoration: "underline",
                  }}
                >
                  norgesdirektor@guatilla.no
                </a>
              </div>
              <div style={{ marginBottom: "0.4rem" }}>
                <strong>Teléfono (Noruega):</strong>{" "}
                <a
                  href="tel:+4793694817"
                  style={{
                    color: "#bbf7d0",
                    textDecoration: "underline",
                  }}
                >
                  +47 936&nbsp;94&nbsp;817
                </a>
              </div>
              <div>
                <strong>Facebook:</strong>{" "}
                <a
                  href="https://www.facebook.com/profile.php?id=100090938266173"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color: "#bbf7d0",
                    textDecoration: "underline",
                  }}
                >
                  Proyecto Guatilla en Facebook
                </a>
              </div>
            </div>

            {/* Botón destacado a Facebook */}
            <div style={{ textAlign: "right" }}>
              <a
                href="https://www.facebook.com/profile.php?id=100090938266173"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-block",
                  padding: "0.8rem 1.3rem",
                  borderRadius: "9999px",
                  backgroundColor: "#22c55e",
                  color: "#022c22",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  textDecoration: "none",
                  boxShadow: "0 18px 40px rgba(34,197,94,0.45)",
                }}
              >
                Ver avances en Facebook
              </a>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------
           PIE DE PÁGINA SIMPLE
        ------------------------------------------------------------------- */}
        <footer
          style={{
            fontSize: "0.8rem",
            color: "#9ca3af",
            paddingBottom: "0.5rem",
            textAlign: "center",
          }}
        >
          © {new Date().getFullYear()} Kaffe Guatilla · Ruiz Gomez Import.
          Primera fase de validación logística y de mercado.
        </footer>
      </div>
    </main>
  );
}


