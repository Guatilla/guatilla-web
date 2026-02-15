import Link from "next/link";

export default function CafePage() {
  return (
    <main>
      <h1>El café</h1>
      <p>Página en construcción.</p>
      <p>
        Estamos definiendo el perfil de Guatilla con lotes piloto y procesos
        controlados. Compartiremos avances a medida que la calidad se
        consolide.
      </p>

      <h2>Qué ofreceremos</h2>
      <ul>
        <li>Café en grano y molido.</li>
        <li>Perfiles de tueste previstos: claro, medio y medio-oscuro.</li>
        <li>Lotes pequeños con trazabilidad por origen.</li>
      </ul>

      <h2>Notas sensoriales esperadas</h2>
      <p>
        Buscamos una taza limpia y dulce, con acidez balanceada y cuerpo medio.
        Las notas finales se confirmarán con el primer lote.
      </p>

      <h2>Próximamente</h2>
      <ul>
        <li>Publicación de perfiles de tueste por lote.</li>
        <li>Actualizaciones de disponibilidad y fecha estimada de llegada.</li>
        <li>Contenido educativo sobre el origen y el proceso.</li>
      </ul>

      <Link href="/lista-espera">Únete a la lista de espera</Link>
    </main>
  );
}
