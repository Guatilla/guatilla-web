import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Butikk | Kaffe Guatilla",
  description: "Utforsk vår kolleksjon av colombiansk spesialkaffe.",
};

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-brand-sand py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-display font-bold text-brand-brown-dark mb-4 uppercase tracking-widest">
            Vår <span className="text-brand-orange">Butikk</span>
          </h1>
          <p className="text-xl text-brand-brown-dark/70 font-medium max-w-2xl mx-auto">
             Utforsk hele Kaffe Guatilla-kolleksjonen. Fra vår klassiske brenning til begrensede utgaver.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {[1, 2, 3].map((item) => (
             <div key={item} className="group bg-white rounded-3xl overflow-hidden shadow-xl border border-brand-brown/10 hover:border-brand-orange/50 transition-all duration-300 transform hover:-translate-y-2 flex flex-col">
              <div className="relative h-[28rem] bg-[#f8f5f0] flex items-center justify-center p-8 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent z-10"></div>
                <Image 
                  src={`/assets/coffee_bag_${item}.png`}
                  alt={`Kaffe Guatilla Variant ${item}`}
                  width={400} 
                  height={600}
                  className="w-full h-full object-contain filter drop-shadow-xl group-hover:scale-105 transition-transform duration-500 z-0 relative"
                />
              </div>
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-display font-bold text-brand-brown-dark mb-2">Produkt fra fjellet {item}</h3>
                  <p className="text-brand-brown-dark/60 text-sm mb-4">Spesialbrent | Hele bønner</p>
                  <p className="font-bold text-brand-orange text-xl mb-6">{199 + item * 20} NOK</p>
                </div>
                <div className="flex gap-4">
                  <Link href={`/shop/produkt-${item}`} className="flex-1 text-center py-3 rounded-xl border border-brand-brown text-brand-brown-dark hover:bg-brand-brown/5 font-bold transition-colors uppercase tracking-wider text-xs">
                    Se detaljer
                  </Link>
                  <button className="flex-1 py-3 rounded-xl bg-brand-orange text-brand-brown-dark hover:bg-black hover:text-white font-bold transition-colors uppercase tracking-wider text-xs">
                    Kjøp
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
