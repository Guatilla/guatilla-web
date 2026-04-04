import React from "react";
import Link from "next/link";
import PatchworkBackground from "./ui/PatchworkBackground";

export default function Footer() {
  return (
    <footer className="bg-brand-coffee text-brand-linen relative overflow-hidden">
      {/* Decorative top border using patchwork variant */}
      <PatchworkBackground 
        variant="border" 
        intensity="faded" 
        opacity={0.3} 
        className="mix-blend-overlay absolute top-0" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24 relative z-10 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          <div className="space-y-6 lg:col-span-1 border-b md:border-b-0 border-brand-linen/10 pb-8 md:pb-0">
            <Link href="/" className="inline-block font-heading font-black text-3xl tracking-tighter">
              KAFFE <span className="text-brand-terracotta italic font-light">GUATILLA</span>
            </Link>
            <p className="text-sm text-brand-linen/70 leading-relaxed font-light pr-4 max-w-sm">
              Premium artisanal coffee from the Serranía del Perijá, Colombia. Roasted weekly in Norway with direct trade transparency.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-brand-olive relative inline-block">
              Shop
              <span className="absolute -bottom-2 left-0 w-8 h-px bg-brand-terracotta/50"></span>
            </h4>
            <ul className="space-y-4 text-sm text-brand-linen/80">
              <li><Link href="#cafe" className="hover:text-brand-terracotta transition-colors">Our Coffees</Link></li>
              <li><Link href="#" className="hover:text-brand-terracotta transition-colors">Subscription</Link></li>
              <li><Link href="#" className="hover:text-brand-terracotta transition-colors">Brewing Guides</Link></li>
              <li><Link href="#" className="hover:text-brand-terracotta transition-colors">Wholesale</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-brand-olive relative inline-block">
              Story
              <span className="absolute -bottom-2 left-0 w-8 h-px bg-brand-terracotta/50"></span>
            </h4>
            <ul className="space-y-4 text-sm text-brand-linen/80">
              <li><Link href="#historia" className="hover:text-brand-terracotta transition-colors">Our Heritage</Link></li>
              <li><Link href="#" className="hover:text-brand-terracotta transition-colors">The Farm</Link></li>
              <li><Link href="#sostenibilidad" className="hover:text-brand-terracotta transition-colors">Sustainability</Link></li>
              <li><Link href="#" className="hover:text-brand-terracotta transition-colors">Impact Report</Link></li>
            </ul>
          </div>

          <div>
             <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-brand-olive relative inline-block">
              Contact
              <span className="absolute -bottom-2 left-0 w-8 h-px bg-brand-terracotta/50"></span>
             </h4>
             <ul className="space-y-4 text-sm text-brand-linen/80">
              <li className="flex items-start">
                 <svg className="w-5 h-5 mr-3 text-brand-terracotta/70 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                 <span>Oslo, Norway</span>
              </li>
              <li className="flex items-start">
                 <svg className="w-5 h-5 mr-3 text-brand-terracotta/70 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                 <a href="mailto:hello@kaffeguatilla.no" className="hover:text-brand-terracotta transition-colors">hello@kaffeguatilla.no</a>
              </li>
              <li className="pt-4 flex space-x-6">
                 {/* Social Icons Placeholders */}
                 <a href="#" className="text-brand-linen/60 hover:text-brand-terracotta transition-colors transform hover:-translate-y-1">
                   <span className="sr-only">Instagram</span>
                   <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                 </a>
                 <a href="#" className="text-brand-linen/60 hover:text-brand-terracotta transition-colors transform hover:-translate-y-1">
                   <span className="sr-only">Facebook</span>
                   <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                 </a>
              </li>
             </ul>
          </div>
        </div>
        
        <div className="mt-20 pt-8 border-t border-brand-linen/10 flex flex-col md:flex-row justify-between items-center text-xs text-brand-linen/40 font-medium tracking-wide">
          <p>&copy; {new Date().getFullYear()} Kaffe Guatilla. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link href="#" className="hover:text-brand-terracotta transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-brand-terracotta transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
