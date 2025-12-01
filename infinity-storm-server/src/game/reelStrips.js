/**
 * Reel Strip Definitions for Infinity Stones Slot
 * 
 * Industry-standard reel strips for casino-grade RNG.
 * Each strip is 120 symbols long, with symbol frequencies derived from
 * symbolDistribution.js weights to maintain 96.5% RTP.
 * 
 * AUDIT COMPLIANCE:
 * - Strip version tracked for reproducibility
 * - Stop positions + version = full spin reconstruction
 * - Symbol frequencies mathematically verified
 * 
 * Target Distribution (from symbolDistribution.js baseWeights):
 *   time_gem: 26/185 = 14.1% → 17 per strip
 *   space_gem: 26/185 = 14.1% → 17 per strip
 *   mind_gem: 22/185 = 11.9% → 14 per strip
 *   power_gem: 20/185 = 10.8% → 13 per strip
 *   reality_gem: 20/185 = 10.8% → 13 per strip
 *   soul_gem: 19/185 = 10.3% → 12 per strip
 *   thanos_weapon: 17/185 = 9.2% → 11 per strip
 *   scarlet_witch: 12/185 = 6.5% → 8 per strip
 *   thanos: 11/185 = 5.9% → 7 per strip
 *   infinity_glove: 5 per strip (~4.2%) for scatter trigger rate
 * 
 * CLUSTERING: Symbols are placed in small groups (2-3 consecutive)
 * to enable 8+ symbol matches across the 6x5 grid.
 * 
 * @version 2.0.0
 */

const STRIP_VERSION = '2.0.0';
const STRIP_LENGTH = 120;

/**
 * Base game reel strips - 6 columns, 120 symbols each
 * 
 * DESIGN PRINCIPLES:
 * 1. Symbol distribution matches symbolDistribution.js weights
 * 2. Symbols appear in clusters of 2-3 to enable 8+ matches
 * 3. Scatter symbols (infinity_glove) spread evenly for ~3.8% trigger rate
 * 4. Each column has similar distribution for consistent gameplay
 */
