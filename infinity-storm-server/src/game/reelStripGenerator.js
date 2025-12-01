/**
 * Reel Strip Generator
 * 
 * Industry-standard reel strip based grid generation for casino-grade RNG.
 * Uses predefined reel strips instead of per-cell weighted random selection.
 * 
 * Benefits:
 * - Only 6 RNG calls per initial grid (vs 30+ with weighted random)
 * - Full spin reproducibility from stop positions + strip version
 * - Mathematically verifiable RTP from strip composition
 * - Industry-standard audit compliance
 * 
 * @version 1.0.0
 */

const { getRNG } = require('./rng');
const { 
  STRIP_VERSION, 
  STRIP_LENGTH, 
  getStrips, 
  getStrip, 
  getSymbolAt,
  getStripStatistics 
} = require('./reelStrips');

class ReelStripGenerator {
  /**
   * Create a new ReelStripGenerator
   * @param {Object} options - Configuration options
   * @param {Object} options.rng - RNG instance (defaults to singleton)
   * @param {number} options.rows - Number of rows in grid (default: 5)
   * @param {number} options.cols - Number of columns in grid (default: 6)
   * @param {boolean} options.auditLogging - Enable audit logging (default: true)
   */
  constructor(options = {}) {
    this.rng = options.rng || getRNG();
    this.rows = options.rows || 5;
    this.cols = options.cols || 6;
    this.auditLogging = options.auditLogging !== false;
    
    // Statistics tracking
    this.statistics = {
      gridsGenerated: 0,
      symbolsGenerated: 0,
      replacementSymbolsGenerated: 0,
      lastStopPositions: null,
      initialized: Date.now()
    };
    
    this.logAuditEvent('REEL_STRIP_GENERATOR_INITIALIZED', {
      stripVersion: STRIP_VERSION,
      stripLength: STRIP_LENGTH,
      gridDimensions: `${this.cols}x${this.rows}`
    });
  }
  
  /**
   * Generate initial grid using reel strip stop positions
   * @param {Object} options - Generation options
   * @param {boolean} options.freeSpinsMode - Whether in free spins mode
   * @param {string} options.seed - Optional seed for deterministic results
   * @returns {Object} Grid result with metadata
   */
  generateInitialGrid(options = {}) {
    const { freeSpinsMode = false, seed = null } = options;
    const startTime = Date.now();
    
    // Get appropriate strips for game mode
    const strips = getStrips(freeSpinsMode);
    
    // Generate stop positions - ONE RNG call per column
    const stopPositions = this.generateStopPositions(seed);
    
    // Build grid from stop positions
    const grid = [];
    const symbolCounts = {};
    
    for (let col = 0; col < this.cols; col++) {
      const column = [];
      const strip = strips[col];
      const stopPos = stopPositions[col];
      
      for (let row = 0; row < this.rows; row++) {
        // Read consecutive symbols from strip starting at stop position
        const stripIndex = (stopPos + row) % strip.length;
        const symbol = strip[stripIndex];
        column.push(symbol);
        symbolCounts[symbol] = (symbolCounts[symbol] || 0) + 1;
      }
      
      grid.push(column);
    }
    
    const endTime = Date.now();
    
    // Update statistics
    this.statistics.gridsGenerated++;
    this.statistics.symbolsGenerated += this.cols * this.rows;
    this.statistics.lastStopPositions = stopPositions;
    
    const result = {
      grid,
      stopPositions,
      stripVersion: STRIP_VERSION,
      symbolCounts,
      metadata: {
        generationMethod: 'reel_strips',
        freeSpinsMode,
        generationTimeMs: endTime - startTime,
        rngCalls: this.cols, // Only 6 RNG calls!
        seeded: !!seed
      }
    };
    
    this.logAuditEvent('GRID_GENERATED_FROM_STRIPS', {
      stopPositions,
      stripVersion: STRIP_VERSION,
      freeSpinsMode,
      symbolCounts,
      generationTimeMs: endTime - startTime
    });
    
    return result;
  }
  
