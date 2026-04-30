import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-display text-4xl font-bold mb-8">À propos de Zeu Hi</h1>

      <div className="prose prose-lg max-w-none space-y-6 text-foreground/80 leading-relaxed">
        <div className="flex justify-center mb-8">
          <img
            src="https://xiju12-xu.myshopify.com/cdn/shop/files/ZeuHi_PortraitComic_18b974f3-b04f-4bd7-bbf0-974adc4fc1ca.jpg?v=1776956044&width=400"
            alt="Zeu Hi"
            className="w-48 h-48 object-cover rounded-full border-4 border-primary/20"
          />
        </div>

        <p>
          <strong>Bienvenue dans l'Univers de Zeu Hi !</strong>
        </p>
        <p>
          Décalé, coloré et sans tabous, l'art de Zeu Hi explore l'amour et la sexualité avec beaucoup d'éclectisme. Artiste hétéroclite, peintre en trompe l'œil et en décors de métier, elle délaisse les chantiers pour se concentrer sur un travail plus personnel et intime.
        </p>
        <p>
          Son œuvre picturale principale explore le nu masculin à travers <em>"l'épopée de la Malmuse"</em>, où son modèle archétypal la <em>"Malmuse"</em> vient remplacer les femmes dans les tableaux, créant ainsi une œuvre chorale qui revisite de manière personnelle et intime l'histoire de la peinture et interroge les construits de genre.
        </p>
        <p>
          Artiste polymorphe, peintre, illustratrice, sculptrice... curieuse de tout, elle ne se cantonne à rien de spécifique ni dans les techniques ni dans les styles employés, en revanche son univers, lui, est bien spécifique et original !
        </p>
        <p>
          Les illustrations de Zeu Hi comportent deux séries majeures : les <em>"Cœurs Allégoriques"</em> et les <em>"Tutti Sexy"</em>.
        </p>
        <p>
          Les <em>"Tutti Sexy"</em> qui sont nés des <em>"Cœurs Allégoriques"</em> et de sa tomate Cœur de Bœuf forment tout un potager et un verger de fruits et légumes sexués qui crient <strong>« Vulva la Révolution ! »</strong> et donnent des représentations de genre décomplexées parce que le sexe est tout sauf contre nature.
        </p>
        <p>
          Zeu Hi réalise aussi des illustrations pour des journaux indépendants comme le <strong>Mouais</strong> ou <strong>le Chiffon</strong>.
        </p>
        <p>
          Sur le <strong>Zeu Hi's Shop</strong>, retrouvez tous les designs de <strong>Pancartiviste !</strong> l'Open-Source militante de Zeu Hi en posters de qualité premium ainsi que des mugs imprimés à la demande pour soutenir <em>la Résistance des Sensibles</em> tout en enchantant le quotidien.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <a
            href="https://pancartiviste.fr"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            Rejoindre le mouvement →
          </a>
          <a
            href="https://www.patreon.com/c/u49061662"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-border text-foreground font-medium hover:bg-muted transition-colors"
          >
            Soutenir sur Patreon
          </a>
          <Link
            to="/boutique"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-primary text-primary font-medium hover:bg-primary/5 transition-colors"
          >
            Voir la boutique
          </Link>
        </div>
      </div>
    </div>
  );
}