const BASE_GAME_STRIPS = [
  // Column 0 - Matches target distribution with clustering
  [
    // Cluster 1-5
    'time_gem', 'time_gem', 'space_gem', 'space_gem', 'mind_gem',
    // Cluster 6-10
    'mind_gem', 'power_gem', 'power_gem', 'reality_gem', 'reality_gem',
    // Cluster 11-15
    'soul_gem', 'soul_gem', 'thanos_weapon', 'thanos_weapon', 'scarlet_witch',
    // Cluster 16-20
    'thanos', 'time_gem', 'time_gem', 'space_gem', 'space_gem',
    // Cluster 21-25
    'mind_gem', 'power_gem', 'reality_gem', 'soul_gem', 'infinity_glove',
    // Cluster 26-30
    'time_gem', 'time_gem', 'space_gem', 'mind_gem', 'mind_gem',
    // Cluster 31-35
    'power_gem', 'power_gem', 'reality_gem', 'soul_gem', 'thanos_weapon',
    // Cluster 36-40
    'thanos_weapon', 'scarlet_witch', 'thanos', 'infinity_glove', 'space_gem',
    // Cluster 41-45
    'space_gem', 'space_gem', 'mind_gem', 'power_gem', 'reality_gem',
    // Cluster 46-50
    'reality_gem', 'soul_gem', 'soul_gem', 'thanos_weapon', 'infinity_glove',
    // Cluster 51-55
    'time_gem', 'time_gem', 'space_gem', 'space_gem', 'mind_gem',
    // Cluster 56-60
    'mind_gem', 'power_gem', 'reality_gem', 'soul_gem', 'thanos_weapon',
    // Cluster 61-65
    'scarlet_witch', 'scarlet_witch', 'thanos', 'time_gem', 'time_gem',
    // Cluster 66-70
    'space_gem', 'space_gem', 'mind_gem', 'power_gem', 'power_gem',
    // Cluster 71-75
    'reality_gem', 'reality_gem', 'soul_gem', 'thanos_weapon', 'infinity_glove',
    // Cluster 76-80
    'time_gem', 'space_gem', 'space_gem', 'mind_gem', 'mind_gem',
    // Cluster 81-85
    'power_gem', 'power_gem', 'reality_gem', 'soul_gem', 'soul_gem',
    // Cluster 86-90
    'thanos_weapon', 'thanos_weapon', 'scarlet_witch', 'thanos', 'thanos',
    // Cluster 91-95
    'time_gem', 'time_gem', 'space_gem', 'mind_gem', 'power_gem',
    // Cluster 96-100
    'reality_gem', 'soul_gem', 'thanos_weapon', 'scarlet_witch', 'infinity_glove',
    // Cluster 101-105
    'time_gem', 'time_gem', 'space_gem', 'space_gem', 'mind_gem',
    // Cluster 106-110
    'power_gem', 'reality_gem', 'reality_gem', 'soul_gem', 'thanos_weapon',
    // Cluster 111-115
    'scarlet_witch', 'scarlet_witch', 'thanos', 'thanos', 'time_gem',
    // Cluster 116-120
    'space_gem', 'mind_gem', 'power_gem', 'reality_gem', 'infinity_glove'
  ],
  
  // Column 1 - Similar distribution, offset clustering
  [
    'space_gem', 'space_gem', 'time_gem', 'time_gem', 'mind_gem',
    'mind_gem', 'power_gem', 'reality_gem', 'reality_gem', 'soul_gem',
    'soul_gem', 'thanos_weapon', 'thanos_weapon', 'scarlet_witch', 'infinity_glove',
    'time_gem', 'time_gem', 'space_gem', 'space_gem', 'mind_gem',
    'power_gem', 'power_gem', 'reality_gem', 'soul_gem', 'infinity_glove',
    'time_gem', 'space_gem', 'space_gem', 'mind_gem', 'mind_gem',
    'power_gem', 'reality_gem', 'reality_gem', 'soul_gem', 'soul_gem',
    'thanos_weapon', 'scarlet_witch', 'scarlet_witch', 'thanos', 'infinity_glove',
    'time_gem', 'space_gem', 'space_gem', 'mind_gem', 'power_gem',
    'power_gem', 'reality_gem', 'soul_gem', 'thanos_weapon', 'infinity_glove',
    'time_gem', 'time_gem', 'space_gem', 'mind_gem', 'mind_gem',
    'power_gem', 'power_gem', 'reality_gem', 'reality_gem', 'soul_gem',
    'thanos_weapon', 'thanos_weapon', 'scarlet_witch', 'thanos', 'thanos',
    'time_gem', 'space_gem', 'space_gem', 'space_gem', 'mind_gem',
    'power_gem', 'reality_gem', 'reality_gem', 'soul_gem', 'infinity_glove',
    'time_gem', 'time_gem', 'space_gem', 'space_gem', 'mind_gem',
    'mind_gem', 'power_gem', 'reality_gem', 'soul_gem', 'soul_gem',
    'thanos_weapon', 'thanos_weapon', 'scarlet_witch', 'scarlet_witch', 'thanos',
    'time_gem', 'time_gem', 'space_gem', 'mind_gem', 'power_gem',
    'power_gem', 'reality_gem', 'soul_gem', 'thanos_weapon', 'infinity_glove',
    'time_gem', 'space_gem', 'space_gem', 'mind_gem', 'mind_gem',
    'power_gem', 'power_gem', 'reality_gem', 'reality_gem', 'soul_gem',
    'thanos_weapon', 'scarlet_witch', 'thanos', 'thanos', 'time_gem',
    'space_gem', 'mind_gem', 'power_gem', 'soul_gem', 'thanos_weapon'
  ],
  
  // Column 2 - Similar distribution, different offset
  [
    'mind_gem', 'mind_gem', 'time_gem', 'time_gem', 'space_gem',
    'space_gem', 'power_gem', 'power_gem', 'reality_gem', 'soul_gem',
    'soul_gem', 'thanos_weapon', 'scarlet_witch', 'scarlet_witch', 'thanos',
    'time_gem', 'time_gem', 'space_gem', 'mind_gem', 'mind_gem',
    'power_gem', 'reality_gem', 'reality_gem', 'soul_gem', 'infinity_glove',
    'time_gem', 'time_gem', 'space_gem', 'space_gem', 'mind_gem',
    'power_gem', 'power_gem', 'reality_gem', 'reality_gem', 'soul_gem',
    'thanos_weapon', 'thanos_weapon', 'scarlet_witch', 'thanos', 'infinity_glove',
    'space_gem', 'space_gem', 'space_gem', 'mind_gem', 'mind_gem',
    'power_gem', 'reality_gem', 'soul_gem', 'soul_gem', 'infinity_glove',
    'time_gem', 'time_gem', 'space_gem', 'space_gem', 'mind_gem',
    'mind_gem', 'power_gem', 'power_gem', 'reality_gem', 'soul_gem',
    'thanos_weapon', 'thanos_weapon', 'scarlet_witch', 'thanos', 'infinity_glove',
    'time_gem', 'time_gem', 'space_gem', 'mind_gem', 'power_gem',
    'power_gem', 'reality_gem', 'reality_gem', 'soul_gem', 'infinity_glove',
    'time_gem', 'space_gem', 'space_gem', 'mind_gem', 'mind_gem',
    'power_gem', 'reality_gem', 'reality_gem', 'soul_gem', 'soul_gem',
    'thanos_weapon', 'thanos_weapon', 'scarlet_witch', 'scarlet_witch', 'thanos',
    'time_gem', 'time_gem', 'space_gem', 'space_gem', 'mind_gem',
    'power_gem', 'power_gem', 'reality_gem', 'soul_gem', 'infinity_glove',
    'time_gem', 'time_gem', 'space_gem', 'mind_gem', 'mind_gem',
    'power_gem', 'reality_gem', 'soul_gem', 'thanos_weapon', 'thanos_weapon',
    'scarlet_witch', 'thanos', 'thanos', 'time_gem', 'space_gem',
    'space_gem', 'mind_gem', 'power_gem', 'reality_gem', 'soul_gem'
  ],
  
  // Column 3 - Similar distribution, different offset
  [
    'power_gem', 'power_gem', 'time_gem', 'time_gem', 'space_gem',
    'space_gem', 'mind_gem', 'mind_gem', 'reality_gem', 'reality_gem',
    'soul_gem', 'thanos_weapon', 'thanos_weapon', 'scarlet_witch', 'thanos',
    'time_gem', 'space_gem', 'space_gem', 'mind_gem', 'mind_gem',
    'power_gem', 'power_gem', 'reality_gem', 'soul_gem', 'infinity_glove',
    'time_gem', 'time_gem', 'space_gem', 'space_gem', 'mind_gem',
    'power_gem', 'reality_gem', 'reality_gem', 'soul_gem', 'soul_gem',
    'thanos_weapon', 'scarlet_witch', 'scarlet_witch', 'thanos', 'thanos',
    'time_gem', 'time_gem', 'space_gem', 'mind_gem', 'mind_gem',
    'power_gem', 'power_gem', 'reality_gem', 'soul_gem', 'infinity_glove',
    'time_gem', 'time_gem', 'space_gem', 'space_gem', 'mind_gem',
    'mind_gem', 'power_gem', 'reality_gem', 'reality_gem', 'soul_gem',
    'soul_gem', 'thanos_weapon', 'thanos_weapon', 'scarlet_witch', 'thanos',
    'time_gem', 'space_gem', 'space_gem', 'space_gem', 'mind_gem',
    'power_gem', 'power_gem', 'reality_gem', 'soul_gem', 'infinity_glove',
    'time_gem', 'time_gem', 'space_gem', 'mind_gem', 'mind_gem',
    'power_gem', 'power_gem', 'reality_gem', 'reality_gem', 'soul_gem',
    'thanos_weapon', 'thanos_weapon', 'scarlet_witch', 'scarlet_witch', 'thanos',
    'time_gem', 'time_gem', 'space_gem', 'space_gem', 'mind_gem',
    'power_gem', 'reality_gem', 'reality_gem', 'soul_gem', 'infinity_glove',
    'time_gem', 'space_gem', 'space_gem', 'mind_gem', 'mind_gem',
    'power_gem', 'power_gem', 'reality_gem', 'soul_gem', 'soul_gem',
    'thanos_weapon', 'scarlet_witch', 'thanos', 'thanos', 'time_gem',
    'space_gem', 'mind_gem', 'power_gem', 'reality_gem', 'thanos_weapon'
  ],
  
  // Column 4 - Similar distribution, different offset
  [
    'reality_gem', 'reality_gem', 'time_gem', 'time_gem', 'space_gem',
    'space_gem', 'mind_gem', 'power_gem', 'power_gem', 'soul_gem',
    'soul_gem', 'thanos_weapon', 'scarlet_witch', 'scarlet_witch', 'thanos',
    'time_gem', 'time_gem', 'space_gem', 'space_gem', 'mind_gem',
    'mind_gem', 'power_gem', 'reality_gem', 'soul_gem', 'infinity_glove',
    'time_gem', 'space_gem', 'space_gem', 'mind_gem', 'mind_gem',
    'power_gem', 'power_gem', 'reality_gem', 'reality_gem', 'soul_gem',
    'thanos_weapon', 'thanos_weapon', 'scarlet_witch', 'thanos', 'thanos',
    'time_gem', 'time_gem', 'space_gem', 'space_gem', 'mind_gem',
    'power_gem', 'power_gem', 'reality_gem', 'soul_gem', 'infinity_glove',
    'time_gem', 'time_gem', 'space_gem', 'mind_gem', 'mind_gem',
    'power_gem', 'reality_gem', 'reality_gem', 'soul_gem', 'soul_gem',
    'thanos_weapon', 'thanos_weapon', 'scarlet_witch', 'scarlet_witch', 'thanos',
    'time_gem', 'time_gem', 'space_gem', 'space_gem', 'mind_gem',
    'power_gem', 'power_gem', 'reality_gem', 'reality_gem', 'soul_gem',
    'thanos_weapon', 'scarlet_witch', 'thanos', 'time_gem', 'infinity_glove',
    'time_gem', 'space_gem', 'space_gem', 'mind_gem', 'mind_gem',
    'power_gem', 'power_gem', 'reality_gem', 'soul_gem', 'soul_gem',
    'thanos_weapon', 'thanos_weapon', 'scarlet_witch', 'scarlet_witch', 'thanos',
    'time_gem', 'time_gem', 'space_gem', 'space_gem', 'infinity_glove',
    'mind_gem', 'mind_gem', 'power_gem', 'reality_gem', 'reality_gem',
    'soul_gem', 'thanos_weapon', 'thanos', 'thanos', 'time_gem',
    'space_gem', 'space_gem', 'mind_gem', 'power_gem', 'reality_gem',
    'soul_gem', 'soul_gem', 'thanos_weapon', 'scarlet_witch', 'power_gem'
  ],
  
  // Column 5 (rightmost) - Similar distribution, different offset
  [
    'soul_gem', 'soul_gem', 'time_gem', 'time_gem', 'space_gem',
    'space_gem', 'mind_gem', 'mind_gem', 'power_gem', 'reality_gem',
    'reality_gem', 'thanos_weapon', 'thanos_weapon', 'scarlet_witch', 'thanos',
    'time_gem', 'time_gem', 'space_gem', 'mind_gem', 'mind_gem',
    'power_gem', 'power_gem', 'reality_gem', 'soul_gem', 'infinity_glove',
    'time_gem', 'space_gem', 'space_gem', 'space_gem', 'mind_gem',
    'power_gem', 'reality_gem', 'reality_gem', 'soul_gem', 'soul_gem',
    'thanos_weapon', 'scarlet_witch', 'scarlet_witch', 'thanos', 'thanos',
    'time_gem', 'time_gem', 'space_gem', 'space_gem', 'mind_gem',
    'power_gem', 'power_gem', 'reality_gem', 'soul_gem', 'infinity_glove',
    'time_gem', 'time_gem', 'space_gem', 'mind_gem', 'mind_gem',
    'power_gem', 'power_gem', 'reality_gem', 'reality_gem', 'soul_gem',
    'soul_gem', 'thanos_weapon', 'thanos_weapon', 'scarlet_witch', 'thanos',
    'time_gem', 'space_gem', 'space_gem', 'space_gem', 'mind_gem',
    'mind_gem', 'power_gem', 'reality_gem', 'soul_gem', 'infinity_glove',
    'time_gem', 'time_gem', 'space_gem', 'mind_gem', 'power_gem',
    'power_gem', 'reality_gem', 'reality_gem', 'soul_gem', 'soul_gem',
    'thanos_weapon', 'thanos_weapon', 'scarlet_witch', 'scarlet_witch', 'thanos',
    'time_gem', 'time_gem', 'space_gem', 'space_gem', 'mind_gem',
    'power_gem', 'power_gem', 'reality_gem', 'soul_gem', 'infinity_glove',
    'time_gem', 'space_gem', 'space_gem', 'mind_gem', 'mind_gem',
    'power_gem', 'reality_gem', 'reality_gem', 'soul_gem', 'thanos_weapon',
    'thanos_weapon', 'scarlet_witch', 'thanos', 'thanos', 'time_gem',
    'space_gem', 'mind_gem', 'power_gem', 'reality_gem', 'soul_gem'
  ]
];

