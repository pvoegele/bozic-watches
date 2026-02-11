import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-luxury-cream border-b border-luxury-sand sticky top-0 z-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-serif text-luxury-charcoal tracking-wide">
            BOZIC
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-luxury-charcoal hover:text-luxury-gold transition-colors duration-200"
            >
              Home
            </Link>
            <Link 
              href="/uhren" 
              className="text-luxury-charcoal hover:text-luxury-gold transition-colors duration-200"
            >
              Uhren
            </Link>
            <Link 
              href="/ankauf" 
              className="text-luxury-charcoal hover:text-luxury-gold transition-colors duration-200"
            >
              Ankauf
            </Link>
            <Link 
              href="/kontakt" 
              className="bg-luxury-gold text-white px-6 py-2 rounded hover:bg-luxury-forest transition-colors duration-200"
            >
              Kontakt
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-luxury-charcoal">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
