import Link from "next/link";

export default function TrazabilidadPage() {
  return (
    <main>
      <h1>Trazabilidad</h1>
      <p>Página en construcción.</p>
      <p>
        Queremos que cada lote tenga una historia verificable, desde la finca
        hasta la taza.
      </p>

      <h2>Cadena completa</h2>
      <p>Finca → beneficio → trilla → exportación → importación → tueste.</p>

      <h2>Qué datos publicaremos por lote</h2>
      <ul>
        <li>Región y finca de origen.</li>
        <li>Proceso (lavado, fermentación, secado).</li>
        <li>Fechas clave del lote.</li>
        <li>Ruta logística y actor responsable.</li>
      </ul>

      <h2>Estado actual</h2>
      <p>
        Estamos en fase de montaje de la trilladora y gestión del registro
        exportador. Publicaremos hitos sin prometer fechas.
      </p>

      <Link href="/lista-espera">Únete a la lista de espera</Link>
    </main>
  );
}
