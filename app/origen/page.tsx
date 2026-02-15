import Link from "next/link";
import Image from "next/image";

export default function OrigenPage() {
  return (
    <main>
      <h1>Origen: Serranía del Perijá (Agustín Codazzi)</h1>
      <p>
        Agua de montaña, altura y biodiversidad que influyen en el carácter del
        café.
      </p>

      <figure>
        <Image
          src="/images/cascada-perija-hero.jpg"
          alt="Serranía del Perijá, agua de montaña"
          width={1200}
          height={800}
          style={{ width: "100%", height: "auto" }}
        />
        <figcaption>
          Serranía del Perijá — agua de montaña (foto propia).
        </figcaption>
      </figure>

      <h2>El territorio</h2>
      <ul>
        <li>Ubicación: Agustín Codazzi, Cesar, en la Serranía del Perijá.</li>
        <li>Zona de montaña con variación térmica entre día y noche.</li>
        <li>
          En esta etapa estamos documentando el origen con evidencia (fotos,
          video y registros del proceso).
        </li>
      </ul>

      <h2>Naturaleza y agua</h2>
      <ul>
        <li>
          Paisajes de montaña y fuentes de agua que forman parte del entorno
          cafetero.
        </li>
        <li>Cobertura vegetal y microclimas que acompañan los cultivos.</li>
        <li>
          Nuestro enfoque es registrar y describir el territorio sin exagerar
          ni prometer resultados.
        </li>
      </ul>

      <h2>Origen y denominación (en preparación)</h2>
      <ul>
        <li>
          Por pertenencia municipal, Agustín Codazzi está dentro del área
          delimitada de la DO regional “Café de la Sierra Nevada”.
        </li>
        <li>
          El uso de una denominación requiere cumplimiento y autorización; está
          en preparación.
        </li>
        <li>Publicaremos avances verificables a medida que el proyecto avance.</li>
      </ul>

      <h2>Cómo conectaremos el territorio con la taza</h2>
      <ul>
        <li>
          No prometemos notas específicas: construiremos perfiles sensoriales
          por lote cuando existan datos.
        </li>
        <li>
          Relacionaremos territorio → proceso → resultados con evidencia y
          actualizaciones honestas.
        </li>
        <li>
          Los primeros perfiles se actualizarán después del primer lote y
          validaciones.
        </li>
      </ul>

      <h2>Galería (en construcción)</h2>
      <ul>
        <li>Próximamente: fotografías del territorio, cultivos y fuentes de agua.</li>
        <li>Cada imagen tendrá: lugar, fecha y altitud cuando esté verificada.</li>
      </ul>

      <h2>Lo que viene</h2>
      <ul>
        <li>Registro fotográfico completo por temporada.</li>
        <li>Mapa simple del territorio y zonas de cultivo (con datos verificables).</li>
        <li>Actualizaciones del perfil sensorial por lote y del estado del proyecto.</li>
      </ul>

      <Link href="/lista-espera">Únete a la lista de espera</Link>
    </main>
  );
}
