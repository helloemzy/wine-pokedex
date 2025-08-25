export interface Wine {
  id: number;
  name: string;
  year: number;
  region: string;
  producer: string;
  type: 'Red Wine' | 'White Wine' | 'Rosé' | 'Sparkling' | 'Dessert Wine' | 'Fortified Wine';
  grape: string;
  rating: number;
  tastingNotes: string;
  captured: boolean;
  dateAdded: Date;
  
  // WSET Level 3 Systematic Approach to Tasting
  appearance?: {
    intensity: 'Pale' | 'Medium' | 'Deep';
    color: string;
    otherObservations?: string;
  };
  
  nose?: {
    intensity: 'Light' | 'Medium(-)' | 'Medium' | 'Medium(+)' | 'Pronounced';
    primaryAromas: string[];
    secondaryAromas?: string[];
    tertiaryAromas?: string[];
  };
  
  palate?: {
    sweetness: 'Bone Dry' | 'Dry' | 'Off-Dry' | 'Medium-Dry' | 'Medium-Sweet' | 'Sweet' | 'Lusciously Sweet';
    acidity: 'Low' | 'Medium(-)' | 'Medium' | 'Medium(+)' | 'High';
    tannin?: 'Low' | 'Medium(-)' | 'Medium' | 'Medium(+)' | 'High';
    alcohol: 'Low' | 'Medium' | 'Medium(+)' | 'High';
    body: 'Light' | 'Medium(-)' | 'Medium' | 'Medium(+)' | 'Full';
    finish: 'Short' | 'Medium(-)' | 'Medium' | 'Medium(+)' | 'Long';
  };
  
  // Additional metadata
  abv?: number;
  temperature?: number; // serving temperature
  decantTime?: number; // in minutes
  peakDrinkingWindow?: {
    start: number;
    end: number;
  };
  
  // User additions
  personalNotes?: string;
  voiceNoteUrl?: string;
  photoUrl?: string;
  purchaseLocation?: string;
  price?: number;
  
  // Gamification elements
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary';
  experiencePoints: number;
  badges?: string[];
}

export interface WineCollection {
  id: string;
  name: string;
  wines: Wine[];
  totalExperience: number;
  level: number;
  badges: CollectionBadge[];
}

export interface CollectionBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedDate: Date;
  category: 'Regional' | 'Grape' | 'Vintage' | 'Tasting' | 'Collection' | 'Special';
}

export interface TastingSession {
  id: string;
  date: Date;
  wines: Wine[];
  theme?: string;
  notes?: string;
  participants?: string[];
  location?: string;
}

export interface WSETTastingNote {
  appearance: {
    intensity: string;
    color: string;
    otherObservations?: string;
  };
  nose: {
    condition: 'Clean' | 'Unclean';
    intensity: string;
    developmentLevel: 'Youthful' | 'Developing' | 'Fully Developed' | 'Tired';
    primaryAromas: string[];
    secondaryAromas: string[];
    tertiaryAromas: string[];
  };
  palate: {
    sweetness: string;
    acidity: string;
    tannin?: string;
    alcohol: string;
    body: string;
    flavorIntensity: string;
    flavorCharacteristics: string[];
    finish: string;
  };
  conclusions: {
    quality: 'Faulty' | 'Poor' | 'Acceptable' | 'Good' | 'Very Good' | 'Outstanding';
    levelOfReadiness: 'Too Young' | 'Ready to Drink' | 'Past its Best';
    suitableFor?: string;
  };
}