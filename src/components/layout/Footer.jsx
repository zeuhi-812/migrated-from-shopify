import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-display text-lg font-bold text-primary mb-3">Pancartiviste !</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              L'Open-Source militante de Zeu Hi. Des visuels pour porter des messages, nourrir l'espoir, et faire bouger les lignes.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Collections</h4>
            <ul className="space-y-2">
              <li><Link to="/collection/mugs-le-coeur-manifeste" className="text-sm text-muted-foreground hover:text-primary transition-colors">Mugs "Cœur de Lutte"</Link></li>
              <li><Link to="/collection/posters-coeur-de-lutte" className="text-sm text-muted-foreground hover:text-primary transition-colors">Posters "Cœur de Lutte"</Link></li>
              <li><Link to="/collection/mugs-heart-of-protest" className="text-sm text-muted-foreground hover:text-primary transition-colors">Mugs "Heart of Protest"</Link></li>
              <li><Link to="/collection/posters-heart-of-protest" className="text-sm text-muted-foreground hover:text-primary transition-colors">Posters "Heart of Protest"</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Liens</h4>
            <ul className="space-y-2">
              <li><a href="https://pancartiviste.fr" target="_blank" rel="noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">pancartiviste.fr</a></li>
              <li><a href="https://www.patreon.com/c/u49061662" target="_blank" rel="noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">Patreon</a></li>
              <li><Link to="/a-propos" className="text-sm text-muted-foreground hover:text-primary transition-colors">À propos de Zeu Hi</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-border flex items-center justify-center gap-1 text-xs text-muted-foreground">
          <span>Fait avec</span>
          <Heart className="w-3 h-3 text-primary fill-primary" />
          <span>par Zeu Hi — La ReLovution est en marche !</span>
        </div>
      </div>
    </footer>
  );
}