import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

// Collection handles mapping
const COLLECTION_HANDLES = {
  'posters-heart-of-protest': 'posters-heart-of-protest',
  'mugs-heart-of-protest': 'mugs-heart-of-protest',
  'vulva-la-revolution': 'vulva-la-revolution',               // Mugs EN
  'mugs-vulva-la-revolution-francais': 'mugs-vulva-la-revolution-francais', // Mugs FR
  'posters-vulva-la-revolution': 'posters-vulva-la-revolution',  // Posters EN (need to check)
  'posters-vulva-la-revolution-francais': 'posters-vulva-la-revolution-francais', // Posters FR
  'mugs-le-coeur-manifeste': 'mugs-le-coeur-manifeste',       // Mugs "Cœur de Lutte" FR
  'posters-le-coeur-manifeste': 'posters-le-coeur-manifeste', // Posters "Heart of Protest" FR
};

// Title → collection handle mapping
// Exact title matching (case-insensitive, trimmed)
const TITLE_TO_COLLECTIONS = {
  // ============================================================
  // Collection Heart of Protest Poster (EN)
  // ============================================================
  '"love tune" poster': ['posters-heart-of-protest'],
  'love tune poster': ['posters-heart-of-protest'],
  '"love resists" poster': ['posters-heart-of-protest'],
  'love resists poster': ['posters-heart-of-protest'],
  '"locked on love" poster': ['posters-heart-of-protest'],
  'locked on love poster': ['posters-heart-of-protest'],
  '"locked on resistance" poster': ['posters-heart-of-protest'],
  'locked on resistance poster': ['posters-heart-of-protest'],
  '"pick my love" poster': ['posters-heart-of-protest'],
  'pick my love poster': ['posters-heart-of-protest'],
  '"my heart resists" poster': ['posters-heart-of-protest'],
  'my heart resists poster': ['posters-heart-of-protest'],
  '"pick my heart" poster': ['posters-heart-of-protest'],
  'pick my heart poster': ['posters-heart-of-protest'],
  '"pick my resistance" poster': ['posters-heart-of-protest'],
  'pick my resistance poster': ['posters-heart-of-protest'],
  '"love freely" poster': ['posters-heart-of-protest'],
  'love freely poster': ['posters-heart-of-protest'],
  '"to love is to resist" poster': ['posters-heart-of-protest'],
  'to love is to resist poster': ['posters-heart-of-protest'],
  '"solidarity" poster': ['posters-heart-of-protest'],
  'solidarity poster': ['posters-heart-of-protest'],
  '"solidarity resists" poster': ['posters-heart-of-protest'],
  'solidarity resists poster': ['posters-heart-of-protest'],
  '"generous heart" poster': ['posters-heart-of-protest'],
  'generous heart poster': ['posters-heart-of-protest'],
  '"generous artichoke" poster': ['posters-heart-of-protest'],
  'generous artichoke poster': ['posters-heart-of-protest'],
  '"generous resistance" poster': ['posters-heart-of-protest'],
  'generous resistance poster': ['posters-heart-of-protest'],
  '"tender heart" poster': ['posters-heart-of-protest'],
  'tender heart poster': ['posters-heart-of-protest'],
  '"resistano artichoke" poster': ['posters-heart-of-protest'],
  'resistano artichoke poster': ['posters-heart-of-protest'],
  '"heart of protest" poster': ['posters-heart-of-protest'],
  'heart of protest poster': ['posters-heart-of-protest'],
  '"resisting guts" poster': ['posters-heart-of-protest'],
  'resisting guts poster': ['posters-heart-of-protest'],
  '"butter heart" poster': ['posters-heart-of-protest'],
  'butter heart poster': ['posters-heart-of-protest'],
  '"melted resistance" poster': ['posters-heart-of-protest'],
  'melted resistance poster': ['posters-heart-of-protest'],
  '"butter love" poster': ['posters-heart-of-protest'],
  'butter love poster': ['posters-heart-of-protest'],
  '"buttered resistance" poster': ['posters-heart-of-protest'],
  'buttered resistance poster': ['posters-heart-of-protest'],
  '"shattered heart" poster': ['posters-heart-of-protest'],
  'shattered heart poster': ['posters-heart-of-protest'],
  '"shattered resistance" poster': ['posters-heart-of-protest'],
  'shattered resistance poster': ['posters-heart-of-protest'],
  '"spark the flame" poster': ['posters-heart-of-protest'],
  'spark the flame poster': ['posters-heart-of-protest'],
  '"ashes resistance" poster': ['posters-heart-of-protest'],
  'ashes resistance poster': ['posters-heart-of-protest'],

  // ============================================================
  // Collection Heart of Protest Mug (EN)
  // ============================================================
  '"love tune" ceramic mug': ['mugs-heart-of-protest'],
  'love tune ceramic mug': ['mugs-heart-of-protest'],
  '"love tune" mug': ['mugs-heart-of-protest'],
  'love tune mug': ['mugs-heart-of-protest'],
  '"locked on love" ceramic mug': ['mugs-heart-of-protest'],
  'locked on love ceramic mug': ['mugs-heart-of-protest'],
  '"locked on love" mug': ['mugs-heart-of-protest'],
  'locked on love mug': ['mugs-heart-of-protest'],
  '"pick my love" ceramic mug': ['mugs-heart-of-protest'],
  'pick my love ceramic mug': ['mugs-heart-of-protest'],
  '"pick my love" mug': ['mugs-heart-of-protest'],
  'pick my love mug': ['mugs-heart-of-protest'],
  '"pick my heart" ceramic mug': ['mugs-heart-of-protest'],
  'pick my heart ceramic mug': ['mugs-heart-of-protest'],
  '"pick my heart" mug': ['mugs-heart-of-protest'],
  'pick my heart mug': ['mugs-heart-of-protest'],
  '"love freely" ceramic mug': ['mugs-heart-of-protest'],
  'love freely ceramic mug': ['mugs-heart-of-protest'],
  '"love freely" mug': ['mugs-heart-of-protest'],
  'love freely mug': ['mugs-heart-of-protest'],
  '"solidarity" ceramic mug': ['mugs-heart-of-protest'],
  'solidarity ceramic mug': ['mugs-heart-of-protest'],
  '"solidarity" mug': ['mugs-heart-of-protest'],
  'solidarity mug': ['mugs-heart-of-protest'],
  '"generous heart" ceramic mug': ['mugs-heart-of-protest'],
  'generous heart ceramic mug': ['mugs-heart-of-protest'],
  '"generous heart" mug': ['mugs-heart-of-protest'],
  'generous heart mug': ['mugs-heart-of-protest'],
  '"generous artichoke" ceramic mug': ['mugs-heart-of-protest'],
  'generous artichoke ceramic mug': ['mugs-heart-of-protest'],
  '"generous artichoke" mug': ['mugs-heart-of-protest'],
  'generous artichoke mug': ['mugs-heart-of-protest'],
  '"tender heart" ceramic mug': ['mugs-heart-of-protest'],
  'tender heart ceramic mug': ['mugs-heart-of-protest'],
  '"tender heart" mug': ['mugs-heart-of-protest'],
  'tender heart mug': ['mugs-heart-of-protest'],
  '"heart of protest" ceramic mug': ['mugs-heart-of-protest'],
  'heart of protest ceramic mug': ['mugs-heart-of-protest'],
  '"heart of protest" mug': ['mugs-heart-of-protest'],
  'heart of protest mug': ['mugs-heart-of-protest'],
  '"butter heart" ceramic mug': ['mugs-heart-of-protest'],
  'butter heart ceramic mug': ['mugs-heart-of-protest'],
  '"butter heart" mug': ['mugs-heart-of-protest'],
  'butter heart mug': ['mugs-heart-of-protest'],
  '"butter love" ceramic mug': ['mugs-heart-of-protest'],
  'butter love ceramic mug': ['mugs-heart-of-protest'],
  '"butter love" mug': ['mugs-heart-of-protest'],
  'butter love mug': ['mugs-heart-of-protest'],
  '"shattered heart" ceramic mug': ['mugs-heart-of-protest'],
  'shattered heart ceramic mug': ['mugs-heart-of-protest'],
  '"shattered  heart" ceramic mug': ['mugs-heart-of-protest'],
  '"shattered heart" mug': ['mugs-heart-of-protest'],
  'shattered heart mug': ['mugs-heart-of-protest'],
  '"spark the flame" ceramic mug': ['mugs-heart-of-protest'],
  'spark the flame ceramic mug': ['mugs-heart-of-protest'],
  '"spark the flame" mug': ['mugs-heart-of-protest'],
  'spark the flame mug': ['mugs-heart-of-protest'],

  // ============================================================
  // Collection Heart of Protest Poster (FR) - "Cœur de Lutte"
  // ============================================================
  '"cœur à chœur" poster': ['posters-le-coeur-manifeste'],
  'cœur à chœur poster': ['posters-le-coeur-manifeste'],
  '"chœur de lutte" poster': ['posters-le-coeur-manifeste'],
  'chœur de lutte poster': ['posters-le-coeur-manifeste'],
  '"clé de lutte" poster': ['posters-le-coeur-manifeste'],
  'clé de lutte poster': ['posters-le-coeur-manifeste'],
  '"clé de résistance" poster': ['posters-le-coeur-manifeste'],
  'clé de résistance poster': ['posters-le-coeur-manifeste'],
  '"pique l\'amour" poster': ['posters-le-coeur-manifeste'],
  'pique l\'amour poster': ['posters-le-coeur-manifeste'],
  '"mon cœur résiste" poster': ['posters-le-coeur-manifeste'],
  'mon cœur résiste poster': ['posters-le-coeur-manifeste'],
  '"pique mon cœur" poster': ['posters-le-coeur-manifeste'],
  'pique mon cœur poster': ['posters-le-coeur-manifeste'],
  '"résiste mon cœur" poster': ['posters-le-coeur-manifeste'],
  'résiste mon cœur poster': ['posters-le-coeur-manifeste'],
  '"aimer est un acte politique" poster': ['posters-le-coeur-manifeste'],
  'aimer est un acte politique poster': ['posters-le-coeur-manifeste'],
  '"aimer c\'est résister" poster': ['posters-le-coeur-manifeste'],
  'aimer c\'est résister poster': ['posters-le-coeur-manifeste'],
  '"solidaires" poster': ['posters-le-coeur-manifeste'],
  'solidaires poster': ['posters-le-coeur-manifeste'],
  '"résistance solidaire" poster': ['posters-le-coeur-manifeste'],
  'résistance solidaire poster': ['posters-le-coeur-manifeste'],
  '"cœur d\'artichaut engagé" poster': ['posters-le-coeur-manifeste'],
  'cœur d\'artichaut engagé poster': ['posters-le-coeur-manifeste'],
  '"cœur d\'artichaut résistant" poster': ['posters-le-coeur-manifeste'],
  'cœur d\'artichaut résistant poster': ['posters-le-coeur-manifeste'],
  '"cœur généreux" poster': ['posters-le-coeur-manifeste'],
  'cœur généreux poster': ['posters-le-coeur-manifeste'],
  '"cœur d\'artichaut" poster': ['posters-le-coeur-manifeste'],
  'cœur d\'artichaut poster': ['posters-le-coeur-manifeste'],
  '"généreuse résistance" poster': ['posters-le-coeur-manifeste'],
  'généreuse résistance poster': ['posters-le-coeur-manifeste'],
  '"motte de cœur" poster': ['posters-le-coeur-manifeste'],
  'motte de cœur poster': ['posters-le-coeur-manifeste'],
  '"résistance fondue" poster': ['posters-le-coeur-manifeste'],
  'résistance fondue poster': ['posters-le-coeur-manifeste'],
  '"motte de cul" poster': ['posters-le-coeur-manifeste'],
  'motte de cul poster': ['posters-le-coeur-manifeste'],
  '"fondu.e de résistance" poster': ['posters-le-coeur-manifeste'],
  'fondu.e de résistance poster': ['posters-le-coeur-manifeste'],
  '"cœur de lutte" poster': ['posters-le-coeur-manifeste'],
  'cœur de lutte poster': ['posters-le-coeur-manifeste'],
  '"tripes résistantes" poster': ['posters-le-coeur-manifeste'],
  'tripes résistantes poster': ['posters-le-coeur-manifeste'],
  '"cœur eclaté" poster': ['posters-le-coeur-manifeste'],
  'cœur eclaté poster': ['posters-le-coeur-manifeste'],
  '"résistance eclatée" poster': ['posters-le-coeur-manifeste'],
  'résistance eclatée poster': ['posters-le-coeur-manifeste'],
  '"rallume la flamme" poster': ['posters-le-coeur-manifeste'],
  'rallume la flamme poster': ['posters-le-coeur-manifeste'],
  '"résiste en cendres" poster': ['posters-le-coeur-manifeste'],
  'résiste en cendres poster': ['posters-le-coeur-manifeste'],

  // ============================================================
  // Collection Heart of Protest Mug (FR) - "Cœur de Lutte"
  // ============================================================
  '"cœur de lutte" mug céramique': ['mugs-le-coeur-manifeste'],
  'cœur de lutte mug céramique': ['mugs-le-coeur-manifeste'],
  '"cœur de lutte" mug': ['mugs-le-coeur-manifeste'],
  'cœur de lutte mug': ['mugs-le-coeur-manifeste'],
  '"cœur à chœur" mug céramique': ['mugs-le-coeur-manifeste'],
  'cœur à chœur mug céramique': ['mugs-le-coeur-manifeste'],
  '"cœur à chœur" mug': ['mugs-le-coeur-manifeste'],
  'cœur à chœur mug': ['mugs-le-coeur-manifeste'],
  '"clé de lutte" mug céramique': ['mugs-le-coeur-manifeste'],
  'clé de lutte mug céramique': ['mugs-le-coeur-manifeste'],
  '"clé de lutte" mug': ['mugs-le-coeur-manifeste'],
  'clé de lutte mug': ['mugs-le-coeur-manifeste'],
  '"pique l\'amour" mug céramique': ['mugs-le-coeur-manifeste'],
  'pique l\'amour mug céramique': ['mugs-le-coeur-manifeste'],
  '"pique l\'amour" mug': ['mugs-le-coeur-manifeste'],
  'pique l\'amour mug': ['mugs-le-coeur-manifeste'],
  '"pique mon cœur" mug céramique': ['mugs-le-coeur-manifeste'],
  'pique mon cœur mug céramique': ['mugs-le-coeur-manifeste'],
  '"pique mon cœur" mug': ['mugs-le-coeur-manifeste'],
  'pique mon cœur mug': ['mugs-le-coeur-manifeste'],
  '"aimer est un acte politique" mug céramique': ['mugs-le-coeur-manifeste'],
  'aimer est un acte politique mug céramique': ['mugs-le-coeur-manifeste'],
  '"aimer est un acte politique" mug': ['mugs-le-coeur-manifeste'],
  'aimer est un acte politique mug': ['mugs-le-coeur-manifeste'],
  '"aimer c\'est politique" mug céramique': ['mugs-le-coeur-manifeste'],
  'aimer c\'est politique mug céramique': ['mugs-le-coeur-manifeste'],
  '"solidaires" mug céramique': ['mugs-le-coeur-manifeste'],
  'solidaires mug céramique': ['mugs-le-coeur-manifeste'],
  '"solidaires" mug': ['mugs-le-coeur-manifeste'],
  'solidaires mug': ['mugs-le-coeur-manifeste'],
  '"cœur d\'artichaut engagé" mug céramique': ['mugs-le-coeur-manifeste'],
  'cœur d\'artichaut engagé mug céramique': ['mugs-le-coeur-manifeste'],
  '"cœur d\'artichaut engagé" mug': ['mugs-le-coeur-manifeste'],
  'cœur d\'artichaut engagé mug': ['mugs-le-coeur-manifeste'],
  '"cœur d\'artichaut" mug céramique': ['mugs-le-coeur-manifeste'],
  'cœur d\'artichaut mug céramique': ['mugs-le-coeur-manifeste'],
  '"cœur d\'artichaut" mug': ['mugs-le-coeur-manifeste'],
  'cœur d\'artichaut mug': ['mugs-le-coeur-manifeste'],
  '"cœur généreux" mug céramique': ['mugs-le-coeur-manifeste'],
  'cœur généreux mug céramique': ['mugs-le-coeur-manifeste'],
  '"cœur généreux" mug': ['mugs-le-coeur-manifeste'],
  'cœur généreux mug': ['mugs-le-coeur-manifeste'],
  '"motte de cœur" mug céramique': ['mugs-le-coeur-manifeste'],
  'motte de cœur mug céramique': ['mugs-le-coeur-manifeste'],
  '"motte de cœur" mug': ['mugs-le-coeur-manifeste'],
  'motte de cœur mug': ['mugs-le-coeur-manifeste'],
  '"motte de cul" mug céramique': ['mugs-le-coeur-manifeste'],
  'motte de cul mug céramique': ['mugs-le-coeur-manifeste'],
  '"motte de cul" mug': ['mugs-le-coeur-manifeste'],
  'motte de cul mug': ['mugs-le-coeur-manifeste'],
  '"cœur eclaté" mug céramique': ['mugs-le-coeur-manifeste'],
  'cœur eclaté mug céramique': ['mugs-le-coeur-manifeste'],
  '"cœur eclaté" mug': ['mugs-le-coeur-manifeste'],
  'cœur eclaté mug': ['mugs-le-coeur-manifeste'],
  '"rallume la flamme" mug céramique': ['mugs-le-coeur-manifeste'],
  'rallume la flamme mug céramique': ['mugs-le-coeur-manifeste'],
  '"rallume la flamme" mug': ['mugs-le-coeur-manifeste'],
  'rallume la flamme mug': ['mugs-le-coeur-manifeste'],
  '"coeur tendre" mug ceramique': ['mugs-le-coeur-manifeste'],
  'coeur tendre mug ceramique': ['mugs-le-coeur-manifeste'],

  // ============================================================
  // Collection "Vulva la Revolution" Poster EN
  // ============================================================
  '"vulva la revolution" tomatoe poster': ['posters-vulva-la-revolution'],
  '"anti patriarchy" tomatoe poster': ['posters-vulva-la-revolution'],
  'all together tomatoe poster': ['posters-vulva-la-revolution'],
  'make love not war tomatoe poster': ['posters-vulva-la-revolution'],
  'woke is the new sexy tomatoe poster': ['posters-vulva-la-revolution'],
  'ready for the woke tomatoe poster': ['posters-vulva-la-revolution'],
  '"vulva la revolution" carmen strawberry poster': ['posters-vulva-la-revolution'],
  '"anti patriarchy" tonio strawberry poster': ['posters-vulva-la-revolution'],
  '"vulva la revolution" shakira strawberry poster': ['posters-vulva-la-revolution'],
  '"anti patriarchy" rico strawberry poster': ['posters-vulva-la-revolution'],
  'make love carmen strawberry poster': ['posters-vulva-la-revolution'],
  'not war tonio strawberry poster': ['posters-vulva-la-revolution'],
  'make love rico strawberry poster': ['posters-vulva-la-revolution'],
  'not war shakira strawberry poster': ['posters-vulva-la-revolution'],
  'make love lola strawberry poster': ['posters-vulva-la-revolution'],
  'not war almarita strawberry poster': ['posters-vulva-la-revolution'],
  'all together strawberry poster': ['posters-vulva-la-revolution'],
  'peace and love carmen and tonio strawberry poster': ['posters-vulva-la-revolution'],
  'peace and love rico and shakira strawberry poster': ['posters-vulva-la-revolution'],
  'peace and love lola and almarita strawberry poster': ['posters-vulva-la-revolution'],
  '"peace & love" carmen & tonio strawberry poster': ['posters-vulva-la-revolution'],
  '"peace & love" rico & shakira strawberry poster': ['posters-vulva-la-revolution'],
  '"peace & love" lola & almarita strawberry poster': ['posters-vulva-la-revolution'],
  'ready for the woke pepper and zucchini poster': ['posters-vulva-la-revolution'],
  '"ready for the woke" pepper & zucchini poster': ['posters-vulva-la-revolution'],
  'they forgot we were seeds pepper poster': ['posters-vulva-la-revolution'],
  'i broke free pepper poster': ['posters-vulva-la-revolution'],
  'ci vis pacem parabellum poster en': ['posters-vulva-la-revolution'],
  '"ci vis pacem" poster': ['posters-vulva-la-revolution'],
  'motherfuckers poster': ['posters-vulva-la-revolution'],
  'keep calm and carrot on poster': ['posters-vulva-la-revolution'],
  'vulva la revolution turnip couple poster': ['posters-vulva-la-revolution'],
  'vulva la revolution turnip poster': ['posters-vulva-la-revolution'],
  '"anti patriarchy" turnip poster': ['posters-vulva-la-revolution'],
  'ready for the woke turnip poster': ['posters-vulva-la-revolution'],

  // ============================================================
  // Collection "Vulva la Revolution" Mug EN
  // ============================================================
  '"vulva la revolution" tomatoe ceramic mug': ['vulva-la-revolution'],
  'make love not war tomatoe ceramic mug': ['vulva-la-revolution'],
  '"vulva la revolution" carmen strawberry ceramic mug': ['vulva-la-revolution'],
  '"vulva la revolution" shakira strawberry ceramic mug': ['vulva-la-revolution'],
  'make love carmen and tonio strawberry ceramic mug': ['vulva-la-revolution'],
  'make love carmen and shakira strawberry ceramic mug': ['vulva-la-revolution'],
  'make love rico and shakira strawberry ceramic mug': ['vulva-la-revolution'],
  'make love rico and tonio strawberry ceramic mug': ['vulva-la-revolution'],
  'make love lola and almarita strawberry ceramic mug': ['vulva-la-revolution'],
  'they forgot we were seeds pepper ceramic mug': ['vulva-la-revolution'],
  'vulva la revolution turnip ceramic mug': ['vulva-la-revolution'],
  'ready for the woke turnip ceramic mug': ['vulva-la-revolution'],
  // also handles variant spellings
  '"vulva la revolution" turnip ceramic mug': ['vulva-la-revolution'],
  '"ready for the woke" turnip ceramic mug': ['vulva-la-revolution'],
  '"vulva la revolution" carmen strawberry mug céramique': ['vulva-la-revolution'],

  // ============================================================
  // Collection "Vulva la Revolution" Mug FR
  // ============================================================
  '"vulva la révolution" tomate mug céramique': ['mugs-vulva-la-revolution-francais'],
  '"vulva la revolution" tomate mug céramique': ['mugs-vulva-la-revolution-francais'],
  'faites l\'amour pas la guerre tomate mug céramique': ['mugs-vulva-la-revolution-francais'],
  '"vulva la révolution" carmen fraise  mug céramique': ['mugs-vulva-la-revolution-francais'],
  '"vulva la révolution" carmen fraise mug céramique': ['mugs-vulva-la-revolution-francais'],
  '"vulva la révolution" shakira fraise  mug céramique': ['mugs-vulva-la-revolution-francais'],
  '"vulva la révolution" shakira fraise mug céramique': ['mugs-vulva-la-revolution-francais'],
  'faites l\'amour pas la guerre carmen and tonio fraise  mug céramique': ['mugs-vulva-la-revolution-francais'],
  'faites l\'amour pas la guerre carmen and tonio fraise mug céramique': ['mugs-vulva-la-revolution-francais'],
  'faites l\'amour pas la guerre carmen and shakira fraise  mug céramique': ['mugs-vulva-la-revolution-francais'],
  'faites l\'amour pas la guerre carmen and shakira fraise mug céramique': ['mugs-vulva-la-revolution-francais'],
  'faites l\'amour pas la guerre rico and shakira fraise  mug céramique': ['mugs-vulva-la-revolution-francais'],
  'faites l\'amour pas la guerre rico and shakira fraise mug céramique': ['mugs-vulva-la-revolution-francais'],
  'faites l\'amour pas la guerre rico and tonio fraise  mug céramique': ['mugs-vulva-la-revolution-francais'],
  'faites l\'amour pas la guerre rico and tonio fraise mug céramique': ['mugs-vulva-la-revolution-francais'],
  'faites l\'amour pas la guerre lola and almarita fraise  mug céramique': ['mugs-vulva-la-revolution-francais'],
  'faites l\'amour pas la guerre lola and almarita fraise mug céramique': ['mugs-vulva-la-revolution-francais'],
  'nous étions des graines  mug céramique': ['mugs-vulva-la-revolution-francais'],
  'nous étions des graines mug céramique': ['mugs-vulva-la-revolution-francais'],
  '"nous sommes des graines" mug céramique': ['mugs-vulva-la-revolution-francais'],
  'nous sommes des graines mug céramique': ['mugs-vulva-la-revolution-francais'],
  'vulva la revolution navet  mug céramique': ['mugs-vulva-la-revolution-francais'],
  'vulva la revolution navet mug céramique': ['mugs-vulva-la-revolution-francais'],
  '"vulva la révolution" couple de navets mug céramique': ['mugs-vulva-la-revolution-francais'],
  'ready for the woke navet  mug céramique': ['mugs-vulva-la-revolution-francais'],
  'ready for the woke navet mug céramique': ['mugs-vulva-la-revolution-francais'],
  '"prêts pour le woke" navet mug céramique': ['mugs-vulva-la-revolution-francais'],
  // FR variant spellings from Gelato
  '"vulva la révolution" fraise carmen et tonio mug céramique': ['mugs-vulva-la-revolution-francais'],
  '"niçoise ni soumise" tomate mug céramique': ['mugs-vulva-la-revolution-francais'],
  '"niçoise ni soumise" fraise carmen mug céramique': ['mugs-vulva-la-revolution-francais'],
  'faites l\'amour pas la guerre fraise carmen et tonio mug céramique': ['mugs-vulva-la-revolution-francais'],
  'faites l\'amour pas la guerre fraise rico et shakira mug céramique': ['mugs-vulva-la-revolution-francais'],
  'faites l\'amour pas la guerre fraise carmen et shakira mug céramique': ['mugs-vulva-la-revolution-francais'],
  'faites l\'amour pas la guerre fraise rico et tonio mug céramique': ['mugs-vulva-la-revolution-francais'],
  'faites l\'amour pas la guerre fraise lola et almarita  mug céramique': ['mugs-vulva-la-revolution-francais'],
  '"vulva la révolution" fraise shakira et rico mug céramique': ['mugs-vulva-la-revolution-francais'],

  // ============================================================
  // Collection "Vulva la Revolution" Poster FR
  // ============================================================
  '"vulva la révolution" tomate poster': ['posters-vulva-la-revolution-francais'],
  '"vulva la revolution" tomate poster': ['posters-vulva-la-revolution-francais'],
  '"anti patriarcat" tomate poster': ['posters-vulva-la-revolution-francais'],
  'toustes ensemble tomate poster': ['posters-vulva-la-revolution-francais'],
  'faites l\'amour pas la guerre tomate poster': ['posters-vulva-la-revolution-francais'],
  '"prêts pour le woke" tomate poster': ['posters-vulva-la-revolution-francais'],
  '"prets pour le woke " tomate poster': ['posters-vulva-la-revolution-francais'],
  'misandrie vs misogynie tomate poster': ['posters-vulva-la-revolution-francais'],
  '"misandrie vs misogynie " tomate poster': ['posters-vulva-la-revolution-francais'],
  '"vulva la révolution" carmen fraise poster': ['posters-vulva-la-revolution-francais'],
  '"anti patriarcat" tonio fraise poster': ['posters-vulva-la-revolution-francais'],
  '"vulva la révolution" shakira fraise poster': ['posters-vulva-la-revolution-francais'],
  '"anti patriarcat" rico fraise poster': ['posters-vulva-la-revolution-francais'],
  'faites l\'amour carmen fraise poster': ['posters-vulva-la-revolution-francais'],
  'pas la guerre tonio fraise poster': ['posters-vulva-la-revolution-francais'],
  'faites l\'amour rico fraise poster': ['posters-vulva-la-revolution-francais'],
  'pas la guerreshakira fraise poster': ['posters-vulva-la-revolution-francais'],
  'faites l\'amour lola fraise poster': ['posters-vulva-la-revolution-francais'],
  'pas la guerre almarita fraise poster': ['posters-vulva-la-revolution-francais'],
  'toustes ensemble fraise poster': ['posters-vulva-la-revolution-francais'],
  'faites l\'amour pas la guerre carmen and tonio fraise poster': ['posters-vulva-la-revolution-francais'],
  'faites l\'amour pas la guerre rico and shakira fraise poster': ['posters-vulva-la-revolution-francais'],
  'faites l\'amour pas la guerre lola and almarita fraise poster': ['posters-vulva-la-revolution-francais'],
  '"prêts pour le woke" poivron et courgette poster': ['posters-vulva-la-revolution-francais'],
  '"prêts pour le woke" courgette poster': ['posters-vulva-la-revolution-francais'],
  'nous étions des graines poster': ['posters-vulva-la-revolution-francais'],
  '"nous étions des graines" poster': ['posters-vulva-la-revolution-francais'],
  'j\'ai brisé la boîte poster': ['posters-vulva-la-revolution-francais'],
  '"j\'ai brisé la boîte" poster': ['posters-vulva-la-revolution-francais'],
  'ci vis pacem parabellum poster ': ['posters-vulva-la-revolution-francais'],
  '"ci vis pacem" poster fr': ['posters-vulva-la-revolution-francais'],
  'les enc***** poster': ['posters-vulva-la-revolution-francais'],
  '"les enc***..."  poster': ['posters-vulva-la-revolution-francais'],
  'marre de se faire carotter poster': ['posters-vulva-la-revolution-francais'],
  '"marre de se faire carotter" poster': ['posters-vulva-la-revolution-francais'],
  'vulva la revolution couple navet poster': ['posters-vulva-la-revolution-francais'],
  '"vulva la révolution" couple de navets poster': ['posters-vulva-la-revolution-francais'],
  'vulva la revolution navet poster': ['posters-vulva-la-revolution-francais'],
  '"anti patriarcat" navet poster': ['posters-vulva-la-revolution-francais'],
  '"prêts pour le woke" navet poster': ['posters-vulva-la-revolution-francais'],
  // Gelato variant names
  '"niçoise ni soumise" tomate poster': ['posters-vulva-la-revolution-francais'],
  '"niçoise ni soumise" fraise carmen poster': ['posters-vulva-la-revolution-francais'],
  '"faites l\'amour" fraise carmen poster': ['posters-vulva-la-revolution-francais'],
  '"faites l\'amour" fraise rico poster': ['posters-vulva-la-revolution-francais'],
  '"faites l\'amour" fraise lola poster': ['posters-vulva-la-revolution-francais'],
  '"anti patriarcat" fraise rico poster': ['posters-vulva-la-revolution-francais'],
  '"anti patriarcat" fraise tonio poster': ['posters-vulva-la-revolution-francais'],
  '"vulva la révolution" fraise shakira poster': ['posters-vulva-la-revolution-francais'],
  '"vulva la révolution" fraise carmen poster': ['posters-vulva-la-revolution-francais'],
  '"toustes ensemble" fraise poster': ['posters-vulva-la-revolution-francais'],
  '"toustes ensemble" tomate poster': ['posters-vulva-la-revolution-francais'],
  '"faites l\'amour pas la guerre" fraise carmen et tonio poster': ['posters-vulva-la-revolution-francais'],
  '"faites l\'amour pas la guerre" fraise shakira et rico poster': ['posters-vulva-la-revolution-francais'],
  '"faites l\'amour pas la guerre" fraise lola et almarita poster': ['posters-vulva-la-revolution-francais'],
  '"pas la guerre" fraise shakira poster': ['posters-vulva-la-revolution-francais'],
  '"pas la guerre" fraise tonio poster': ['posters-vulva-la-revolution-francais'],
  '"pas la guerre" fraise almarita poster': ['posters-vulva-la-revolution-francais'],
  '"faites l\'amour" fraise lola poster': ['posters-vulva-la-revolution-francais'],
  '"faites l\'amour pas la guerre" tomate poster': ['posters-vulva-la-revolution-francais'],
  '"faites l\'amour pas la guerre" tomate mug céramique': ['mugs-vulva-la-revolution-francais'],
  '"faites l\'amour pas la guerre" fraise rico et shakira mug céramique': ['mugs-vulva-la-revolution-francais'],
  '"faites l\'amour pas la guerre" fraise carmen et tonio mug céramique': ['mugs-vulva-la-revolution-francais'],
  '"faites l\'amour pas la guerre" fraise carmen et shakira mug céramique': ['mugs-vulva-la-revolution-francais'],
  '"faites l\'amour pas la guerre" fraise rico et tonio mug céramique': ['mugs-vulva-la-revolution-francais'],
  '"faites l\'amour pas la guerre" fraise lola et almarita  mug céramique': ['mugs-vulva-la-revolution-francais'],
  '"vulva la révolution" fraise shakira et rico mug céramique': ['mugs-vulva-la-revolution-francais'],
  '"vulva la révolution" fraise carmen et tonio mug céramique': ['mugs-vulva-la-revolution-francais'],
  '"prêts pour le woke " tomate poster': ['posters-vulva-la-revolution-francais'],
  '"misandrie vs misogynie " tomate poster': ['posters-vulva-la-revolution-francais'],
  '"anti patriarcat" tomate poster': ['posters-vulva-la-revolution-francais'],
  '"vulva la révolution" tomate poster': ['posters-vulva-la-revolution-francais'],
  '"vulva la révolution" tomate mug céramique': ['mugs-vulva-la-revolution-francais'],
  '"niçoise ni soumise" fraise mug céramique': ['mugs-vulva-la-revolution-francais'],
  '"nous sommes des graines" mug céramique': ['mugs-vulva-la-revolution-francais'],
  '"vulva la révolution" couple de navets poster': ['posters-vulva-la-revolution-francais'],
  '"marre de se faire carotter" poster': ['posters-vulva-la-revolution-francais'],
  '"j\'ai brisé la boîte" poster': ['posters-vulva-la-revolution-francais'],
  '"les enc***..." poster': ['posters-vulva-la-revolution-francais'],
  '"ci vis pacem" poster': ['posters-vulva-la-revolution-francais'],

  // ============================================================
  // Additional variant titles from Gelato
  // ============================================================
  // EN Heart of Protest extras
  '"tender artichoke" poster': ['posters-heart-of-protest'],
  '"tender artichoke" ceramic mug': ['mugs-heart-of-protest'],
  '"resistant heartichoke" poster': ['posters-heart-of-protest'],
  '"locked love" ceramic mug': ['mugs-heart-of-protest'],
  '"gut spilling" poster': ['posters-heart-of-protest'],
  '"pic de cœur" mug céramique': ['mugs-le-coeur-manifeste'],
  '"fondu.e de résistance " poster': ['posters-le-coeur-manifeste'],
  'fondu.e de résistance  poster': ['posters-le-coeur-manifeste'],
  '"not war" tomatoe ceramic mug': ['vulva-la-revolution'],
  // Extra EN vulva
  '"make love" strawberry rico & tonio ceramic mug': ['vulva-la-revolution'],
  '"make love" strawberry carmen & shakira ceramic mug': ['vulva-la-revolution'],
  '"make love" strawberry lola & almarita ceramic mug': ['vulva-la-revolution'],
  '"vulva la revolution" strawberry shakira & rico ceramic mug': ['vulva-la-revolution'],
  '"vulva la revolution" strawberry carmen & tonio ceramic mug': ['vulva-la-revolution'],
  '"vulva la revolution" strawberry carmen & rico ceramic mug': ['vulva-la-revolution'],
  // Extra FR posters
  '"faites l\'amour" fraise lola poster': ['posters-vulva-la-revolution-francais'],
  '"pas la guerre" fraise shakira poster': ['posters-vulva-la-revolution-francais'],
  '"vulva la révolution" fraise carmen et tonio mug céramique': ['mugs-vulva-la-revolution-francais'],
  // Niçoise
  '"niçoise ni soumise" fraise mug céramique': ['mugs-vulva-la-revolution-francais'],
  '"niçoise ni soumise" fraise carmen poster': ['posters-vulva-la-revolution-francais'],
  // Extra misc
  '"ci vis pacem" poster en': ['posters-vulva-la-revolution'],
  '"ci vis pacem parabellum" poster en': ['posters-vulva-la-revolution'],
  '"shattered  heart" ceramic mug': ['mugs-heart-of-protest'],
  '"aimer c\'est politique" mug  céramique': ['mugs-le-coeur-manifeste'],
  'aimer c\'est politique mug  céramique': ['mugs-le-coeur-manifeste'],
  '"résistance fondue " poster': ['posters-le-coeur-manifeste'],
  '"solidarity resist" poster': ['posters-heart-of-protest'],
  '"faites l\'amour" tomate mug céramique': ['mugs-vulva-la-revolution-francais'],
  '"anti patriarcat" tomate mug céramique': ['mugs-vulva-la-revolution-francais'],
  '"pas la guerre" tomate mug céramique': ['mugs-vulva-la-revolution-francais'],
  '"all together" tomatoe poster': ['posters-vulva-la-revolution'],
  '"anti patriarchy" tomatoe ceramic mug': ['vulva-la-revolution'],
  '"make love" tomatoe ceramic mug': ['vulva-la-revolution'],
  '"ready for the woke" tomatoe poster': ['posters-vulva-la-revolution'],
  '"make love not war" tomatoe poster': ['posters-vulva-la-revolution'],
  '"woke is the new sexy" tomatoe poster': ['posters-vulva-la-revolution'],
  '"make love not war" tomatoe ceramic mug': ['vulva-la-revolution'],
  '"anti patriarcat" fraise mug céramique': ['mugs-vulva-la-revolution-francais'],
  '"pas la guerre" fraise mug céramique': ['mugs-vulva-la-revolution-francais'],
  '"faites l\'amour" fraise mug céramique': ['mugs-vulva-la-revolution-francais'],
  '"vulva la révolution" fraise mug céramique': ['mugs-vulva-la-revolution-francais'],
  '"anti patriarchy" turnip ceramic mug': ['vulva-la-revolution'],
  '"prêts pour le woke" couple de navets poster': ['posters-vulva-la-revolution-francais'],
  '"vulva la révolution" navet mug céramique': ['mugs-vulva-la-revolution-francais'],
  '"anti patriarcat" navet mug céramique': ['mugs-vulva-la-revolution-francais'],
  '"anti patriarcat" navet poster': ['posters-vulva-la-revolution-francais'],
  '"prêts pour le woke" navet poster': ['posters-vulva-la-revolution-francais'],
  '"vulva la révolution" navet poster': ['posters-vulva-la-revolution-francais'],
  '"anti patriarcat" fraise poster': ['posters-vulva-la-revolution-francais'],
  '"faites l\'amour" fraise poster': ['posters-vulva-la-revolution-francais'],
  '"vulva la révolution" fraise poster': ['posters-vulva-la-revolution-francais'],
};

