import { useParams, Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import ProductGrid from '@/components/shop/ProductGrid';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

const PAGE_SIZE = 24;

// Fallback: assign collection by handle pattern (same logic as assignCollections function)
function getCollectionsByHandle(productHandle, productTitle) {
  const h = (productHandle || '').toLowerCase();
  const t = (productTitle || '').toLowerCase();

  const isMug = h.includes('mug') || t.includes('mug');
  const isPoster = h.includes('poster') || t.includes('poster');

  const isVulva = h.includes('vulva') || h.includes('tomate') || h.includes('fraise') ||
    h.includes('strawberr') || h.includes('tomato') || h.includes('nicoise') ||
    h.includes('woke') || t.includes('vulva') || t.includes('tomate') ||
    t.includes('fraise') || t.includes('strawberry') || t.includes('tomato') ||
    t.includes('niçoise') || t.includes('woke');

  const isVulvaEN = h.startsWith('vulva-la-revolution') && !h.includes('-fr');

  const frenchWords = ['coeur', 'resister', 'rallume', 'lutte', 'fondu',
    'tripes', 'eclaté', 'eclate', 'resiste', 'flamme', 'aimer', 'genereuse',
    'beurre', 'motte', 'nicoise', 'prets', 'soumise', 'tomate', 'fraise',
    'revolution-fr'];

  const isFR = frenchWords.some(w => h.includes(w)) && !isVulvaEN;

  if (isVulva) {
    if (isMug) return isFR ? ['vulva-la-revolution-fr'] : ['vulva-la-revolution'];
    if (isPoster) return isFR ? ['posters-vulva-la-revolution-fr'] : ['posters-vulva-la-revolution'];
  }

  if (isMug) return isFR ? ['mugs-le-coeur-manifeste'] : ['mugs-heart-of-protest'];
  if (isPoster) return isFR ? ['posters-coeur-de-lutte'] : ['posters-heart-of-protest'];

  return [];
}

const COLLECTION_LABELS = {
  'mugs-le-coeur-manifeste': 'Mugs "Cœur de Lutte"',
  'posters-le-coeur-manifeste': 'Posters "Cœur de Lutte"',
  'posters-coeur-de-lutte': 'Posters "Cœur de Lutte"',
  'mugs-heart-of-protest': 'Mugs "Heart of Protest"',
  'posters-heart-of-protest': 'Posters "Heart of Protest"',
  'vulva-la-revolution-fr': 'Mugs "Vulva la Révolution" FR',
  'posters-vulva-la-revolution-fr': 'Posters "Vulva la Révolution" FR',
  'mugs-vulva-la-revolution-francais': 'Mugs "Vulva la Révolution" Français',
  'posters-vulva-la-revolution-francais': 'Posters "Vulva la Révolution" Français',
  'vulva-la-revolution': 'Mugs "Vulva la Revolution" EN',
  'posters-vulva-la-revolution': 'Posters "Vulva la Revolution" EN',
};

export default function CollectionPage() {
  const { handle } = useParams();
  const { t } = useLanguage();
  const [page, setPage] = useState(1);

  const { data: allProducts = [], isLoading: productsLoading } = useQuery({
    queryKey: ['products-all'],
    queryFn: () => base44.entities.Product.list('-createdAt', 500),
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
    return allProducts
      .filter(p => {
        const d = p.data || p;
        const cols = (d.collections && d.collections.length > 0)
          ? d.collections
          : getCollectionsByHandle(d.handle, d.title);
        return cols.includes(handle);
      })
      .sort((a, b) => {
        const da = a.data || a;
        const db = b.data || b;
        const sa = da.sortOrder != null ? da.sortOrder : 9999;
        const sb = db.sortOrder != null ? db.sortOrder : 9999;
        return sa - sb;
      });
  }, [allProducts, handle]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const label = COLLECTION_LABELS[handle] || handle;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-primary transition-colors">{t.breadcrumb.home}</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/boutique" className="hover:text-primary transition-colors">{t.breadcrumb.shop}</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground">{label}</span>
      </nav>

      <div className="mb-8">
        <h1 className="font-heading font-black uppercase text-5xl text-primary mb-2">{label}</h1>
        {collectionData?.descriptionHtml && (
          <details className="mt-2">
            <summary className="text-sm text-primary cursor-pointer hover:underline">{t.home.whyBuyHere}</summary>
            <div
              className="mt-3 text-sm text-muted-foreground leading-relaxed prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: collectionData.descriptionHtml }}
            />
          </details>
        )}
        {!productsLoading && <p className="text-muted-foreground mt-2">{filtered.length} {t.shop.productsCount}</p>}
      </div>

      <ProductGrid products={paginated} loading={productsLoading} />

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 text-sm rounded-md border border-border hover:bg-muted disabled:opacity-40 transition-colors"
          >
            {t.pagination.previous}
          </button>
          <span className="text-sm text-muted-foreground px-2">Page {page} / {totalPages}</span>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 text-sm rounded-md border border-border hover:bg-muted disabled:opacity-40 transition-colors"
          >
            {t.pagination.next}
          </button>
        </div>
      )}
    </div>
  );
}