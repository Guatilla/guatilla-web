export default function Home() {
  return (
    <main
      style={{
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        background: "#f4f1ea",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          maxWidth: "1080px",
          margin: "0 auto",
          padding: "2rem 1.5rem 4rem",
        }}
      >
        {/* HERO */}
        <header
          style={{
            margin: "2.5rem 0 3rem",
            padding: "2.5rem 1.5rem 3rem",
            borderRadius: "1.5rem",
            background:
              "radial-gradient(circle at top left, #f7e6c5, #d3b892 40%, #5a4630 100%)",
            color: "#20160f",
            textAlign: "center",
            boxShadow: "0 18px 45px rgba(0,0,0,0.18)",
          }}
        >
          <img
            src="/logo-guatilla.png.jpg"
            alt="Logo Kaffe Guatilla"
            style={{
              display: "block",
              width: "140px",
              height: "auto",
              margin: "0 auto 1.5rem",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.7)",
              padding: "0.5rem",
            }}
          />

          <h1
            style={{
              fontSize: "2.6rem",
              fontWeight: 800,
              marginBottom: "0.75rem",
              letterSpacing: "0.04em",
            }}
          >
            KAFFE GUATILLA
          </h1>
          <p
            style={{
              fontSize: "1.05rem",
              maxWidth: "640px",
              margin: "0.5rem auto 1.75rem",
              lineHeight: 1.6,
            }}
          >
            Café especial de la Serranía del Perijá (Colombia), tostado y
            entregado en Noruega. Un puente directo entre productores como mi
            hermano Stivenson y compradores conscientes en Noruega.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "0.75rem",
            }}
          >
            <a
              href="#primer-lote"
              style={{
                padding: "0.8rem 1.7rem",
                borderRadius: "999px",
                backgroundColor: "#2b2117",
                color: "#fdfbf7",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "0.95rem",
              }}
            >
              Ver el primer lote
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100090938266173"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "0.8rem 1.7rem",
                borderRadius: "999px",
                backgroundColor: "rgba(255,255,255,0.26)",
                color: "#20160f",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "0.95rem",
                border: "1px solid rgba(255,255,255,0.6)",
              }}
            >
              Seguir proyecto en Facebook
            </a>
          </div>
        </header>

        {/* BLOQUE HISTORIA + ORIGEN */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.3fr) minmax(0, 1fr)",
            gap: "1.8rem",
            marginBottom: "2.5rem",
          }}
        >
          <article
            style={{
              background: "#fdfbf7",
              borderRadius: "1.25rem",
              padding: "1.5rem 1.75rem",
              boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
            }}
          >
            <h2
              style={{
                fontSize: "1.4rem",
                fontWeight: 700,
                marginBottom: "0.75rem",
                color: "#3b2b1c",
              }}
            >
              ¿Qué es Guatilla?
            </h2>
            <p style={{ lineHeight: 1.7, marginBottom: "0.75rem" }}>
              “Guatilla” es el nombre que se usa en la Serranía del Perijá para
              referirse a los campesinos que comenzaron a convivir con las
              comunidades indígenas desde los años 50. Representa la mezcla de
              culturas, el trabajo en la montaña y el respeto por la tierra.
            </p>
            <p style={{ lineHeight: 1.7 }}>
              Kaffe Guatilla nace de esa historia familiar y territorial: café
              de montaña, lotes pequeños y trazables, sin mezclas anónimas, con
              la intención de que el consumidor en Noruega sepa exactamente qué
              está tomando y a quién está apoyando.
            </p>
          </article>

          <article
            style={{
              background: "#f6efe4",
              borderRadius: "1.25rem",
              padding: "1.5rem 1.75rem",
              boxShadow: "0 10px 25px rgba(0,0,0,0.04)",
            }}
          >
            <h3
              style={{
                fontSize: "1.2rem",
                fontWeight: 700,
                marginBottom: "0.75rem",
                color: "#3b2b1c",
              }}
            >
              Origen del café
            </h3>
            <p style={{ lineHeight: 1.7 }}>
              El café Guatilla se cultiva en la Serranía del Perijá, cerca de
              Agustín Codazzi (Cesar, Colombia). Empezamos con la finca de mi
              hermano Stivenson, que cosecha y procesa cafés de montaña con
              cuidado, manteniendo la humedad y la calidad que se necesitan para
              exportar café especial.
            </p>
          </article>
        </section>

        {/* PRIMER LOTE */}
        <section
          id="primer-lote"
          style={{
            marginBottom: "2.5rem",
            background: "#2b2117",
            color: "#fdfbf7",
            borderRadius: "1.5rem",
            padding: "1.8rem 1.75rem 2rem",
            boxShadow: "0 16px 40px rgba(0,0,0,0.35)",
          }}
        >
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              marginBottom: "0.75rem",
            }}
          >
            Primer lote: de hermano a hermano
          </h2>
          <p style={{ lineHeight: 1.7, marginBottom: "0.85rem" }}>
            El primer café Guatilla que se venderá a través de esta página será
            muy sencillo: mi hermano Stivenson cosecha y empaca en Colombia, y
            yo seré el primer comprador en Noruega.
          </p>
          <p style={{ lineHeight: 1.7, marginBottom: "0.85rem" }}>
            En los próximos meses esperamos tener listo el primer lote
            empacado. Este envío será la prueba completa de todo el recorrido:
            cosecha, beneficio, secado, trilla, exportación desde Colombia,
            importación y tostión en Noruega, entrega final en Stavanger y pago
            transparente al productor.
          </p>
          <p style={{ lineHeight: 1.7 }}>
            La meta para los próximos 12 meses es que esta misma página permita
            hacer la compra del lote usando Vipps y que el sistema pida toda la
            autenticación necesaria. Primero lo validaré yo como cliente, y
            luego abriremos la plataforma a más compradores y más productores.
          </p>
        </section>

        {/* PLAN 12 MESES */}
        <section
          style={{
            marginBottom: "2.5rem",
            background: "#fdfbf7",
            borderRadius: "1.25rem",
            padding: "1.75rem",
            boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
          }}
        >
          <h2
            style={{
              fontSize: "1.4rem",
              fontWeight: 700,
              marginBottom: "0.75rem",
              color: "#3b2b1c",
            }}
          >
            Plan de Guatilla para los próximos 12 meses
          </h2>
          <ul
            style={{
              margin: 0,
              paddingLeft: "1.3rem",
              lineHeight: 1.7,
              fontSize: "0.98rem",
            }}
          >
            <li>
              Recibir el primer lote de café Guatilla en Noruega y documentar
              todo el proceso.
            </li>
            <li>
              Ajustar la tostión, el empaque y la logística de entrega local.
            </li>
            <li>
              Preparar la integración con Vipps para que las compras puedan
              hacerse directamente desde esta página.
            </li>
            <li>
              Diseñar la estructura para que nuevos productores en Colombia
              puedan registrarse y proponer sus propios lotes.
            </li>
          </ul>
        </section>

        {/* CONTACTO */}
        <section
          style={{
            borderTop: "1px solid #d4c6b5",
            paddingTop: "1.75rem",
          }}
        >
          <h2
            style={{
              fontSize: "1.3rem",
              fontWeight: 700,
              marginBottom: "0.75rem",
              color: "#3b2b1c",
            }}
          >
            Contacto
          </h2>
          <p style={{ lineHeight: 1.7, marginBottom: "0.75rem" }}>
            Si te interesa probar los primeros lotes en Noruega o eres productor
            de café en Colombia y quieres saber más sobre el proyecto Guatilla,
            puedes contactarme directamente:
          </p>

          <p style={{ lineHeight: 1.7, marginBottom: "0.75rem" }}>
            Correo:{" "}
            <a href="mailto:norgesdirektor@guatilla.no">
              norgesdirektor@guatilla.no
            </a>
            <br />
            Teléfono (Noruega):{" "}
            <a href="tel:+4793694817">+47 936 94 817</a>
          </p>

          <a
            href="https://www.facebook.com/profile.php?id=100090938266173"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              padding: "0.7rem 1.6rem",
              borderRadius: "999px",
              backgroundColor: "#1877F2",
              color: "white",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "0.95rem",
              marginTop: "0.25rem",
            }}
          >
            Ver publicaciones en Facebook
          </a>
        </section>
      </div>
    </main>
  );
}
