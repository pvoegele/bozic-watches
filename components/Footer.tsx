import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-luxury-charcoal text-luxury-cream mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-serif mb-4">BOZIC</h3>
            <p className="text-luxury-stone text-sm">
              Ihr vertrauensvoller Partner für exklusive Luxusuhren.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-luxury-stone hover:text-luxury-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/uhren" className="text-luxury-stone hover:text-luxury-gold transition-colors">
                  Uhren
                </Link>
              </li>
              <li>
                <Link href="/ankauf" className="text-luxury-stone hover:text-luxury-gold transition-colors">
                  Ankauf
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-luxury-stone hover:text-luxury-gold transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-luxury-stone">
              <li>Uhren Ankauf</li>
              <li>Uhren Verkauf</li>
              <li>Beratung</li>
              <li>Expertise</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Kontakt</h4>
            <ul className="space-y-2 text-sm text-luxury-stone">
              <li>Email: info@bozic-watches.com</li>
              <li>Tel: +49 XXX XXXXXXX</li>
              <li>WhatsApp verfügbar</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-luxury-forest mt-8 pt-8 text-center text-sm text-luxury-stone">
          <p>&copy; {new Date().getFullYear()} BOZIC Watches. Alle Rechte vorbehalten.</p>
          <div className="mt-2 space-x-4">
            <Link href="/impressum" className="hover:text-luxury-gold transition-colors">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-luxury-gold transition-colors">
              Datenschutz
            </Link>
            <Link href="/agb" className="hover:text-luxury-gold transition-colors">
              AGB
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
