"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Minus, Plus, X } from "lucide-react";
import { useCart } from "@/components/CartProvider";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, cartTotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-brand-linen pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-10">
            <div className="w-24 h-24 bg-brand-coffee/5 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-brand-coffee/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-brand-coffee">Handlekurven din er tom</h1>
              <p className="text-lg text-brand-coffee/60 font-light max-w-md mx-auto">
                Klar til å oppdage smakene fra Serranía del Perijá?
              </p>
            </div>
            <Link
              href="/shop"
              className="btn-primary"
            >
              Utforsk kaffen vår
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-linen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="mb-12">
          <Link
            href="/shop"
            className="inline-flex items-center space-x-2 text-brand-coffee/60 hover:text-brand-terracotta transition-colors group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-widest">Tilbake til butikken</span>
          </Link>
        </div>

        <h1 className="text-4xl md:text-5xl font-heading font-bold text-brand-coffee mb-12">Handlekurv</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-6 p-6 bg-brand-cream rounded-2xl border border-brand-coffee/5 shadow-[0_4px_12px_rgba(0,0,0,0.03)]"
              >
                {/* Image */}
                <div className="relative w-28 h-36 rounded-xl overflow-hidden bg-brand-linen shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex flex-col flex-grow justify-between">
                  <div className="space-y-1">
                    <h3 className="text-xl font-heading font-bold text-brand-coffee">{item.name}</h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-brand-coffee/40">{item.origin}</p>
                    <p className="text-lg font-heading font-bold text-brand-coffee">{item.price}</p>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full border border-brand-coffee/20 flex items-center justify-center text-brand-coffee hover:border-brand-terracotta hover:text-brand-terracotta transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-bold text-brand-coffee w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full border border-brand-coffee/20 flex items-center justify-center text-brand-coffee hover:border-brand-terracotta hover:text-brand-terracotta transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-brand-coffee/30 hover:text-brand-vichy transition-colors"
                      aria-label="Remove item"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={clearCart}
              className="text-sm font-bold uppercase tracking-widest text-brand-coffee/40 hover:text-brand-terracotta transition-colors"
            >
              Tøm handlekurv
            </button>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-brand-cream rounded-2xl border border-brand-coffee/5 p-8 space-y-8 sticky top-32">
              <h2 className="text-xl font-heading font-bold text-brand-coffee">Oppsummering</h2>

              <div className="space-y-3 text-sm">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-brand-coffee/70">
                    <span>{item.name} × {item.quantity}</span>
                    <span className="font-medium">{item.priceNum * item.quantity} {item.currency}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-brand-coffee/10 pt-6 space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-coffee/50">Subtotal</span>
                  <span className="text-lg font-heading font-bold text-brand-coffee">{cartTotal} {items[0]?.currency || "NOK"}</span>
                </div>

                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-brand-coffee/40">Frakt (estimert)</span>
                  <span className="text-xs font-medium text-brand-coffee/40">Inkludert</span>
                </div>

                <div className="flex justify-between items-baseline pt-3 border-t border-brand-coffee/5">
                  <span className="text-sm font-bold uppercase tracking-widest text-brand-coffee">Estimert total</span>
                  <span className="text-2xl font-heading font-bold text-brand-coffee">{cartTotal} {items[0]?.currency || "NOK"}</span>
                </div>
              </div>

              <div className="rounded-xl border border-brand-coffee/10 p-5 space-y-3 bg-white/50">
                <button
                  disabled
                  className="w-full py-5 rounded-full font-bold uppercase tracking-widest text-sm bg-brand-coffee/15 text-brand-coffee/40 cursor-not-allowed"
                >
                  Betaling kommer snart
                </button>
                <p className="text-center text-xs text-brand-coffee/35 leading-relaxed">
                  Vi åpner for bestilling når neste parti er klart.
                </p>
              </div>

              <div className="text-center">
                <Link
                  href="/shop"
                  className="text-sm font-bold text-brand-coffee/60 hover:text-brand-terracotta transition-colors underline underline-offset-4"
                >
                  Fortsett å handle
                </Link>
              </div>

              <div className="border-t border-brand-coffee/10 pt-6">
                <p className="text-xs text-brand-coffee/35 text-center leading-relaxed">
                  Alle priser inkluderer mva. Fri frakt på bestillinger over 500 NOK.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
