import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function getWineTypeColor(type: string): string {
  switch (type.toLowerCase()) {
    case "red wine":
      return "bg-red-500";
    case "white wine":
      return "bg-yellow-500";
    case "rosé":
      return "bg-pink-500";
    case "sparkling":
      return "bg-blue-500";
    case "dessert wine":
      return "bg-purple-500";
    case "fortified wine":
      return "bg-amber-600";
    default:
      return "bg-gray-500";
  }
}

export function getRarityColor(rarity: string): string {
  switch (rarity.toLowerCase()) {
    case "common":
      return "text-gray-600 bg-gray-100";
    case "uncommon":
      return "text-green-600 bg-green-100";
    case "rare":
      return "text-blue-600 bg-blue-100";
    case "epic":
      return "text-purple-600 bg-purple-100";
    case "legendary":
      return "text-yellow-600 bg-yellow-100";
    default:
      return "text-gray-600 bg-gray-100";
  }
}

export function calculateLevel(experiencePoints: number): number {
  return Math.floor(Math.sqrt(experiencePoints / 100)) + 1;
}

export function getExperienceForNextLevel(currentLevel: number): number {
  return (currentLevel * currentLevel) * 100;
}

export function generateWineId(): string {
  return `wine_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function searchWines(wines: any[], searchTerm: string): any[] {
  if (!searchTerm.trim()) return wines;
  
  const term = searchTerm.toLowerCase();
  return wines.filter(wine => 
    wine.name.toLowerCase().includes(term) ||
    wine.region.toLowerCase().includes(term) ||
    wine.producer.toLowerCase().includes(term) ||
    wine.grape.toLowerCase().includes(term) ||
    wine.tastingNotes.toLowerCase().includes(term) ||
    wine.year.toString().includes(term)
  );
}

export function sortWines(wines: any[], sortBy: string, sortOrder: 'asc' | 'desc' = 'asc'): any[] {
  return [...wines].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];
    
    // Handle string comparisons
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
}

export function filterWinesByCategory(wines: any[], category: string, value: string): any[] {
  if (!value || value === 'all') return wines;
  
  switch (category) {
    case 'type':
      return wines.filter(wine => wine.type === value);
    case 'region':
      return wines.filter(wine => wine.region === value);
    case 'grape':
      return wines.filter(wine => wine.grape === value);
    case 'year':
      return wines.filter(wine => wine.year.toString() === value);
    case 'rating':
      return wines.filter(wine => wine.rating >= parseInt(value));
    default:
      return wines;
  }
}

export function getUniqueValues(wines: any[], field: string): string[] {
  const values = wines.map(wine => wine[field]);
  return [...new Set(values)].filter(Boolean).sort();
}