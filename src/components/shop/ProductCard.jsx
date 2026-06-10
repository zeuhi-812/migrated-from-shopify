import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';

export default function ProductCard({ product }) {
  const { t } = useLanguage();
  const [hovered, setHovered] = useState(false);
  const images = product.images || [];
  const firstImage = images[0]?.url;
  const secondImage = images[1]?.url;
  // For posters: show the lowest price among 13x18 variants; otherwise show first variant price
  const isPoster = (product.productType || '').toLowerCase().includes('poster') ||
    (product.handle || '').toLowerCase().includes('poster');

  let displayPrice = null;
  if (isPoster && product.variants?.length > 0) {
    const size13x18Variants = product.variants.filter(v =>
      (v.title || '').includes('13') || (v.title || '').toLowerCase().includes('13x18')
    );
    const pool = size13x18Variants.length > 0 ? size13x18Variants : product.variants;
    const prices = pool.map(v => parseFloat(v.price)).filter(p => !isNaN(p) && p > 0);
    if (prices.length > 0) displayPrice = Math.min(...prices);
  } else {
    displayPrice = parseFloat(product.variants?.[0]?.price) || null;
  }

  const formattedPrice = displayPrice
    ? `${isPoster ? 'à partir de ' : ''}${displayPrice.toFixed(2).replace('.', ',')} €`
    : null;

  return (
    <Link
      to={`/produit/${product.handle}`}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden rounded-lg bg-muted aspect-square mb-3">
        {firstImage ? (
          <>
            <img
              src={firstImage}
              alt={product.title}
              className={`w-full h-full object-cover transition-opacity duration-500 ${hovered && secondImage ? 'opacity-0' : 'opacity-100'}`}
            />
            {secondImage && (
              <img
                src={secondImage}
                alt={product.title}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${hovered ? 'opacity-100' : 'opacity-0'}`}
              />
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
            {t.product.noImage}
          </div>
        )}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300" />
      </div>
      <h3 className="text-sm font-mono text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-1">
        {product.title}
      </h3>
      {formattedPrice && (
        <p className="text-sm font-mono text-muted-foreground">{formattedPrice}</p>
      )}
    </Link>
  );
}