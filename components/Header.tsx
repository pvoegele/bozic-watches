'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

// Utility to check for mobile devices
function isMobile() {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
}

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/uhren', label: 'Uhren' },
  { href: '/ankauf', label: 'Ankauf' },
];

export default function Header() {
  const [visibleOnMobile, setVisibleOnMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement | null>(null);

  // Mobile fade logic
useEffect(() => {
  function handleScroll() {
    if (!isMobile()) {
      setVisibleOnMobile(true);
      return;
    }

    // ✅ Ziel: Header ausblenden, wenn man IN der Video-Section ist
    const videoSection = document.querySelector('#header-video') as HTMLElement | null;
    if (!videoSection) {
      setVisibleOnMobile(true);
      return;
    }

     // ✅ Wichtig: Wenn ganz oben (inkl. Pull-to-refresh), Header immer hidden
    if (window.scrollY <= 0) {
      setVisibleOnMobile(false);
      return;
    }

    const rect = videoSection.getBoundingClientRect();

    // "In der Section" = sie schneidet den Viewport
    const inSection = rect.top <= 0 && rect.bottom > 0;

    setVisibleOnMobile(!inSection);
  }

  window.addEventListener('touchmove', handleScroll, { passive: true });
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', handleScroll, { passive: true });
  handleScroll();

  return () => {
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('resize', handleScroll);
    window.removeEventListener('touchmove', handleScroll);

  };
}, []);

  // Lock scroll when menu open (mobile)
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <div
        ref={headerRef}
        className={`
          fixed top-0 left-0 right-0 z-50
    bg-luxury-cream/95 md:backdrop-blur-md  border-luxury-stone/20
    transition-all duration-500
    ${!visibleOnMobile ? 'opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto' : 'opacity-100 pointer-events-auto'}
    md:opacity-100 md:pointer-events-auto
    pt-[env(safe-area-inset-top)]

        `}
        style={{ transitionProperty: 'opacity, background-color, box-shadow' }}
      >
        <div className="container mx-auto px-6 lg:px-8 pt-">
          <div className="flex items-center justify-between min-h-[56px]">
            {/* Logo */}
            <Link href="/" className="group flex-shrink-0" tabIndex={menuOpen ? -1 : 0}>
              <h1 className="text-3xl font-sans font-black text-luxury-black tracking-ultra-wide transition-colors duration-300 group-hover:text-luxury-gold">
                BOZIC
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 rounded text-sm uppercase tracking-widest font-medium text-luxury-charcoal hover:text-luxury-gold transition-colors duration-200 focus:outline-none focus:text-luxury-gold"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/kontakt"
                className="ml-4 px-6 py-2 border border-luxury-gold text-luxury-gold text-sm uppercase tracking-widest rounded hover:bg-luxury-gold hover:text-white transition-colors duration-200 focus:outline-none focus:bg-luxury-gold focus:text-white"
              >
                Kontakt
              </Link>
            </nav>

            {/* Mobile Burger Button */}
            <button
              aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
              onClick={() => setMenuOpen((open) => !open)}
              className="md:hidden text-luxury-charcoal hover:text-luxury-gold transition-colors outline-none relative"
              aria-expanded={menuOpen}
            >
              {/* Hamburger / Close Animation */}
              <span className="sr-only">{menuOpen ? 'Menü schließen' : 'Menü öffnen'}</span>
              <div className="w-6 h-6 flex flex-col justify-center items-center relative">
                <span
                  className={`h-0.5 w-6 bg-current rounded transition-all duration-300
                    absolute ${menuOpen ? 'rotate-45 top-3' : 'top-1'}
                  `}
                />
                <span
                  className={`h-0.5 w-6 bg-current rounded transition-all duration-300
                    absolute
                    ${menuOpen ? 'opacity-0 left-6' : 'top-3'}
                  `}
                />
                <span
                  className={`h-0.5 w-6 bg-current rounded transition-all duration-300
                    absolute ${menuOpen ? '-rotate-45 top-3' : 'top-5'}
                  `}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay - fullscreen, blur heavy, covers everything */}
      <div
  className={`
    fixed top-0 left-0 right-0 z-[100]
    h-[100dvh]
    bg-black/70 backdrop-blur-xl transition-opacity duration-300 md:hidden
    ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
  `}
  aria-hidden={!menuOpen}
  onClick={() => setMenuOpen(false)}
  style={{ WebkitBackdropFilter: 'blur(34px)' }}
/>

      {/* Mobile Fullscreen Slide-in Menu */}
              <nav
          className={`
            fixed top-0 left-0 right-0 z-[110]
            h-[100dvh]
            bg-luxury-cream flex flex-col items-center justify-center
            transition-transform duration-300 md:hidden text-white
            ${menuOpen ? 'translate-x-0' : 'translate-x-full'}
          `}
          role="dialog"
          aria-label="Mobile Navigation"
        >
        <button
          onClick={() => setMenuOpen(false)}
          aria-label="Menü schließen"
          className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center rounded-full text-2xl text-luxury-charcoal hover:text-luxury-gold outline-none z-[120] bg-luxury-cream/80 backdrop-blur-lg"
        >
          <span className="sr-only">Menü schließen</span>
          {/* X icon */}
          <svg width={30} height={30} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
          </svg>
        </button>
        <div className="flex flex-col items-center gap-10 mt-8 w-full">
          <Link
            href="/"
            className="text-3xl font-black font-sans tracking-ultra-wide text-luxury-black group hover:text-luxury-gold mb-2"
            onClick={() => setMenuOpen(false)}
          >
            BOZIC
          </Link>
          <div className="flex flex-col gap-4 w-full max-w-xs">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="w-full text-lg text-center uppercase tracking-widest font-medium text-luxury-charcoal py-4 rounded-md hover:text-luxury-gold transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/kontakt"
              className="w-full py-4 mt-4 border border-luxury-gold text-luxury-gold text-lg uppercase tracking-widest rounded-md hover:bg-luxury-gold hover:text-luxury-black text-center transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Kontakt
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
