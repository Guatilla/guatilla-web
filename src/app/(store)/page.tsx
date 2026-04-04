import Image from "next/image"
import Link from "next/link"
import { ShoppingBag, ArrowRight } from "lucide-react"

const FEATURED_PRODUCTS = [
  {
    id: "1",
    name: "Café Origen Perijá",
    slug: "cafe-origen-perija",
    category: "Tostado Medio",
    price: 35000,
    image: "/bg-flatlay-1.png",
  },
  {
    id: "2",
    name: "Edición Miel & Cacao",
    slug: "edicion-miel-cacao",
    category: "Proceso Honey",
    price: 42000,
    image: "/bg-flatlay-2.png",
  },
  {
    id: "3",
    name: "Café Reserva de la Familia",
    slug: "reserva-familia",
    category: "Tostado Oscuro",
    price: 48000,
    image: "/bg-flatlay-1.png",
  },
  {
    id: "4",
    name: "Taza Artesanal de Barro",
    slug: "taza-barro",
    category: "Accesorios",
    price: 25000,
    image: "/bg-flatlay-2.png",
  }
]

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] font-sans pb-20">
      
      {/* 
        HERO SECTION
        Diseñado para imitar un layout clásico de e-commerce premium pero con la textura Cottagecore 
        y los tonos tierra de la imagen generada.
      */}
      <section className="relative w-full h-[85vh] md:h-[90vh] flex items-center bg-[#2A2421] overflow-hidden">
        {/* Imagen principal dividida o como fondo inmersivo */}
        <div className="absolute inset-0 z-0 md:w-[60%] md:right-0 md:left-auto">
          <Image
            src="/Gemini_Generated_Image_gukaikgukaikguka.png" // Usamos la imagen exacta que pasaste
            alt="Estética Patchwork y Café Rústico"
            fill
            className="object-cover object-center opacity-90"
            priority
          />
          {/* Gradiente para fusionar con el fondo oscuro en desktop */}
          <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-[#2A2421] via-[#2A2421]/60 to-transparent" />
          <div className="md:hidden absolute inset-0 bg-[#2A2421]/60" />
        </div>

        {/* Contenedor del texto (Alineado a la izquierda como un e-commerce clásico) */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-2xl text-[#FDFBF7]">
            <span className="inline-block py-1 px-3 border border-[#D4A373] text-[#D4A373] uppercase tracking-widest text-xs font-semibold mb-6 rounded-sm">
              Nueva Cosecha
            </span>
            <h1 className="text-5xl md:text-7xl font-heading leading-[1.1] mb-6">
              Sabor Artesanal <br /> 
              <span className="text-[#D4A373] italic font-light">de la Serranía.</span>
            </h1>
            <p className="text-lg md:text-xl font-light text-[#FDFBF7]/80 mb-10 max-w-lg">
              Descubre nuestra colección de granos premium seleccionados a mano. Notas de cacao, panela y la tradición de nuestra tierra.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/shop" 
                className="flex items-center justify-center gap-2 bg-[#CC7A52] text-white px-8 py-4 uppercase tracking-widest text-sm font-medium hover:bg-[#A95C38] transition-colors rounded-sm"
              >
                <ShoppingBag size={18} />
                Comprar Ahora
              </Link>
              <Link 
                href="/historia" 
                className="flex items-center justify-center gap-2 border border-[#FDFBF7] text-[#FDFBF7] px-8 py-4 uppercase tracking-widest text-sm font-medium hover:bg-[#FDFBF7] hover:text-[#2A2421] transition-colors rounded-sm"
              >
                Ver Colección
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 
        PRODUCTOS DESTACADOS 
        Malla (Grid) de productos tal cual se presenta en interfaces de compra claras
      */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-[#2A2421]/10 pb-6">
          <div>
            <span className="text-[#8E9B6D] font-bold tracking-widest uppercase text-sm">Selección Especial</span>
            <h2 className="text-4xl font-heading text-[#2A2421] mt-2">Nuestros Favoritos</h2>
          </div>
          <Link href="/shop" className="group flex items-center gap-2 text-[#CC7A52] font-medium mt-4 md:mt-0">
            <span>Ver todo el catálogo</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURED_PRODUCTS.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              {/* Contenedor de Imagen de Producto */}
              <div className="relative aspect-[4/5] bg-[#F2E8CF] overflow-hidden rounded-sm mb-4 border border-[#D4A373]/20">
                <Image
                  src={product.image} // Usamos las imágenes base mientras tanto
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 group-hover:opacity-90 transition-all duration-500"
                />
                
                {/* Botón rápido de "Añadir" estilo e-commerce moderno */}
                <div className="absolute bottom-0 left-0 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <button className="w-full bg-[#2A2421]/90 backdrop-blur-sm text-white py-3 text-sm font-medium tracking-wide hover:bg-[#CC7A52] transition-colors flex justify-center items-center gap-2">
                    <ShoppingBag size={16} /> 
                    Añadir al carrito
                  </button>
                </div>
              </div>

              {/* Info del Producto */}
              <div className="text-center md:text-left px-1">
                <p className="text-[#8E9B6D] text-xs uppercase tracking-wider font-semibold mb-1">
                  {product.category}
                </p>
                <h3 className="font-heading text-lg text-[#2A2421] leading-tight mb-2 group-hover:text-[#CC7A52] transition-colors">
                  {product.name}
                </h3>
                <p className="text-[#2A2421] font-medium">
                  ${product.price.toLocaleString("es-CO")} COP
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 
        BANNER PROMOCIONAL / ESTILO DE VIDA
        Copiando el estilo visual del flat lay con telas
      */}
      <section className="my-12 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="relative w-full h-[400px] rounded-sm overflow-hidden flex items-center justify-center shadow-lg border-2 border-[#F2E8CF]">
          <Image
            src="/Gemini_Generated_Image_gukaikgukaikguka.png" // La imagen principal como textura de fondo
            alt="Costuras y Retazos de Café"
            fill
            className="object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-[#8E9B6D]/80 mix-blend-multiply" />
          
          <div className="relative z-10 text-center px-4">
            <h2 className="text-3xl md:text-5xl font-heading text-white mb-6">Elige tus granos, <br/> nosotros los tostamos.</h2>
            <p className="text-[#F2E8CF] text-lg mb-8 max-w-md mx-auto font-light">Suscríbete para recibir café fresco en tu puerta cada mes con envío gratuito.</p>
            <button className="bg-[#FDFBF7] text-[#8E9B6D] px-8 py-4 font-semibold uppercase tracking-wider text-sm hover:bg-[#CC7A52] hover:text-white transition-colors rounded-sm shadow-xl">
              Ver Suscripciones
            </button>
          </div>
        </div>
      </section>

    </main>
  )
}