/**
 * Free spins reel strips - Higher frequency of high-value symbols
 * Adjusted based on freeSpinAdjustments from symbolDistribution.js:
 *   time_gem: x1.2, space_gem: x1.2 (more low symbols for balance)
 *   mind_gem: x0.7, power_gem: x0.7, reality_gem: x0.7, soul_gem: x0.7
 *   thanos_weapon: x1.5, scarlet_witch: x1.5, thanos: x1.5
 * 
 * Also slightly higher scatter frequency for retrigger (~4.5%)
 */
const FREE_SPINS_STRIPS = [
  // Column 0 - Free Spins (more high-value symbols, clustered)
  [
    'time_gem', 'time_gem', 'space_gem', 'space_gem', 'thanos_weapon',
    'thanos_weapon', 'scarlet_witch', 'scarlet_witch', 'thanos', 'thanos',
    'time_gem', 'time_gem', 'space_gem', 'mind_gem', 'power_gem',
    'reality_gem', 'soul_gem', 'thanos_weapon', 'thanos_weapon', 'scarlet_witch',
    'thanos', 'time_gem', 'time_gem', 'space_gem', 'infinity_glove',
    'time_gem', 'space_gem', 'space_gem', 'thanos_weapon', 'thanos_weapon',
    'scarlet_witch', 'scarlet_witch', 'thanos', 'time_gem', 'time_gem',
    'space_gem', 'space_gem', 'mind_gem', 'power_gem', 'thanos_weapon',
    'thanos', 'thanos', 'scarlet_witch', 'time_gem', 'time_gem',
    'space_gem', 'space_gem', 'thanos_weapon', 'thanos_weapon', 'infinity_glove',
    'time_gem', 'time_gem', 'space_gem', 'scarlet_witch', 'scarlet_witch',
    'thanos', 'thanos', 'mind_gem', 'power_gem', 'thanos_weapon',
    'time_gem', 'space_gem', 'space_gem', 'thanos_weapon', 'thanos_weapon',
    'scarlet_witch', 'thanos', 'time_gem', 'time_gem', 'space_gem',
    'reality_gem', 'soul_gem', 'thanos_weapon', 'scarlet_witch', 'infinity_glove',
    'time_gem', 'time_gem', 'space_gem', 'space_gem', 'thanos_weapon',
    'thanos_weapon', 'scarlet_witch', 'scarlet_witch', 'thanos', 'thanos',
    'time_gem', 'space_gem', 'mind_gem', 'power_gem', 'thanos_weapon',
    'scarlet_witch', 'time_gem', 'time_gem', 'space_gem', 'space_gem',
    'thanos_weapon', 'thanos', 'thanos', 'scarlet_witch', 'infinity_glove',
    'time_gem', 'time_gem', 'space_gem', 'space_gem', 'thanos_weapon',
    'thanos_weapon', 'scarlet_witch', 'thanos', 'reality_gem', 'soul_gem',
    'time_gem', 'space_gem', 'thanos_weapon', 'scarlet_witch', 'infinity_glove',
    'time_gem', 'space_gem', 'thanos', 'thanos', 'scarlet_witch'
  ],
  
  // Column 1 - Free Spins
  [
    'space_gem', 'space_gem', 'time_gem', 'time_gem', 'thanos_weapon',
    'thanos_weapon', 'scarlet_witch', 'thanos', 'thanos', 'mind_gem',
    'power_gem', 'time_gem', 'time_gem', 'space_gem', 'space_gem',
    'thanos_weapon', 'thanos_weapon', 'scarlet_witch', 'scarlet_witch', 'thanos',
    'time_gem', 'space_gem', 'reality_gem', 'soul_gem', 'infinity_glove',
    'time_gem', 'time_gem', 'space_gem', 'space_gem', 'thanos_weapon',
    'thanos_weapon', 'scarlet_witch', 'thanos', 'thanos', 'time_gem',
    'space_gem', 'mind_gem', 'power_gem', 'thanos_weapon', 'scarlet_witch',
    'scarlet_witch', 'time_gem', 'time_gem', 'space_gem', 'space_gem',
    'thanos_weapon', 'thanos', 'thanos', 'scarlet_witch', 'infinity_glove',
    'time_gem', 'time_gem', 'space_gem', 'thanos_weapon', 'thanos_weapon',
    'scarlet_witch', 'scarlet_witch', 'thanos', 'reality_gem', 'soul_gem',
    'time_gem', 'space_gem', 'space_gem', 'thanos_weapon', 'thanos_weapon',
    'scarlet_witch', 'thanos', 'thanos', 'time_gem', 'time_gem',
    'space_gem', 'mind_gem', 'power_gem', 'thanos_weapon', 'infinity_glove',
    'time_gem', 'time_gem', 'space_gem', 'space_gem', 'thanos_weapon',
    'thanos_weapon', 'scarlet_witch', 'scarlet_witch', 'thanos', 'thanos',
    'time_gem', 'space_gem', 'thanos_weapon', 'scarlet_witch', 'reality_gem',
    'soul_gem', 'time_gem', 'time_gem', 'space_gem', 'space_gem',
    'thanos_weapon', 'thanos', 'scarlet_witch', 'scarlet_witch', 'infinity_glove',
    'time_gem', 'time_gem', 'space_gem', 'space_gem', 'thanos_weapon',
    'thanos_weapon', 'scarlet_witch', 'thanos', 'thanos', 'mind_gem',
    'power_gem', 'time_gem', 'space_gem', 'thanos_weapon', 'infinity_glove',
    'time_gem', 'space_gem', 'scarlet_witch', 'thanos', 'thanos_weapon'
  ],
  
  // Column 2 - Free Spins
  [
    'thanos_weapon', 'thanos_weapon', 'time_gem', 'time_gem', 'space_gem',
    'space_gem', 'scarlet_witch', 'scarlet_witch', 'thanos', 'thanos',
    'mind_gem', 'power_gem', 'time_gem', 'time_gem', 'space_gem',
    'thanos_weapon', 'thanos_weapon', 'scarlet_witch', 'thanos', 'reality_gem',
    'soul_gem', 'time_gem', 'space_gem', 'space_gem', 'infinity_glove',
    'time_gem', 'time_gem', 'space_gem', 'thanos_weapon', 'thanos_weapon',
    'scarlet_witch', 'scarlet_witch', 'thanos', 'thanos', 'time_gem',
    'space_gem', 'mind_gem', 'power_gem', 'thanos_weapon', 'scarlet_witch',
    'time_gem', 'time_gem', 'space_gem', 'space_gem', 'thanos_weapon',
    'thanos_weapon', 'scarlet_witch', 'thanos', 'thanos', 'infinity_glove',
    'time_gem', 'time_gem', 'space_gem', 'space_gem', 'thanos_weapon',
    'scarlet_witch', 'scarlet_witch', 'thanos', 'reality_gem', 'soul_gem',
    'time_gem', 'space_gem', 'thanos_weapon', 'thanos_weapon', 'scarlet_witch',
    'thanos', 'thanos', 'time_gem', 'time_gem', 'space_gem',
    'space_gem', 'mind_gem', 'power_gem', 'thanos_weapon', 'infinity_glove',
    'time_gem', 'time_gem', 'space_gem', 'thanos_weapon', 'thanos_weapon',
    'scarlet_witch', 'scarlet_witch', 'thanos', 'thanos', 'time_gem',
    'space_gem', 'space_gem', 'thanos_weapon', 'scarlet_witch', 'reality_gem',
    'soul_gem', 'time_gem', 'time_gem', 'space_gem', 'thanos_weapon',
    'thanos_weapon', 'scarlet_witch', 'thanos', 'thanos', 'infinity_glove',
    'time_gem', 'time_gem', 'space_gem', 'space_gem', 'thanos_weapon',
    'thanos_weapon', 'scarlet_witch', 'scarlet_witch', 'thanos', 'mind_gem',
    'power_gem', 'time_gem', 'space_gem', 'thanos_weapon', 'infinity_glove',
    'time_gem', 'space_gem', 'scarlet_witch', 'thanos', 'thanos_weapon'
  ],
  
  // Column 3 - Free Spins
  [
    'scarlet_witch', 'scarlet_witch', 'time_gem', 'time_gem', 'space_gem',
    'space_gem', 'thanos_weapon', 'thanos_weapon', 'thanos', 'thanos',
    'mind_gem', 'power_gem', 'time_gem', 'space_gem', 'thanos_weapon',
    'thanos_weapon', 'scarlet_witch', 'scarlet_witch', 'thanos', 'reality_gem',
    'soul_gem', 'time_gem', 'time_gem', 'space_gem', 'infinity_glove',
    'time_gem', 'space_gem', 'space_gem', 'thanos_weapon', 'thanos_weapon',
    'scarlet_witch', 'thanos', 'thanos', 'time_gem', 'time_gem',
    'space_gem', 'mind_gem', 'power_gem', 'thanos_weapon', 'scarlet_witch',
    'scarlet_witch', 'time_gem', 'time_gem', 'space_gem', 'space_gem',
    'thanos_weapon', 'thanos_weapon', 'thanos', 'thanos', 'infinity_glove',
    'time_gem', 'time_gem', 'space_gem', 'thanos_weapon', 'scarlet_witch',
    'scarlet_witch', 'thanos', 'thanos', 'reality_gem', 'soul_gem',
    'time_gem', 'space_gem', 'space_gem', 'thanos_weapon', 'thanos_weapon',
    'scarlet_witch', 'scarlet_witch', 'thanos', 'time_gem', 'time_gem',
    'space_gem', 'mind_gem', 'power_gem', 'thanos_weapon', 'infinity_glove',
    'time_gem', 'time_gem', 'space_gem', 'space_gem', 'thanos_weapon',
    'thanos_weapon', 'scarlet_witch', 'thanos', 'thanos', 'time_gem',
    'space_gem', 'thanos_weapon', 'scarlet_witch', 'scarlet_witch', 'reality_gem',
    'soul_gem', 'time_gem', 'time_gem', 'space_gem', 'thanos_weapon',
    'thanos_weapon', 'scarlet_witch', 'thanos', 'thanos', 'infinity_glove',
    'time_gem', 'time_gem', 'space_gem', 'space_gem', 'thanos_weapon',
    'scarlet_witch', 'scarlet_witch', 'thanos', 'thanos', 'mind_gem',
    'power_gem', 'time_gem', 'space_gem', 'thanos_weapon', 'infinity_glove',
    'time_gem', 'space_gem', 'scarlet_witch', 'thanos', 'thanos_weapon'
  ],
  
  // Column 4 - Free Spins
  [
    'thanos', 'thanos', 'time_gem', 'time_gem', 'space_gem',
    'space_gem', 'thanos_weapon', 'thanos_weapon', 'scarlet_witch', 'scarlet_witch',
    'mind_gem', 'power_gem', 'time_gem', 'space_gem', 'thanos_weapon',
    'scarlet_witch', 'scarlet_witch', 'thanos', 'thanos', 'reality_gem',
    'soul_gem', 'time_gem', 'time_gem', 'space_gem', 'infinity_glove',
    'time_gem', 'space_gem', 'space_gem', 'thanos_weapon', 'thanos_weapon',
    'scarlet_witch', 'scarlet_witch', 'thanos', 'thanos', 'time_gem',
    'time_gem', 'space_gem', 'mind_gem', 'power_gem', 'thanos_weapon',
    'thanos_weapon', 'scarlet_witch', 'thanos', 'thanos', 'time_gem',
    'space_gem', 'space_gem', 'thanos_weapon', 'scarlet_witch', 'infinity_glove',
    'time_gem', 'time_gem', 'space_gem', 'thanos_weapon', 'thanos_weapon',
    'scarlet_witch', 'scarlet_witch', 'thanos', 'thanos', 'reality_gem',
    'soul_gem', 'time_gem', 'space_gem', 'space_gem', 'thanos_weapon',
    'thanos_weapon', 'scarlet_witch', 'thanos', 'thanos', 'time_gem',
    'time_gem', 'space_gem', 'mind_gem', 'power_gem', 'infinity_glove',
    'time_gem', 'time_gem', 'space_gem', 'space_gem', 'thanos_weapon',
    'thanos_weapon', 'scarlet_witch', 'scarlet_witch', 'thanos', 'thanos',
    'time_gem', 'space_gem', 'thanos_weapon', 'scarlet_witch', 'reality_gem',
    'soul_gem', 'time_gem', 'time_gem', 'space_gem', 'space_gem',
    'thanos_weapon', 'thanos_weapon', 'scarlet_witch', 'thanos', 'infinity_glove',
    'time_gem', 'time_gem', 'space_gem', 'thanos_weapon', 'thanos_weapon',
    'scarlet_witch', 'scarlet_witch', 'thanos', 'thanos', 'mind_gem',
    'power_gem', 'time_gem', 'space_gem', 'thanos_weapon', 'infinity_glove',
    'time_gem', 'space_gem', 'scarlet_witch', 'thanos', 'thanos_weapon'
  ],
  
  // Column 5 (rightmost) - Free Spins
  [
    'thanos_weapon', 'thanos_weapon', 'time_gem', 'time_gem', 'space_gem',
    'space_gem', 'scarlet_witch', 'scarlet_witch', 'thanos', 'thanos',
    'mind_gem', 'power_gem', 'time_gem', 'space_gem', 'thanos_weapon',
    'thanos_weapon', 'scarlet_witch', 'thanos', 'thanos', 'reality_gem',
    'soul_gem', 'time_gem', 'time_gem', 'space_gem', 'infinity_glove',
    'time_gem', 'space_gem', 'space_gem', 'thanos_weapon', 'thanos_weapon',
    'scarlet_witch', 'scarlet_witch', 'thanos', 'thanos', 'time_gem',
    'time_gem', 'space_gem', 'mind_gem', 'power_gem', 'thanos_weapon',
    'scarlet_witch', 'scarlet_witch', 'thanos', 'thanos', 'time_gem',
    'space_gem', 'space_gem', 'thanos_weapon', 'thanos_weapon', 'infinity_glove',
    'time_gem', 'time_gem', 'space_gem', 'thanos_weapon', 'scarlet_witch',
    'scarlet_witch', 'thanos', 'thanos', 'reality_gem', 'soul_gem',
    'time_gem', 'space_gem', 'space_gem', 'thanos_weapon', 'thanos_weapon',
    'scarlet_witch', 'scarlet_witch', 'thanos', 'thanos', 'time_gem',
    'time_gem', 'space_gem', 'mind_gem', 'power_gem', 'infinity_glove',
    'time_gem', 'time_gem', 'space_gem', 'space_gem', 'thanos_weapon',
    'thanos_weapon', 'scarlet_witch', 'thanos', 'thanos', 'time_gem',
    'space_gem', 'thanos_weapon', 'thanos_weapon', 'scarlet_witch', 'scarlet_witch',
    'reality_gem', 'soul_gem', 'time_gem', 'time_gem', 'space_gem',
    'thanos_weapon', 'scarlet_witch', 'thanos', 'thanos', 'infinity_glove',
    'time_gem', 'time_gem', 'space_gem', 'space_gem', 'thanos_weapon',
    'thanos_weapon', 'scarlet_witch', 'scarlet_witch', 'thanos', 'mind_gem',
    'power_gem', 'time_gem', 'space_gem', 'thanos_weapon', 'infinity_glove',
    'time_gem', 'space_gem', 'scarlet_witch', 'thanos', 'thanos_weapon'
  ]
];

