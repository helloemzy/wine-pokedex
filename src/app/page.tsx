'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, Grid3X3, List, Plus, TrendingUp } from 'lucide-react';
import PokedexHeader from '@/components/PokedexHeader';
import WineCard from '@/components/WineCard';
import WineTradingCard from '@/components/WineTradingCard';
import ScanModal from '@/components/ScanModal';
import WineSearchAndFilter from '@/components/WineSearchAndFilter';
import { WineStorageService, initializeSampleData } from '@/lib/wineStorage';
import type { Wine } from '@/types/wine';

export default function Home() {
  const [isScanning, setIsScanning] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'cards'>('cards');
  const [wines, setWines] = useState<Wine[]>([]);
  const [filteredWines, setFilteredWines] = useState<Wine[]>([]);
  const [collectionStats, setCollectionStats] = useState<any>(null);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  // Load wines from storage on component mount
  useEffect(() => {
    initializeSampleData();
    const loadedWines = WineStorageService.getWines();
    const stats = WineStorageService.getCollectionStats();
    
    setWines(loadedWines);
    setFilteredWines(loadedWines);
    setCollectionStats(stats);
  }, []);

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

  const refreshData = () => {
    const loadedWines = WineStorageService.getWines();
    const stats = WineStorageService.getCollectionStats();
    
    setWines(loadedWines);
    setFilteredWines(loadedWines);
    setCollectionStats(stats);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-40 left-1/4 w-12 h-12 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-20 right-1/3 w-24 h-24 border-2 border-white rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 py-6 relative z-10">
        <PokedexHeader />
        
        {/* Main Controls */}
        <motion.div 
          className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border border-white/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex gap-3">
              <motion.button
                onClick={() => setIsScanning(true)}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Camera size={20} />
                Scan Bottle
              </motion.button>
              
              <motion.button
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus size={20} />
                Add Manual
              </motion.button>
            </div>
            
            <div className="flex gap-3 items-center">
              <div className="flex bg-gray-100 rounded-full p-1">
                <button
                  onClick={() => setViewMode('cards')}
                  className={`p-2 rounded-full transition-all ${viewMode === 'cards' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:text-blue-500'}`}
                  title="Trading Cards"
                >
                  <TrendingUp size={16} />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-full transition-all ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:text-blue-500'}`}
                  title="Grid View"
                >
                  <Grid3X3 size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-full transition-all ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:text-blue-500'}`}
                  title="List View"
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <div className="mb-8">
          <WineSearchAndFilter 
            wines={wines}
            onFilteredWinesChange={setFilteredWines}
          />
        </div>

        {/* Wine Collection Stats */}
        {collectionStats && (
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-red-500/90 backdrop-blur-sm rounded-xl p-4 text-white text-center">
              <div className="text-3xl font-bold">{collectionStats.totalWines}</div>
              <div className="text-sm opacity-90">Wines Captured</div>
            </div>
            <div className="bg-yellow-500/90 backdrop-blur-sm rounded-xl p-4 text-white text-center">
              <div className="text-3xl font-bold">{collectionStats.uniqueRegions}</div>
              <div className="text-sm opacity-90">Regions</div>
            </div>
            <div className="bg-green-500/90 backdrop-blur-sm rounded-xl p-4 text-white text-center">
              <div className="text-3xl font-bold">{collectionStats.uniqueGrapes}</div>
              <div className="text-sm opacity-90">Grape Varieties</div>
            </div>
            <div className="bg-purple-500/90 backdrop-blur-sm rounded-xl p-4 text-white text-center">
              <div className="text-3xl font-bold">{collectionStats.averageRating.toFixed(1)}</div>
              <div className="text-sm opacity-90">Avg Rating</div>
            </div>
          </motion.div>
        )}

        {/* Wine Collection */}
        <motion.div 
          className={
            viewMode === 'cards' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8' :
            viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 
            'space-y-4'
          }
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {filteredWines.map((wine, index) => (
            <motion.div
              key={wine.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              {viewMode === 'cards' ? (
                <WineTradingCard 
                  wine={wine}
                  isFlipped={flippedCards.has(wine.id)}
                  onFlip={() => handleCardFlip(wine.id)}
                  size="medium"
                />
              ) : (
                <WineCard wine={wine} viewMode={viewMode} />
              )}
            </motion.div>
          ))}
        </motion.div>

        {filteredWines.length === 0 && wines.length > 0 && (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="text-6xl mb-6">🔍</div>
            <h2 className="text-2xl font-bold text-white mb-4">No Wines Found</h2>
            <p className="text-white/80 mb-8">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}

        {wines.length === 0 && (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="text-6xl mb-6">🍷</div>
            <h2 className="text-2xl font-bold text-white mb-4">Your Wine Collection is Empty</h2>
            <p className="text-white/80 mb-8">Start your wine journey by scanning your first bottle!</p>
            <motion.button
              onClick={() => setIsScanning(true)}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg transition-all mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Camera size={24} />
              Scan Your First Bottle
            </motion.button>
          </motion.div>
        )}
      </div>

      <ScanModal isOpen={isScanning} onClose={() => setIsScanning(false)} />
    </div>
  );
}
