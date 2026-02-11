import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-luxury-cream/95 backdrop-blur-md border-b border-luxury-stone/20 sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group">
            <h1 className="text-3xl font-display font-bold text-luxury-black tracking-ultra-wide transition-colors duration-300 group-hover:text-luxury-gold">
              BOZIC
            </h1>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-12">
            <Link 
              href="/" 
              className="text-sm uppercase tracking-widest text-luxury-charcoal hover:text-luxury-gold transition-colors duration-300 font-medium"
            >
              Home
            </Link>
            <Link 
              href="/uhren" 
              className="text-sm uppercase tracking-widest text-luxury-charcoal hover:text-luxury-gold transition-colors duration-300 font-medium"
            >
              Uhren
            </Link>
            <Link 
              href="/ankauf" 
              className="text-sm uppercase tracking-widest text-luxury-charcoal hover:text-luxury-gold transition-colors duration-300 font-medium"
            >
              Ankauf
            </Link>
            <Link 
              href="/kontakt" 
              className="px-8 py-3 border border-luxury-gold text-luxury-gold text-sm uppercase tracking-widest hover:bg-luxury-gold hover:text-white transition-all duration-300 font-medium"
            >
              Kontakt
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-luxury-charcoal hover:text-luxury-gold transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
