import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

// ============================================================
// IMAGE CATALOG - organized by scene, sorted by color (yellow→green→red/pink→black)
// Within each color: product shots (1,2) first, lifestyle (3,4,5) after
// ============================================================

function sceneImages(name) {
  // Each function returns correctly ordered images for that scene
  switch(name) {
    // ===== NAVET / TURNIP =====
    case 'navet_vulva_solo':
      return [
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/13473ba2a_MugVulvalaRevolutionTurnip1Jaune.jpg', color: 'yellow' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/5869963d1_MugVulvalaRevolutionTurnip1Vert.jpg', color: 'green' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/1006b44b7_MugVulvalaRevolutionTurnip1Rose.jpg', color: 'pink' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/0b7ad430c_MugVulvalaRevolutionTurnip1Noir.jpg', color: 'black' },
      ];
    case 'navet_vulva_couple':
      return [
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/39bd7ab34_WokeTurnipCoupleMugYellow1.jpg', color: 'yellow' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/528f0eb5b_WokeTurnipCoupleMugGreen1.jpg', color: 'green' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/b18ef145e_WokeTurnipCoupleMugPink1.jpg', color: 'pink' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/7263f8eb0_ReadyfortheWokeTurnipCoupleMugBlack1.jpg', color: 'black' },
      ];
    case 'navet_woke_fr':
      return [
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/c3037e004_PretspourleWokeCoupleNavetMugJaune1.jpg', color: 'yellow' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/77f36adb7_PretspourleWokeCoupleNavetMugVert1.jpg', color: 'green' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/7fe8b1fe4_PretspourleWokeCoupleNavetMugRose1.jpg', color: 'pink' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/c1b2b664b_PretspourleWokeCoupleNavetMugNoir1.jpg', color: 'black' },
      ];
    case 'navet_woke_en':
      return [
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/39bd7ab34_WokeTurnipCoupleMugYellow1.jpg', color: 'yellow' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/528f0eb5b_WokeTurnipCoupleMugGreen1.jpg', color: 'green' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/b18ef145e_WokeTurnipCoupleMugPink1.jpg', color: 'pink' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/7263f8eb0_ReadyfortheWokeTurnipCoupleMugBlack1.jpg', color: 'black' },
      ];

    // ===== TOMATE / TOMATOE =====
    case 'tomate_vulva':
      return [
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/7909fef31_MugRevolutionTomatoeYellow1.jpg', color: 'yellow' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/d9a213daf_MugRevolutionTomatoeYellow2.jpg', color: 'yellow' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/44ebe0422_MugRevolutionTomatoeYellow3.jpg', color: 'yellow' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/482762a7e_MugRevolutionTomatoeGreen1.jpg', color: 'green' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/2bd636cbc_MugRevolutionTomatoeGreen2.jpg', color: 'green' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/f303a4a46_MugRevolutionTomatoeGreen4.jpg', color: 'green' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/f058acdb8_MugRevolutionTomatoeRed1.jpg', color: 'red' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/f4d1f3406_MugRevolutionTomatoeRed2.jpg', color: 'red' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/086271ad8_MugRevolutionTomatoeRed5.jpg', color: 'red' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/95324bdfe_MugRevolutionTomatoeBlack1.jpg', color: 'black' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/06901e827_MugRevolutionTomatoeBlack2.jpg', color: 'black' },
      ];
    case 'tomate_amour':
      return [
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/441e400a6_MugMakeLoveTomatoeYellow1.jpg', color: 'yellow' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/5711356f1_MugMakeLoveTomatoeYellow2.jpg', color: 'yellow' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/f11d3cd8e_MugMakeLoveTomatoeYellow3.jpg', color: 'yellow' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/75e4df380_MugMakeLoveTomatoeGreen1.jpg', color: 'green' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/fd61bad41_MugMakeLoveTomatoeGreen2.jpg', color: 'green' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/5129f4f5f_MugMakeLoveTomatoeGreen4.jpg', color: 'green' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/95e6ea1ca_MugMakeLoveTomatoeRed1.jpg', color: 'red' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/a043cfca0_MugMakeLoveTomatoeRed2.jpg', color: 'red' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/11f177af2_MugMakeLoveTomatoeRed5.jpg', color: 'red' },
      ];

    // ===== FRAISE / STRAWBERRY - Vulva =====
    case 'fraise_vulva_couple':
      return [
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/b1da722af_MugVulvaRevolutionENCarmenRicoJaune1.jpg', color: 'yellow' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/7a7d54bad_MugVulvaRevolutionENCarmenRicoVert1.jpg', color: 'green' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/d4f1fe26f_MugVulvaRevolutionENCarmenRicoRose1.jpg', color: 'pink' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/db817ec21_MugVulvaRevolutionENCarmenRicoNoir1.jpg', color: 'black' },
      ];

    // ===== FRAISE / STRAWBERRY - Amour/Make Love =====
    case 'fraise_amour_rico_tonio':
      return [
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/ae0e2bc27_MakeLoveRicoTonioMugYellow1.jpg', color: 'yellow' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/f8c5718a7_MakeLoveRicoTonioMugGreen1.jpg', color: 'green' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/dae9b5819_MakeLoveRicoTonioMugRed1.jpg', color: 'red' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/8da955b3c_MakeLoveRicoTonioMugBlack1.jpg', color: 'black' },
      ];
    case 'fraise_amour_carmen_shakira':
      return [
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/e9c38236c_MakeLoveCarmenShakiraMugYellow1.jpg', color: 'yellow' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/c9af5f312_MakeLoveCarmenShakiraMugGreen1.jpg', color: 'green' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/9b6c40017_MakeLoveCarmenShakiraMugRed1.jpg', color: 'red' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/e38c24dfd_MakeLoveCarmenShakiraMugBlack1.jpg', color: 'black' },
      ];
    case 'fraise_amour_rico_shakira':
      return [
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/6602c85b4_MakeLoveRicoShakiraMugYellow1.jpg', color: 'yellow' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/6f2ce1ed1_MakeLoveRicoShakiraMugGreen1.jpg', color: 'green' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/cbf5de240_MakeLoveRicoShakiraMugRed1.jpg', color: 'red' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/95a9f3e4b_MakeLoveRicoShakiraMugBlack1.jpg', color: 'black' },
      ];
    case 'fraise_amour_lola_almarita':
      return [
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/d21ddad11_MakeLoveLolaAlmaritaMugYellow1.jpg', color: 'yellow' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/21ac91367_MakeLoveLolaAlmaritaMugGreen1.jpg', color: 'green' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/1b22eade5_MakeLoveLolaAlmaritaMugRed1.jpg', color: 'red' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/233f465eb_MakeLoveLolaAlmaritaMugBlack1.jpg', color: 'black' },
      ];

    // ===== GRAINES / SEEDS =====
    case 'graines':
      return [
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/a109fe85a_SeedMugPepperYellow1.jpg', color: 'yellow' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/e4edb7142_SeedMugPepperGreen1.jpg', color: 'green' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/99ac83b8e_SeedMugPepperRed1.jpg', color: 'red' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/13b5a5960_SeedMugPepperBlack1.jpg', color: 'black' },
      ];

    default: return [];
  }
}

