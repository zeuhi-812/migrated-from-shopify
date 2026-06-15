import { useParams, Link } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { ChevronRight, ChevronLeft, ShoppingBag, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useLanguage } from '@/lib/LanguageContext';
import { useCart } from '@/lib/CartContext';

export default function ProductDetail() {
  const { handle } = useParams();
  const { t } = useLanguage();
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [added, setAdded] = useState(false);

  const { data: productList = [], isLoading } = useQuery({
    queryKey: ['product', handle],
    queryFn: () => base44.entities.Product.filter({ handle }),
  });

  const product = productList[0];
  const d = product?.data || product;

  const isPoster = (d?.productType || '').toLowerCase().includes('poster') ||
    (d?.handle || '').toLowerCase().includes('poster');

  const variants = useMemo(() => {
    const raw = d?.variants || [];
    if (!isPoster) return raw;
    return [...raw].sort((a, b) => {
      const numA = parseInt((a.title || '').match(/\d+/)?.[0] || '9999');
      const numB = parseInt((b.title || '').match(/\d+/)?.[0] || '9999');
      return numA - numB;
    });
  }, [d?.variants, isPoster]);

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <Skeleton className="aspect-square rounded-xl" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!d) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="font-display text-2xl font-bold mb-4">{t.product.noProductFound}</h2>
        <Link to="/boutique" className="text-primary underline">{t.product.backToBoutique}</Link>
      </div>
    );
  }

  const images = d?.images || [];
  const currentVariant = variants[selectedVariant] || variants[0];
  const price = currentVariant?.price ? `${parseFloat(currentVariant.price).toFixed(2).replace('.', ',')} €` : null;

  const prevImage = () => setSelectedImage(i => (i - 1 + images.length) % images.length);
  const nextImage = () => setSelectedImage(i => (i + 1) % images.length);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6 flex-wrap">
        <Link to="/" className="hover:text-primary transition-colors">{t.breadcrumb.home}</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/boutique" className="hover:text-primary transition-colors">{t.breadcrumb.shop}</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground line-clamp-1">{d.title}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
        {/* Images */}
        <div className="space-y-3">
          <div className="relative aspect-square rounded-xl overflow-hidden bg-muted">
            {images[selectedImage]?.url ? (
              <img
                src={images[selectedImage].url}
                alt={d.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                {t.product.noImage}
              </div>
            )}
            {images.length > 1 && (
              <>
                <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 rounded-full p-1 hover:bg-background transition-colors">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 rounded-full p-1 hover:bg-background transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-colors ${i === selectedImage ? 'border-primary' : 'border-transparent'}`}
                >
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground mb-1 uppercase tracking-wide">{d.productType}</p>
            <h1 className="font-heading font-black uppercase text-4xl text-primary mb-3">{d.title}</h1>
            {price && <p className="text-2xl font-semibold text-primary">{price}</p>}
          </div>

          {/* Variants */}
          {variants.length > 1 && (
            <div>
              <p className="text-sm font-medium text-foreground mb-2">{t.product.optionsLabel}</p>
              <div className="flex flex-wrap gap-2">
                {variants.map((v, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedVariant(i)}
                    className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${i === selectedVariant ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:border-primary/50'}`}
                  >
                    {v.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="flex flex-col gap-2">
            <Button
              size="lg"
              className="w-full font-semibold"
              onClick={async () => {
                await addItem(d, selectedVariant);
                setAdded(true);
                setTimeout(() => setAdded(false), 2000);
              }}
            >
              {added ? (
                <><Check className="w-4 h-4 mr-2" /> Ajouté au panier !</>
              ) : (
                <><ShoppingBag className="w-4 h-4 mr-2" /> Ajouter au panier</>
              )}
            </Button>
          </div>

          {/* Description */}
          {d.descriptionHtml && (
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">{t.product.description}</h2>
              <div
                className="text-sm text-muted-foreground leading-relaxed prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: d.descriptionHtml }}
              />
            </div>
          )}

          {/* Tags */}
          {d.tags && (
            <div className="flex flex-wrap gap-1.5">
              {d.tags.split(',').map(tag => tag.trim()).filter(Boolean).map(tag => (
                <span key={tag} className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}