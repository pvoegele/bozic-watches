import Image from 'next/image';
import Link from 'next/link';
import { Watch } from '@/types/shopify';

interface WatchCardProps {
  watch: Watch;
}

export default function WatchCard({ watch }: WatchCardProps) {
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
    <Link href={`/uhren/${watch.handle}`}>
      <div className="group bg-white border border-luxury-sand overflow-hidden transition-all duration-300 hover:shadow-xl">
        {/* Image */}
        <div className="relative aspect-square bg-luxury-sand overflow-hidden">
          <Image
            src={watch.imageUrl}
            alt={watch.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Status Badge */}
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[watch.availabilityStatus || 'available']}`}>
              {statusLabels[watch.availabilityStatus || 'available']}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Brand */}
          {watch.brand && (
            <p className="text-sm text-luxury-gold font-semibold mb-2 uppercase tracking-wider">
              {watch.brand}
            </p>
          )}

          {/* Title */}
          <h3 className="text-lg font-serif text-luxury-charcoal mb-3 group-hover:text-luxury-gold transition-colors">
            {watch.title}
          </h3>

          {/* Specs */}
          <div className="space-y-1 text-sm text-luxury-stone">
            {watch.reference && (
              <p>Ref. {watch.reference}</p>
            )}
            {watch.year && (
              <p>Jahr: {watch.year}</p>
            )}
            {watch.caseSizeMm && (
              <p>Größe: {watch.caseSizeMm}mm</p>
            )}
          </div>

          {/* CTA */}
          <div className="mt-4 pt-4 border-t border-luxury-sand">
            <span className="text-luxury-charcoal text-sm font-semibold group-hover:text-luxury-gold transition-colors">
              Details ansehen →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
