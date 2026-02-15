export default function ListaEsperaPage() {
  return (
    <main>
      <h1>Lista de espera</h1>
      <p>Página en construcción.</p>
      <p>
        Déjanos tu contacto y te avisamos cuando el primer lote esté listo.
      </p>
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
          <label htmlFor="ubicacion">Ciudad/País</label>
          <input id="ubicacion" name="ubicacion" type="text" />
        </div>
        <div>
          <label htmlFor="interes">Interés</label>
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
        <p>
          Esto es una lista de espera. Aún no hay ventas activas. Te avisamos
          cuando el primer lote esté listo.
        </p>
      </form>
    </main>
  );
}