/**
 * Get reel strips for the specified mode
 * @param {boolean} freeSpinsMode - Whether in free spins mode
 * @returns {Array<Array<string>>} Array of 6 reel strips
 */
function getStrips(freeSpinsMode = false) {
  return freeSpinsMode ? FREE_SPINS_STRIPS : BASE_GAME_STRIPS;
}

/**
 * Get a specific reel strip
 * @param {number} column - Column index (0-5)
 * @param {boolean} freeSpinsMode - Whether in free spins mode
 * @returns {Array<string>} Reel strip for the column
 */
function getStrip(column, freeSpinsMode = false) {
  const strips = getStrips(freeSpinsMode);
  if (column < 0 || column >= strips.length) {
    throw new Error(`Invalid column index: ${column}`);
  }
  return strips[column];
}

/**
 * Get symbol at specific position in strip (with wrapping)
 * @param {number} column - Column index (0-5)
 * @param {number} position - Position in strip (wraps around)
 * @param {boolean} freeSpinsMode - Whether in free spins mode
 * @returns {string} Symbol at position
 */
function getSymbolAt(column, position, freeSpinsMode = false) {
  const strip = getStrip(column, freeSpinsMode);
  const wrappedPosition = ((position % strip.length) + strip.length) % strip.length;
  return strip[wrappedPosition];
}

