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
    available: 'bg-green-100 text-green-800',
    reserved: 'bg-yellow-100 text-yellow-800',
    sold: 'bg-gray-100 text-gray-800',
  };

  const statusLabels = {
    available: 'Verfügbar',
    reserved: 'Reserviert',
    sold: 'Verkauft',
  };

  return (
    <div className="bg-luxury-cream min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-8 text-sm text-luxury-stone">
          <Link href="/" className="hover:text-luxury-gold transition-colors">
            Home
          </Link>
          {' / '}
          <Link href="/uhren" className="hover:text-luxury-gold transition-colors">
            Uhren
          </Link>
          {' / '}
          <span className="text-luxury-charcoal">{watch.title}</span>
        </div>

        {/* Product Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-white border border-luxury-sand overflow-hidden">
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
          <div className="space-y-6">
            {/* Brand */}
            {watch.brand && (
              <p className="text-sm text-luxury-gold font-semibold uppercase tracking-wider">
                {watch.brand}
              </p>
            )}

            {/* Title */}
            <h1 className="text-4xl font-serif text-luxury-charcoal">
              {watch.title}
            </h1>

            {/* Status Badge */}
            <div className="flex items-center gap-4">
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${statusColors[watch.availabilityStatus || 'available']}`}>
                {statusLabels[watch.availabilityStatus || 'available']}
              </span>
              {watch.showPrice && watch.price && (
                <p className="text-3xl font-serif text-luxury-charcoal">
                  €{parseInt(watch.price).toLocaleString('de-DE')}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="prose prose-lg text-luxury-stone">
              <p>{watch.description}</p>
            </div>

            {/* Specifications */}
            <div className="border-t border-luxury-sand pt-6">
              <h3 className="text-xl font-serif text-luxury-charcoal mb-4">
                Technische Daten
              </h3>
              <dl className="grid grid-cols-1 gap-4">
                {watch.reference && (
                  <div className="flex justify-between py-2 border-b border-luxury-sand">
                    <dt className="text-luxury-stone">Referenznummer</dt>
                    <dd className="text-luxury-charcoal font-semibold">{watch.reference}</dd>
                  </div>
                )}
                {watch.model && (
                  <div className="flex justify-between py-2 border-b border-luxury-sand">
                    <dt className="text-luxury-stone">Modell</dt>
                    <dd className="text-luxury-charcoal font-semibold">{watch.model}</dd>
                  </div>
                )}
                {watch.year && (
                  <div className="flex justify-between py-2 border-b border-luxury-sand">
                    <dt className="text-luxury-stone">Baujahr</dt>
                    <dd className="text-luxury-charcoal font-semibold">{watch.year}</dd>
                  </div>
                )}
                {watch.caseSizeMm && (
                  <div className="flex justify-between py-2 border-b border-luxury-sand">
                    <dt className="text-luxury-stone">Gehäusegröße</dt>
                    <dd className="text-luxury-charcoal font-semibold">{watch.caseSizeMm}mm</dd>
                  </div>
                )}
                {watch.material && (
                  <div className="flex justify-between py-2 border-b border-luxury-sand">
                    <dt className="text-luxury-stone">Material</dt>
                    <dd className="text-luxury-charcoal font-semibold">{watch.material}</dd>
                  </div>
                )}
                {watch.movement && (
                  <div className="flex justify-between py-2 border-b border-luxury-sand">
                    <dt className="text-luxury-stone">Uhrwerk</dt>
                    <dd className="text-luxury-charcoal font-semibold">{watch.movement}</dd>
                  </div>
                )}
                {watch.condition && (
                  <div className="flex justify-between py-2 border-b border-luxury-sand">
                    <dt className="text-luxury-stone">Zustand</dt>
                    <dd className="text-luxury-charcoal font-semibold">{watch.condition}</dd>
                  </div>
                )}
              </dl>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-4 pt-6">
              {watch.availabilityStatus === 'available' && (
                <>
                  <Link 
                    href="/kontakt"
                    className="block w-full bg-luxury-gold text-white text-center px-8 py-4 rounded hover:bg-luxury-forest transition-colors duration-200 font-semibold"
                  >
                    Anfrage stellen
                  </Link>
                  <a 
                    href="https://wa.me/49XXXXXXXXX"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-green-600 text-white text-center px-8 py-4 rounded hover:bg-green-700 transition-colors duration-200 font-semibold"
                  >
                    WhatsApp Anfrage
                  </a>
                </>
              )}
              {watch.availabilityStatus === 'reserved' && (
                <div className="text-center py-4 text-luxury-stone">
                  Diese Uhr ist derzeit reserviert. Kontaktieren Sie uns für Alternativen.
                </div>
              )}
              {watch.availabilityStatus === 'sold' && (
                <div className="text-center py-4 text-luxury-stone">
                  Diese Uhr wurde bereits verkauft. Schauen Sie sich unsere anderen Uhren an.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Back to catalog */}
        <div className="mt-16 text-center">
          <Link 
            href="/uhren"
            className="inline-block text-luxury-charcoal hover:text-luxury-gold transition-colors font-semibold"
          >
            ← Zurück zur Übersicht
          </Link>
        </div>
      </div>
    </div>
  );
}
