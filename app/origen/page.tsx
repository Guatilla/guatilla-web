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
}
