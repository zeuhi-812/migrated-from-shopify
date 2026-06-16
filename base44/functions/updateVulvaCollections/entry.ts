import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

// ============================================================
// COLLECTION DEFINITIONS
// Each entry: { titleFragment, collection, sortOrder, images }
// titleFragment is used to fuzzy-match product titles
// ============================================================

function normalize(str) {
  return (str || '')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/["""''«»]/g, '')
    .toLowerCase().replace(/\s+/g, ' ').trim();
}

function matches(productTitle, fragment) {
  const pt = normalize(productTitle);
  const frag = normalize(fragment);
  return pt.includes(frag);
}

// ============================================================
// MUG FR  (vulva-la-revolution-fr)
// ============================================================
const MUG_FR = [
  { title: '"Vulva la Révolution" Tomate Mug', col: 'vulva-la-revolution-fr', sort: 1,
    images: [
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/0b7ad430c_MugVulvalaRevolutionTurnip1Noir.jpg', color: 'black' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/5869963d1_MugVulvalaRevolutionTurnip1Vert.jpg', color: 'green' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/1006b44b7_MugVulvalaRevolutionTurnip1Rose.jpg', color: 'pink' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/13473ba2a_MugVulvalaRevolutionTurnip1Jaune.jpg', color: 'yellow' },
    ]
  },
  { title: '"Faites l\'Amour pas la Guerre" Tomate Mug', col: 'vulva-la-revolution-fr', sort: 2,
    images: [
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/0b7ad430c_MugVulvalaRevolutionTurnip1Noir.jpg', color: 'black' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/5869963d1_MugVulvalaRevolutionTurnip1Vert.jpg', color: 'green' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/1006b44b7_MugVulvalaRevolutionTurnip1Rose.jpg', color: 'pink' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/13473ba2a_MugVulvalaRevolutionTurnip1Jaune.jpg', color: 'yellow' },
    ]
  },
  { title: '"Vulva la Révolution" Carmen Fraise Mug', col: 'vulva-la-revolution-fr', sort: 3,
    images: [
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/db817ec21_MugVulvaRevolutionENCarmenRicoNoir1.jpg', color: 'black' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/7a7d54bad_MugVulvaRevolutionENCarmenRicoVert1.jpg', color: 'green' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/d4f1fe26f_MugVulvaRevolutionENCarmenRicoRose1.jpg', color: 'pink' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/b1da722af_MugVulvaRevolutionENCarmenRicoJaune1.jpg', color: 'yellow' },
    ]
  },
  { title: '"Vulva la Révolution" Shakira Fraise Mug', col: 'vulva-la-revolution-fr', sort: 4,
    images: [
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/db817ec21_MugVulvaRevolutionENCarmenRicoNoir1.jpg', color: 'black' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/7a7d54bad_MugVulvaRevolutionENCarmenRicoVert1.jpg', color: 'green' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/d4f1fe26f_MugVulvaRevolutionENCarmenRicoRose1.jpg', color: 'pink' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/b1da722af_MugVulvaRevolutionENCarmenRicoJaune1.jpg', color: 'yellow' },
    ]
  },
  { title: '"Faites l\'Amour pas la Guerre" Carmen and Tonio Fraise Mug', col: 'vulva-la-revolution-fr', sort: 5,
    images: [
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/8da955b3c_MakeLoveRicoTonioMugBlack1.jpg', color: 'black' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/f8c5718a7_MakeLoveRicoTonioMugGreen1.jpg', color: 'green' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/dae9b5819_MakeLoveRicoTonioMugRed1.jpg', color: 'red' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/ae0e2bc27_MakeLoveRicoTonioMugYellow1.jpg', color: 'yellow' },
    ]
  },
  { title: '"Faites l\'Amour pas la Guerre" Carmen and Shakira Fraise Mug', col: 'vulva-la-revolution-fr', sort: 6,
    images: [
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/e38c24dfd_MakeLoveCarmenShakiraMugBlack1.jpg', color: 'black' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/c9af5f312_MakeLoveCarmenShakiraMugGreen1.jpg', color: 'green' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/9b6c40017_MakeLoveCarmenShakiraMugRed1.jpg', color: 'red' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/e9c38236c_MakeLoveCarmenShakiraMugYellow1.jpg', color: 'yellow' },
    ]
  },
  { title: '"Faites l\'Amour pas la Guerre" Rico and Shakira Fraise Mug', col: 'vulva-la-revolution-fr', sort: 7,
    images: [
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/95a9f3e4b_MakeLoveRicoShakiraMugBlack1.jpg', color: 'black' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/6f2ce1ed1_MakeLoveRicoShakiraMugGreen1.jpg', color: 'green' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/cbf5de240_MakeLoveRicoShakiraMugRed1.jpg', color: 'red' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/6602c85b4_MakeLoveRicoShakiraMugYellow1.jpg', color: 'yellow' },
    ]
  },
  { title: '"Faites l\'Amour pas la Guerre" Rico and Tonio Fraise Mug', col: 'vulva-la-revolution-fr', sort: 8,
    images: [
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/8da955b3c_MakeLoveRicoTonioMugBlack1.jpg', color: 'black' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/f8c5718a7_MakeLoveRicoTonioMugGreen1.jpg', color: 'green' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/dae9b5819_MakeLoveRicoTonioMugRed1.jpg', color: 'red' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/ae0e2bc27_MakeLoveRicoTonioMugYellow1.jpg', color: 'yellow' },
    ]
  },
  { title: '"Faites l\'Amour pas la Guerre" Lola and Almarita Fraise Mug', col: 'vulva-la-revolution-fr', sort: 9,
    images: [
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/233f465eb_MakeLoveLolaAlmaritaMugBlack1.jpg', color: 'black' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/21ac91367_MakeLoveLolaAlmaritaMugGreen1.jpg', color: 'green' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/1b22eade5_MakeLoveLolaAlmaritaMugRed1.jpg', color: 'red' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/d21ddad11_MakeLoveLolaAlmaritaMugYellow1.jpg', color: 'yellow' },
    ]
  },
  { title: '"Nous étions des Graines" Mug', col: 'vulva-la-revolution-fr', sort: 10,
    images: [
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/13b5a5960_SeedMugPepperBlack1.jpg', color: 'black' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/e4edb7142_SeedMugPepperGreen1.jpg', color: 'green' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/99ac83b8e_SeedMugPepperRed1.jpg', color: 'red' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/a109fe85a_SeedMugPepperYellow1.jpg', color: 'yellow' },
    ]
  },
  { title: '"Vulva la Révolution" Navet Mug', col: 'vulva-la-revolution-fr', sort: 11,
    images: [
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/0b7ad430c_MugVulvalaRevolutionTurnip1Noir.jpg', color: 'black' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/5869963d1_MugVulvalaRevolutionTurnip1Vert.jpg', color: 'green' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/1006b44b7_MugVulvalaRevolutionTurnip1Rose.jpg', color: 'pink' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/13473ba2a_MugVulvalaRevolutionTurnip1Jaune.jpg', color: 'yellow' },
    ]
  },
  { title: '"Prêts pour le Woke" Navet Mug', col: 'vulva-la-revolution-fr', sort: 12,
    images: [
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/c1b2b664b_PretspourleWokeCoupleNavetMugNoir1.jpg', color: 'black' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/77f36adb7_PretspourleWokeCoupleNavetMugVert1.jpg', color: 'green' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/7fe8b1fe4_PretspourleWokeCoupleNavetMugRose1.jpg', color: 'pink' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/c3037e004_PretspourleWokeCoupleNavetMugJaune1.jpg', color: 'yellow' },
    ]
  },
];

// ============================================================
// MUG EN  (vulva-la-revolution)
// ============================================================
const MUG_EN = [
  { title: '"Vulva la Revolution" Tomatoe Mug', col: 'vulva-la-revolution', sort: 1 },
  { title: '"Make love not War" Tomatoe Mug', col: 'vulva-la-revolution', sort: 2 },
  { title: '"Vulva la Revolution" Carmen & Tonio Strawberry Mug', col: 'vulva-la-revolution', sort: 3,
    images: [
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/db817ec21_MugVulvaRevolutionENCarmenRicoNoir1.jpg', color: 'black' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/7a7d54bad_MugVulvaRevolutionENCarmenRicoVert1.jpg', color: 'green' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/d4f1fe26f_MugVulvaRevolutionENCarmenRicoRose1.jpg', color: 'pink' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/b1da722af_MugVulvaRevolutionENCarmenRicoJaune1.jpg', color: 'yellow' },
    ]
  },
  { title: '"Vulva la Revolution" Shakira & Rico Strawberry Mug', col: 'vulva-la-revolution', sort: 4,
    images: [
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/db817ec21_MugVulvaRevolutionENCarmenRicoNoir1.jpg', color: 'black' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/7a7d54bad_MugVulvaRevolutionENCarmenRicoVert1.jpg', color: 'green' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/d4f1fe26f_MugVulvaRevolutionENCarmenRicoRose1.jpg', color: 'pink' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/b1da722af_MugVulvaRevolutionENCarmenRicoJaune1.jpg', color: 'yellow' },
    ]
  },
  { title: '"Make love Not war" Carmen & Tonio Strawberry Mug', col: 'vulva-la-revolution', sort: 5,
    images: [
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/8da955b3c_MakeLoveRicoTonioMugBlack1.jpg', color: 'black' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/f8c5718a7_MakeLoveRicoTonioMugGreen1.jpg', color: 'green' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/dae9b5819_MakeLoveRicoTonioMugRed1.jpg', color: 'red' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/ae0e2bc27_MakeLoveRicoTonioMugYellow1.jpg', color: 'yellow' },
    ]
  },
  { title: '"Make love Not war" Shakira & Rico Strawberry Mug', col: 'vulva-la-revolution', sort: 6,
    images: [
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/95a9f3e4b_MakeLoveRicoShakiraMugBlack1.jpg', color: 'black' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/6f2ce1ed1_MakeLoveRicoShakiraMugGreen1.jpg', color: 'green' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/cbf5de240_MakeLoveRicoShakiraMugRed1.jpg', color: 'red' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/6602c85b4_MakeLoveRicoShakiraMugYellow1.jpg', color: 'yellow' },
    ]
  },
  { title: '"Make love Not war" Carmen & Shakira Strawberry Mug', col: 'vulva-la-revolution', sort: 7,
    images: [
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/e38c24dfd_MakeLoveCarmenShakiraMugBlack1.jpg', color: 'black' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/c9af5f312_MakeLoveCarmenShakiraMugGreen1.jpg', color: 'green' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/9b6c40017_MakeLoveCarmenShakiraMugRed1.jpg', color: 'red' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/e9c38236c_MakeLoveCarmenShakiraMugYellow1.jpg', color: 'yellow' },
    ]
  },
  { title: '"Make love Not war" Rico & Tonio Strawberry Mug', col: 'vulva-la-revolution', sort: 8,
    images: [
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/8da955b3c_MakeLoveRicoTonioMugBlack1.jpg', color: 'black' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/f8c5718a7_MakeLoveRicoTonioMugGreen1.jpg', color: 'green' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/dae9b5819_MakeLoveRicoTonioMugRed1.jpg', color: 'red' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/ae0e2bc27_MakeLoveRicoTonioMugYellow1.jpg', color: 'yellow' },
    ]
  },
  { title: '"Make love Not war" Lola & Almarita Strawberry Mug', col: 'vulva-la-revolution', sort: 9,
    images: [
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/233f465eb_MakeLoveLolaAlmaritaMugBlack1.jpg', color: 'black' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/21ac91367_MakeLoveLolaAlmaritaMugGreen1.jpg', color: 'green' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/1b22eade5_MakeLoveLolaAlmaritaMugRed1.jpg', color: 'red' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/d21ddad11_MakeLoveLolaAlmaritaMugYellow1.jpg', color: 'yellow' },
    ]
  },
  { title: '"They forgot we were seeds" Pepper Mug', col: 'vulva-la-revolution', sort: 10,
    images: [
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/13b5a5960_SeedMugPepperBlack1.jpg', color: 'black' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/e4edb7142_SeedMugPepperGreen1.jpg', color: 'green' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/99ac83b8e_SeedMugPepperRed1.jpg', color: 'red' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/a109fe85a_SeedMugPepperYellow1.jpg', color: 'yellow' },
    ]
  },
  { title: '"Vulva la Revolution" Turnip Couple Mug', col: 'vulva-la-revolution', sort: 11,
    images: [
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/7263f8eb0_ReadyfortheWokeTurnipCoupleMugBlack1.jpg', color: 'black' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/528f0eb5b_WokeTurnipCoupleMugGreen1.jpg', color: 'green' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/b18ef145e_WokeTurnipCoupleMugPink1.jpg', color: 'pink' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/39bd7ab34_WokeTurnipCoupleMugYellow1.jpg', color: 'yellow' },
    ]
  },
  { title: '"Vulva la Revolution" Turnip Mug', col: 'vulva-la-revolution', sort: 12,
    images: [
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/0b7ad430c_MugVulvalaRevolutionTurnip1Noir.jpg', color: 'black' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/5869963d1_MugVulvalaRevolutionTurnip1Vert.jpg', color: 'green' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/1006b44b7_MugVulvalaRevolutionTurnip1Rose.jpg', color: 'pink' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/13473ba2a_MugVulvalaRevolutionTurnip1Jaune.jpg', color: 'yellow' },
    ]
  },
  { title: '"Ready for the woke" Turnip Mug', col: 'vulva-la-revolution', sort: 13,
    images: [
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/7263f8eb0_ReadyfortheWokeTurnipCoupleMugBlack1.jpg', color: 'black' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/528f0eb5b_WokeTurnipCoupleMugGreen1.jpg', color: 'green' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/b18ef145e_WokeTurnipCoupleMugPink1.jpg', color: 'pink' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/39bd7ab34_WokeTurnipCoupleMugYellow1.jpg', color: 'yellow' },
    ]
  },
];

// ============================================================
// Matching logic
// ============================================================
// Keywords per target product to match against actual DB titles
const MATCH_RULES = [
  // MUG FR
  { keywords: ['vulva', 'tomate', 'mug', 'céramique'], notKeywords: ['fraise', 'navet', 'turnip', 'graines', 'woke', 'amour', 'guerre', 'niçoise', 'shakira', 'carmen', 'prêts'], col: 'vulva-la-revolution-fr', sort: 1 },
  { keywords: ['faites', 'amour', 'tomate', 'mug'], notKeywords: ['fraise', 'navet'], col: 'vulva-la-revolution-fr', sort: 2 },
  { keywords: ['vulva', 'carmen', 'fraise', 'mug'], col: 'vulva-la-revolution-fr', sort: 3,
    images: [
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/db817ec21_MugVulvaRevolutionENCarmenRicoNoir1.jpg', color: 'black' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/7a7d54bad_MugVulvaRevolutionENCarmenRicoVert1.jpg', color: 'green' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/d4f1fe26f_MugVulvaRevolutionENCarmenRicoRose1.jpg', color: 'pink' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/b1da722af_MugVulvaRevolutionENCarmenRicoJaune1.jpg', color: 'yellow' },
    ]
  },
  { keywords: ['vulva', 'shakira', 'fraise', 'mug'], col: 'vulva-la-revolution-fr', sort: 4,
    images: [
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/db817ec21_MugVulvaRevolutionENCarmenRicoNoir1.jpg', color: 'black' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/7a7d54bad_MugVulvaRevolutionENCarmenRicoVert1.jpg', color: 'green' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/d4f1fe26f_MugVulvaRevolutionENCarmenRicoRose1.jpg', color: 'pink' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/b1da722af_MugVulvaRevolutionENCarmenRicoJaune1.jpg', color: 'yellow' },
    ]
  },
  { keywords: ['faites', 'amour', 'carmen', 'tonio', 'fraise', 'mug'], col: 'vulva-la-revolution-fr', sort: 5,
    images: [
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/8da955b3c_MakeLoveRicoTonioMugBlack1.jpg', color: 'black' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/f8c5718a7_MakeLoveRicoTonioMugGreen1.jpg', color: 'green' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/dae9b5819_MakeLoveRicoTonioMugRed1.jpg', color: 'red' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/ae0e2bc27_MakeLoveRicoTonioMugYellow1.jpg', color: 'yellow' },
    ]
  },
  { keywords: ['faites', 'amour', 'carmen', 'shakira', 'fraise', 'mug'], col: 'vulva-la-revolution-fr', sort: 6,
    images: [
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/e38c24dfd_MakeLoveCarmenShakiraMugBlack1.jpg', color: 'black' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/c9af5f312_MakeLoveCarmenShakiraMugGreen1.jpg', color: 'green' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/9b6c40017_MakeLoveCarmenShakiraMugRed1.jpg', color: 'red' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/e9c38236c_MakeLoveCarmenShakiraMugYellow1.jpg', color: 'yellow' },
    ]
  },
  { keywords: ['faites', 'amour', 'rico', 'shakira', 'fraise', 'mug'], col: 'vulva-la-revolution-fr', sort: 7,
    images: [
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/95a9f3e4b_MakeLoveRicoShakiraMugBlack1.jpg', color: 'black' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/6f2ce1ed1_MakeLoveRicoShakiraMugGreen1.jpg', color: 'green' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/cbf5de240_MakeLoveRicoShakiraMugRed1.jpg', color: 'red' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/6602c85b4_MakeLoveRicoShakiraMugYellow1.jpg', color: 'yellow' },
    ]
  },
  { keywords: ['faites', 'amour', 'rico', 'tonio', 'fraise', 'mug'], col: 'vulva-la-revolution-fr', sort: 8,
    images: [
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/8da955b3c_MakeLoveRicoTonioMugBlack1.jpg', color: 'black' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/f8c5718a7_MakeLoveRicoTonioMugGreen1.jpg', color: 'green' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/dae9b5819_MakeLoveRicoTonioMugRed1.jpg', color: 'red' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/ae0e2bc27_MakeLoveRicoTonioMugYellow1.jpg', color: 'yellow' },
    ]
  },
  { keywords: ['faites', 'amour', 'lola', 'almarita', 'fraise', 'mug'], col: 'vulva-la-revolution-fr', sort: 9,
    images: [
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/233f465eb_MakeLoveLolaAlmaritaMugBlack1.jpg', color: 'black' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/21ac91367_MakeLoveLolaAlmaritaMugGreen1.jpg', color: 'green' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/1b22eade5_MakeLoveLolaAlmaritaMugRed1.jpg', color: 'red' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/d21ddad11_MakeLoveLolaAlmaritaMugYellow1.jpg', color: 'yellow' },
    ]
  },
  { keywords: ['graines', 'mug'], notKeywords: ['poster'], col: 'vulva-la-revolution-fr', sort: 10,
    images: [
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/13b5a5960_SeedMugPepperBlack1.jpg', color: 'black' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/e4edb7142_SeedMugPepperGreen1.jpg', color: 'green' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/99ac83b8e_SeedMugPepperRed1.jpg', color: 'red' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/a109fe85a_SeedMugPepperYellow1.jpg', color: 'yellow' },
    ]
  },
  { keywords: ['vulva', 'navet', 'mug', 'céramique'], notKeywords: ['couple', 'prêts'], col: 'vulva-la-revolution-fr', sort: 11,
    images: [
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/0b7ad430c_MugVulvalaRevolutionTurnip1Noir.jpg', color: 'black' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/5869963d1_MugVulvalaRevolutionTurnip1Vert.jpg', color: 'green' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/1006b44b7_MugVulvalaRevolutionTurnip1Rose.jpg', color: 'pink' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/13473ba2a_MugVulvalaRevolutionTurnip1Jaune.jpg', color: 'yellow' },
    ]
  },
  { keywords: ['prêts', 'woke', 'navet', 'mug'], col: 'vulva-la-revolution-fr', sort: 12,
    images: [
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/c1b2b664b_PretspourleWokeCoupleNavetMugNoir1.jpg', color: 'black' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/77f36adb7_PretspourleWokeCoupleNavetMugVert1.jpg', color: 'green' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/7fe8b1fe4_PretspourleWokeCoupleNavetMugRose1.jpg', color: 'pink' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/c3037e004_PretspourleWokeCoupleNavetMugJaune1.jpg', color: 'yellow' },
    ]
  },

  // MUG EN
  { keywords: ['vulva', 'tomatoe', 'mug'], notKeywords: ['fraise', 'turnip', 'seeds', 'woke', 'carmen', 'shakira'], col: 'vulva-la-revolution', sort: 1 },
  { keywords: ['make love', 'tomatoe', 'mug'], col: 'vulva-la-revolution', sort: 2 },
  { keywords: ['vulva', 'carmen', 'tonio', 'strawberry', 'mug'], col: 'vulva-la-revolution', sort: 3,
    images: [
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/db817ec21_MugVulvaRevolutionENCarmenRicoNoir1.jpg', color: 'black' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/7a7d54bad_MugVulvaRevolutionENCarmenRicoVert1.jpg', color: 'green' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/d4f1fe26f_MugVulvaRevolutionENCarmenRicoRose1.jpg', color: 'pink' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/b1da722af_MugVulvaRevolutionENCarmenRicoJaune1.jpg', color: 'yellow' },
    ]
  },
  { keywords: ['vulva', 'shakira', 'rico', 'strawberry', 'mug'], col: 'vulva-la-revolution', sort: 4,
    images: [
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/db817ec21_MugVulvaRevolutionENCarmenRicoNoir1.jpg', color: 'black' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/7a7d54bad_MugVulvaRevolutionENCarmenRicoVert1.jpg', color: 'green' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/d4f1fe26f_MugVulvaRevolutionENCarmenRicoRose1.jpg', color: 'pink' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/b1da722af_MugVulvaRevolutionENCarmenRicoJaune1.jpg', color: 'yellow' },
    ]
  },
  { keywords: ['make love', 'carmen', 'tonio', 'strawberry', 'mug'], col: 'vulva-la-revolution', sort: 5,
    images: [
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/8da955b3c_MakeLoveRicoTonioMugBlack1.jpg', color: 'black' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/f8c5718a7_MakeLoveRicoTonioMugGreen1.jpg', color: 'green' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/dae9b5819_MakeLoveRicoTonioMugRed1.jpg', color: 'red' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/ae0e2bc27_MakeLoveRicoTonioMugYellow1.jpg', color: 'yellow' },
    ]
  },
  { keywords: ['make love', 'shakira', 'rico', 'strawberry', 'mug'], col: 'vulva-la-revolution', sort: 6,
    images: [
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/95a9f3e4b_MakeLoveRicoShakiraMugBlack1.jpg', color: 'black' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/6f2ce1ed1_MakeLoveRicoShakiraMugGreen1.jpg', color: 'green' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/cbf5de240_MakeLoveRicoShakiraMugRed1.jpg', color: 'red' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/6602c85b4_MakeLoveRicoShakiraMugYellow1.jpg', color: 'yellow' },
    ]
  },
  { keywords: ['make love', 'carmen', 'shakira', 'strawberry', 'mug'], col: 'vulva-la-revolution', sort: 7,
    images: [
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/e38c24dfd_MakeLoveCarmenShakiraMugBlack1.jpg', color: 'black' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/c9af5f312_MakeLoveCarmenShakiraMugGreen1.jpg', color: 'green' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/9b6c40017_MakeLoveCarmenShakiraMugRed1.jpg', color: 'red' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/e9c38236c_MakeLoveCarmenShakiraMugYellow1.jpg', color: 'yellow' },
    ]
  },
  { keywords: ['make love', 'rico', 'tonio', 'strawberry', 'mug'], col: 'vulva-la-revolution', sort: 8,
    images: [
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/8da955b3c_MakeLoveRicoTonioMugBlack1.jpg', color: 'black' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/f8c5718a7_MakeLoveRicoTonioMugGreen1.jpg', color: 'green' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/dae9b5819_MakeLoveRicoTonioMugRed1.jpg', color: 'red' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/ae0e2bc27_MakeLoveRicoTonioMugYellow1.jpg', color: 'yellow' },
    ]
  },
  { keywords: ['make love', 'lola', 'almarita', 'strawberry', 'mug'], col: 'vulva-la-revolution', sort: 9,
    images: [
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/233f465eb_MakeLoveLolaAlmaritaMugBlack1.jpg', color: 'black' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/21ac91367_MakeLoveLolaAlmaritaMugGreen1.jpg', color: 'green' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/1b22eade5_MakeLoveLolaAlmaritaMugRed1.jpg', color: 'red' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/d21ddad11_MakeLoveLolaAlmaritaMugYellow1.jpg', color: 'yellow' },
    ]
  },
  { keywords: ['seeds', 'pepper', 'mug'], notKeywords: ['poster'], col: 'vulva-la-revolution', sort: 10,
    images: [
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/13b5a5960_SeedMugPepperBlack1.jpg', color: 'black' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/e4edb7142_SeedMugPepperGreen1.jpg', color: 'green' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/99ac83b8e_SeedMugPepperRed1.jpg', color: 'red' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/a109fe85a_SeedMugPepperYellow1.jpg', color: 'yellow' },
    ]
  },
  { keywords: ['vulva', 'turnip', 'couple', 'mug'], col: 'vulva-la-revolution', sort: 11,
    images: [
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/7263f8eb0_ReadyfortheWokeTurnipCoupleMugBlack1.jpg', color: 'black' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/528f0eb5b_WokeTurnipCoupleMugGreen1.jpg', color: 'green' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/b18ef145e_WokeTurnipCoupleMugPink1.jpg', color: 'pink' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/39bd7ab34_WokeTurnipCoupleMugYellow1.jpg', color: 'yellow' },
    ]
  },
  { keywords: ['vulva', 'turnip', 'mug'], notKeywords: ['couple', 'ready', 'woke'], col: 'vulva-la-revolution', sort: 12,
    images: [
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/0b7ad430c_MugVulvalaRevolutionTurnip1Noir.jpg', color: 'black' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/5869963d1_MugVulvalaRevolutionTurnip1Vert.jpg', color: 'green' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/1006b44b7_MugVulvalaRevolutionTurnip1Rose.jpg', color: 'pink' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/13473ba2a_MugVulvalaRevolutionTurnip1Jaune.jpg', color: 'yellow' },
    ]
  },
  { keywords: ['ready', 'woke', 'turnip', 'mug'], col: 'vulva-la-revolution', sort: 13,
    images: [
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/7263f8eb0_ReadyfortheWokeTurnipCoupleMugBlack1.jpg', color: 'black' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/528f0eb5b_WokeTurnipCoupleMugGreen1.jpg', color: 'green' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/b18ef145e_WokeTurnipCoupleMugPink1.jpg', color: 'pink' },
      { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/39bd7ab34_WokeTurnipCoupleMugYellow1.jpg', color: 'yellow' },
    ]
  },

  // POSTER FR rules (posters-vulva-la-revolution-fr) - sort by order given
  { keywords: ['vulva', 'tomate', 'poster'], notKeywords: ['navet', 'fraise', 'turnip', 'couple'], col: 'posters-vulva-la-revolution-fr', sort: 1 },
  { keywords: ['anti patriarcat', 'tomate', 'poster'], col: 'posters-vulva-la-revolution-fr', sort: 2 },
  { keywords: ['toustes ensemble', 'tomate', 'poster'], col: 'posters-vulva-la-revolution-fr', sort: 3 },
  { keywords: ['faites', 'amour', 'tomate', 'poster'], col: 'posters-vulva-la-revolution-fr', sort: 4 },
  { keywords: ['prêts pour le woke', 'tomate', 'poster'], col: 'posters-vulva-la-revolution-fr', sort: 5 },
  { keywords: ['misandrie', 'misoginie', 'tomate', 'poster'], col: 'posters-vulva-la-revolution-fr', sort: 6 },
  { keywords: ['vulva', 'carmen', 'fraise', 'poster'], col: 'posters-vulva-la-revolution-fr', sort: 7 },
  { keywords: ['anti patriarcat', 'tonio', 'fraise', 'poster'], col: 'posters-vulva-la-revolution-fr', sort: 8 },
  { keywords: ['vulva', 'shakira', 'fraise', 'poster'], col: 'posters-vulva-la-revolution-fr', sort: 9 },
  { keywords: ['anti patriarcat', 'rico', 'fraise', 'poster'], col: 'posters-vulva-la-revolution-fr', sort: 10 },
  { keywords: ['faites', 'amour', 'carmen', 'fraise', 'poster'], notKeywords: ['tonio', 'shakira', 'rico', 'lola', 'almarita'], col: 'posters-vulva-la-revolution-fr', sort: 11 },
  { keywords: ['pas la guerre', 'tonio', 'fraise', 'poster'], col: 'posters-vulva-la-revolution-fr', sort: 12 },
  { keywords: ['faites', 'amour', 'rico', 'fraise', 'poster'], notKeywords: ['shakira', 'tonio'], col: 'posters-vulva-la-revolution-fr', sort: 13 },
  { keywords: ['pas la guerre', 'shakira', 'fraise', 'poster'], col: 'posters-vulva-la-revolution-fr', sort: 14 },
  { keywords: ['faites', 'amour', 'lola', 'fraise', 'poster'], notKeywords: ['almarita'], col: 'posters-vulva-la-revolution-fr', sort: 15 },
  { keywords: ['pas la guerre', 'almarita', 'fraise', 'poster'], col: 'posters-vulva-la-revolution-fr', sort: 16 },
  { keywords: ['toustes ensemble', 'fraise', 'poster'], col: 'posters-vulva-la-revolution-fr', sort: 17 },
  { keywords: ['faites', 'amour', 'carmen', 'tonio', 'fraise', 'poster'], col: 'posters-vulva-la-revolution-fr', sort: 18 },
  { keywords: ['faites', 'amour', 'rico', 'shakira', 'fraise', 'poster'], col: 'posters-vulva-la-revolution-fr', sort: 19 },
  { keywords: ['faites', 'amour', 'lola', 'almarita', 'fraise', 'poster'], col: 'posters-vulva-la-revolution-fr', sort: 20 },
  { keywords: ['prêts', 'woke', 'poivron', 'courgette', 'poster'], col: 'posters-vulva-la-revolution-fr', sort: 21 },
  { keywords: ['graines', 'poster'], notKeywords: ['mug'], col: 'posters-vulva-la-revolution-fr', sort: 22 },
  { keywords: ['brisé la boîte', 'poster'], col: 'posters-vulva-la-revolution-fr', sort: 23 },
  { keywords: ['ci vis pacem', 'poster'], notKeywords: ['mug', 'en'], col: 'posters-vulva-la-revolution-fr', sort: 24 },
  { keywords: ['enc', 'poster'], notKeywords: ['mug'], col: 'posters-vulva-la-revolution-fr', sort: 25 },
  { keywords: ['carotter', 'poster'], col: 'posters-vulva-la-revolution-fr', sort: 26 },
  { keywords: ['vulva', 'navet', 'couple', 'poster'], col: 'posters-vulva-la-revolution-fr', sort: 27 },
  { keywords: ['vulva', 'navet', 'poster'], notKeywords: ['couple', 'prêts', 'anti'], col: 'posters-vulva-la-revolution-fr', sort: 28 },
  { keywords: ['anti patriarcat', 'navet', 'poster'], col: 'posters-vulva-la-revolution-fr', sort: 29 },
  { keywords: ['prêts', 'woke', 'navet', 'poster'], col: 'posters-vulva-la-revolution-fr', sort: 30 },

  // POSTER EN (posters-vulva-la-revolution)
  { keywords: ['vulva', 'tomatoe', 'poster'], notKeywords: ['turnip', 'strawberr', 'couple'], col: 'posters-vulva-la-revolution', sort: 1 },
  { keywords: ['anti patriarchy', 'tomatoe', 'poster'], col: 'posters-vulva-la-revolution', sort: 2 },
  { keywords: ['woke is the new sexy', 'poster'], col: 'posters-vulva-la-revolution', sort: 3 },
  { keywords: ['ready for the woke', 'tomatoe', 'poster'], col: 'posters-vulva-la-revolution', sort: 4 },
  { keywords: ['vulva', 'carmen', 'strawberry', 'poster'], col: 'posters-vulva-la-revolution', sort: 5 },
  { keywords: ['anti patriarchy', 'tonio', 'strawberry', 'poster'], col: 'posters-vulva-la-revolution', sort: 6 },
  { keywords: ['vulva', 'shakira', 'strawberry', 'poster'], col: 'posters-vulva-la-revolution', sort: 7 },
  { keywords: ['anti patriarchy', 'rico', 'strawberry', 'poster'], col: 'posters-vulva-la-revolution', sort: 8 },
  { keywords: ['make love', 'carmen', 'strawberry', 'poster'], notKeywords: ['tonio', 'shakira', 'rico', 'lola', 'almarita'], col: 'posters-vulva-la-revolution', sort: 9 },
  { keywords: ['not war', 'tonio', 'strawberry', 'poster'], col: 'posters-vulva-la-revolution', sort: 10 },
  { keywords: ['make love', 'rico', 'strawberry', 'poster'], notKeywords: ['shakira', 'tonio'], col: 'posters-vulva-la-revolution', sort: 11 },
  { keywords: ['not war', 'shakira', 'strawberry', 'poster'], col: 'posters-vulva-la-revolution', sort: 12 },
  { keywords: ['make love', 'lola', 'strawberry', 'poster'], notKeywords: ['almarita'], col: 'posters-vulva-la-revolution', sort: 13 },
  { keywords: ['not war', 'almarita', 'strawberry', 'poster'], col: 'posters-vulva-la-revolution', sort: 14 },
  { keywords: ['all together', 'strawberry', 'poster'], col: 'posters-vulva-la-revolution', sort: 15 },
  { keywords: ['peace and love', 'carmen', 'tonio', 'strawberry', 'poster'], col: 'posters-vulva-la-revolution', sort: 16 },
  { keywords: ['peace and love', 'rico', 'shakira', 'strawberry', 'poster'], col: 'posters-vulva-la-revolution', sort: 17 },
  { keywords: ['peace and love', 'lola', 'almarita', 'strawberry', 'poster'], col: 'posters-vulva-la-revolution', sort: 18 },
  { keywords: ['ready', 'woke', 'pepper', 'zucchini', 'poster'], col: 'posters-vulva-la-revolution', sort: 19 },
  { keywords: ['seeds', 'pepper', 'poster'], notKeywords: ['mug'], col: 'posters-vulva-la-revolution', sort: 20 },
  { keywords: ['broke', 'pepper', 'poster'], col: 'posters-vulva-la-revolution', sort: 21 },
  { keywords: ['ci vis pacem', 'poster'], notKeywords: ['fr'], col: 'posters-vulva-la-revolution', sort: 22 },
  { keywords: ['motherfucker', 'poster'], col: 'posters-vulva-la-revolution', sort: 23 },
  { keywords: ['carrot', 'poster'], notKeywords: ['mug'], col: 'posters-vulva-la-revolution', sort: 24 },
  { keywords: ['vulva', 'turnip', 'couple', 'poster'], col: 'posters-vulva-la-revolution', sort: 25 },
  { keywords: ['vulva', 'turnip', 'poster'], notKeywords: ['couple', 'ready', 'anti', 'woke'], col: 'posters-vulva-la-revolution', sort: 26 },
  { keywords: ['anti patriarchy', 'turnip', 'poster'], col: 'posters-vulva-la-revolution', sort: 27 },
  { keywords: ['ready', 'woke', 'turnip', 'poster'], col: 'posters-vulva-la-revolution', sort: 28 },
];

const TARGET_COLLECTIONS = new Set(['vulva-la-revolution-fr', 'vulva-la-revolution', 'posters-vulva-la-revolution-fr', 'posters-vulva-la-revolution']);

function productMatchesRule(productTitle, rule) {
  const pt = normalize(productTitle);
  for (const kw of rule.keywords) {
    if (!pt.includes(normalize(kw))) return false;
  }
  if (rule.notKeywords) {
    for (const nkw of rule.notKeywords) {
      if (pt.includes(normalize(nkw))) return false;
    }
  }
  return true;
}

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  const user = await base44.auth.me();
  if (user?.role !== 'admin') {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }

  const allProducts = await base44.asServiceRole.entities.Product.list('created_date', 500);
  
  const updated = [];
  const skipped = [];
  const matched = new Set();

  for (const product of allProducts) {
    const currentCols = product.collections || [];
    const hasVulvaCols = currentCols.some(c => TARGET_COLLECTIONS.has(c));
    
    // Find matching rule
    let bestRule = null;
    for (const rule of MATCH_RULES) {
      if (productMatchesRule(product.title, rule)) {
        bestRule = rule;
        break;
      }
    }

    if (!bestRule) {
      // If product currently has a Vulva collection but no rule matches, keep it as is
      continue;
    }

    // Remove old vulva collections, add the correct one
    const otherCols = currentCols.filter(c => !TARGET_COLLECTIONS.has(c));
    const newCols = [...otherCols, bestRule.col];
    
    const updateData = {
      ...product,
      collections: newCols,
      sortOrder: bestRule.sort,
    };
    
    if (bestRule.images) {
      updateData.images = bestRule.images;
    }

    await base44.asServiceRole.entities.Product.update(product.id, updateData);
    updated.push(`${bestRule.sort} | ${product.title} → ${bestRule.col}`);
    matched.add(product.id);
    
    // Small delay to avoid rate limits
    await new Promise(r => setTimeout(r, 300));
  }

  return Response.json({ success: true, updatedCount: updated.length, updated });
});