function normalizeTitle(title) {
  return (title || '')
    .toLowerCase()
    .replace(/\u2018|\u2019/g, "'")
    .replace(/\u201C|\u201D|\u00AB|\u00BB/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (user?.role !== 'admin') return Response.json({ error: 'Forbidden' }, { status: 403 });

    const body = await req.json().catch(() => ({}));
    const dryRun = body.dryRun || false;
    const startIndex = body.startIndex || 0;
    const batchSize = body.batchSize || 50;

    // Load all products (paginated)
    let allProducts = [];
    let page = 1;
    while (true) {
      const batch = await base44.asServiceRole.entities.Product.list('created_date', 200, (page - 1) * 200);
      allProducts.push(...batch);
      if (batch.length < 200) break;
      page++;
      await new Promise(r => setTimeout(r, 300));
    }

    console.log(`Total products loaded: ${allProducts.length}`);

    const productsBatch = allProducts.slice(startIndex, startIndex + batchSize);
    let matched = 0;
    let unmatched = [];
    let updated = 0;

    for (let i = 0; i < productsBatch.length; i++) {
      const product = productsBatch[i];
      if (i > 0 && i % 10 === 0) await new Promise(r => setTimeout(r, 400));

      const norm = normalizeTitle(product.title);
      const collections = TITLE_TO_COLLECTIONS[norm] || null;

      if (collections) {
        matched++;
        if (!dryRun) {
          // Preserve existing non-matching collections, add new ones
          const existingCollections = product.collections || [];
          const allCollections = [...new Set([...existingCollections, ...collections])];
          await base44.asServiceRole.entities.Product.update(product.id, {
            collections: allCollections,
          });
          updated++;
        }
      } else {
        unmatched.push({ title: product.title, norm });
      }
    }

    const nextIndex = startIndex + productsBatch.length;
    const hasMore = nextIndex < allProducts.length;

    return Response.json({
      success: true,
      total: allProducts.length,
      processed: productsBatch.length,
      startIndex,
      nextIndex: hasMore ? nextIndex : null,
      hasMore,
      matched,
      updated,
      dryRun,
      unmatched: unmatched.slice(0, 50),
    });
  } catch (error) {
    console.log('ERROR:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});