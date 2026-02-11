import WatchCard from '@/components/WatchCard';
import { getAllProducts } from '@/lib/shopify';

export default async function UhrenPage() {
  const products = await getAllProducts();

  return (
    <div className="bg-luxury-cream min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-luxury-charcoal mb-4">
            Unsere Uhren
          </h1>
          <p className="text-lg text-luxury-stone max-w-2xl mx-auto">
            Entdecken Sie unsere exklusive Auswahl an Luxusuhren
          </p>
        </div>

        {/* Filter Section (Simplified for MVP) */}
        <div className="mb-8 flex flex-wrap gap-4 justify-center">
          <button className="px-6 py-2 bg-luxury-gold text-white rounded-full hover:bg-luxury-forest transition-colors">
            Alle
          </button>
          <button className="px-6 py-2 bg-white text-luxury-charcoal rounded-full border border-luxury-sand hover:border-luxury-gold transition-colors">
            Verfügbar
          </button>
          <button className="px-6 py-2 bg-white text-luxury-charcoal rounded-full border border-luxury-sand hover:border-luxury-gold transition-colors">
            Reserviert
          </button>
        </div>

        {/* Product Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <WatchCard key={product.id} watch={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-luxury-stone text-lg">
              Derzeit sind keine Uhren verfügbar. Schauen Sie bald wieder vorbei!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
