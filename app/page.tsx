export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: "bold",
          marginBottom: "1rem",
        }}
      >
        KAFFE GUATILLA
      </h1>
      <p
        style={{
          fontSize: "1.1rem",
          maxWidth: "600px",
          textAlign: "center",
          lineHeight: 1.5,
        }}
      >
        Café especial de la Serranía del Perijá (Colombia), tostado y entregado
        en Noruega. Estamos construyendo esta página para mostrar el origen de
        cada lote, el pago al productor y las pruebas de sabor.
      </p>
    </main>
  );
}
