'use client';

import { motion } from 'framer-motion';
import { Star, MapPin, Calendar, Award, Zap, Shield, Sparkles } from 'lucide-react';
import { getWineStats } from '@/lib/wineClassification';
import type { Wine } from '@/types/wine';

interface EnhancedWineTradingCardProps {
  wine: Wine;
  isFlipped?: boolean;
  onFlip?: () => void;
  onClick?: () => void;
  size?: 'small' | 'medium' | 'large';
}

export default function EnhancedWineTradingCard({ 
  wine, 
  isFlipped = false, 
  onFlip, 
  onClick,
  size = 'medium'
}: EnhancedWineTradingCardProps) {
  const stats = getWineStats(wine);
  
  const cardSizes = {
    small: 'w-48 h-72',
    medium: 'w-64 h-96',
    large: 'w-80 h-[480px]'
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={size === 'small' ? 12 : 16}
        className={index < rating ? "text-yellow-400 fill-current" : "text-gray-300"}
      />
    ));
  };

  const CardFront = () => (
    <div className="absolute inset-0 backface-hidden">
      {/* Rarity glow effect */}
      {stats.rarity.glow && (
        <div className={`absolute -inset-1 bg-gradient-to-r from-transparent via-current to-transparent rounded-2xl ${stats.rarity.glow} -z-10`} 
             style={{ color: stats.rarity.color }}></div>
      )}
      
      {/* Holographic effect for rare cards */}
      {(stats.classification.rarityKey === 'EPIC' || stats.classification.rarityKey === 'LEGENDARY') && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-400/30 to-pink-400/20 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500 shimmer"></div>
      )}
      
      {/* Main card border with rarity color */}
      <div className={`absolute inset-0 rounded-2xl border-4 ${stats.rarity.border}`}></div>
      
      {/* Header with wine type and region */}
      <div className="relative text-white p-3 rounded-t-2xl"
           style={{ background: `linear-gradient(135deg, ${stats.type.color} 0%, ${stats.region?.color || stats.type.color} 100%)` }}>
        
        {/* Type and rarity indicators */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1">
            <span className="text-lg">{stats.type.icon}</span>
            <span className="text-xs font-bold">{stats.type.name.toUpperCase()}</span>
          </div>
          
          <div className="flex items-center gap-1">
            {stats.region && <span className="text-sm">{stats.region.flag}</span>}
            <span className={`px-2 py-1 rounded-full text-xs font-bold border`} 
                  style={{ 
                    backgroundColor: stats.rarity.color + '20', 
                    borderColor: stats.rarity.color,
                    color: stats.rarity.color 
                  }}>
              {stats.rarity.name}
            </span>
          </div>
        </div>

        {/* Wine name and year */}
        <div className="text-center">
          <h3 className="text-lg font-bold truncate mb-1">{wine.name}</h3>
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm opacity-90">{wine.year}</span>
            <span className="text-xs opacity-75">#{wine.id.toString().padStart(3, '0')}</span>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="relative bg-gradient-to-b from-gray-50 to-white p-4 flex-1">
        {/* Power level indicator */}
        <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold"
             style={{ backgroundColor: stats.powerLevel.color + '20', color: stats.powerLevel.color }}>
          <Zap size={12} />
          <span>{stats.powerLevel.name}</span>
        </div>

        {/* Wine bottle visualization with type coloring */}
        <div className="flex flex-col items-center justify-center h-full">
          <div className="relative mb-4">
            <div className="w-16 h-32 rounded-b-lg opacity-80 relative shadow-lg"
                 style={{ backgroundColor: stats.type.color }}>
              {/* Bottle neck */}
              <div className="w-4 h-8 bg-gray-700 mx-auto -mb-8 relative z-10"></div>
              {/* Cork */}
              <div className="w-6 h-3 bg-amber-200 mx-auto -mb-3 relative z-20 rounded-t"></div>
              {/* Label with wine type icon */}
              <div className="absolute inset-x-2 top-8 bottom-8 bg-white/90 rounded flex flex-col items-center justify-center">
                <span className="text-2xl">{stats.type.icon}</span>
                <div className="text-xs font-bold text-gray-800 transform rotate-90 origin-center writing-vertical-rl">
                  {wine.producer.slice(0, 8)}
                </div>
              </div>
            </div>
          </div>
          
          {/* Wine details */}
          <div className="text-center space-y-2 w-full">
            <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
              <MapPin size={12} />
              <span className="truncate">{wine.region}</span>
            </div>
            
            <div className="text-xs text-gray-500">
              {wine.grape}
            </div>
            
            <div className="flex items-center justify-center gap-1">
              {renderStars(wine.rating)}
            </div>
          </div>
        </div>

        {/* Stats bar at bottom */}
        <div className="absolute bottom-2 left-2 right-2">
          <div className="flex justify-between text-xs">
            <div className="flex items-center gap-1">
              <Award size={10} />
              <span>{wine.experiencePoints} XP</span>
            </div>
            
            {stats.region && (
              <div className="flex items-center gap-1">
                <Shield size={10} />
                <span>{stats.region.type}</span>
              </div>
            )}
            
            <div className="flex items-center gap-1">
              <Sparkles size={10} />
              <span>{stats.rarity.probability}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer with capture indicator */}
      <div className="bg-gradient-to-r from-slate-100 to-slate-50 p-2 rounded-b-2xl">
        <div className="flex justify-between items-center text-xs">
          <div className="flex items-center gap-1">
            <Calendar size={10} />
            <span>Vintage {wine.year}</span>
          </div>
          
          {wine.captured && (
            <div className="flex items-center gap-1 text-green-600">
              <Award size={10} />
              <span>Captured</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const CardBack = () => (
    <div className="absolute inset-0 backface-hidden transform rotate-y-180">
      {/* Card border */}
      <div className={`absolute inset-0 rounded-2xl border-4 ${stats.rarity.border}`}></div>
      
      {/* Background pattern */}
      <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-4 h-full flex flex-col">
        {/* Header */}
        <div className="text-center mb-4">
          <h4 className="font-bold text-gray-800">{wine.name}</h4>
          <p className="text-sm text-gray-600">{wine.producer}</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <span style={{ color: stats.type.color }} className="font-bold text-sm">
              {stats.type.name}
            </span>
            {stats.region && (
              <>
                <span className="text-gray-400">•</span>
                <span style={{ color: stats.region.color }} className="font-bold text-sm">
                  {stats.region.name}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Classification details */}
        <div className="bg-white/80 rounded-lg p-3 mb-3">
          <h5 className="font-semibold text-sm mb-2 text-gray-800">Classification</h5>
          <div className="space-y-1 text-xs text-gray-700">
            <div><strong>Type:</strong> {stats.type.description}</div>
            <div><strong>Power:</strong> {stats.powerLevel.description}</div>
            <div><strong>Rarity:</strong> {stats.rarity.description}</div>
          </div>
        </div>

        {/* Tasting notes */}
        <div className="bg-white/80 rounded-lg p-3 mb-3 flex-1">
          <h5 className="font-semibold text-sm mb-2 text-gray-800">Tasting Notes</h5>
          <p className="text-xs text-gray-700 leading-relaxed">
            {wine.tastingNotes}
          </p>
        </div>

        {/* Type advantages (Pokemon-style) */}
        {stats.type.examples && (
          <div className="bg-white/60 rounded-lg p-2 mb-3">
            <h5 className="font-semibold text-xs mb-1 text-gray-800">Similar Wines</h5>
            <div className="flex flex-wrap gap-1">
              {stats.type.examples.slice(0, 3).map((example, index) => (
                <span key={index} className="text-xs bg-gray-200 px-2 py-1 rounded">
                  {example}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 text-xs text-center">
          <div className="bg-white/60 rounded p-2">
            <div className="font-bold text-blue-600">{wine.rating}</div>
            <div className="text-gray-600">Rating</div>
          </div>
          <div className="bg-white/60 rounded p-2">
            <div className="font-bold text-green-600">{wine.experiencePoints}</div>
            <div className="text-gray-600">XP</div>
          </div>
          <div className="bg-white/60 rounded p-2">
            <div className="font-bold text-purple-600">{wine.year}</div>
            <div className="text-gray-600">Year</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      className={`${cardSizes[size]} relative cursor-pointer perspective-1000`}
      onClick={onClick}
      onDoubleClick={onFlip}
      whileHover={{ 
        scale: 1.05,
        rotateX: 5,
        rotateY: isFlipped ? 185 : 5,
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        <div className="absolute inset-0 rounded-2xl shadow-2xl bg-white">
          <CardFront />
          <CardBack />
        </div>
        
        {/* Captured indicator */}
        {wine.captured && (
          <motion.div
            className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center z-20"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <Award size={16} className="text-white" />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}