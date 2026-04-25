import Link from "next/link"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-brand-dark text-brand-beige py-16 px-6 md:px-12 border-t border-brand-primary/20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <h3 className="font-brand text-2xl mb-4 text-brand-primary">KAFFE GUATILLA</h3>
          <p className="text-brand-beige/70 font-light max-w-sm leading-relaxed">
            Unimos la tradición de la Serranía del Perijá con el trabajo artesanal de familias caficultoras. Sabor auténtico y sostenible en cada taza.
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold tracking-widest uppercase text-sm mb-6 text-brand-primary">Tienda</h4>
          <ul className="space-y-3 text-brand-beige/80 font-light">
            <li><Link href="/shop/cafe-origen" className="hover:text-white transition-colors">Café de Origen</Link></li>
            <li><Link href="/shop/accesorios" className="hover:text-white transition-colors">Accesorios Artesanales</Link></li>
            <li><Link href="/suscripciones" className="hover:text-white transition-colors">Suscripciones</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold tracking-widest uppercase text-sm mb-6 text-brand-primary">Soporte</h4>
          <ul className="space-y-3 text-brand-beige/80 font-light">

            <li><Link href="/envios" className="hover:text-white transition-colors">Envíos y Devoluciones</Link></li>
            <li><Link href="/contacto" className="hover:text-white transition-colors">Contáctanos</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-brand-beige/10 flex flex-col md:flex-row items-center justify-between text-brand-beige/50 text-sm font-light">
        <p>&copy; {currentYear} Kaffe Guatilla. Todos los derechos reservados.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Link href="/privacidad" className="hover:text-white transition-colors">Privacidad</Link>
          <Link href="/terminos" className="hover:text-white transition-colors">Términos</Link>
        </div>
      </div>
    </footer>
  )
}
