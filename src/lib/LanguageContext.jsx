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
      coeurFR: 'Mugs "Heart of Struggle"',
      postersFR: 'Posters "Heart of Struggle"',
      coeurEN: 'Mugs "Heart of Protest"',
      postersEN: 'Posters "Heart of Protest"',
      vulvaFR: 'Mugs "Vulva the Revolution" FR',
      postersVulvaFR: 'Posters "Vulva the Revolution" FR',
      vulvaEN: 'Mugs "Vulva the Revolution" EN',
      postersVulvaEN: 'Posters "Vulva the Revolution" EN',
    },
    footer: {
      tagline: 'Zeu Hi\'s activist Open-Source. Visuals to carry messages, nurture hope, and move boundaries.',
      collections: 'Collections',
      links: 'Links',
      madeWith: 'Made with',
      forTheStreets: '— The ReLovution is underway!',
    },
    about: {
      title: 'About Zeu Hi',
      description: 'Artist portfolio and activist open-source project.',
    },
    product: {
      orderShopify: 'Order on Shopify ↗',
      description: 'Description',
      noProductFound: 'Product not found',
      backToBoutique: 'Back to shop',
    },
    breadcrumb: {
      home: 'Home',
      shop: 'Shop',
      about: 'About',
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
      coeurFR: 'Mugs "Cœur de Lutte"',
      postersFR: 'Posters "Cœur de Lutte"',
      coeurEN: 'Mugs "Heart of Protest"',
      postersEN: 'Posters "Heart of Protest"',
      vulvaFR: 'Mugs "Vulva la Révolution" FR',
      postersVulvaFR: 'Posters "Vulva la Révolution" FR',
      vulvaEN: 'Mugs "Vulva la Revolution" EN',
      postersVulvaEN: 'Posters "Vulva la Revolution" EN',
    },
    footer: {
      tagline: 'L\'Open-Source militante de Zeu Hi. Des visuels pour porter des messages, nourrir l\'espoir, et faire bouger les lignes.',
      collections: 'Collections',
      links: 'Liens',
      madeWith: 'Fait avec',
      forTheStreets: '— La ReLovution est en marche !',
    },
    about: {
      title: 'À PROPOS DE ZEU HI',
      description: 'Portfolio d\'artiste et projet open-source militant.',
    },
    product: {
      orderShopify: 'Commander sur Shopify ↗',
      description: 'Description',
      noProductFound: 'Produit introuvable',
      backToBoutique: 'Retour à la boutique',
    },
    breadcrumb: {
      home: 'Accueil',
      shop: 'Boutique',
      about: 'À propos',
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