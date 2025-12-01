// app/page.tsx
import Image from "next/image";

// ======================================================
//  Página inicial Kaffe Guatilla
//  Estructura por bloques para ir refinando por partes.
// ======================================================

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #0f172a 0, #020617 45%, #020617 100%)",
        color: "#e5e7eb",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        padding: "3rem 1.5rem 4rem",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {/* ======================================================
           HERO: título, logo y mensaje principal
           ====================================================== */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 2fr) minmax(0, 3fr)",
            gap: "2.5rem",
            alignItems: "center",
            marginBottom: "4rem",
          }}
        >
          {/* Logo / Imagen principal */}
          <div
            style={{
              position: "relative",
              borderRadius: "1.5rem",
              overflow: "hidden",
              boxShadow: "0 25px 60px rgba(0,0,0,0.65)",
            }}
          >
            <Image
              src="/images/logo-realista1.jpg"
              alt="Instalación circular que inspira el logo de Guatilla"
              width={640}
              height={800}
              style={{ width: "100%", height: "auto", display: "block" }}
              priority
            />
            <div
              style={{
                position: "absolute",
                inset: "auto 0 0 0",
                padding: "0.75rem 1rem 1rem",
                background:
                  "linear-gradient(to top, rgba(15,23,42,0.95), rgba(15,23,42,0.0))",
              }}
            >
              <p
                style={{
                  fontSize: "0.8rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#a5b4fc",
                }}
              >
                Serranía del Perijá · Colombia
              </p>
              <p style={{ fontSize: "0.95rem", color: "#e5e7eb" }}>
                De un proyecto de turismo de montaña nace el símbolo de nuestro
                café.
              </p>
            </div>
          </div>

          {/* Texto principal */}
          <div>
            <p
              style={{
                fontSize: "0.85rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#a5b4fc",
                marginBottom: "0.75rem",
              }}
            >
              Proyecto en construcción
            </p>
            <h1
              style={{
                fontSize: "2.8rem",
                lineHeight: 1.05,
                fontWeight: 700,
                marginBottom: "1rem",
              }}
            >
              Kaffe Guatilla
            </h1>
            <p
              style={{
                fontSize: "1.05rem",
                color: "#cbd5f5",
                marginBottom: "0.75rem",
              }}
            >
              Café de la Serranía del Perijá (Colombia), tostado y entregado en
              Noruega.
            </p>
            <p
              style={{
                fontSize: "0.98rem",
                color: "#9ca3af",
                marginBottom: "1.5rem",
              }}
            >
              Conectamos fincas de montaña en el Perijá con{" "}
              <strong>Ruiz Gómez Import</strong> en Noruega. La meta del primer
              año es sencilla y ambiciosa a la vez: importar el primer lote
              trazable, documentar todo el proceso y preparar la plataforma de
              compra con Vipps.
            </p>

            {/* Lista de objetivos a 12 meses */}
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "grid",
                gap: "0.75rem",
              }}
            >
              <HeroBullet title="Primer lote">
                Seleccionar un lote de café de altura de tres fincas piloto en
                la Serranía del Perijá.
              </HeroBullet>
              <HeroBullet title="Trazabilidad real">
                Registrar con fotos, datos y fechas cada etapa: cosecha,
                fermentación, lavado, secado, envío y tueste.
              </HeroBullet>
              <HeroBullet title="Plataforma de compra">
                Preparar una tienda mínima para Noruega con autenticación y
                pago vía Vipps, comenzando con Ruíz Gómez Import como primer
                comprador.
              </HeroBullet>
            </ul>
          </div>
        </section>

        {/* ======================================================
           SECCIÓN 2: Paisaje de origen (galería paisaje)
           ====================================================== */}
        <section style={{ marginBottom: "3.5rem" }}>
          <SectionHeader
            title="Paisaje de origen"
            subtitle="Un corredor de montaña entre Colombia y Venezuela, con cumbres que superan los 3 600 msnm."
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
              gap: "1.25rem",
            }}
          >
            <ImageCard
              src="/images/atardecer1.jpg"
              alt="Atardecer sobre las montañas del Perijá"
              caption="Atardeceres sobre las lomas del Perijá."
            />
            <ImageCard
              src="/images/atardecer3.jpg"
              alt="Cielo anaranjado en la serranía"
              caption="Luz cálida de tarde, clima ideal para café de altura."
            />
            <ImageCard
              src="/images/tres-tetas1.jpg"
              alt="Formación montañosa en la Serranía del Perijá"
              caption="Cadenas montañosas que aportan microclimas distintos a cada finca."
            />
            <ImageCard
              src="/images/cascada4.jpg"
              alt="Cascada en la región cafetera"
              caption="Fuentes de agua limpia cerca de los cafetales."
            />
          </div>
        </section>

        {/* ======================================================
           SECCIÓN 3: Camino del grano (proceso)
           ====================================================== */}
        <section style={{ marginBottom: "3.5rem" }}>
          <SectionHeader
            title="Camino del grano"
            subtitle="Las primeras fincas piloto ya están preparando infraestructura para cafés de especialidad."
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "1.5rem",
            }}
          >
            <ProcessCard
              title="Cafetales de montaña"
              description="Filas de café bajo sombra, suelos inclinados y clima fresco. El punto de partida de cada lote."
              image={{
                src: "/images/plata-parque.jpg",
                alt: "Vista cenital de hojas de palma y cafetales",
              }}
              tag="Etapa 1"
            />
            <ProcessCard
              title="Fermentación controlada"
              description="Canales y tolvas ya se están adecuando para manejar mejor tiempos y temperaturas."
              image={{
                src: "/images/fermentacion-cafe1.jpg",
                alt: "Tanques de fermentación de café",
              }}
              tag="Etapa 2"
            />
            <ProcessCard
              title="Lavado y clasificación"
              description="Tanques de lavado y canales que permiten separar el grano por densidad y calidad."
              image={{
                src: "/images/lavado-cafe2.jpg",
                alt: "Canales de lavado para café",
              }}
              tag="Etapa 3"
            />
          </div>

          {/* Nota sobre el video de despulpado */}
          <p
            style={{
              marginTop: "1rem",
              fontSize: "0.9rem",
              color: "#9ca3af",
            }}
          >
            Estamos preparando clips cortos del{" "}
            <strong>despulpado del café</strong> para documentar mejor esta
            etapa. El primer video se integrará aquí más adelante.
          </p>
        </section>

        {/* ======================================================
           SECCIÓN 4: Personas y comunidad
           ====================================================== */}
        <section style={{ marginBottom: "3.5rem" }}>
          <SectionHeader
            title="Personas y comunidad"
            subtitle="Detrás de cada lote hay familias, caminos de trocha y procesos de organización local."
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 3fr) minmax(0, 2fr)",
              gap: "1.5rem",
            }}
          >
            {/* Columna izquierda: tarjetas con fotos humanas */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
                gap: "1.25rem",
              }}
            >
              <ImageCard
                src="/images/carro-con-indio.jpg"
                alt="Vehículo transportando personas en la montaña"
                caption="Transporte típico en la zona cafetera: trochas, tierra y buena conversación."
              />
              <ImageCard
                src="/images/pueblos-indigenas.jpg"
                alt="Reunión de comunidades en la Serranía del Perijá"
                caption="La región comparte territorio con comunidades indígenas y campesinas."
              />
              <ImageCard
                src="/images/fotografiando-realidades.jpg"
                alt="Persona con cámara documentando la región"
                caption="Documentar bien la realidad local es parte del proyecto, no solo vender café."
              />
            </div>

            {/* Columna derecha: texto sobre Ruiz Gómez Import */}
            <div
              style={{
                background:
                  "linear-gradient(145deg, rgba(15,23,42,0.95), rgba(30,64,175,0.85))",
                borderRadius: "1.25rem",
                padding: "1.5rem 1.75rem",
                boxShadow: "0 20px 50px rgba(0,0,0,0.65)",
                border: "1px solid rgba(148,163,184,0.35)",
              }}
            >
              <h3
                style={{
                  fontSize: "1.1rem",
                  marginBottom: "0.75rem",
                  fontWeight: 600,
                }}
              >
                Ruiz Gómez Import · Noruega
              </h3>
              <p
                style={{
                  fontSize: "0.96rem",
                  color: "#e5e7eb",
                  marginBottom: "0.75rem",
                }}
              >
                En Noruega, <strong>Ruiz Gómez Import</strong> será el enlace
                logístico y legal para traer el café verde, tostarlo en pequeños
                lotes y entregarlo a los primeros clientes.
              </p>
              <p
                style={{
                  fontSize: "0.94rem",
                  color: "#cbd5f5",
                  marginBottom: "0.75rem",
                }}
              >
                Esta primera etapa se concentrará en:
              </p>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: "1.1rem",
                  fontSize: "0.92rem",
                  color: "#d1d5db",
                }}
              >
                <li>Probar perfiles de tueste para cafés del Perijá.</li>
                <li>Definir formatos de empaque y etiquetado.</li>
                <li>
                  Diseñar el flujo de compra online con Vipps y control de
                  inventario.
                </li>
              </ul>
              <p
                style={{
                  marginTop: "0.9rem",
                  fontSize: "0.88rem",
                  color: "#9ca3af",
                }}
              >
                A medida que el sistema funcione para este primer comprador,
                abriremos cupos para más clientes en Noruega y más fincas
                productoras en Colombia.
              </p>
            </div>
          </div>
        </section>

        {/* ======================================================
           SECCIÓN 5: Estado del proyecto / cierre temporal
           ====================================================== */}
        <section>
          <div
            style={{
              borderRadius: "1rem",
              border: "1px dashed rgba(148,163,184,0.6)",
              padding: "1.25rem 1.5rem",
              background:
                "linear-gradient(to right, rgba(15,23,42,0.9), rgba(15,23,42,0.6))",
            }}
          >
            <p
              style={{
                fontSize: "0.9rem",
                color: "#a5b4fc",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: "0.5rem",
              }}
            >
              Estado actual
            </p>
            <p
              style={{
                fontSize: "0.95rem",
                color: "#e5e7eb",
                marginBottom: "0.3rem",
              }}
            >
              Esta página es un prototipo técnico y visual. En los próximos
              pasos añadiremos:
            </p>
            <ul
              style={{
                margin: 0,
                paddingLeft: "1.1rem",
                fontSize: "0.9rem",
                color: "#cbd5f5",
              }}
            >
              <li>Ficha técnica detallada del primer lote de café.</li>
              <li>Sección específica para productores en Colombia.</li>
              <li>Versión en noruego de los contenidos clave.</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}

