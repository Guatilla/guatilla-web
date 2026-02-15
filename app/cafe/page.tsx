import Link from "next/link";

export default function CafePage() {
  return (
    <main>
      <h1>Cafe</h1>
      <p>Pagina en construccion.</p>
      <p>Dejanos tu contacto y te avisamos cuando haya disponibilidad.</p>
      <Link href="/lista-espera">Ir a lista de espera</Link>
    </main>
  );
}
