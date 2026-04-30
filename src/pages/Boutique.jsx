import { useState, useMemo } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import ProductGrid from '@/components/shop/ProductGrid';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const PAGE_SIZE = 24;

export default function Boutique() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products-all'],
    queryFn: () => base44.entities.Product.list('-createdAt', 200),
  });

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return q
      ? products.filter(p => {
          const d = p.data || p;
          return (d.title || '').toLowerCase().includes(q) || (d.tags || '').toLowerCase().includes(q);
        })
      : products;
  }, [products, search]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSearch = (val) => {
    setSearch(val);
    setPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="font-heading font-black uppercase text-5xl text-primary mb-2">Tous les produits</h1>
        <p className="text-muted-foreground">{products.length} produits</p>
      </div>

      {/* Search */}
      <div className="relative max-w-sm mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher..."
          value={search}
          onChange={e => handleSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <ProductGrid products={paginated} loading={isLoading} />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 text-sm rounded-md border border-border hover:bg-muted disabled:opacity-40 transition-colors"
          >
            ← Précédent
          </button>
          <span className="text-sm text-muted-foreground px-2">
            Page {page} / {totalPages}
          </span>
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