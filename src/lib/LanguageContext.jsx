import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    nav: {
      boutique: 'Shop',
      collections: 'Collections',
      apropos: 'About',
    },
    home: {
      subtitle: 'Activist creations to brighten everyday life. Mugs and posters printed on demand — each purchase supports an artist and a movement.',
      viewAll: 'View all products',
      ourCollections: 'Our Collections',
      exploreCollections: 'Explore our activist and artistic series',
      newProducts: 'Latest',
      seeAll: 'See all',
      whyBuyHere: 'Why buy here?',
      notJustConsume: "Buying here isn't just consuming. It's participating.",
      eachCreation: 'Each creation you choose carries an idea, a message, energy. By buying, you allow an artist to live from their art, while supporting the open source project',
      circulate: 'By buying, you circulate more than an object:',
      youCirculateVoice: 'you circulate a voice, a presence, a collective force.',
    },
    collections: {
      mugsCoeurFR: 'Mugs "Heart of Struggle"',
      postersCoeurFR: 'Posters "Heart of Struggle"',
      mugsCoeurEN: 'Mugs "Heart of Protest"',
      postersCoeurEN: 'Posters "Heart of Protest"',
      mugsVulvaFR: 'Mugs "Vulva the Revolution" FR',
      postersVulvaFR: 'Posters "Vulva the Revolution" FR',
      mugsVulvaEN: 'Mugs "Vulva the Revolution" EN',
      postersVulvaEN: 'Posters "Vulva the Revolution" EN',
    },
    footer: {
      tagline: 'Zeu Hi\'s activist Open-Source. Visuals to carry messages, nurture hope, and move boundaries.',
      collections: 'Collections',
      links: 'Links',
      madeWith: 'Made with',
      byZeuHi: 'by Zeu Hi — The ReLovution is underway!',
    },
    shop: {
      allProducts: 'All products',
      productsCount: 'products',
      searchPlaceholder: 'Search...',
      noProductsInCollection: 'No products found in this collection.',
    },
    product: {
      orderShopify: 'Order on Shopify ↗',
      description: 'Description',
      noProductFound: 'Product not found',
      backToBoutique: 'Back to shop',
      noImage: 'No image',
      optionsLabel: 'Options:',
    },
    pagination: {
      previous: '← Previous',
      next: 'Next →',
    },
    breadcrumb: {
      home: 'Home',
      shop: 'Shop',
      about: 'About',
    },
    about: {
      title: 'ABOUT ZEU HI',
    },
  },
  fr: {
    nav: {
      boutique: 'Boutique',
      collections: 'Collections',
      apropos: 'À propos',
    },
    home: {
      subtitle: 'Des créations militantes pour enchanter le quotidien. Mugs et posters imprimés à la demande — chaque achat soutient une artiste et un mouvement.',
      viewAll: 'Voir tous les produits',
      ourCollections: 'Nos Collections',
      exploreCollections: 'Explorez nos séries militantes et artistiques',
      newProducts: 'Nouveautés',
      seeAll: 'Tout voir',
      whyBuyHere: 'Pourquoi acheter ici ?',
      notJustConsume: 'Acheter ici, ce n\'est pas juste consommer. C\'est participer.',
      eachCreation: 'Chaque création que vous choisissez porte une idée, un message, une énergie. En achetant, vous permettez à une artiste de vivre de son art, tout en soutenant le projet open source',
      circulate: 'En achetant, vous faites circuler plus qu\'un objet :',
      youCirculateVoice: 'vous faites circuler une voix, une présence, une force collective.',
    },
    collections: {
      mugsCoeurFR: 'Mugs "Cœur de Lutte"',
      postersCoeurFR: 'Posters "Cœur de Lutte"',
      mugsCoeurEN: 'Mugs "Heart of Protest"',
      postersCoeurEN: 'Posters "Heart of Protest"',
      mugsVulvaFR: 'Mugs "Vulva la Révolution" FR',
      postersVulvaFR: 'Posters "Vulva la Révolution" FR',
      mugsVulvaEN: 'Mugs "Vulva la Revolution" EN',
      postersVulvaEN: 'Posters "Vulva la Revolution" EN',
    },
    footer: {
      tagline: 'L\'Open-Source militante de Zeu Hi. Des visuels pour porter des messages, nourrir l\'espoir, et faire bouger les lignes.',
      collections: 'Collections',
      links: 'Liens',
      madeWith: 'Fait avec',
      byZeuHi: 'par Zeu Hi — La ReLovution est en marche !',
    },
    shop: {
      allProducts: 'Tous les produits',
      productsCount: 'produits',
      searchPlaceholder: 'Rechercher...',
      noProductsInCollection: 'Aucun produit trouvé dans cette collection.',
    },
    product: {
      orderShopify: 'Commander sur Shopify ↗',
      description: 'Description',
      noProductFound: 'Produit introuvable',
      backToBoutique: 'Retour à la boutique',
      noImage: 'Pas d\'image',
      optionsLabel: 'Options :',
    },
    pagination: {
      previous: '← Précédent',
      next: 'Suivant →',
    },
    breadcrumb: {
      home: 'Accueil',
      shop: 'Boutique',
      about: 'À propos',
    },
    about: {
      title: 'À PROPOS DE ZEU HI',
    },
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'fr';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'fr' ? 'en' : 'fr');
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}