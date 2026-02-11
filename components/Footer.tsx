import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gradient-luxury text-luxury-cream border-t border-luxury-gold/20">
      <div className="container mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
          {/* Company Info */}
          <div className="space-y-6">
            <h3 className="text-3xl font-sans font-black tracking-ultra-wide text-luxury-gold mb-6">BOZIC</h3>
            <p className="text-luxury-pearl/80 text-sm leading-relaxed">
              Ihr vertrauensvoller Partner für exklusive Luxusuhren. 
              Seit Jahren verbinden wir Tradition mit Expertise.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm uppercase tracking-widest font-semibold mb-6 text-luxury-pearl">Navigation</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="text-luxury-pearl/70 hover:text-luxury-gold transition-colors duration-300 text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/uhren" className="text-luxury-pearl/70 hover:text-luxury-gold transition-colors duration-300 text-sm">
                  Uhren
                </Link>
              </li>
              <li>
                <Link href="/ankauf" className="text-luxury-pearl/70 hover:text-luxury-gold transition-colors duration-300 text-sm">
                  Ankauf
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-luxury-pearl/70 hover:text-luxury-gold transition-colors duration-300 text-sm">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm uppercase tracking-widest font-semibold mb-6 text-luxury-pearl">Services</h4>
            <ul className="space-y-4 text-sm text-luxury-pearl/70">
              <li>Uhren Ankauf</li>
              <li>Uhren Verkauf</li>
              <li>Beratung & Expertise</li>
              <li>Begutachtung</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm uppercase tracking-widest font-semibold mb-6 text-luxury-pearl">Kontakt</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a href="mailto:info@bozic-watches.com" className="text-luxury-pearl/70 hover:text-luxury-gold transition-colors duration-300">
                  info@bozic-watches.com
                </a>
              </li>
              <li>
                <a href="tel:+49XXXXXXXXX" className="text-luxury-pearl/70 hover:text-luxury-gold transition-colors duration-300">
                  +49 XXX XXXXXXX
                </a>
              </li>
              <li className="text-luxury-pearl/70">
                WhatsApp verfügbar
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-luxury-pearl/10 pt-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-luxury-pearl/60">
              &copy; {new Date().getFullYear()} BOZIC Watches. Alle Rechte vorbehalten.
            </p>
            <div className="flex gap-8 text-sm">
              <Link href="/impressum" className="text-luxury-pearl/60 hover:text-luxury-gold transition-colors duration-300">
                Impressum
              </Link>
              <Link href="/datenschutz" className="text-luxury-pearl/60 hover:text-luxury-gold transition-colors duration-300">
                Datenschutz
              </Link>
              <Link href="/agb" className="text-luxury-pearl/60 hover:text-luxury-gold transition-colors duration-300">
                AGB
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
