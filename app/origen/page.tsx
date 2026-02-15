import Link from "next/link";

export default function OrigenPage() {
  return (
    <main>
      <h1>Origen: Serranía del Perijá (Agustín Codazzi)</h1>
      <p>Agua de montaña, altura y biodiversidad que definen el carácter del café.</p>

      <h2>El territorio</h2>
      <ul>
        <li>Ubicación: Agustín Codazzi, Cesar, en la Serranía del Perijá.</li>
        <li>Alturas de cultivo con cambios térmicos diarios.</li>
        <li>Producción en pequeños lotes de fincas locales.</li>
      </ul>

      <h2>Naturaleza y agua</h2>
      <ul>
        <li>Nacimientos y quebradas que alimentan los cultivos.</li>
        <li>Cobertura vegetal que protege suelos y microclimas.</li>
        <li>Manejo del agua con prácticas de conservación.</li>
      </ul>

      <h2>Terroir: por qué se siente en la taza</h2>
      <ul>
        <li>Maduración lenta por altitud y clima fresco.</li>
        <li>Acidez balanceada y dulzor natural.</li>
        <li>Perfil limpio y estable en taza.</li>
      </ul>

      <h2>Galería (en construcción)</h2>
      <p>
        Próximamente: fotografías del territorio, cultivos y fuentes de agua. Cada
        imagen tendrá captions con lugar, altitud y fecha.
      </p>

      <h2>Lo que viene</h2>
      <ul>
        <li>Registro fotográfico completo por temporada.</li>
        <li>Mapa simple de fincas y zonas de cultivo.</li>
        <li>Actualizaciones del perfil sensorial por lote.</li>
      </ul>

      <Link href="/lista-espera">Únete a la lista de espera</Link>
    </main>
  );
}import Image from "next/image";
import Link from "next/link";

export default function OrigenPage() {
  return (
    <main>
      <h1>Origen (Perijá)</h1>
      <p>Página en construcción.</p>
      <p>
        Guatilla nace en la Serranía del Perijá, una frontera de montaña donde
        el café crece con agua limpia y clima de altura.
      </p>

      <h2>Historia del nombre Guatilla</h2>
      <p>
        El nombre viene de un mirador natural del Perijá. Representa el punto
        donde el paisaje y la gente se encuentran.
      </p>

      <h2>Terroir en 4 factores</h2>
      <ul>
        <li>Altitud: cafetales de altura con maduración lenta.</li>
        <li>Agua: nacimientos y quebradas limpias.</li>
        <li>Clima: mañanas frescas y tardes con neblina.</li>
        <li>Suelo: capas minerales y materia orgánica.</li>
      </ul>

      <h2>Galería del territorio</h2>
      <div style={{ display: "grid", gap: "1rem" }}>
        <figure>
          <Image
            src="/images/cascada1.JPG"
            alt="Cascada en el Perijá"
            width={520}
            height={320}
            style={{ width: "100%", height: "auto" }}
          />
          <figcaption>Cascadas que alimentan los cultivos.</figcaption>
        </figure>
        <figure>
          <Image
            src="/images/atardecer1.JPG"
            alt="Atardecer en la serranía"
            width={520}
            height={320}
            style={{ width: "100%", height: "auto" }}
          />
          <figcaption>Luz suave que acompaña la cosecha.</figcaption>
        </figure>
        <figure>
          <Image
            src="/images/cascada2.JPG"
            alt="Paisaje del Perijá"
            width={520}
            height={320}
            style={{ width: "100%", height: "auto" }}
          />
          <figcaption>Relieves que definen el microclima.</figcaption>
        </figure>
      </div>

      <h2>Cómo el territorio se expresa en la taza</h2>
      <ul>
        <li>Dulzor natural y acidez balanceada.</li>
        <li>Aromas limpios y sensación fresca.</li>
        <li>Cuerpo medio con final suave.</li>
      </ul>

      <Link href="/lista-espera">Únete a la lista de espera</Link>
    </main>
  );
}
