import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

// ============================================================
// IMAGE CATALOG - organized by scene, sorted by color (yellow→green→red/pink→black)
// Within each color: product shots (1,2) first, lifestyle (3,4,5) after
// ============================================================

function sceneImages(name) {
  // Each function returns correctly ordered images for that scene
  switch(name) {
    // ===== NAVET / TURNIP - FR =====
    case 'navet_vulva_solo_fr':
      return [
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/ddfe3339b_MugRevolutionTomateJauneFR1.jpg', color: 'yellow' }, // reused with navet FR Jaune1
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/16869308e_MugRevolutionNavetFRVert1.jpg', color: 'green' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/59b54e255_MugRevolutionNavetFRVert2.jpg', color: 'green' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/86e072f43_MugRevolutionNavetFRVert4.jpg', color: 'green' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/9ec17bb29_MugRevolutionNavetFRRose1.jpg', color: 'pink' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/9760fb4e9_MugRevolutionNavetFRRose2.jpg', color: 'pink' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/e300da16b_MugRevolutionNavetFRRose3.jpg', color: 'pink' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/0972e4fc3_MugRevolutionNavetFRNoir1.jpg', color: 'black' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/96641046d_MugRevolutionNavetFRNoir2.jpg', color: 'black' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/f058eba41_MugRevolutionNavetFRNoir4.jpg', color: 'black' },
      ];
    case 'navet_woke_fr_new':
      return [
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/4240465d7_PretspourleWokeCoupleNavetMugRose1.jpg', color: 'pink' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/e531bfdb1_PretspourleWokeCoupleNavetMugVert1.jpg', color: 'green' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/95b8abf9d_PretspourleWokeCoupleNavetMugVert2.jpg', color: 'green' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/353c7b0b5_PretspourleWokeCoupleNavetMugVert4.jpg', color: 'green' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/74d3a15b2_PretspourleWokeCoupleNavetMugNoir1.jpg', color: 'black' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/f967eb17e_PretspourleWokeCoupleNavetMugNoir2.jpg', color: 'black' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/31ce7ad30_PretspourleWokeCoupleNavetMugNoir4.jpg', color: 'black' },
      ];

    // ===== NAVET / TURNIP - EN (legacy) =====
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

    // ===== TOMATE FR =====
    case 'tomate_vulva_fr':
      return [
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/ddfe3339b_MugRevolutionTomateJauneFR1.jpg', color: 'yellow' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/d3a1f4b13_MugRevolutionTomateJauneFR2.jpg', color: 'yellow' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/9188e6567_MugRevolutionTomateJauneFR3.jpg', color: 'yellow' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/a8c95f974_MugRevolutionTomateVertFR1.jpg', color: 'green' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/8be407927_MugRevolutionTomateVertFR2.jpg', color: 'green' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/ada8da467_MugRevolutionTomateVertFR4.jpg', color: 'green' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/6c51174ff_MugRevolutionTomateRougeFR1.jpg', color: 'red' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/9c7eaf33c_MugRevolutionTomateRougeFR2.jpg', color: 'red' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/d5e6af015_MugRevolutionTomateRougeFR5.jpg', color: 'red' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/32228f991_MugRevolutionTomateNoirFR1.jpg', color: 'black' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/b02fb6053_MugRevolutionTomateNoirFR2.jpg', color: 'black' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/0044e8010_MugRevolutionTomateNoirFR3.jpg', color: 'black' },
      ];
    case 'tomate_amour_fr':
      return [
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/61634ba2d_MugFaitesAmourTomateJaune1.jpg', color: 'yellow' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/d109a2a1e_MugFaitesAmourTomateJaune2.jpg', color: 'yellow' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/ccfbe5d49_MugFaitesAmourTomateJaune3.jpg', color: 'yellow' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/066154122_MugFaitesAmourTomateVert1.jpg', color: 'green' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/9bfd47829_MugFaitesAmourTomateVert2.jpg', color: 'green' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/69855372c_MugFaitesAmourTomateVert4.jpg', color: 'green' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/6aa71cddf_MugFaitesAmourTomateRouge1.jpg', color: 'red' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/a8336bf07_MugFaitesAmourTomateRouge2.jpg', color: 'red' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/a9ebbff7f_MugFaitesAmourTomateRouge3.jpg', color: 'red' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/68baa31b9_MugFaitesAmourTomateRouge5.jpg', color: 'red' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/e915b31d1_MugFaitesAmourTomateNoir1.jpg', color: 'black' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/2c59f0e65_MugFaitesAmourTomateNoir2.jpg', color: 'black' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/6cf42667b_MugFaitesAmourTomateNoir4.jpg', color: 'black' },
      ];

    // ===== TOMATE / TOMATOE EN =====
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

    // ===== FRAISE / STRAWBERRY - Vulva FR Carmen+Tonio =====
    case 'fraise_vulva_carmen_tonio_fr':
      return [
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/4b7c4fa31_MugRevolutionCarmenTonioJaune1.jpg', color: 'yellow' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/b53b2b8b8_MugRevolutionCarmenTonioJaune2.jpg', color: 'yellow' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/b3f871e86_MugRevolutionCarmenTonioJaune3.jpg', color: 'yellow' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/9515dd2ae_MugRevolutionCarmenTonioVert1.jpg', color: 'green' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/a08ab3c54_MugRevolutionCarmenTonioVert2.jpg', color: 'green' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/bc1d75a90_MugRevolutionCarmenTonioVert4.jpg', color: 'green' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/0db5d54bc_MugRevolutionCarmenTonioRouge1.jpg', color: 'red' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/a3b744878_MugRevolutionCarmenTonioRouge2.jpg', color: 'red' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/5b0545e86_MugRevolutionCarmenTonioRouge3.jpg', color: 'red' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/8d46c546e_MugRevolutionCarmenTonioRouge5.jpg', color: 'red' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/304321b0c_MugRevolutionCarmenTonioNoir1.jpg', color: 'black' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/ced1dffb2_MugRevolutionCarmenTonioNoir2.jpg', color: 'black' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/9797ef072_MugRevolutionCarmenTonioNoir4.jpg', color: 'black' },
      ];
    // ===== FRAISE / STRAWBERRY - Vulva FR Shakira+Rico =====
    case 'fraise_vulva_shakira_rico_fr':
      return [
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/f0b67f000_MugRevolutionShakiraRicoJaune1.jpg', color: 'yellow' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/bf4a02f72_MugRevolutionShakiraRicoJaune2.jpg', color: 'yellow' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/cb5219dca_MugRevolutionShakiraRicoJaune3.jpg', color: 'yellow' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/ab800553a_MugRevolutionShakiraRicoVert1.jpg', color: 'green' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/1eb9f8d14_MugRevolutionShakiraRicoVert2.jpg', color: 'green' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/4fa15723d_MugRevolutionShakiraRicoVert4.jpg', color: 'green' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/e0693b7f7_MugRevolutionShakiraRicoRouge1.jpg', color: 'red' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/a7d38d9fa_MugRevolutionShakiraRicoRouge2.jpg', color: 'red' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/f60abf9f0_MugRevolutionShakiraRicoRouge3.jpg', color: 'red' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/ccee7f32a_MugRevolutionShakiraRicoRouge5.jpg', color: 'red' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/f3f0282f9_MugRevolutionShakiraRicoNoir1.jpg', color: 'black' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/9d1bc24cd_MugRevolutionShakiraRicoNoir2.jpg', color: 'black' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/d526a2635_MugRevolutionShakiraRicoNoir4.jpg', color: 'black' },
      ];

    // ===== FRAISE / STRAWBERRY - Vulva EN Carmen+Rico (legacy) =====
    case 'fraise_vulva_couple':
      return [
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/5063ce2a7_MugVulvaRevolutionENCarmenRicoJaune1.jpg', color: 'yellow' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/9642ff555_MugVulvaRevolutionENCarmenRicoJaune2.jpg', color: 'yellow' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/9b2be7ae2_MugVulvaRevolutionENCarmenRicoJaune3.jpg', color: 'yellow' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/7df0ba0f1_MugVulvaRevolutionENCarmenRicoVert1.jpg', color: 'green' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/daa5b007a_MugVulvaRevolutionENCarmenRicoVert2.jpg', color: 'green' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/5f626e693_MugVulvaRevolutionENCarmenRicoVert4.jpg', color: 'green' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/bcfa466bf_MugVulvaRevolutionENCarmenRicoRose1.jpg', color: 'pink' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/49a8e3620_MugVulvaRevolutionENCarmenRicoRose2.jpg', color: 'pink' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/e619501eb_MugVulvaRevolutionENCarmenRicoRose5.jpg', color: 'pink' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/a4c8474cd_MugVulvaRevolutionENCarmenRicoNoir1.jpg', color: 'black' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/17849cc9d_MugVulvaRevolutionENCarmenRicoNoir2.jpg', color: 'black' },
      ];

    // ===== FRAISE / STRAWBERRY - Faites l'Amour FR =====
    case 'fraise_amour_carmen_tonio_fr':
      return [
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/a1524873c_MugFaitesAmourCarmenTonioJaune1.jpg', color: 'yellow' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/e925fcbb4_MugFaitesAmourCarmenTonioJaune2.jpg', color: 'yellow' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/b4200b124_MugFaitesAmourCarmenTonioJaune3.jpg', color: 'yellow' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/41533aef9_MugFaitesAmourCarmenTonioVert1.jpg', color: 'green' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/f3b3ab71b_MugFaitesAmourCarmenTonioVert2.jpg', color: 'green' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/a52cb9d67_MugFaitesAmourCarmenTonioVert4.jpg', color: 'green' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/e1e7f2b55_MugFaitesAmourCarmenTonioRouge1.jpg', color: 'red' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/4c5f022a8_MugFaitesAmourCarmenTonioRouge2.jpg', color: 'red' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/a03d8574e_MugFaitesAmourCarmenTonioRouge3.jpg', color: 'red' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/d0f31f32b_MugFaitesAmourCarmenTonioRouge5.jpg', color: 'red' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/86e77c29f_MugFaitesAmourCarmenTonioNoir1.jpg', color: 'black' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/ecb0331b0_MugFaitesAmourCarmenTonioNoir2.jpg', color: 'black' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/970642347_MugFaitesAmourCarmenTonioNoir4.jpg', color: 'black' },
      ];
    case 'fraise_amour_rico_shakira_fr':
      return [
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/74e375cc3_MugFaitesAmourRicoShakiraJaune1.jpg', color: 'yellow' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/aa775bdf8_MugFaitesAmourRicoShakiraJaune2.jpg', color: 'yellow' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/dac487729_MugFaitesAmourRicoShakiraJaune3.jpg', color: 'yellow' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/d1f81e316_MugFaitesAmourRicoShakiraVert1.jpg', color: 'green' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/733103886_MugFaitesAmourRicoShakiraVert2.jpg', color: 'green' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/69934dfba_MugFaitesAmourRicoShakiraVert4.jpg', color: 'green' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/f0b7067ec_MugFaitesAmourRicoShakiraRouge1.jpg', color: 'red' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/b3c86e92a_MugFaitesAmourRicoShakiraRouge2.jpg', color: 'red' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/e9ab0b112_MugFaitesAmourRicoShakiraRouge3.jpg', color: 'red' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/0d68f50d1_MugFaitesAmourRicoShakiraRouge5.jpg', color: 'red' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/60cd0dd76_MugFaitesAmourRicoShakiraNoir1.jpg', color: 'black' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/061b9075b_MugFaitesAmourRicoShakiraNoir2.jpg', color: 'black' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/71e17faff_MugFaitesAmourRicoShakiraNoir4.jpg', color: 'black' },
      ];
    case 'fraise_amour_lola_almarita_fr':
      return [
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/26e925caf_MugFaitesAmourLolaAlmaritaYellow1.jpg', color: 'yellow' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/3bd2bcd5c_MugFaitesAmourLolaAlmaritaYellow2.jpg', color: 'yellow' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/8a01a90e8_MugFaitesAmourLolaAlmaritaYellow3.jpg', color: 'yellow' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/bc38b2479_MugFaitesAmourLolaAlmaritaVert1.jpg', color: 'green' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/013e685df_MugFaitesAmourLolaAlmaritaVert2.jpg', color: 'green' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/089892934_MugFaitesAmourLolaAlmaritaVert4.jpg', color: 'green' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/03644ed08_MugFaitesAmourLolaAlmaritaRouge1.jpg', color: 'red' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/0a7dfe95a_MugFaitesAmourLolaAlmaritaRouge2.jpg', color: 'red' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/ec6dcd39e_MugFaitesAmourLolaAlmaritaRouge3.jpg', color: 'red' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/876d92a83_MugFaitesAmourLolaAlmaritaRouge5.jpg', color: 'red' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/9056780a7_MugFaitesAmourLolaAlmaritaNoir1.jpg', color: 'black' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/d4d6fbfc6_MugFaitesAmourLolaAlmaritaNoir2.jpg', color: 'black' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/6000da64e_MugFaitesAmourLolaAlmaritaNoir4.jpg', color: 'black' },
      ];

    // ===== GRAINES FR =====
    case 'graines_fr':
      return [
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/2fa1d3140_MugGrainePimentJaune1.jpg', color: 'yellow' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/1072fcbb2_MugGrainePimentJaune2.jpg', color: 'yellow' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/8cde8a6c4_MugGrainePimentJaune3.jpg', color: 'yellow' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/02063135f_MugGrainePimentVert1.jpg', color: 'green' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/74638f42f_MugGrainePimentVert2.jpg', color: 'green' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/a9fe22eea_MugGrainePimentVert4.jpg', color: 'green' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/151263063_MugGrainePimentRouge1.jpg', color: 'red' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/92eb5595d_MugGrainePimentRouge2.jpg', color: 'red' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/0343111e1_MugGrainePimentRouge3.jpg', color: 'red' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/b930a175a_MugGrainePimentRouge5.jpg', color: 'red' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/38a3b3e2e_MugGrainePimentNoir1.jpg', color: 'black' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/2c5fe2045_MugGrainePimentNoir2.jpg', color: 'black' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/76755cea3_MugGrainePimentNoir4.jpg', color: 'black' },
      ];

    // ===== FRAISE / STRAWBERRY - Amour/Make Love EN =====
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

    // ===== NIÇOISE =====
    case 'nicoise_tomate':
      return [
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/f926eb844_MugNicoiseTomateJaune1.jpg', color: 'yellow' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/93bed0ce3_MugNicoiseTomateJaune2.jpg', color: 'yellow' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/9a467a685_MugNicoiseTomateJaune3.jpg', color: 'yellow' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/dcb5e2315_MugNicoiseTomateVert1.jpg', color: 'green' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/a23e8130f_MugNicoiseTomateVert2.jpg', color: 'green' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/b2f60f1cf_MugNicoiseTomateVert4.jpg', color: 'green' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/6d2b355ca_MugNicoiseTomateRouge1.jpg', color: 'red' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/d654a143f_MugNicoiseTomateRouge2.jpg', color: 'red' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/e916201d2_MugNicoiseTomateRouge3.jpg', color: 'red' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/48ac7f840_MugNicoiseTomateRouge5.jpg', color: 'red' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/579023568_MugNicoiseTomateNoir1.jpg', color: 'black' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/44403ed93_MugNicoiseTomateNoir2.jpg', color: 'black' },
      ];
    case 'nicoise_fraise':
      return [
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/b397666e9_MugNicoiseShakiraJaune1.jpg', color: 'yellow' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/f84a8a523_MugNicoiseShakiraJaune2.jpg', color: 'yellow' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/d395c31d5_MugNicoiseShakiraJaune3.jpg', color: 'yellow' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/5d67d0cb3_MugNicoiseShakiraVert1.jpg', color: 'green' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/cc0c1c394_MugNicoiseShakiraVert2.jpg', color: 'green' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/2dcdd52a1_MugNicoiseShakiraVert4.jpg', color: 'green' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/bbd1e28c7_MugNicoiseShakiraRouge1.jpg', color: 'red' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/ac6c550d3_MugNicoiseShakiraRouge2.jpg', color: 'red' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/3f7098fc5_MugNicoiseShakiraRouge4.jpg', color: 'red' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/6c078a39c_MugNicoiseShakiraNoir1.jpg', color: 'black' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/cd6cd1d11_MugNicoiseShakiraNoir2.jpg', color: 'black' },
      ];
    case 'nicoise_fraise_carmen':
      return [
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/459b190fe_MugNicoiseCarmenJaune1.jpg', color: 'yellow' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/112443b78_MugNicoiseCarmenJaune2.jpg', color: 'yellow' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/476ca4764_MugNicoiseCarmenJaune3.jpg', color: 'yellow' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/c8c95f906_MugNicoiseCarmenVert1.jpg', color: 'green' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/1181e8d19_MugNicoiseCarmenVert2.jpg', color: 'green' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/02b246593_MugNicoiseCarmenVert4.jpg', color: 'green' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/071211947_MugNicoiseCarmenRouge1.jpg', color: 'red' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/4032a4211_MugNicoiseCarmenRouge2.jpg', color: 'red' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/9fe905c6d_MugNicoiseCarmenRouge4.jpg', color: 'red' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/7ed088685_MugNicoiseCarmenNoir1.jpg', color: 'black' },
        { url: 'https://media.base44.com/images/public/69f3591f0433b9e03564517e/eb46d3c21_MugNicoiseCarmenNoir2.jpg', color: 'black' },
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
  { keywords: ['vulva', 'tomate', 'mug'], notKeywords: ['fraise', 'navet', 'turnip', 'graines', 'woke', 'amour', 'guerre', 'shakira', 'carmen', 'prêts', 'niçoise'], col: 'vulva-la-revolution-fr', sort: 1, scene: 'tomate_vulva_fr' },
  { keywords: ['faites', 'amour', 'tomate', 'mug'], notKeywords: ['fraise', 'navet', 'niçoise'], col: 'vulva-la-revolution-fr', sort: 2, scene: 'tomate_amour_fr' },
  { keywords: ['vulva', 'carmen', 'tonio', 'fraise', 'mug'], notKeywords: ['amour', 'faites', 'shakira', 'rico'], col: 'vulva-la-revolution-fr', sort: 3, scene: 'fraise_vulva_carmen_tonio_fr' },
  { keywords: ['vulva', 'shakira', 'rico', 'fraise', 'mug'], col: 'vulva-la-revolution-fr', sort: 4, scene: 'fraise_vulva_shakira_rico_fr' },
  { keywords: ['faites', 'amour', 'carmen', 'tonio', 'fraise', 'mug'], col: 'vulva-la-revolution-fr', sort: 5, scene: 'fraise_amour_carmen_tonio_fr' },
  { keywords: ['faites', 'amour', 'carmen', 'shakira', 'fraise', 'mug'], col: 'vulva-la-revolution-fr', sort: 6, scene: 'fraise_amour_carmen_tonio_fr' },
  { keywords: ['faites', 'amour', 'rico', 'shakira', 'fraise', 'mug'], col: 'vulva-la-revolution-fr', sort: 7, scene: 'fraise_amour_rico_shakira_fr' },
  { keywords: ['faites', 'amour', 'rico', 'tonio', 'fraise', 'mug'], col: 'vulva-la-revolution-fr', sort: 8, scene: 'fraise_amour_carmen_tonio_fr' },
  { keywords: ['faites', 'amour', 'lola', 'almarita', 'fraise', 'mug'], col: 'vulva-la-revolution-fr', sort: 9, scene: 'fraise_amour_lola_almarita_fr' },
  { keywords: ['graines', 'mug'], notKeywords: ['poster'], col: 'vulva-la-revolution-fr', sort: 10, scene: 'graines_fr' },
  { keywords: ['vulva', 'navet', 'mug'], notKeywords: ['couple', 'prêts'], col: 'vulva-la-revolution-fr', sort: 11, scene: 'navet_vulva_solo_fr' },
  { keywords: ['prêts', 'woke', 'navet', 'mug'], col: 'vulva-la-revolution-fr', sort: 12, scene: 'navet_woke_fr_new' },
  { keywords: ['niçoise', 'tomate', 'mug'], notKeywords: ['fraise'], col: 'vulva-la-revolution-fr', sort: 13, scene: 'nicoise_tomate' },
  { keywords: ['niçoise', 'carmen', 'fraise', 'mug'], col: 'vulva-la-revolution-fr', sort: 14, scene: 'nicoise_fraise_carmen' },
  { keywords: ['niçoise', 'fraise', 'mug'], notKeywords: ['carmen'], col: 'vulva-la-revolution-fr', sort: 15, scene: 'nicoise_fraise' },

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
  { keywords: ['niçoise', 'tomate', 'poster'], col: 'posters-vulva-la-revolution-fr', sort: 31 },
  { keywords: ['niçoise', 'carmen', 'fraise', 'poster'], col: 'posters-vulva-la-revolution-fr', sort: 32 },
  { keywords: ['niçoise', 'fraise', 'poster'], notKeywords: ['carmen'], col: 'posters-vulva-la-revolution-fr', sort: 33 },

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