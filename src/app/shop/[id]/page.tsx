import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ShoppingBag, Coffee, Globe, ShieldCheck, ArrowLeft } from "lucide-react";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Prefix check (using 'produkt-' for consistency with shop/page.tsx)
  if (!id.startsWith("produkt-")) {
    notFound();
  }
  
  const idNum = id.replace("produkt-", "");
  const imageSrc = `/assets/coffee_bag_${idNum}.png`;
  const price = 199 + parseInt(idNum) * 20;

  return (
    <div className="min-h-screen bg-brand-linen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Navigation / Breadcrumb */}
        <nav className="flex items-center gap-2 mb-12 text-sm font-medium text-brand-coffee/60">
          <Link href="/" className="hover:text-brand-terracotta transition-colors">Hjem</Link>
          <ChevronRight size={14} />
          <Link href="/shop" className="hover:text-brand-terracotta transition-colors">Butikk</Link>
          <ChevronRight size={14} />
          <span className="text-brand-coffee">Fjellkaffe {idNum}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Image Section */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-[2rem] p-12 lg:p-20 flex items-center justify-center relative overflow-hidden shadow-2xl border border-brand-coffee/5 aspect-square">
              <div className="absolute inset-0 bg-gradient-to-t from-brand-coffee/5 to-transparent z-10"></div>
              <Image 
                  src={imageSrc}
                  alt={`Kaffe Guatilla Variant ${idNum}`}
                  width={600} 
                  height={800}
                  className="w-full h-full object-contain filter drop-shadow-2xl z-20 relative transform hover:scale-105 transition-transform duration-700"
                  priority
              />
            </div>
          </div>

          {/* Details Section */}
          <div className="lg:w-1/2 flex flex-col justify-center space-y-10">
            <div>
              <div className="inline-block px-4 py-1.5 bg-brand-terracotta/10 text-brand-terracotta border border-brand-terracotta/20 rounded-full font-bold uppercase tracking-widest text-[10px] mb-6">
                Spesialkaffe | Perijá
              </div>
              <h1 className="text-4xl md:text-6xl font-heading font-bold text-brand-coffee mb-4">Fjellkaffe fra Serranía {idNum}</h1>
              <p className="text-brand-coffee/60 text-lg md:text-xl font-light mb-6">100% Arábica | Direkte handel</p>
              <p className="font-bold text-brand-terracotta text-4xl font-heading">{price} NOK</p>
            </div>

            <div className="space-y-6 text-brand-coffee/80 text-lg leading-relaxed font-light">
              <p>
                Denne kaffen er dyrket i de høytliggende områdene av Serranía del Perijá, Colombia. Hver bønne er et resultat av generasjoners kunnskap og et tett samarbeid med våre lokale bønder.
              </p>
              <p>
                Forvent en balansert smaksprofil med dype toner av sjokolade, et snev av karamell og en frisk, fruktig ettersmak som er karakteristisk for jordsmonnet i denne regionen.
              </p>
            </div>

            <div className="space-y-8 pt-8 border-t border-brand-coffee/10">
              {/* Variant Selector */}
              <div className="space-y-4">
                <h4 className="font-bold text-brand-coffee uppercase tracking-widest text-xs">Maling:</h4>
                <div className="flex flex-wrap gap-3">
                  <button className="px-6 py-3 border-2 border-brand-terracotta text-brand-terracotta rounded-xl font-bold text-sm bg-brand-terracotta/5">Hele bønner</button>
                  <button className="px-6 py-3 border-2 border-brand-coffee/10 text-brand-coffee/60 rounded-xl hover:border-brand-coffee transition-colors font-bold text-sm">Filter</button>
                  <button className="px-6 py-3 border-2 border-brand-coffee/10 text-brand-coffee/60 rounded-xl hover:border-brand-coffee transition-colors font-bold text-sm">Espresso</button>
                </div>
              </div>

              {/* Quantity and Action */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center border-2 border-brand-coffee/10 rounded-xl overflow-hidden bg-white">
                  <button className="px-6 py-4 text-brand-coffee hover:bg-brand-coffee/5 font-bold">-</button>
                  <span className="px-6 py-4 text-brand-coffee font-bold border-x-2 border-brand-coffee/10 min-w-[60px] text-center">1</span>
                  <button className="px-6 py-4 text-brand-coffee hover:bg-brand-coffee/5 font-bold">+</button>
                </div>
                <button className="flex-1 flex items-center justify-center gap-3 py-5 rounded-xl bg-brand-terracotta text-white hover:bg-brand-coffee transition-all shadow-lg shadow-brand-terracotta/20 font-bold uppercase tracking-widest text-sm">
                  <ShoppingBag size={20} />
                  Legg i handlekurv
                </button>
              </div>
            </div>

            {/* Extra Info Icons */}
            <div className="grid grid-cols-2 gap-8 pt-10">
              <div className="flex items-start gap-3">
                <div className="text-brand-terracotta mt-1"><Globe size={20} strokeWidth={1.5} /></div>
                <div>
                  <h5 className="font-bold text-xs uppercase tracking-widest text-brand-coffee">Opprinnelse</h5>
                  <p className="text-xs text-brand-coffee/50 font-light">Perijá, Colombia</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-brand-terracotta mt-1"><ShieldCheck size={20} strokeWidth={1.5} /></div>
                <div>
                  <h5 className="font-bold text-xs uppercase tracking-widest text-brand-coffee">Sporbarhet</h5>
                  <p className="text-xs text-brand-coffee/50 font-light">100% gjennomsiktig</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-20 pt-10 border-t border-brand-coffee/5">
           <Link href="/shop" className="inline-flex items-center gap-2 text-brand-coffee/60 hover:text-brand-terracotta transition-colors font-bold uppercase tracking-widest text-xs group">
             <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Tilbake til butikken
           </Link>
        </div>

      </div>
    </div>
  );
}
