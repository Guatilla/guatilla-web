import Link from "next/link";

export default function ProgresoPage() {
  return (
    <main>
      <h1>Avance del proyecto</h1>
      <p>Página en construcción.</p>
      <p>
        Compartimos el avance real del proyecto sin prometer fechas. Esto es lo
        que está en curso ahora mismo.
      </p>

      <h2>Roadmap</h2>
      <ul>
        <li>Trilladora operativa — En curso.</li>
        <li>Registro exportador — En curso.</li>
        <li>Primer lote piloto — Siguiente.</li>
        <li>Preventa informativa — Siguiente.</li>
        <li>Entregas — Por confirmar.</li>
      </ul>

      <h2>Evidencias y transparencia</h2>
      <p>
        Publicaremos fotos y actualizaciones del montaje, la logística y las
        pruebas de calidad sin datos sensibles.
      </p>

      <Link href="/lista-espera">Únete a la lista de espera</Link>
    </main>
  );
}
