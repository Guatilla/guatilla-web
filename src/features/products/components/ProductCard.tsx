import Image from "next/image"
import Link from "next/link"
import { formatPrice } from "@/lib/utils"

interface ProductCardProps {
  product: {
    id: string
    name: string
    slug: string
    description: string
    price: number // in cents
    images: string[]
  }
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group flex flex-col bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-brand-primary/10 rounded-sm">
      <Link href={`/product/${product.slug}`} className="relative h-72 w-full overflow-hidden bg-brand-bg/50">
        {product.images[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
          />
        ) : (
          <div className="absolute inset-0 flex-center bg-brand-beige text-brand-dark/40 font-heading text-sm">
            [ Img: {product.name} ]
          </div>
        )}
        
        {/* Overlay hover effect - Cottagecore aesthetic */}
        <div className="absolute inset-0 bg-brand-dark/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-2">
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-heading text-xl text-brand-dark hover:text-brand-terracotta transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <p className="text-brand-dark/70 text-sm mt-2 line-clamp-2 font-light">
            {product.description}
          </p>
        </div>
        
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-brand-primary/10">
          <span className="font-semibold text-lg text-brand-dark">
            {formatPrice(product.price)}
          </span>
          <button className="text-sm font-medium text-brand-terracotta hover:text-brand-dark uppercase tracking-wider transition-colors">
            Añadir
          </button>
        </div>
      </div>
    </div>
  )
}
