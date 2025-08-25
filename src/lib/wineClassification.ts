import type { Wine } from '@/types/wine';

// Wine Type Classifications (similar to Pokemon types)
export const WINE_TYPES = {
  // Red Wine Sub-types
  RED_LIGHT: {
    name: 'Light Red',
    color: '#FF6B7D',
    icon: '🍒',
    description: 'Light-bodied red wines with bright acidity',
    examples: ['Pinot Noir', 'Beaujolais', 'Dolcetto']
  },
  RED_MEDIUM: {
    name: 'Medium Red', 
    color: '#DC2626',
    icon: '🍷',
    description: 'Medium-bodied reds with balanced tannins',
    examples: ['Merlot', 'Sangiovese', 'Tempranillo']
  },
  RED_FULL: {
    name: 'Full Red',
    color: '#7F1D1D',
    icon: '🥀',
    description: 'Full-bodied reds with bold tannins and structure',
    examples: ['Cabernet Sauvignon', 'Syrah', 'Malbec']
  },
  
  // White Wine Sub-types
  WHITE_CRISP: {
    name: 'Crisp White',
    color: '#FBBF24',
    icon: '🍋',
    description: 'Light, crisp whites with high acidity',
    examples: ['Sauvignon Blanc', 'Albariño', 'Vinho Verde']
  },
  WHITE_RICH: {
    name: 'Rich White',
    color: '#F59E0B',
    icon: '🧈',
    description: 'Full-bodied whites with creamy texture',
    examples: ['Chardonnay', 'Viognier', 'White Rioja']
  },
  WHITE_AROMATIC: {
    name: 'Aromatic White',
    color: '#FDE047',
    icon: '🌸',
    description: 'Highly aromatic whites with floral notes',
    examples: ['Riesling', 'Gewürztraminer', 'Moscato']
  },
  
  // Specialty Types
  SPARKLING: {
    name: 'Sparkling',
    color: '#E5E7EB',
    icon: '🥂',
    description: 'Wines with natural or added carbonation',
    examples: ['Champagne', 'Prosecco', 'Cava']
  },
  ROSE: {
    name: 'Rosé',
    color: '#F9A8D4',
    icon: '🌹',
    description: 'Pink wines with fresh, fruity character',
    examples: ['Provence Rosé', 'Rosado', 'White Zinfandel']
  },
  DESSERT: {
    name: 'Dessert',
    color: '#A855F7',
    icon: '🍯',
    description: 'Sweet wines perfect for dessert',
    examples: ['Port', 'Sauternes', 'Ice Wine']
  },
  FORTIFIED: {
    name: 'Fortified',
    color: '#92400E',
    icon: '🛡️',
    description: 'Wines strengthened with additional alcohol',
    examples: ['Sherry', 'Madeira', 'Vermouth']
  }
} as const;

// Power Level Classification (similar to Pokemon CP/stats)
export const WINE_POWER_LEVELS = {
  EVERYDAY: {
    name: 'Everyday Drinker',
    range: [1, 2],
    color: '#9CA3AF',
    description: 'Simple, approachable wines for daily enjoyment'
  },
  QUALITY: {
    name: 'Quality Wine',
    range: [3, 3],
    color: '#3B82F6', 
    description: 'Well-made wines with good character'
  },
  PREMIUM: {
    name: 'Premium Wine',
    range: [4, 4],
    color: '#7C3AED',
    description: 'High-quality wines from renowned producers'
  },
  LEGENDARY: {
    name: 'Legendary Wine',
    range: [5, 5],
    color: '#F59E0B',
    description: 'Exceptional wines of legendary status'
  }
} as const;

// Rarity Classification Enhancement
export const ENHANCED_RARITY = {
  COMMON: {
    name: 'Common',
    probability: 70,
    color: '#9CA3AF',
    border: 'border-gray-400',
    glow: '',
    description: 'Widely available wines under $25'
  },
  UNCOMMON: {
    name: 'Uncommon', 
    probability: 20,
    color: '#22C55E',
    border: 'border-green-400',
    glow: 'shadow-green-400/50',
    description: 'Quality wines $25-50'
  },
  RARE: {
    name: 'Rare',
    probability: 7,
    color: '#3B82F6', 
    border: 'border-blue-400',
    glow: 'shadow-blue-400/50',
    description: 'Special wines $50-100'
  },
  EPIC: {
    name: 'Epic',
    probability: 2.5,
    color: '#A855F7',
    border: 'border-purple-400', 
    glow: 'shadow-purple-400/50',
    description: 'Premium wines $100-300'
  },
  LEGENDARY: {
    name: 'Legendary',
    probability: 0.5,
    color: '#F59E0B',
    border: 'border-yellow-400',
    glow: 'shadow-yellow-400/75 shadow-lg',
    description: 'Ultra-rare wines $300+'
  }
} as const;

