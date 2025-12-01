export default function Home() {
  return (
    <main
      style={{
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        padding: "2rem 1rem 4rem",
        maxWidth: "960px",
        margin: "0 auto",
      }}
    >
      {/* HERO */}
      <header
        style={{
          textAlign: "center",
          margin: "4rem 0 3rem",
        }}
      >
        <h1
          style={{
            fontSize: "2.8rem",
            fontWeight: "bold",
            marginBottom: "1.5rem",
          }}
        >
          KAFFE GUATILLA
        </h1>
        <p
          style={{
            fontSize: "1.1rem",
            maxWidth: "650px",
            margin: "0 auto",
            lineHeight: 1.5,
          }}
        >
          Café especial de la Serranía del Perijá (Colombia), tostado y
          entregado en Noruega. Esta página documentará el origen de cada
          lote, el pago al productor y las pruebas de sabor que realizamos
          con los clientes.
        </p>
      </header>

      {/* ORIGEN */}
      <section id="origen" style={{ marginBottom: "2.5rem" }}>
        <h2
          style={{
            fontSize: "1.6rem",
            fontWeight: "bold",
            marginBottom: "0.75rem",
          }}
        >
          Origen del café
        </h2>
        <p style={{ lineHeight: 1.6 }}>
          Guatilla nace en la Serranía del Perijá, en el municipio de Agustín
          Codazzi (Cesar, Colombia). Trabajamos con cafés de montaña,
          cultivados por pequeños productores que conocen cada lote. La
          idea del proyecto es traer esos cafés de origen controlado a
          Noruega, sin mezclarlos con otros países, para que el consumidor
          sepa exactamente qué está tomando.
        </p>
      </section>

      {/* PROYECTO EN NORUEGA */}
      <section id="prosjekt" style={{ marginBottom: "2.5rem" }}>
        <h2
          style={{
            fontSize: "1.6rem",
            fontWeight: "bold",
            marginBottom: "0.75rem",
          }}
        >
          Proyecto en Noruega
        </h2>
        <p style={{ lineHeight: 1.6 }}>
          En Stavanger tostamos pequeños volúmenes de café verde importado
          directamente desde Colombia. Usamos tuestes controlados y
          registramos tanto los costos logísticos como la respuesta de los
          clientes en Noruega. Esta información forma parte de un proyecto
          de innovación orientado a transparencia en origen y trazabilidad
          del producto.
        </p>
      </section>

      {/* CONTACTO */}
      <section id="kontakt">
        <h2
          style={{
            fontSize: "1.6rem",
            fontWeight: "bold",
            marginBottom: "0.75rem",
          }}
        >
          Contacto
        </h2>
        <p style={{ lineHeight: 1.6 }}>
          Mientras terminamos el sistema de pedidos y encuestas, puedes
          contactar al proyecto Guatilla por correo electrónico en{" "}
          <a href="mailto:post@guatilla.no">post@guatilla.no</a> o seguir
          las actualizaciones en redes sociales asociadas al nombre
          <strong> Guatilla</strong>.
        </p>
      </section>
    </main>
  );
}