// ============================================================
// PRODUCT MATCHING RULES
// Each rule: { keywords, notKeywords, collection, sortOrder, sceneKey }
// sceneKey determines which images to assign
// ============================================================

function normalize(str) {
  return (str || '')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/["""''«»]/g, '')
    .toLowerCase().replace(/\s+/g, ' ').trim();
}

function matches(productTitle, rule) {
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

const MATCH_RULES = [
  // ===== MUG FR (vulva-la-revolution-fr) =====
  { keywords: ['vulva', 'tomate', 'mug'], notKeywords: ['fraise', 'navet', 'turnip', 'graines', 'woke', 'amour', 'guerre', 'shakira', 'carmen', 'prêts', 'niçoise'], col: 'vulva-la-revolution-fr', sort: 1, scene: 'tomate_vulva' },
  { keywords: ['faites', 'amour', 'tomate', 'mug'], notKeywords: ['fraise', 'navet', 'niçoise'], col: 'vulva-la-revolution-fr', sort: 2, scene: 'tomate_amour' },
  { keywords: ['vulva', 'carmen', 'fraise', 'mug'], notKeywords: ['amour', 'faites', 'shakira', 'rico'], col: 'vulva-la-revolution-fr', sort: 3, scene: 'fraise_vulva_couple' },
  { keywords: ['vulva', 'shakira', 'fraise', 'mug'], col: 'vulva-la-revolution-fr', sort: 4, scene: 'fraise_vulva_couple' },
  { keywords: ['faites', 'amour', 'carmen', 'tonio', 'fraise', 'mug'], col: 'vulva-la-revolution-fr', sort: 5, scene: 'fraise_amour_rico_tonio' },
  { keywords: ['faites', 'amour', 'carmen', 'shakira', 'fraise', 'mug'], col: 'vulva-la-revolution-fr', sort: 6, scene: 'fraise_amour_carmen_shakira' },
  { keywords: ['faites', 'amour', 'rico', 'shakira', 'fraise', 'mug'], col: 'vulva-la-revolution-fr', sort: 7, scene: 'fraise_amour_rico_shakira' },
  { keywords: ['faites', 'amour', 'rico', 'tonio', 'fraise', 'mug'], col: 'vulva-la-revolution-fr', sort: 8, scene: 'fraise_amour_rico_tonio' },
  { keywords: ['faites', 'amour', 'lola', 'almarita', 'fraise', 'mug'], col: 'vulva-la-revolution-fr', sort: 9, scene: 'fraise_amour_lola_almarita' },
  { keywords: ['graines', 'mug'], notKeywords: ['poster'], col: 'vulva-la-revolution-fr', sort: 10, scene: 'graines' },
  { keywords: ['vulva', 'navet', 'mug'], notKeywords: ['couple', 'prêts'], col: 'vulva-la-revolution-fr', sort: 11, scene: 'navet_vulva_solo' },
  { keywords: ['prêts', 'woke', 'navet', 'mug'], col: 'vulva-la-revolution-fr', sort: 12, scene: 'navet_woke_fr' },

  // ===== MUG EN (vulva-la-revolution) =====
  { keywords: ['vulva', 'tomatoe', 'mug'], notKeywords: ['strawberr', 'turnip', 'seeds', 'woke', 'carmen', 'shakira'], col: 'vulva-la-revolution', sort: 1, scene: 'tomate_vulva' },
  { keywords: ['make love', 'tomatoe', 'mug'], col: 'vulva-la-revolution', sort: 2, scene: 'tomate_amour' },
  { keywords: ['vulva', 'carmen', 'tonio', 'strawberry', 'mug'], col: 'vulva-la-revolution', sort: 3, scene: 'fraise_vulva_couple' },
  { keywords: ['vulva', 'shakira', 'rico', 'strawberry', 'mug'], col: 'vulva-la-revolution', sort: 4, scene: 'fraise_vulva_couple' },
  { keywords: ['make love', 'carmen', 'tonio', 'strawberry', 'mug'], col: 'vulva-la-revolution', sort: 5, scene: 'fraise_amour_rico_tonio' },
  { keywords: ['make love', 'rico', 'shakira', 'strawberry', 'mug'], notKeywords: ['poster'], col: 'vulva-la-revolution', sort: 6, scene: 'fraise_amour_rico_shakira' },
  { keywords: ['make love', 'carmen', 'shakira', 'strawberry', 'mug'], col: 'vulva-la-revolution', sort: 7, scene: 'fraise_amour_carmen_shakira' },
  { keywords: ['make love', 'rico', 'tonio', 'strawberry', 'mug'], col: 'vulva-la-revolution', sort: 8, scene: 'fraise_amour_rico_tonio' },
  { keywords: ['make love', 'lola', 'almarita', 'strawberry', 'mug'], col: 'vulva-la-revolution', sort: 9, scene: 'fraise_amour_lola_almarita' },
  { keywords: ['seeds', 'pepper', 'mug'], notKeywords: ['poster'], col: 'vulva-la-revolution', sort: 10, scene: 'graines' },
  { keywords: ['vulva', 'turnip', 'couple', 'mug'], col: 'vulva-la-revolution', sort: 11, scene: 'navet_vulva_couple' },
  { keywords: ['vulva', 'turnip', 'mug'], notKeywords: ['couple', 'ready', 'woke'], col: 'vulva-la-revolution', sort: 12, scene: 'navet_vulva_solo' },
  { keywords: ['ready', 'woke', 'turnip', 'mug'], col: 'vulva-la-revolution', sort: 13, scene: 'navet_woke_en' },

  // ===== POSTER FR (posters-vulva-la-revolution-fr) =====
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

  // ===== POSTER EN (posters-vulva-la-revolution) =====
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

const TARGET_COLLECTIONS = new Set([
  'vulva-la-revolution-fr', 'vulva-la-revolution',
  'posters-vulva-la-revolution-fr', 'posters-vulva-la-revolution'
]);

// ============================================================
// MAIN
// ============================================================
Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  const user = await base44.auth.me();
  if (user?.role !== 'admin') {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }

  const allProducts = await base44.asServiceRole.entities.Product.list('created_date', 500);

  const updated = [];
  const matched = new Set();

  for (const product of allProducts) {
    const currentCols = product.collections || [];

    // Find matching rule
    let bestRule = null;
    for (const rule of MATCH_RULES) {
      if (matches(product.title, rule)) {
        bestRule = rule;
        break;
      }
    }

    if (!bestRule) {
      // Product is in a target collection but doesn't match any rule → remove it
      const hasTargetCol = currentCols.some(c => TARGET_COLLECTIONS.has(c));
      if (hasTargetCol) {
        const cleanedCols = currentCols.filter(c => !TARGET_COLLECTIONS.has(c));
        await base44.asServiceRole.entities.Product.update(product.id, {
          ...product,
          collections: cleanedCols,
        });
        updated.push(`REMOVED | ${product.title} → cleaned from vulva collections`);
        matched.add(product.id);
        await new Promise(r => setTimeout(r, 200));
      }
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

    // Assign images if scene is defined
    if (bestRule.scene) {
      const images = sceneImages(bestRule.scene);
      if (images.length > 0) {
        updateData.images = images;
      }
    }

    await base44.asServiceRole.entities.Product.update(product.id, updateData);
    updated.push(`${bestRule.sort} | ${product.title} → ${bestRule.col} [${bestRule.scene || 'no-img'}]`);
    matched.add(product.id);

    await new Promise(r => setTimeout(r, 300));
  }

  return Response.json({ success: true, updatedCount: updated.length, updated });
});