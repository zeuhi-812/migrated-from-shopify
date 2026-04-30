import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);
  const images = product.images || [];
  const firstImage = images[0]?.url;
  const secondImage = images[1]?.url;
  const price = product.variants?.[0]?.price;
  const formattedPrice = price ? `${parseFloat(price).toFixed(2).replace('.', ',')} €` : null;

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
            Pas d'image
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