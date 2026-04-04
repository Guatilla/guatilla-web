import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Very simple mock logic for the prototype
  if (!id.startsWith("producto-")) {
    notFound();
  }
  
  const idNum = id.replace("producto-", "");
  const imageSrc = `/assets/coffee_bag_${idNum}.png`;

  return (
    <div className="min-h-screen bg-brand-sand py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex mb-8 text-sm font-medium text-brand-brown-dark/70">
          <Link href="/" className="hover:text-brand-orange transition-colors">Inicio</Link>
          <span className="mx-2">/</span>
          <Link href="/tienda" className="hover:text-brand-orange transition-colors">Tienda</Link>
          <span className="mx-2">/</span>
          <span className="text-brand-orange">Producto {idNum}</span>
        </nav>

        <div className="flex flex-col md:flex-row gap-16">
          {/* Image Section */}
          <div className="md:w-1/2">
            <div className="bg-[#f8f5f0] rounded-3xl p-12 flex-center relative overflow-hidden shadow-2xl border border-brand-brown/10 h-[600px]">
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent z-10"></div>
              <Image 
                  src={imageSrc}
                  alt={`Café Guatilla Variante ${idNum}`}
                  width={600} 
                  height={800}
                  className="w-full h-full object-contain filter drop-shadow-2xl z-20 relative transform hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Details Section */}
          <div className="md:w-1/2 flex flex-col justify-center space-y-8">
            <div>
              <div className="inline-block px-4 py-1 bg-brand-orange/20 text-brand-orange rounded-full font-bold uppercase tracking-wider text-xs mb-4">
                Edición Especial
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-brown-dark mb-2">Producto de la Montaña {idNum}</h1>
              <p className="text-brand-brown-dark/60 text-lg mb-4">100% Arábica Colombiano</p>
              <p className="font-bold text-brand-orange text-3xl font-display">${15 + parseInt(idNum) * 2}.00</p>
            </div>

            <p className="text-brand-brown-dark/80 text-lg leading-relaxed">
              Cultivado en las altas montañas de la Serranía del Perijá, este lote rinde tributo directo al esfuerzo campesino. Trazabilidad completa desde su origen hasta tu taza, destacando notas achocolatadas y un sutil regusto frutal.
            </p>

            <div className="space-y-4 pt-6 border-t border-brand-brown/20">
              {/* Variant Selectors (Mocked) */}
              <div>
                <h4 className="font-bold text-brand-brown-dark uppercase text-sm mb-2">Tipo de Molienda:</h4>
                <div className="flex gap-4">
                  <button className="px-6 py-2 border-2 border-brand-orange text-brand-orange rounded-xl font-bold">Grano Entero</button>
                  <button className="px-6 py-2 border-2 border-brand-brown/10 text-brand-brown-dark/60 rounded-xl hover:border-brand-brown transition-colors">Molido Filtro</button>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-brand-brown-dark uppercase text-sm mb-2 pt-4">Cantidad:</h4>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border-2 border-brand-brown/20 rounded-xl overflow-hidden">
                    <button className="px-4 py-2 text-brand-brown-dark hover:bg-brand-brown/10 font-bold">-</button>
                    <span className="px-4 py-2 text-brand-brown-dark font-bold border-x-2 border-brand-brown/20">1</span>
                    <button className="px-4 py-2 text-brand-brown-dark hover:bg-brand-brown/10 font-bold">+</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 flex flex-col sm:flex-row gap-4">
               <Link href="/carrito" className="flex-1 text-center py-4 rounded-xl bg-brand-orange text-brand-brown-dark hover:bg-black hover:text-white font-bold transition-all shadow-lg shadow-brand-orange/30 transform hover:-translate-y-1 uppercase tracking-wider">
                  Agregar al Carrito
               </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
