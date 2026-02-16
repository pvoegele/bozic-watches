import Link from 'next/link';
import WatchCard from '@/components/WatchCard';
import HeroVideo from '@/components/HeroVideo';
import { getAllProducts } from '@/lib/shopify';

export default async function Home() {
  const products = await getAllProducts();
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="bg-luxury-cream">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background - Only shows if video exists */}
        <HeroVideo />

        {/* Strong dark overlay for best readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/40 to-luxury-cream/70 pointer-events-none" />

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 lg:px-8 text-center">
          <div className="max-w-5xl bg-transparent rounded-lg mx-auto space-y-12">

            <h1 className="text-6xl md:text-8xl font-sans font-black tracking-tight leading-none text-white drop-shadow-[0_4px_32px_rgba(0,0,0,0.95)]">
              Exklusive
              <span className="block text-white mt-4 drop-shadow-[0_4px_32px_rgba(0,0,0,1)]">Luxusuhren</span>
            </h1>
            <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto leading-relaxed font-light tracking-wide drop-shadow-[0_2px_16px_rgba(0,0,0,0.85)]">
              Entdecken Sie unsere handverlesene Auswahl an außergewöhnlichen Zeitmessern.
              <span className="block mt-2 text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)]">Jede Uhr erzählt ihre eigene Geschichte.</span>
            </p>
            
            {/* Mobile Scroll indicator inside CTA section */}
            <div className="w-full flex flex-col items-center sm:hidden mb-2 -mt-2">
              <div className="flex flex-col items-center gap-1 text-luxury-stone animate-bounce text-white">
                <span className="text-xs uppercase tracking-widest">Scroll</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8 w-full">
              <Link 
                href="/uhren"
                className="group px-8 py-4 sm:px-12 sm:py-5 border-2 border-luxury-gold text-white text-base sm:text-sm uppercase tracking-widest font-medium sm:font-medium font-bold hover:bg-luxury-gold hover:text-white transition-all duration-500 min-w-[200px] sm:min-w-[240px] w-full sm:w-auto bg-black/30 sm:bg-transparent drop-shadow-[0_2px_12px_rgba(0,0,0,0.96)]"
                style={{
                  boxShadow:
                    '0 2px 12px 0 rgba(0,0,0,0.84)',
                }}
              >
                Uhren entdecken
              </Link>
              <Link 
                href="/ankauf"
                className="group px-8 py-4 sm:px-12 sm:py-5 border-2 border-white text-white text-base sm:text-sm uppercase tracking-widest font-medium sm:font-medium font-bold hover:text-luxury-gold hover:border-luxury-gold hover:bg-white/5 transition-all duration-300 min-w-[200px] sm:min-w-[240px] w-full sm:w-auto bg-black/30 sm:bg-transparent drop-shadow-[0_2px_12px_rgba(0,0,0,0.96)]"
                style={{
                  boxShadow:
                    '0 2px 12px 0 rgba(0,0,0,0.84)',
                }}
              >
                Uhr verkaufen
              </Link>
            </div>
          </div>
        </div>

        {/* Desktop Scroll Indicator ONLY for md+ */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10 hidden sm:block">
          <div className="flex flex-col items-center gap-3 text-luxury-stone animate-bounce text-white">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </section>

      {/* Featured Watches */}
      <section className="py-32 bg-luxury-smoke">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-sans font-black text-luxury-black mb-6 tracking-tight">
              Aktuelle Highlights
            </h2>
            <p className="text-lg text-luxury-stone max-w-2xl mx-auto tracking-wide">
              Unsere neuesten und exklusivsten Uhren
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {featuredProducts.map((product) => (
              <WatchCard key={product.id} watch={product} />
            ))}
          </div>

          <div className="text-center mt-20">
            <Link 
              href="/uhren"
              className="inline-flex items-center gap-3 text-luxury-charcoal hover:text-luxury-gold transition-colors duration-300 text-sm uppercase tracking-widest font-medium group"
            >
              Alle Uhren ansehen
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Section - Dark Background */}
      <section className="py-32 bg-gradient-luxury">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-sans font-black text-luxury-cream mb-6 tracking-tight">
              Ankauf in 3 Schritten
            </h2>
            <p className="text-lg text-luxury-pearl/70 max-w-2xl mx-auto tracking-wide">
              Verkaufen Sie Ihre Luxusuhr sicher und unkompliziert
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-6xl mx-auto">
            {/* Step 1 */}
            <div className="text-center space-y-6">
              <div className="w-20 h-20 border-2 border-luxury-gold flex items-center justify-center text-luxury-gold text-3xl font-sans font-black mx-auto">
                1
              </div>
              <h3 className="text-2xl font-sans font-bold text-luxury-cream">
                Kontaktaufnahme
              </h3>
              <p className="text-luxury-pearl/70 leading-relaxed">
                Nehmen Sie mit uns Kontakt auf - per E-Mail, Telefon oder WhatsApp
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center space-y-6">
              <div className="w-20 h-20 border-2 border-luxury-gold flex items-center justify-center text-luxury-gold text-3xl font-sans font-black mx-auto">
                2
              </div>
              <h3 className="text-2xl font-sans font-bold text-luxury-cream">
                Bewertung
              </h3>
              <p className="text-luxury-pearl/70 leading-relaxed">
                Wir bewerten Ihre Uhr fair und transparent - kostenfrei und unverbindlich
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center space-y-6">
              <div className="w-20 h-20 border-2 border-luxury-gold flex items-center justify-center text-luxury-gold text-3xl font-sans font-black mx-auto">
                3
              </div>
              <h3 className="text-2xl font-sans font-bold text-luxury-cream">
                Abwicklung
              </h3>
              <p className="text-luxury-pearl/70 leading-relaxed">
                Schnelle und sichere Abwicklung - Sie erhalten umgehend Ihr Geld
              </p>
            </div>
          </div>

          <div className="text-center mt-20">
            <Link 
              href="/ankauf"
              className="inline-block px-12 py-5 border-2 border-luxury-gold text-luxury-gold text-sm uppercase tracking-widest font-medium hover:bg-luxury-gold hover:text-luxury-black transition-all duration-500"
            >
              Mehr zum Ankauf erfahren
            </Link>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-32 bg-luxury-cream">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-10">
            <h2 className="text-5xl md:text-6xl font-sans font-black text-luxury-black tracking-tight">
              Haben Sie Fragen?
            </h2>
            <p className="text-xl text-luxury-stone leading-relaxed max-w-2xl mx-auto">
              Unser Expertenteam steht Ihnen gerne zur Verfügung. 
              Kontaktieren Sie uns für eine persönliche Beratung.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8 w-full">
              <Link 
                href="/kontakt"
                className="px-8 py-4 sm:px-12 sm:py-5 border-2 border-luxury-gold text-luxury-gold text-base sm:text-sm uppercase tracking-widest font-medium sm:font-medium font-bold hover:bg-luxury-gold hover:text-white transition-all duration-500 min-w-[200px] sm:min-w-[240px] w-full sm:w-auto"
              >
                Kontakt aufnehmen
              </Link>
              <a 
                href="https://wa.me/49XXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 sm:px-12 sm:py-5 bg-green-600 text-white text-base sm:text-sm uppercase tracking-widest font-medium sm:font-medium font-bold hover:bg-green-700 transition-all duration-300 min-w-[200px] sm:min-w-[240px] w-full sm:w-auto"
              >
                WhatsApp Chat
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
