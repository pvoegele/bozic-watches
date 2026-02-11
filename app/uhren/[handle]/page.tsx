import Image from 'next/image';
import Link from 'next/link';
import { getProductByHandle, getAllProducts } from '@/lib/shopify';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{
    handle: string;
  }>;
}

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((product) => ({
    handle: product.handle,
  }));
}

export default async function ProductPage({ params }: PageProps) {
  const { handle } = await params;
  const watch = await getProductByHandle(handle);

  if (!watch) {
    notFound();
  }

  const statusColors = {
    available: 'bg-luxury-forest/90 text-luxury-cream',
    reserved: 'bg-luxury-gold/90 text-luxury-black',
    sold: 'bg-luxury-stone/90 text-luxury-cream',
  };

  const statusLabels = {
    available: 'Verfügbar',
    reserved: 'Reserviert',
    sold: 'Verkauft',
  };

  return (
    <div className="bg-luxury-cream min-h-screen">
      {/* Breadcrumb */}
      <div className="container mx-auto px-6 lg:px-8 pt-12 pb-8">
        <div className="flex items-center gap-3 text-sm text-luxury-stone">
          <Link href="/" className="hover:text-luxury-gold transition-colors uppercase tracking-wider">
            Home
          </Link>
          <span>/</span>
          <Link href="/uhren" className="hover:text-luxury-gold transition-colors uppercase tracking-wider">
            Uhren
          </Link>
          <span>/</span>
          <span className="text-luxury-charcoal uppercase tracking-wider">{watch.brand}</span>
        </div>
      </div>

      {/* Product Content */}
      <section className="pb-32">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 max-w-8xl mx-auto">
            {/* Image Gallery */}
            <div className="space-y-6">
              <div className="relative aspect-square bg-luxury-smoke overflow-hidden shadow-elegant">
                <Image
                  src={watch.imageUrl}
                  alt={watch.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-8 lg:py-12">
              {/* Brand */}
              {watch.brand && (
                <p className="text-xs text-luxury-gold font-semibold uppercase tracking-ultra-wide">
                  {watch.brand}
                </p>
              )}

              {/* Title */}
              <h1 className="text-5xl md:text-6xl font-display font-bold text-luxury-black leading-tight tracking-tight">
                {watch.title}
              </h1>

              {/* Status & Price */}
              <div className="flex flex-wrap items-center gap-6 pt-4">
                <span className={`inline-block px-6 py-3 text-xs font-medium uppercase tracking-widest backdrop-blur-sm ${statusColors[watch.availabilityStatus || 'available']}`}>
                  {statusLabels[watch.availabilityStatus || 'available']}
                </span>
                {watch.showPrice && watch.price && (
                  <p className="text-4xl font-display font-bold text-luxury-black tracking-tight">
                    €{parseInt(watch.price).toLocaleString('de-DE')}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="pt-8 border-t border-luxury-stone/20">
                <p className="text-lg text-luxury-stone leading-relaxed">
                  {watch.description}
                </p>
              </div>

              {/* Specifications */}
              <div className="pt-8 border-t border-luxury-stone/20 space-y-6">
                <h3 className="text-2xl font-serif text-luxury-black mb-6">
                  Technische Daten
                </h3>
                <dl className="space-y-4">
                  {watch.reference && (
                    <div className="flex justify-between items-center py-4 border-b border-luxury-stone/10">
                      <dt className="text-luxury-stone uppercase tracking-wide text-sm">Referenznummer</dt>
                      <dd className="text-luxury-black font-medium">{watch.reference}</dd>
                    </div>
                  )}
                  {watch.model && (
                    <div className="flex justify-between items-center py-4 border-b border-luxury-stone/10">
                      <dt className="text-luxury-stone uppercase tracking-wide text-sm">Modell</dt>
                      <dd className="text-luxury-black font-medium">{watch.model}</dd>
                    </div>
                  )}
                  {watch.year && (
                    <div className="flex justify-between items-center py-4 border-b border-luxury-stone/10">
                      <dt className="text-luxury-stone uppercase tracking-wide text-sm">Baujahr</dt>
                      <dd className="text-luxury-black font-medium">{watch.year}</dd>
                    </div>
                  )}
                  {watch.caseSizeMm && (
                    <div className="flex justify-between items-center py-4 border-b border-luxury-stone/10">
                      <dt className="text-luxury-stone uppercase tracking-wide text-sm">Gehäusegröße</dt>
                      <dd className="text-luxury-black font-medium">{watch.caseSizeMm}mm</dd>
                    </div>
                  )}
                  {watch.material && (
                    <div className="flex justify-between items-center py-4 border-b border-luxury-stone/10">
                      <dt className="text-luxury-stone uppercase tracking-wide text-sm">Material</dt>
                      <dd className="text-luxury-black font-medium">{watch.material}</dd>
                    </div>
                  )}
                  {watch.movement && (
                    <div className="flex justify-between items-center py-4 border-b border-luxury-stone/10">
                      <dt className="text-luxury-stone uppercase tracking-wide text-sm">Uhrwerk</dt>
                      <dd className="text-luxury-black font-medium">{watch.movement}</dd>
                    </div>
                  )}
                  {watch.condition && (
                    <div className="flex justify-between items-center py-4 border-b border-luxury-stone/10">
                      <dt className="text-luxury-stone uppercase tracking-wide text-sm">Zustand</dt>
                      <dd className="text-luxury-black font-medium">{watch.condition}</dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-4 pt-8">
                {watch.availabilityStatus === 'available' && (
                  <div className="space-y-4">
                    <Link 
                      href="/kontakt"
                      className="block w-full text-center px-12 py-5 border-2 border-luxury-gold text-luxury-gold text-sm uppercase tracking-widest font-medium hover:bg-luxury-gold hover:text-white transition-all duration-500"
                    >
                      Anfrage stellen
                    </Link>
                    <a 
                      href="https://wa.me/49XXXXXXXXX"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center px-12 py-5 bg-green-600 text-white text-sm uppercase tracking-widest font-medium hover:bg-green-700 transition-all duration-300"
                    >
                      WhatsApp Anfrage
                    </a>
                  </div>
                )}
                {watch.availabilityStatus === 'reserved' && (
                  <div className="text-center py-8 text-luxury-stone">
                    Diese Uhr ist derzeit reserviert. Kontaktieren Sie uns für Alternativen.
                  </div>
                )}
                {watch.availabilityStatus === 'sold' && (
                  <div className="text-center py-8 text-luxury-stone">
                    Diese Uhr wurde bereits verkauft. Schauen Sie sich unsere anderen Uhren an.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back to catalog */}
      <section className="pb-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center border-t border-luxury-stone/20 pt-12">
            <Link 
              href="/uhren"
              className="inline-flex items-center gap-3 text-luxury-charcoal hover:text-luxury-gold transition-colors duration-300 text-sm uppercase tracking-widest font-medium group"
            >
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              Zurück zur Übersicht
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
