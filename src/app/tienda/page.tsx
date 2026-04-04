import Image from "next/image";
import Link from "next/link";

export default function TiendaPage() {
  return (
    <div className="min-h-screen bg-brand-sand py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-display font-bold text-brand-brown-dark mb-4 uppercase tracking-widest">
            Nuestra <span className="text-brand-orange">Tienda</span>
          </h1>
          <p className="text-xl text-brand-brown-dark/70 font-medium max-w-2xl mx-auto">
             Explora toda la colección de Kaffe Guatilla. Desde nuestro tueste clásico hasta las ediciones limitadas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* We reuse the aesthetic product cards from the home page here */}
          {[1, 2, 3].map((item) => (
             <div key={item} className="group bg-white rounded-3xl overflow-hidden shadow-xl border border-brand-brown/10 hover:border-brand-orange/50 transition-all duration-300 transform hover:-translate-y-2 flex flex-col">
              <div className="relative h-[28rem] bg-[#f8f5f0] flex items-center justify-center p-8 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent z-10"></div>
                <Image 
                  src={`/assets/coffee_bag_${item}.png`}
                  alt={`Café Guatilla Variante ${item}`}
                  width={400} 
                  height={600}
                  className="w-full h-full object-contain filter drop-shadow-xl group-hover:scale-105 transition-transform duration-500 z-0 relative"
                />
              </div>
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-display font-bold text-brand-brown-dark mb-2">Producto de la Montaña {item}</h3>
                  <p className="text-brand-brown-dark/60 text-sm mb-4">Tueste Especial | Grano Entero</p>
                  <p className="font-bold text-brand-orange text-xl mb-6">${15 + item * 2}.00</p>
                </div>
                <div className="flex gap-4">
                  <Link href={`/tienda/producto-${item}`} className="flex-1 text-center py-3 rounded-xl border border-brand-brown text-brand-brown-dark hover:bg-brand-brown/5 font-bold transition-colors uppercase tracking-wider text-xs">
                    Ver Detalles
                  </Link>
                  <button className="flex-1 py-3 rounded-xl bg-brand-orange text-brand-brown-dark hover:bg-black hover:text-white font-bold transition-colors uppercase tracking-wider text-xs">
                    Comprar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
