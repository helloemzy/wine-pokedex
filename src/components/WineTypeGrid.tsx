'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Grid, BarChart3 } from 'lucide-react';
import { WINE_TYPES, WINE_REGIONS, ENHANCED_RARITY, getWineStats } from '@/lib/wineClassification';
import EnhancedWineTradingCard from './EnhancedWineTradingCard';
import type { Wine } from '@/types/wine';

interface WineTypeGridProps {
  wines: Wine[];
  onWineSelect?: (wine: Wine) => void;
}

type ViewMode = 'types' | 'regions' | 'rarity' | 'collection';
type SortMode = 'name' | 'rating' | 'year' | 'rarity';

export default function WineTypeGrid({ wines, onWineSelect }: WineTypeGridProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('types');
  const [sortMode, setSortMode] = useState<SortMode>('rating');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  const handleCardFlip = (wineId: number) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(wineId)) {
        newSet.delete(wineId);
      } else {
        newSet.add(wineId);
      }
      return newSet;
    });
  };

  // Group wines by category
  const groupedWines = wines.reduce((groups, wine) => {
    const stats = getWineStats(wine);
    let categoryKey: string;
    
    switch (viewMode) {
      case 'types':
        categoryKey = stats.classification.typeKey;
        break;
      case 'regions':
        categoryKey = stats.classification.regionKey || 'OTHER';
        break;
      case 'rarity':
        categoryKey = stats.classification.rarityKey;
        break;
      default:
        categoryKey = 'ALL';
    }
    
    if (!groups[categoryKey]) {
      groups[categoryKey] = [];
    }
    groups[categoryKey].push(wine);
    return groups;
  }, {} as Record<string, Wine[]>);

  // Sort wines within each group
  const sortWines = (wines: Wine[]) => {
    return [...wines].sort((a, b) => {
      switch (sortMode) {
        case 'rating':
          return b.rating - a.rating;
        case 'year':
          return b.year - a.year;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rarity':
          const aStats = getWineStats(a);
          const bStats = getWineStats(b);
          return Object.keys(ENHANCED_RARITY).indexOf(bStats.classification.rarityKey) - 
                 Object.keys(ENHANCED_RARITY).indexOf(aStats.classification.rarityKey);
        default:
          return 0;
      }
    });
  };

  const getCategoryInfo = (categoryKey: string) => {
    switch (viewMode) {
      case 'types':
        return WINE_TYPES[categoryKey as keyof typeof WINE_TYPES];
      case 'regions':
        return categoryKey === 'OTHER' 
          ? { name: 'Other Regions', color: '#6B7280', icon: '🌍', flag: '🌐' }
          : WINE_REGIONS[categoryKey as keyof typeof WINE_REGIONS];
      case 'rarity':
        return ENHANCED_RARITY[categoryKey as keyof typeof ENHANCED_RARITY];
      default:
        return null;
    }
  };

  const getCategoryStats = (wines: Wine[]) => {
    const totalWines = wines.length;
    const avgRating = wines.reduce((sum, wine) => sum + wine.rating, 0) / totalWines;
    const rarityDistribution = wines.reduce((acc, wine) => {
      const rarity = getWineStats(wine).classification.rarityKey;
      acc[rarity] = (acc[rarity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return { totalWines, avgRating, rarityDistribution };
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* View Mode Selector */}
        <div className="flex bg-white/90 backdrop-blur-sm rounded-xl p-1 shadow-lg">
          <button
            onClick={() => setViewMode('types')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              viewMode === 'types' 
                ? 'bg-blue-500 text-white shadow-md' 
                : 'text-gray-600 hover:bg-blue-50'
            }`}
          >
            <Grid size={16} />
            Wine Types
          </button>
          
          <button
            onClick={() => setViewMode('regions')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              viewMode === 'regions' 
                ? 'bg-green-500 text-white shadow-md' 
                : 'text-gray-600 hover:bg-green-50'
            }`}
          >
            <Filter size={16} />
            Regions
          </button>
          
          <button
            onClick={() => setViewMode('rarity')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              viewMode === 'rarity' 
                ? 'bg-purple-500 text-white shadow-md' 
                : 'text-gray-600 hover:bg-purple-50'
            }`}
          >
            <BarChart3 size={16} />
            Rarity
          </button>
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Sort by:</span>
          <select
            value={sortMode}
            onChange={(e) => setSortMode(e.target.value as SortMode)}
            className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="rating">Rating</option>
            <option value="year">Year</option>
            <option value="name">Name</option>
            <option value="rarity">Rarity</option>
          </select>
        </div>
      </div>

      {/* Category Grid */}
      <div className="space-y-8">
        {Object.entries(groupedWines).map(([categoryKey, categoryWines]) => {
          const categoryInfo = getCategoryInfo(categoryKey);
          const stats = getCategoryStats(categoryWines);
          const sortedWines = sortWines(categoryWines);

          if (!categoryInfo) return null;

          return (
            <motion.div
              key={categoryKey}
              className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Category Header */}
              <div 
                className="p-6 text-white cursor-pointer"
                style={{ 
                  background: `linear-gradient(135deg, ${categoryInfo.color} 0%, ${categoryInfo.color}CC 100%)` 
                }}
                onClick={() => setSelectedCategory(selectedCategory === categoryKey ? null : categoryKey)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">
                      {'icon' in categoryInfo ? categoryInfo.icon : ''}
                      {'flag' in categoryInfo ? categoryInfo.flag : ''}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{categoryInfo.name}</h3>
                      {'description' in categoryInfo && (
                        <p className="text-sm opacity-90">{categoryInfo.description}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold">{stats.totalWines}</div>
                    <div className="text-sm opacity-90">wines</div>
                    <div className="text-sm opacity-75">★ {stats.avgRating.toFixed(1)}</div>
                  </div>
                </div>

                {/* Rarity Distribution */}
                <div className="mt-4 flex gap-2">
                  {Object.entries(stats.rarityDistribution).map(([rarity, count]) => {
                    const rarityInfo = ENHANCED_RARITY[rarity as keyof typeof ENHANCED_RARITY];
                    return (
                      <div 
                        key={rarity}
                        className="px-2 py-1 bg-white/20 rounded text-xs flex items-center gap-1"
                      >
                        <div 
                          className="w-2 h-2 rounded-full" 
                          style={{ backgroundColor: rarityInfo.color }}
                        ></div>
                        <span>{count} {rarityInfo.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Wine Cards Grid */}
              <AnimatePresence>
                {(selectedCategory === categoryKey || selectedCategory === null) && (
                  <motion.div
                    className="p-6"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {sortedWines.map((wine, index) => (
                        <motion.div
                          key={wine.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <EnhancedWineTradingCard
                            wine={wine}
                            size="medium"
                            isFlipped={flippedCards.has(wine.id)}
                            onFlip={() => handleCardFlip(wine.id)}
                            onClick={() => onWineSelect?.(wine)}
                          />
                        </motion.div>
                      ))}
                    </div>

                    {sortedWines.length === 0 && (
                      <div className="text-center py-12 text-gray-500">
                        <div className="text-4xl mb-4">🍷</div>
                        <p>No wines found in this category</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {Object.keys(groupedWines).length === 0 && (
        <motion.div 
          className="text-center py-20 bg-white/90 backdrop-blur-sm rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-6xl mb-6">🍷</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No wines in your collection</h2>
          <p className="text-gray-600">Start collecting wines to see them organized here!</p>
        </motion.div>
      )}
    </div>
  );
}