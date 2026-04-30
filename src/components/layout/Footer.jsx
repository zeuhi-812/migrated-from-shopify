import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border bg-accent text-accent-foreground">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-heading font-bold text-lg mb-3">
              Pancartiviste<span className="text-primary"> !</span>
            </h3>
            <p className="font-mono text-xs text-muted-foreground leading-relaxed">
              {t.footer.tagline}
            </p>
          </div>
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest mb-3 text-muted-foreground">{t.footer.collections}</h4>
            <div className="space-y-2">
              <Link to="/collection/mugs-le-coeur-manifeste" className="block font-mono text-sm hover:text-primary transition-colors">Mugs "Cœur de Lutte"</Link>
              <Link to="/collection/posters-coeur-de-lutte" className="block font-mono text-sm hover:text-primary transition-colors">Posters "Cœur de Lutte"</Link>
              <Link to="/collection/mugs-heart-of-protest" className="block font-mono text-sm hover:text-primary transition-colors">Mugs "Heart of Protest"</Link>
              <Link to="/collection/posters-heart-of-protest" className="block font-mono text-sm hover:text-primary transition-colors">Posters "Heart of Protest"</Link>
              <Link to="/a-propos" className="block font-mono text-sm hover:text-primary transition-colors">À propos</Link>
            </div>
          </div>
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest mb-3 text-muted-foreground">{t.footer.links}</h4>
            <p className="font-mono text-sm leading-relaxed">
              <a href="https://pancartiviste.fr" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">pancartiviste.fr</a><br/>
              <a href="https://pancartiviste.com" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">pancartiviste.com</a><br/>
              <a href="https://pancartiviste.org" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">pancartiviste.org</a><br/>
              <a href="https://www.patreon.com/c/u49061662" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">Patreon</a>
            </p>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-border flex items-center justify-center gap-1 font-mono text-xs text-muted-foreground">
          {t.footer.madeWith} <Heart className="w-3 h-3 text-primary fill-primary" /> {t.footer.byZeuHi}
        </div>
      </div>
    </footer>
  );
}