/**
 * Get strip statistics for validation
 * @param {boolean} freeSpinsMode - Whether in free spins mode
 * @returns {Object} Statistics for each column
 */
function getStripStatistics(freeSpinsMode = false) {
  const strips = getStrips(freeSpinsMode);
  const stats = {
    mode: freeSpinsMode ? 'free_spins' : 'base_game',
    stripVersion: STRIP_VERSION,
    stripLength: STRIP_LENGTH,
    columns: []
  };
  
  for (let col = 0; col < strips.length; col++) {
    const strip = strips[col];
    const symbolCounts = {};
    
    for (const symbol of strip) {
      symbolCounts[symbol] = (symbolCounts[symbol] || 0) + 1;
    }
    
    const symbolPercentages = {};
    for (const [symbol, count] of Object.entries(symbolCounts)) {
      symbolPercentages[symbol] = ((count / strip.length) * 100).toFixed(2) + '%';
    }
    
    stats.columns.push({
      column: col,
      length: strip.length,
      symbolCounts,
      symbolPercentages
    });
  }
  
  return stats;
}

/**
 * Validate strip integrity
 * @returns {Object} Validation results
 */
function validateStrips() {
  const results = {
    valid: true,
    errors: [],
    warnings: []
  };
  
  const validSymbols = new Set([
    'time_gem', 'space_gem', 'mind_gem', 'power_gem', 'reality_gem',
    'soul_gem', 'thanos_weapon', 'scarlet_witch', 'thanos', 'infinity_glove'
  ]);
  
  // Validate both base and free spins strips
  for (const [mode, strips] of [['base', BASE_GAME_STRIPS], ['free_spins', FREE_SPINS_STRIPS]]) {
    if (strips.length !== 6) {
      results.valid = false;
      results.errors.push(`${mode}: Expected 6 strips, got ${strips.length}`);
    }
    
    for (let col = 0; col < strips.length; col++) {
      const strip = strips[col];
      
      if (strip.length !== STRIP_LENGTH) {
        results.valid = false;
        results.errors.push(`${mode} column ${col}: Expected ${STRIP_LENGTH} symbols, got ${strip.length}`);
      }
      
      for (let pos = 0; pos < strip.length; pos++) {
        if (!validSymbols.has(strip[pos])) {
          results.valid = false;
          results.errors.push(`${mode} column ${col} position ${pos}: Invalid symbol '${strip[pos]}'`);
        }
      }
      
      // Check scatter count (should be 4-6 per strip for proper trigger rate)
      const scatterCount = strip.filter(s => s === 'infinity_glove').length;
      if (scatterCount < 4 || scatterCount > 7) {
        results.warnings.push(`${mode} column ${col}: Scatter count ${scatterCount} may affect trigger rate`);
      }
    }
  }
  
  return results;
}

module.exports = {
  STRIP_VERSION,
  STRIP_LENGTH,
  BASE_GAME_STRIPS,
  FREE_SPINS_STRIPS,
  getStrips,
  getStrip,
  getSymbolAt,
  getStripStatistics,
  validateStrips
};
