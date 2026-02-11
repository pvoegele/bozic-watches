import WatchCard from '@/components/WatchCard';
import { getAllProducts } from '@/lib/shopify';

export default async function UhrenPage() {
  const products = await getAllProducts();

  return (
    <div className="bg-luxury-cream min-h-screen">
      {/* Header */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <h1 className="text-6xl md:text-7xl font-display font-bold text-luxury-black tracking-tight">
              Unsere Uhren
            </h1>
            <p className="text-xl text-luxury-stone leading-relaxed tracking-wide">
              Entdecken Sie unsere exklusive Auswahl an Luxusuhren
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section - Elegant and Minimal */}
      <section className="pb-16">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-8 py-3 bg-luxury-gold text-white text-xs uppercase tracking-widest hover:bg-luxury-gold-dark transition-colors duration-300 font-medium">
              Alle
            </button>
            <button className="px-8 py-3 bg-white text-luxury-charcoal border border-luxury-stone/20 text-xs uppercase tracking-widest hover:border-luxury-gold hover:text-luxury-gold transition-colors duration-300 font-medium">
              Verfügbar
            </button>
            <button className="px-8 py-3 bg-white text-luxury-charcoal border border-luxury-stone/20 text-xs uppercase tracking-widest hover:border-luxury-gold hover:text-luxury-gold transition-colors duration-300 font-medium">
              Reserviert
            </button>
          </div>
        </div>
      </section>

      {/* Product Grid - 2 or 3 columns max */}
      <section className="pb-32">
        <div className="container mx-auto px-6 lg:px-8">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-8xl mx-auto">
              {products.map((product) => (
                <WatchCard key={product.id} watch={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-32">
              <p className="text-luxury-stone text-xl tracking-wide">
                Derzeit sind keine Uhren verfügbar. Schauen Sie bald wieder vorbei!
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