  /**
   * Generate stop positions for all columns
   * @param {string} seed - Optional seed for deterministic results
   * @returns {Array<number>} Array of 6 stop positions
   */
  generateStopPositions(seed = null) {
    const stopPositions = [];
    
    if (seed) {
      // Use seeded RNG for deterministic results
      const seededRNG = this.rng.createSeededRNG(seed);
      for (let col = 0; col < this.cols; col++) {
        const position = Math.floor(seededRNG() * STRIP_LENGTH);
        stopPositions.push(position);
      }
    } else {
      // Use crypto-secure RNG
      for (let col = 0; col < this.cols; col++) {
        const position = this.rng.randomInt(0, STRIP_LENGTH - 1);
        stopPositions.push(position);
      }
    }
    
    this.logAuditEvent('STOP_POSITIONS_GENERATED', {
      positions: stopPositions,
      seeded: !!seed,
      stripLength: STRIP_LENGTH
    });
    
    return stopPositions;
  }
  
  /**
   * Generate a single replacement symbol for cascade refill
   * Uses the column's reel strip for consistent distribution
   * @param {number} column - Column index (0-5)
   * @param {boolean} freeSpinsMode - Whether in free spins mode
   * @param {string} seed - Optional seed for deterministic results
   * @returns {Object} Symbol and strip position for audit
   */
  generateReplacementSymbol(column, freeSpinsMode = false, seed = null) {
    if (column < 0 || column >= this.cols) {
      throw new Error(`Invalid column index: ${column}`);
    }
    
    const strip = getStrip(column, freeSpinsMode);
    let stripPosition;
    
    if (seed) {
      const seededRNG = this.rng.createSeededRNG(seed);
      stripPosition = Math.floor(seededRNG() * strip.length);
    } else {
      stripPosition = this.rng.randomInt(0, strip.length - 1);
    }
    
    const symbol = strip[stripPosition];
    
    // Update statistics
    this.statistics.replacementSymbolsGenerated++;
    
    this.logAuditEvent('REPLACEMENT_SYMBOL_GENERATED', {
      column,
      stripPosition,
      symbol,
      freeSpinsMode,
      stripVersion: STRIP_VERSION
    });
    
    return {
      symbol,
      stripPosition,
      column,
      stripVersion: STRIP_VERSION,
      freeSpinsMode
    };
  }
  
  /**
   * Generate multiple replacement symbols for cascade refill
   * @param {Array<Object>} positions - Array of {col, row} positions to fill
   * @param {boolean} freeSpinsMode - Whether in free spins mode
   * @param {string} cascadeSeed - Optional seed for deterministic results
   * @returns {Array<Object>} Array of replacement symbol data
   */
  generateReplacementSymbols(positions, freeSpinsMode = false, cascadeSeed = null) {
    const replacements = [];
    
    // Group by column for efficient strip access
    const byColumn = {};
    for (const pos of positions) {
      if (!byColumn[pos.col]) {
        byColumn[pos.col] = [];
      }
      byColumn[pos.col].push(pos);
    }
    
    // Generate symbols for each column
    for (const [colStr, colPositions] of Object.entries(byColumn)) {
      const col = parseInt(colStr, 10);
      const strip = getStrip(col, freeSpinsMode);
      
      for (const pos of colPositions) {
        // Generate unique seed for each position if base seed provided
        const positionSeed = cascadeSeed 
          ? `${cascadeSeed}_${col}_${pos.row}` 
          : null;
        
        let stripPosition;
        if (positionSeed) {
          const seededRNG = this.rng.createSeededRNG(positionSeed);
          stripPosition = Math.floor(seededRNG() * strip.length);
        } else {
          stripPosition = this.rng.randomInt(0, strip.length - 1);
        }
        
        const symbol = strip[stripPosition];
        
        replacements.push({
          col: pos.col,
          row: pos.row,
          symbol,
          stripPosition,
          stripVersion: STRIP_VERSION
        });
        
        this.statistics.replacementSymbolsGenerated++;
      }
    }
    
    this.logAuditEvent('REPLACEMENT_SYMBOLS_BATCH_GENERATED', {
      count: replacements.length,
      freeSpinsMode,
      stripVersion: STRIP_VERSION
    });
    
    return replacements;
  }
  
