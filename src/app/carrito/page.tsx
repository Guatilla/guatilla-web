import Link from "next/link";
import Image from "next/image";

export default function CarritoPage() {
  return (
    <div className="min-h-screen bg-brand-sand py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-col flex-center min-h-[60vh]">
        
        <div className="text-center space-y-8 animate-fade-in-up">
          <div className="w-24 h-24 bg-brand-orange/20 rounded-full flex-center mx-auto text-brand-orange">
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-brown-dark uppercase mt-8">
            Tu Carrito <span className="text-brand-orange">Te Espera</span>
          </h1>
          
          <p className="text-xl text-brand-brown-dark/70 font-medium max-w-md mx-auto">
            Actualmente tu carrito está vacío. ¿Listo para descubrir el sabor de la Serranía del Perijá?
          </p>

          <Link href="/tienda" className="inline-block mt-8 text-center px-10 py-4 rounded-full bg-brand-orange text-brand-brown-dark hover:bg-brand-brown-dark hover:text-brand-orange font-bold transition-all shadow-xl shadow-brand-orange/20 transform hover:-translate-y-1 uppercase tracking-wider">
            Explorar Café
          </Link>
        </div>

      </div>
    </div>
  );
}
