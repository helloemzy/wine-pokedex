'use client';

import { motion } from 'framer-motion';
import { Star, MapPin, Calendar, Grape, Award, Sparkles, Eye, Mic } from 'lucide-react';
import { getRarityColor, getWineTypeColor } from '@/lib/utils';
import type { Wine } from '@/types/wine';

interface WineTradingCardProps {
  wine: Wine;
  isFlipped?: boolean;
  onFlip?: () => void;
  onClick?: () => void;
  size?: 'small' | 'medium' | 'large';
}

export default function WineTradingCard({ 
  wine, 
  isFlipped = false, 
  onFlip, 
  onClick,
  size = 'medium'
}: WineTradingCardProps) {
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
      {/* Holographic effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-pink-400/20 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500 shimmer"></div>
      
      {/* Card border with rarity color */}
      <div className={`absolute inset-0 rounded-2xl border-4 ${getRarityColor(wine.rarity).replace('text-', 'border-').replace('bg-', 'border-')}`}></div>
      
      {/* Header with wine type and rarity */}
      <div className="relative bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 text-white p-3 rounded-t-2xl">
        <div className="flex items-center justify-between mb-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(wine.rarity)}`}>
            {wine.rarity}
          </span>
          <div className="flex items-center gap-1">
            <Award size={14} />
            <span className="text-xs">#{wine.id}</span>
          </div>
        </div>
        
        <div className="text-center">
          <h3 className="text-lg font-bold truncate">{wine.name}</h3>
          <p className="text-sm opacity-80">{wine.year}</p>
        </div>
        
        {/* Wine type indicator */}
        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className={`w-8 h-8 rounded-full ${getWineTypeColor(wine.type)} opacity-20`}></div>
        </div>
      </div>

      {/* Main wine bottle visualization */}
      <div className="relative bg-gradient-to-b from-gray-50 to-white p-6 flex-1">
        <div className="flex flex-col items-center justify-center h-full">
          {/* Wine bottle silhouette */}
          <div className="relative mb-4">
            <div className={`w-16 h-32 ${getWineTypeColor(wine.type)} rounded-b-lg opacity-80 relative`}>
              {/* Bottle neck */}
              <div className="w-4 h-8 bg-gray-600 mx-auto -mb-8 relative z-10"></div>
              {/* Cork */}
              <div className="w-6 h-3 bg-amber-200 mx-auto -mb-3 relative z-20 rounded-t"></div>
              {/* Label */}
              <div className="absolute inset-x-2 top-8 bottom-8 bg-white/80 rounded flex items-center justify-center">
                <span className="text-xs font-bold text-gray-800 writing-vertical-rl transform rotate-180">
                  {wine.producer}
                </span>
              </div>
            </div>
          </div>
          
          {/* Wine details */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
              <MapPin size={12} />
              <span className="truncate">{wine.region}</span>
            </div>
            
            <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
              <Grape size={12} />
              <span className="truncate">{wine.grape}</span>
            </div>
            
            <div className="flex items-center justify-center gap-1">
              {renderStars(wine.rating)}
            </div>
          </div>
        </div>
        
        {/* Experience points */}
        <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-bold">
          {wine.experiencePoints} XP
        </div>
      </div>

      {/* Footer with stats */}
      <div className="bg-gradient-to-r from-slate-100 to-slate-50 p-3 rounded-b-2xl">
        <div className="flex justify-between items-center text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <Calendar size={12} />
            <span>Vintage {wine.year}</span>
          </div>
          
          <div className="flex items-center gap-2">
            {wine.voiceNoteUrl && <Mic size={12} className="text-blue-500" />}
            {wine.photoUrl && <Eye size={12} className="text-green-500" />}
            <Sparkles size={12} className="text-purple-500" />
          </div>
        </div>
      </div>
    </div>
  );

  const CardBack = () => (
    <div className="absolute inset-0 backface-hidden transform rotate-y-180">
      {/* Card border */}
      <div className="absolute inset-0 rounded-2xl border-4 border-gray-300"></div>
      
      {/* Background pattern */}
      <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-4 h-full flex flex-col">
        {/* Header */}
        <div className="text-center mb-4">
          <h4 className="font-bold text-gray-800">{wine.name}</h4>
          <p className="text-sm text-gray-600">{wine.producer}</p>
        </div>

        {/* Tasting notes */}
        <div className="flex-1 overflow-hidden">
          <div className="bg-white/80 rounded-lg p-3 mb-3">
            <h5 className="font-semibold text-sm mb-2 text-gray-800">Tasting Notes</h5>
            <p className="text-xs text-gray-700 leading-relaxed">
              {wine.tastingNotes}
            </p>
          </div>

          {/* WSET Details if available */}
          {wine.appearance && (
            <div className="bg-white/80 rounded-lg p-3 mb-3">
              <h5 className="font-semibold text-sm mb-2 text-gray-800">WSET Analysis</h5>
              <div className="space-y-1 text-xs text-gray-700">
                <div><strong>Appearance:</strong> {wine.appearance.intensity} {wine.appearance.color}</div>
                {wine.nose && <div><strong>Nose:</strong> {wine.nose.intensity} intensity</div>}
                {wine.palate && (
                  <div><strong>Palate:</strong> {wine.palate.body} body, {wine.palate.finish} finish</div>
                )}
              </div>
            </div>
          )}

          {/* Personal notes if available */}
          {wine.personalNotes && (
            <div className="bg-white/80 rounded-lg p-3">
              <h5 className="font-semibold text-sm mb-2 text-gray-800">Personal Notes</h5>
              <p className="text-xs text-gray-700 leading-relaxed">
                {wine.personalNotes}
              </p>
            </div>
          )}
        </div>

        {/* Stats footer */}
        <div className="grid grid-cols-2 gap-2 text-xs text-center">
          <div className="bg-white/60 rounded p-2">
            <div className="font-bold text-blue-600">{wine.experiencePoints}</div>
            <div className="text-gray-600">Experience</div>
          </div>
          <div className="bg-white/60 rounded p-2">
            <div className="font-bold text-green-600">{wine.rating}/5</div>
            <div className="text-gray-600">Rating</div>
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
        rotateY: 5,
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

        {/* Rarity glow effect */}
        {wine.rarity === 'Legendary' && (
          <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 rounded-2xl opacity-30 animate-pulse -z-10"></div>
        )}
        {wine.rarity === 'Epic' && (
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 via-purple-300 to-purple-400 rounded-2xl opacity-20 animate-pulse -z-10"></div>
        )}
      </motion.div>
    </motion.div>
  );
}