  /**
   * Reconstruct a grid from stop positions (for audit/replay)
   * @param {Array<number>} stopPositions - Array of 6 stop positions
   * @param {boolean} freeSpinsMode - Whether in free spins mode
   * @param {string} stripVersion - Strip version to use (must match)
   * @returns {Array<Array<string>>} Reconstructed grid
   */
  reconstructGrid(stopPositions, freeSpinsMode = false, stripVersion = STRIP_VERSION) {
    if (stripVersion !== STRIP_VERSION) {
      throw new Error(`Strip version mismatch: expected ${STRIP_VERSION}, got ${stripVersion}`);
    }
    
    if (!Array.isArray(stopPositions) || stopPositions.length !== this.cols) {
      throw new Error(`Invalid stop positions: expected ${this.cols} positions`);
    }
    
    const strips = getStrips(freeSpinsMode);
    const grid = [];
    
    for (let col = 0; col < this.cols; col++) {
      const column = [];
      const strip = strips[col];
      const stopPos = stopPositions[col];
      
      for (let row = 0; row < this.rows; row++) {
        const stripIndex = (stopPos + row) % strip.length;
        column.push(strip[stripIndex]);
      }
      
      grid.push(column);
    }
    
    this.logAuditEvent('GRID_RECONSTRUCTED', {
      stopPositions,
      stripVersion,
      freeSpinsMode
    });
    
    return grid;
  }
  
  /**
   * Get generator statistics
   * @returns {Object} Statistics object
   */
  getStatistics() {
    return {
      ...this.statistics,
      stripVersion: STRIP_VERSION,
      stripLength: STRIP_LENGTH,
      uptime: Date.now() - this.statistics.initialized
    };
  }
  
  /**
   * Get strip statistics for validation
   * @param {boolean} freeSpinsMode - Whether in free spins mode
   * @returns {Object} Strip statistics
   */
  getStripStatistics(freeSpinsMode = false) {
    return getStripStatistics(freeSpinsMode);
  }
  
  /**
   * Reset statistics
   */
  resetStatistics() {
    this.statistics = {
      gridsGenerated: 0,
      symbolsGenerated: 0,
      replacementSymbolsGenerated: 0,
      lastStopPositions: null,
      initialized: Date.now()
    };
    
    this.logAuditEvent('REEL_STRIP_GENERATOR_STATS_RESET', {});
  }
  
  /**
   * Log audit event
   * @param {string} event - Event type
   * @param {Object} data - Event data
   * @private
   */
  logAuditEvent(event, data = {}) {
    if (!this.auditLogging) {
      return;
    }
    
    this.rng.emit('audit_event', {
      timestamp: Date.now(),
      event,
      data: {
        ...data,
        generator: 'ReelStripGenerator'
      }
    });
  }
}

// Singleton instance
let instance = null;

/**
 * Get or create singleton ReelStripGenerator instance
 * @param {Object} options - Configuration options
 * @returns {ReelStripGenerator} Generator instance
 */
function getReelStripGenerator(options = {}) {
  if (!instance) {
    instance = new ReelStripGenerator(options);
  }
  return instance;
}

/**
 * Create a new ReelStripGenerator instance (for testing or isolation)
 * @param {Object} options - Configuration options
 * @returns {ReelStripGenerator} New generator instance
 */
function createReelStripGenerator(options = {}) {
  return new ReelStripGenerator(options);
}

module.exports = {
  ReelStripGenerator,
  getReelStripGenerator,
  createReelStripGenerator,
  STRIP_VERSION
};

