import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import ProductCard from '@/components/shop/ProductCard';

const collectionSections = [
  {
    handle: 'mugs-le-coeur-manifeste',
    title: 'Mugs "Cœur de Lutte"',
    subtitle: 'La révolution commence par un café bien chaud.',
    img: 'https://xiju12-xu.myshopify.com/cdn/shop/collections/Capture_d_ecran_2026-03-30_a_21.03.01.png?v=1774915724&width=800',
  },
  {
    handle: 'posters-coeur-de-lutte',
    title: 'Posters "Cœur de Lutte"',
    subtitle: 'Affichez votre Cœur de Lutte chaque jour.',
    img: 'https://xiju12-xu.myshopify.com/cdn/shop/collections/Capture_d_ecran_2026-04-01_a_23.32.36.png?v=1775260783&width=800',
  },
  {
    handle: 'mugs-heart-of-protest',
    title: 'Mugs "Heart of Protest"',
    subtitle: 'The revolution starts with a good hot coffee.',
    img: 'https://xiju12-xu.myshopify.com/cdn/shop/collections/Capture_d_ecran_2026-03-30_a_22.22.30.png?v=1774915993&width=800',
  },
  {
    handle: 'posters-heart-of-protest',
    title: 'Posters "Heart of Protest"',
    subtitle: 'Display your Heart of Protest every day.',
    img: 'https://xiju12-xu.myshopify.com/cdn/shop/collections/Capture_d_ecran_2026-04-01_a_23.53.34.png?v=1775266059&width=800',
  },
  {
    handle: 'vulva-la-revolution-fr',
    title: 'Mugs "Vulva la Révolution" FR',
    subtitle: 'Le sexe est tout sauf contre nature.',
    img: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/891f59f9c_generated_image.png',
  },
  {
    handle: 'posters-vulva-la-revolution-fr',
    title: 'Posters "Vulva la Révolution" FR',
    subtitle: 'Des représentations de genre décomplexées.',
    img: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/72c962a6e_generated_image.png',
  },
  {
    handle: 'vulva-la-revolution',
    title: 'Mugs "Vulva la Revolution" EN',
    subtitle: 'Sex is anything but unnatural.',
    img: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/36d417008_generated_image.png',
  },
  {
    handle: 'posters-vulva-la-revolution',
    title: 'Posters "Vulva la Revolution" EN',
    subtitle: 'Gender representations unchained.',
    img: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/ff5b4c9b7_generated_image.png',
  },
];

export default function Home() {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products-featured'],
    queryFn: () => base44.entities.Product.list('-createdAt', 8),
  });

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-foreground text-background overflow-hidden border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 flex flex-col items-center text-center">
          <p className="text-xs font-mono font-medium uppercase tracking-widest mb-4 text-primary">Boutique</p>
          <h1 className="font-heading font-black uppercase text-5xl md:text-8xl mb-6 leading-none text-yellow-accent">
            PANCARTIVISTE !
          </h1>
          <p className="text-sm font-mono text-background/70 max-w-2xl mb-8 leading-relaxed">
            Des créations militantes pour enchanter le quotidien. Mugs et posters imprimés à la demande — chaque achat soutient une artiste et un mouvement.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild size="lg" className="font-heading font-bold uppercase tracking-widest bg-primary text-white hover:bg-primary/90">
              <Link to="/boutique">Voir tous les produits</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="font-mono font-medium uppercase tracking-widest border-background/30 text-background hover:bg-background/10">
              <a href="https://pancartiviste.fr" target="_blank" rel="noreferrer">pancartiviste.fr ↗</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Collection grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="font-heading font-black uppercase text-4xl text-foreground mb-2">Nos Collections</h2>
        <p className="text-xs font-mono text-muted-foreground mb-10 uppercase tracking-widest">Explorez nos séries militantes et artistiques</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {collectionSections.map(col => (
            <Link
              key={col.handle}
              to={`/collection/${col.handle}`}
              className="group relative rounded-xl overflow-hidden aspect-square bg-muted hover:shadow-lg transition-all duration-300"
            >
              {col.img ? (
                <img src={col.img} alt={col.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-white text-xs font-semibold leading-tight drop-shadow">{col.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-heading font-black uppercase text-4xl text-foreground">Nouveautés</h2>
          <Link to="/boutique" className="flex items-center gap-1 text-sm text-accent font-medium hover:gap-2 transition-all">
            Tout voir <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {Array(8).fill(0).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="aspect-square bg-muted rounded-lg animate-pulse" />
                <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
                <div className="h-3 bg-muted rounded w-1/4 animate-pulse" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map(p => (
              <ProductCard key={p.id} product={p.data || p} />
            ))}
          </div>
        )}
      </section>

      {/* Why buy here */}
      <section className="bg-muted border-t border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="font-heading font-black uppercase text-4xl text-foreground mb-6">Pourquoi acheter ici ?</h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            Acheter ici, ce n'est pas juste consommer. <strong className="text-foreground">C'est participer.</strong>
          </p>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            Chaque création que vous choisissez porte une idée, un message, une énergie. En achetant, vous permettez à une artiste de vivre de son art, tout en soutenant le projet open source <a href="https://pancartiviste.fr" className="text-accent underline" target="_blank" rel="noreferrer">pancartiviste.com</a>.
          </p>
          <p className="text-muted-foreground text-base leading-relaxed">
            En achetant, vous faites circuler plus qu'un objet : <strong className="text-foreground">vous faites circuler une voix, une présence, une force collective.</strong>
          </p>
        </div>
      </section>
    </div>
  );
}