// ======================================================
//  Componentes auxiliares para mantener ordenado el código
// ======================================================

type HeroBulletProps = {
  title: string;
  children: React.ReactNode;
};

function HeroBullet({ title, children }: HeroBulletProps) {
  return (
    <li
      style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gap: "0.6rem",
        alignItems: "flex-start",
      }}
    >
      <span
        style={{
          width: "0.9rem",
          height: "0.9rem",
          borderRadius: "999px",
          background:
            "radial-gradient(circle at 30% 30%, #22c55e, #16a34a 55%, #15803d 100%)",
          boxShadow: "0 0 20px rgba(34,197,94,0.6)",
          marginTop: "0.2rem",
        }}
      />
      <div>
        <p
          style={{
            fontSize: "0.94rem",
            fontWeight: 600,
            margin: 0,
            marginBottom: "0.1rem",
          }}
        >
          {title}
        </p>
        <p
          style={{
            fontSize: "0.9rem",
            color: "#9ca3af",
            margin: 0,
          }}
        >
          {children}
        </p>
      </div>
    </li>
  );
}

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
};

function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <header style={{ marginBottom: "1.2rem" }}>
      <h2
        style={{
          fontSize: "1.4rem",
          fontWeight: 600,
          marginBottom: "0.3rem",
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          style={{
            fontSize: "0.92rem",
            color: "#9ca3af",
            maxWidth: "640px",
          }}
        >
          {subtitle}
        </p>
      )}
    </header>
  );
}

