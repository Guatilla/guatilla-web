import Link from "next/link";

export default function ListaEsperaPage() {
  return (
    <main>
      <h1>Lista de espera</h1>
      <p>Pagina en construccion.</p>
      <p>Dejanos tu contacto y te avisamos cuando haya disponibilidad.</p>
      <Link href="/lista-espera">Ir a lista de espera</Link>
      <form>
        <div>
          <label htmlFor="nombre">Nombre</label>
          <input id="nombre" name="nombre" type="text" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" />
        </div>
        <div>
          <label htmlFor="interes">Interes</label>
          <select id="interes" name="interes" defaultValue="">
            <option value="" disabled>
              Selecciona una opcion
            </option>
            <option value="comprar">Comprar</option>
            <option value="distribuir">Distribuir</option>
            <option value="cafeteria">Cafeteria</option>
            <option value="noticias">Noticias</option>
          </select>
        </div>
        <button type="submit">Enviar</button>
        <p>Esto es una lista de espera. Aun no hay ventas activas.</p>
      </form>
    </main>
  );
}