// Regional Classifications (similar to Pokemon generations/regions)
export const WINE_REGIONS = {
  // Old World (Traditional)
  FRANCE: {
    name: 'France',
    flag: '🇫🇷',
    type: 'Old World',
    color: '#1E40AF',
    specialties: ['Burgundy', 'Bordeaux', 'Champagne', 'Rhône']
  },
  ITALY: {
    name: 'Italy', 
    flag: '🇮🇹',
    type: 'Old World',
    color: '#DC2626',
    specialties: ['Tuscany', 'Piedmont', 'Veneto', 'Sicily']
  },
  SPAIN: {
    name: 'Spain',
    flag: '🇪🇸', 
    type: 'Old World',
    color: '#EA580C',
    specialties: ['Rioja', 'Ribera del Duero', 'Rías Baixas']
  },
  GERMANY: {
    name: 'Germany',
    flag: '🇩🇪',
    type: 'Old World', 
    color: '#1F2937',
    specialties: ['Mosel', 'Rheingau', 'Pfalz']
  },
  
  // New World (Modern)
  CALIFORNIA: {
    name: 'California',
    flag: '🏖️',
    type: 'New World',
    color: '#FBBF24',
    specialties: ['Napa Valley', 'Sonoma', 'Central Coast']
  },
  AUSTRALIA: {
    name: 'Australia',
    flag: '🇦🇺',
    type: 'New World',
    color: '#16A34A', 
    specialties: ['Barossa Valley', 'Hunter Valley', 'Adelaide Hills']
  },
  CHILE: {
    name: 'Chile',
    flag: '🇨🇱',
    type: 'New World',
    color: '#7C2D12',
    specialties: ['Maipo Valley', 'Casablanca Valley', 'Colchagua']
  },
  ARGENTINA: {
    name: 'Argentina',
    flag: '🇦🇷', 
    type: 'New World',
    color: '#7C3AED',
    specialties: ['Mendoza', 'Salta', 'San Juan']
  }
} as const;

// Wine Classification Functions
export function classifyWineType(wine: Wine): keyof typeof WINE_TYPES {
  const { type, grape, palate } = wine;
  
  if (type === 'Sparkling') return 'SPARKLING';
  if (type === 'Rosé') return 'ROSE';
  if (type === 'Dessert Wine') return 'DESSERT';
  if (type === 'Fortified Wine') return 'FORTIFIED';
  
  if (type === 'Red Wine') {
    // Analyze body and tannins if available
    if (palate?.body === 'Light' || palate?.tannin === 'Low') return 'RED_LIGHT';
    if (palate?.body === 'Full' || palate?.tannin === 'High') return 'RED_FULL';
    return 'RED_MEDIUM';
  }
  
  if (type === 'White Wine') {
    // Check for aromatic varieties
    const aromaticGrapes = ['Riesling', 'Gewürztraminer', 'Moscato', 'Muscat'];
    if (aromaticGrapes.some(g => grape.includes(g))) return 'WHITE_AROMATIC';
    
    // Check for rich styles
    if (grape.includes('Chardonnay') || palate?.body === 'Full') return 'WHITE_RICH';
    
    return 'WHITE_CRISP';
  }
  
  return 'WHITE_CRISP'; // Default
}

export function calculatePowerLevel(wine: Wine): keyof typeof WINE_POWER_LEVELS {
  const rating = wine.rating;
  
  if (rating <= 2) return 'EVERYDAY';
  if (rating === 3) return 'QUALITY';
  if (rating === 4) return 'PREMIUM';
  if (rating === 5) return 'LEGENDARY';
  
  return 'EVERYDAY';
}

export function determineRarity(wine: Wine): keyof typeof ENHANCED_RARITY {
  const currentYear = new Date().getFullYear();
  const age = currentYear - wine.year;
  let score = 0;
  
  // Rating contribution
  score += wine.rating * 20;
  
  // Age contribution
  if (age >= 20) score += 30;
  else if (age >= 10) score += 20;
  else if (age >= 5) score += 10;
  
  // Producer reputation (simplified)
  const premiumProducers = [
    'Château Margaux', 'Domaine de la Romanée-Conti', 'Screaming Eagle',
    'Penfolds Grange', 'Château Le Pin', 'Domaine Leroy'
  ];
  if (premiumProducers.some(p => wine.producer.includes(p))) score += 40;
  
  // Region prestige
  const prestigiousRegions = [
    'Bordeaux', 'Burgundy', 'Champagne', 'Napa Valley', 'Barolo', 'Mosel'
  ];
  if (prestigiousRegions.some(r => wine.region.includes(r))) score += 15;
  
  if (score >= 100) return 'LEGENDARY';
  if (score >= 80) return 'EPIC';
  if (score >= 60) return 'RARE';
  if (score >= 40) return 'UNCOMMON';
  return 'COMMON';
}

export function getRegionalClassification(wine: Wine): keyof typeof WINE_REGIONS | null {
  const region = wine.region.toLowerCase();
  
  if (region.includes('france') || region.includes('bordeaux') || 
      region.includes('burgundy') || region.includes('champagne')) return 'FRANCE';
  if (region.includes('italy') || region.includes('tuscany') || 
      region.includes('piedmont')) return 'ITALY';
  if (region.includes('spain') || region.includes('rioja')) return 'SPAIN';
  if (region.includes('germany') || region.includes('mosel')) return 'GERMANY';
  if (region.includes('california') || region.includes('napa') || 
      region.includes('sonoma')) return 'CALIFORNIA';
  if (region.includes('australia')) return 'AUSTRALIA';
  if (region.includes('chile')) return 'CHILE';
  if (region.includes('argentina') || region.includes('mendoza')) return 'ARGENTINA';
  
  return null;
}

// Enhanced wine statistics for trading card system
export function getWineStats(wine: Wine) {
  const wineType = classifyWineType(wine);
  const powerLevel = calculatePowerLevel(wine);  
  const rarity = determineRarity(wine);
  const region = getRegionalClassification(wine);
  
  return {
    type: WINE_TYPES[wineType],
    powerLevel: WINE_POWER_LEVELS[powerLevel],
    rarity: ENHANCED_RARITY[rarity], 
    region: region ? WINE_REGIONS[region] : null,
    classification: {
      typeKey: wineType,
      powerKey: powerLevel,
      rarityKey: rarity,
      regionKey: region
    }
  };
}