type ImageCardProps = {
  src: string;
  alt: string;
  caption: string;
};

function ImageCard({ src, alt, caption }: ImageCardProps) {
  return (
    <figure
      style={{
        borderRadius: "1rem",
        overflow: "hidden",
        backgroundColor: "#020617",
        border: "1px solid rgba(30,64,175,0.6)",
        boxShadow: "0 18px 45px rgba(0,0,0,0.65)",
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={400}
        height={260}
        style={{ width: "100%", height: "auto", display: "block" }}
      />
      <figcaption
        style={{
          fontSize: "0.88rem",
          color: "#e5e7eb",
          padding: "0.7rem 0.9rem 0.85rem",
          background:
            "linear-gradient(to top, rgba(15,23,42,0.98), rgba(15,23,42,0.75))",
        }}
      >
        {caption}
      </figcaption>
    </figure>
  );
}

type ProcessCardProps = {
  title: string;
  description: string;
  image: { src: string; alt: string };
  tag: string;
};

function ProcessCard({ title, description, image, tag }: ProcessCardProps) {
  return (
    <article
      style={{
        borderRadius: "1.25rem",
        overflow: "hidden",
        background:
          "linear-gradient(145deg, rgba(15,23,42,1), rgba(15,23,42,0.9))",
        border: "1px solid rgba(37, 99, 235, 0.55)",
        boxShadow: "0 20px 50px rgba(0,0,0,0.7)",
      }}
    >
      <div style={{ position: "relative" }}>
        <Image
          src={image.src}
          alt={image.alt}
          width={500}
          height={320}
          style={{ width: "100%", height: "auto", display: "block" }}
        />
        <span
          style={{
            position: "absolute",
            top: "0.75rem",
            left: "0.75rem",
            padding: "0.25rem 0.55rem",
            borderRadius: "999px",
            fontSize: "0.72rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            backgroundColor: "rgba(15,23,42,0.9)",
            color: "#93c5fd",
            border: "1px solid rgba(147,197,253,0.6)",
          }}
        >
          {tag}
        </span>
      </div>
      <div style={{ padding: "0.9rem 1rem 1rem" }}>
        <h3
          style={{
            fontSize: "1rem",
            margin: 0,
            marginBottom: "0.4rem",
            fontWeight: 600,
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: "0.9rem",
            color: "#d1d5db",
            margin: 0,
          }}
        >
          {description}
        </p>
      </div>
    </article>
  );
}
