import { useParams, Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import ProductGrid from '@/components/shop/ProductGrid';
import { ChevronRight } from 'lucide-react';

const PAGE_SIZE = 24;

// Map collection handles to their title keywords for filtering products by title patterns
const COLLECTION_FILTER_MAP = {
  'mugs-le-coeur-manifeste': { type: 'mug', theme: ['cœur', 'coeur', 'lutte', 'heart', 'rallume', 'motte', 'fondu', 'tripes', 'eclaté', 'eclate'] },
  'posters-coeur-de-lutte': { type: 'poster', theme: ['cœur', 'coeur', 'lutte', 'heart', 'rallume', 'motte', 'fondu', 'tripes', 'eclaté', 'eclate', 'résiste', 'resiste', 'flamme'] },
  'mugs-heart-of-protest': { type: 'mug', theme: ['butter', 'pick', 'generous', 'shattered', 'relight', 'guts', 'heart'] },
  'posters-heart-of-protest': { type: 'poster', theme: ['butter', 'pick', 'generous', 'shattered', 'relight', 'guts', 'heart', 'resists'] },
  'vulva-la-revolution-fr': { type: 'mug', theme: ['vulva', 'vulve', 'révolution', 'revolution', 'tomate', 'tutti', 'sexy'] },
  'posters-vulva-la-revolution-fr': { type: 'poster', theme: ['vulva', 'vulve', 'révolution', 'revolution', 'tomate', 'tutti', 'sexy'] },
  'vulva-la-revolution': { type: 'mug', theme: ['vulva', 'revolution', 'tomato', 'tutti', 'sexy'] },
  'posters-vulva-la-revolution': { type: 'poster', theme: ['vulva', 'revolution', 'tomato', 'tutti', 'sexy'] },
};

const COLLECTION_LABELS = {
  'mugs-le-coeur-manifeste': 'Mugs "Cœur de Lutte"',
  'posters-coeur-de-lutte': 'Posters "Cœur de Lutte"',
  'mugs-heart-of-protest': 'Mugs "Heart of Protest"',
  'posters-heart-of-protest': 'Posters "Heart of Protest"',
  'vulva-la-revolution-fr': 'Mugs "Vulva la Révolution" FR',
  'posters-vulva-la-revolution-fr': 'Posters "Vulva la Révolution" FR',
  'vulva-la-revolution': 'Mugs "Vulva la Revolution" EN',
  'posters-vulva-la-revolution': 'Posters "Vulva la Revolution" EN',
};

export default function CollectionPage() {
  const { handle } = useParams();
  const [page, setPage] = useState(1);

  const { data: allProducts = [], isLoading: productsLoading } = useQuery({
    queryKey: ['products-all'],
    queryFn: () => base44.entities.Product.list('-createdAt', 200),
  });

  const { data: collections = [] } = useQuery({
    queryKey: ['collections'],
    queryFn: () => base44.entities.Collection.list(),
  });

  const collection = useMemo(() =>
    collections.find(c => (c.data || c).handle === handle),
    [collections, handle]
  );

  const collectionData = collection?.data || collection;

  const filtered = useMemo(() => {
    const filter = COLLECTION_FILTER_MAP[handle];
    if (!filter) return allProducts;

    return allProducts.filter(p => {
      const d = p.data || p;
      // First try to use the collections array on the product
      if (d.collections && d.collections.length > 0) {
        if (d.collections.includes(handle)) return true;
      }
      // Fallback: match by productType + title keywords
      const title = (d.title || '').toLowerCase();
      const productType = (d.productType || '').toLowerCase();
      const isMug = productType.includes('print') && title.includes('mug');
      const isPoster = productType.includes('print') && title.includes('poster');
      const typeMatch = filter.type === 'mug' ? isMug : isPoster;
      const themeMatch = filter.theme.some(kw => title.includes(kw));
      return typeMatch && themeMatch;
    });
  }, [allProducts, handle]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const label = COLLECTION_LABELS[handle] || handle;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-primary transition-colors">Accueil</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/boutique" className="hover:text-primary transition-colors">Boutique</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground">{label}</span>
      </nav>

      <div className="mb-8">
        <h1 className="font-display text-4xl font-bold mb-2">{label}</h1>
        {collectionData?.descriptionHtml && (
          <details className="mt-2">
            <summary className="text-sm text-primary cursor-pointer hover:underline">Pourquoi acheter ici ?</summary>
            <div
              className="mt-3 text-sm text-muted-foreground leading-relaxed prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: collectionData.descriptionHtml }}
            />
          </details>
        )}
        {!productsLoading && <p className="text-muted-foreground mt-2">{filtered.length} produits</p>}
      </div>

      <ProductGrid products={paginated} loading={productsLoading} />

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 text-sm rounded-md border border-border hover:bg-muted disabled:opacity-40 transition-colors"
          >
            ← Précédent
          </button>
          <span className="text-sm text-muted-foreground px-2">Page {page} / {totalPages}</span>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 text-sm rounded-md border border-border hover:bg-muted disabled:opacity-40 transition-colors"
          >
            Suivant →
          </button>
        </div>
      )}
    </div>
  );
}