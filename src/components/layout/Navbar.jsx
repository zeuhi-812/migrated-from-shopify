import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';

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

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="font-display text-xl font-bold text-primary">
            Pancartiviste !
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === '/' ? 'text-primary' : 'text-foreground/70'}`}>
              Accueil
            </Link>

            {/* Shop dropdown */}
            <div className="relative" onMouseEnter={() => setShopOpen(true)} onMouseLeave={() => setShopOpen(false)}>
              <button className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors flex items-center gap-1">
                <ShoppingBag className="w-4 h-4" />
                Boutique
              </button>
              {shopOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-64 bg-card border border-border rounded-lg shadow-lg py-2 z-50">
                  <Link to="/boutique" className="block px-4 py-2 text-sm font-semibold text-primary hover:bg-muted transition-colors">
                    Tous les produits
                  </Link>
                  <div className="border-t border-border my-1" />
                  {collections.map(c => (
                    <Link
                      key={c.handle}
                      to={`/collection/${c.handle}`}
                      className="block px-4 py-2 text-sm text-foreground/70 hover:bg-muted hover:text-foreground transition-colors"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/a-propos" className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === '/a-propos' ? 'text-primary' : 'text-foreground/70'}`}>
              À propos
            </Link>
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 pb-4 space-y-1">
          <Link to="/" className="block py-2 text-sm font-medium" onClick={() => setMobileOpen(false)}>Accueil</Link>
          <Link to="/boutique" className="block py-2 text-sm font-semibold text-primary" onClick={() => setMobileOpen(false)}>Tous les produits</Link>
          <div className="pl-2 space-y-1 border-l-2 border-primary/20 ml-1">
            {collections.map(c => (
              <Link
                key={c.handle}
                to={`/collection/${c.handle}`}
                className="block py-1.5 text-sm text-foreground/70"
                onClick={() => setMobileOpen(false)}
              >
                {c.label}
              </Link>
            ))}
          </div>
          <Link to="/a-propos" className="block py-2 text-sm font-medium" onClick={() => setMobileOpen(false)}>À propos</Link>
        </div>
      )}
    </nav>
  );
}