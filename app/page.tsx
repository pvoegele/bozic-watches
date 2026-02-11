import Link from 'next/link';
import WatchCard from '@/components/WatchCard';
import { getAllProducts } from '@/lib/shopify';

export default async function Home() {
  const products = await getAllProducts();
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="bg-luxury-cream">
      {/* Hero Section */}
      <section className="relative bg-luxury-sand py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-serif text-luxury-charcoal mb-6">
              Exklusive Luxusuhren
            </h1>
            <p className="text-lg md:text-xl text-luxury-stone mb-8">
              Entdecken Sie unsere handverlesene Auswahl an außergewöhnlichen Zeitmessern. 
              Jede Uhr erzählt ihre eigene Geschichte.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/uhren"
                className="bg-luxury-gold text-white px-8 py-4 rounded hover:bg-luxury-forest transition-colors duration-200 font-semibold"
              >
                Uhren entdecken
              </Link>
              <Link 
                href="/ankauf"
                className="bg-white text-luxury-charcoal px-8 py-4 rounded border-2 border-luxury-gold hover:bg-luxury-gold hover:text-white transition-colors duration-200 font-semibold"
              >
                Uhr verkaufen
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Watches */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-luxury-charcoal mb-4">
              Aktuelle Highlights
            </h2>
            <p className="text-luxury-stone">
              Unsere neuesten und exklusivsten Uhren
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <WatchCard key={product.id} watch={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/uhren"
              className="inline-block text-luxury-charcoal hover:text-luxury-gold transition-colors font-semibold"
            >
              Alle Uhren ansehen →
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-luxury-charcoal mb-4">
              Ankauf in 3 Schritten
            </h2>
            <p className="text-luxury-stone">
              Verkaufen Sie Ihre Luxusuhr sicher und unkompliziert
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-luxury-gold rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-serif text-luxury-charcoal mb-3">
                Kontaktaufnahme
              </h3>
              <p className="text-luxury-stone">
                Nehmen Sie mit uns Kontakt auf - per E-Mail, Telefon oder WhatsApp
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-luxury-gold rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-serif text-luxury-charcoal mb-3">
                Bewertung
              </h3>
              <p className="text-luxury-stone">
                Wir bewerten Ihre Uhr fair und transparent - kostenfrei und unverbindlich
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-luxury-gold rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-serif text-luxury-charcoal mb-3">
                Abwicklung
              </h3>
              <p className="text-luxury-stone">
                Schnelle und sichere Abwicklung - Sie erhalten umgehend Ihr Geld
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/ankauf"
              className="inline-block bg-luxury-gold text-white px-8 py-4 rounded hover:bg-luxury-forest transition-colors duration-200 font-semibold"
            >
              Mehr zum Ankauf erfahren
            </Link>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 md:py-24 bg-luxury-sand">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif text-luxury-charcoal mb-6">
              Haben Sie Fragen?
            </h2>
            <p className="text-lg text-luxury-stone mb-8">
              Unser Expertenteam steht Ihnen gerne zur Verfügung. 
              Kontaktieren Sie uns für eine persönliche Beratung.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/kontakt"
                className="bg-luxury-gold text-white px-8 py-4 rounded hover:bg-luxury-forest transition-colors duration-200 font-semibold"
              >
                Kontakt aufnehmen
              </Link>
              <a 
                href="https://wa.me/49XXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-8 py-4 rounded hover:bg-green-700 transition-colors duration-200 font-semibold"
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
