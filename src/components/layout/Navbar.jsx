import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

const collections = [
  { label: 'Mugs "Cœur de Lutte"', handle: 'mugs-le-coeur-manifeste' },
  { label: 'Posters "Cœur de Lutte"', handle: 'posters-coeur-de-lutte' },
  { label: 'Mugs "Heart of Protest"', handle: 'mugs-heart-of-protest' },
  { label: 'Posters "Heart of Protest"', handle: 'posters-heart-of-protest' },
  { label: 'Mugs "Vulva la Révolution" FR', handle: 'vulva-la-revolution-fr' },
  { label: 'Posters "Vulva la Révolution" FR', handle: 'posters-vulva-la-revolution-fr' },
  { label: 'Mugs "Vulva la Revolution" EN', handle: 'vulva-la-revolution' },
  { label: 'Posters "Vulva la Revolution" EN', handle: 'posters-vulva-la-revolution' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const location = useLocation();
  const { language, toggleLanguage, t } = useLanguage();

  const linkClass = (path) =>
    `text-xs font-mono font-medium uppercase tracking-widest transition-colors ${
      location.pathname === path ? 'text-primary' : 'text-foreground/60 hover:text-foreground'
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="font-heading font-bold text-xl tracking-tight uppercase">
            PANCARTIVISTE<span className="text-primary"> !</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/boutique" className={linkClass('/boutique')}>
              {t.nav.boutique}
            </Link>

            {/* Shop dropdown */}
            <div className="relative" onMouseEnter={() => setShopOpen(true)} onMouseLeave={() => setShopOpen(false)}>
              <button className="text-xs font-mono font-medium uppercase tracking-widest text-foreground/60 hover:text-foreground transition-colors">
                {t.nav.collections}
              </button>
              {shopOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-64 bg-background border border-border shadow-lg py-2 z-50">
                  {collections.map(c => (
                    <Link
                      key={c.handle}
                      to={`/collection/${c.handle}`}
                      className="block px-4 py-2 text-xs font-mono text-foreground/60 hover:bg-muted hover:text-foreground transition-colors"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Language toggle */}
            <button
              onClick={toggleLanguage}
              className="text-xs font-mono font-medium uppercase tracking-widest text-foreground/60 hover:text-primary transition-colors"
            >
              {language === 'fr' ? 'EN' : 'FR'}
            </button>

            <Link to="/a-propos" className={linkClass('/a-propos')}>
              {t.nav.apropos}
            </Link>
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden p-2 text-background" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 pb-4 space-y-1">
          <Link to="/boutique" className="block py-2 text-xs font-mono font-medium uppercase tracking-widest text-primary" onClick={() => setMobileOpen(false)}>{t.nav.boutique}</Link>
          <div className="pl-2 space-y-1 border-l-2 border-border ml-1">
            {collections.map(c => (
              <Link
                key={c.handle}
                to={`/collection/${c.handle}`}
                className="block py-1.5 text-xs font-mono text-foreground/60"
                onClick={() => setMobileOpen(false)}
              >
                {c.label}
              </Link>
            ))}
          </div>
          <button
            onClick={() => { toggleLanguage(); setMobileOpen(false); }}
            className="block py-2 text-xs font-mono font-medium uppercase tracking-widest text-foreground/60 w-full text-left"
          >
            {language === 'fr' ? 'EN' : 'FR'}
          </button>
          <Link to="/a-propos" className="block py-2 text-xs font-mono font-medium uppercase tracking-widest text-foreground/60" onClick={() => setMobileOpen(false)}>{t.nav.apropos}</Link>
        </div>
      )}
    </nav>
  );
}