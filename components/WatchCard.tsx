import Image from 'next/image';
import Link from 'next/link';
import { Watch } from '@/types/shopify';

interface WatchCardProps {
  watch: Watch;
}

export default function WatchCard({ watch }: WatchCardProps) {
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
    <Link href={`/uhren/${watch.handle}`}>
      <div className="group bg-white overflow-hidden transition-all duration-500 hover:shadow-elegant">
        {/* Image */}
        <div className="relative aspect-square bg-luxury-smoke overflow-hidden">
          <Image
            src={watch.imageUrl}
            alt={watch.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Status Badge - Subtle positioning */}
          {watch.availabilityStatus !== 'available' && (
            <div className="absolute top-6 right-6">
              <span className={`px-4 py-2 text-xs font-medium uppercase tracking-widest backdrop-blur-sm ${statusColors[watch.availabilityStatus || 'available']}`}>
                {statusLabels[watch.availabilityStatus || 'available']}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-8 space-y-4">
          {/* Brand */}
          {watch.brand && (
            <p className="text-xs text-luxury-gold font-semibold uppercase tracking-widest">
              {watch.brand}
            </p>
          )}

          {/* Title */}
          <h3 className="text-xl font-serif text-luxury-black leading-tight group-hover:text-luxury-gold transition-colors duration-300 min-h-[3.5rem]">
            {watch.title}
          </h3>

          {/* Specs */}
          <div className="space-y-2 text-sm text-luxury-stone/80 min-h-[4rem]">
            {watch.reference && (
              <p className="tracking-wide">Ref. {watch.reference}</p>
            )}
            {watch.year && watch.caseSizeMm && (
              <p className="tracking-wide">{watch.year} • {watch.caseSizeMm}mm</p>
            )}
          </div>

          {/* Price */}
          {watch.showPrice && watch.price && (
            <div className="pt-4 border-t border-luxury-stone/10">
              <p className="text-2xl font-serif text-luxury-black tracking-tight">
                €{parseInt(watch.price).toLocaleString('de-DE')}
              </p>
            </div>
          )}

          {/* CTA - Minimal */}
          <div className="pt-6">
            <span className="inline-flex items-center gap-2 text-luxury-charcoal text-xs uppercase tracking-widest font-medium group-hover:text-luxury-gold transition-colors duration-300">
              Details
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
