import Link from "next/link";

export default function TrazabilidadPage() {
  return (
    <main>
      <h1>Proceso y trazabilidad</h1>
      <p>Transparencia desde la finca hasta Noruega, con datos verificables.</p>

      <h2>Cadena del café</h2>
      <ul>
        <li>Finca → beneficio → trilla → exportación → importación → tueste.</li>
      </ul>

      <h2>Qué datos publicaremos por lote</h2>
      <ul>
        <li>Región y finca de origen.</li>
        <li>Proceso (lavado, fermentación, secado).</li>
        <li>Fechas clave del lote.</li>
        <li>Volumen del lote y trazabilidad interna.</li>
        <li>Ruta logística y responsables.</li>
      </ul>

      <h2>Estado actual del proyecto</h2>
      <ul>
        <li>Trilladora: en preparación.</li>
        <li>Exportador: en preparación.</li>
        <li>Logística: en diseño y pruebas.</li>
      </ul>

      <h2>Transparencia</h2>
      <ul>
        <li>Evitar mezclas genéricas sin origen claro.</li>
        <li>Documentar cada lote para mantener claridad de procedencia.</li>
        <li>Aspiramos a cumplir requisitos de licenciamiento y autorización.</li>
      </ul>

      <h2>Lo que viene</h2>
      <ul>
        <li>Fichas técnicas por lote.</li>
        <li>Bitácoras y fotos del proceso.</li>
        <li>Actualizaciones periódicas sin prometer fechas.</li>
      </ul>

      <Link href="/lista-espera">Únete a la lista de espera</Link>
    </main>
  );
}
