# 🍷 Wine Pokedex - Gotta Taste Them All!

A Pokemon-inspired wine tasting journal that turns wine collection into a fun, gamified experience. Built with Next.js, TypeScript, and Tailwind CSS.

![Wine Pokedex Demo](https://via.placeholder.com/800x400/3B82F6/FFFFFF?text=Wine+Pokedex+Demo)

## ✨ Features

### 🎮 **Gamified Wine Collection**
- **Trading Card System**: Collect wines as Pokemon-style trading cards
- **Rarity Levels**: Common, Uncommon, Rare, Epic, and Legendary wines
- **Experience Points**: Earn XP based on wine rarity, age, and ratings
- **Achievement Badges**: Unlock badges for regional exploration, grape varieties, and collection milestones
- **Level Progression**: Player level increases with wine collection experience

### 🍷 **Professional Wine Analysis**
- **WSET Level 3 Structure**: Complete systematic approach to wine tasting
- **Comprehensive Tasting Notes**: Appearance, nose, palate, and conclusions
- **Professional Terminology**: Industry-standard descriptors and scales
- **Voice Recording Support**: Record tasting impressions (UI ready)

### 🔍 **Advanced Search & Filter**
- **Multi-dimensional Filtering**: Type, region, grape, vintage, rating, rarity
- **Real-time Search**: Instant results across all wine attributes
- **Smart Sorting**: Multiple sort options with ascending/descending order
- **Filter Persistence**: Maintains search state across sessions

### 📱 **Multiple View Modes**
- **Trading Cards**: Pokemon-style collectible cards with flip animations
- **Grid View**: Traditional wine grid layout
- **List View**: Compact list format for quick browsing

### 🎯 **Ready for Enhancement**
- **Camera Scanning**: UI prepared for wine label recognition
- **AI Integration**: Architecture ready for wine information extraction
- **Voice Notes**: Recording interface implemented

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Modern web browser with camera support (for future features)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/wine-pokedex.git
cd wine-pokedex

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build for Production

```bash
npm run build
npm start
```

## 🎨 Design System

### Color Palette
- **Pokedex Red**: `#dc2626` - Primary actions, capture buttons
- **Pokedex Blue**: `#1d4ed8` - Secondary actions, navigation  
- **Pokedex Yellow**: `#facc15` - Highlights, ratings, achievements
- **Wine Deep Red**: `#722f37` - Wine-specific accents
- **Wine Gold**: `#ffd700` - Premium wine indicators

### Animations
- **Pokeball Spin**: Loading states and capture animations
- **Card Flip**: Trading card interactions (double-click to flip)
- **Shimmer Effects**: Holographic rare card effects
- **Smooth Transitions**: Framer Motion powered animations

## 🏗️ Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS with custom theme
- **Animations**: Framer Motion
- **Storage**: Browser LocalStorage
- **Icons**: Lucide React

### Project Structure
```
src/
├── app/                 # Next.js app router
├── components/          # Reusable UI components
│   ├── PokedexHeader.tsx
│   ├── WineTradingCard.tsx
│   ├── WSETTastingForm.tsx
│   ├── WineSearchAndFilter.tsx
│   └── ScanModal.tsx
├── lib/                 # Utility functions and services
│   ├── utils.ts
│   └── wineStorage.ts
└── types/               # TypeScript type definitions
    └── wine.ts
```

## 🎯 Usage Guide

### Adding Wines
1. Click "Scan Bottle" for camera-based input (UI ready)
2. Use "Add Manual" for direct wine entry
3. Fill in wine details and tasting notes
4. Save to your collection as a trading card

### Exploring Your Collection
- **Search**: Use the search bar for instant filtering
- **Filter**: Apply multiple filters by type, region, rating, etc.
- **Sort**: Order by name, year, rating, or region
- **View Modes**: Switch between cards, grid, and list views

### Professional Tasting
1. Select a wine from your collection
2. Use the WSET Level 3 tasting form
3. Complete appearance, nose, palate analysis
4. Add conclusions and quality assessment
5. Record voice notes for detailed impressions

### Gamification Features
- **Experience Points**: Automatically calculated based on wine characteristics
- **Levels**: Progress through wine master levels
- **Badges**: Earn achievements for exploration and milestones
- **Collection Stats**: Track your wine journey progress

## 🔧 Configuration

### Tailwind Theme
Custom Pokemon-inspired design system in `tailwind.config.js`:
- Extended color palette
- Custom animations
- 3D transform utilities
- Typography scale

### Storage Configuration
LocalStorage keys and data structure in `lib/wineStorage.ts`:
- Wine collection persistence
- Badge tracking
- User preferences
- Export/import functionality

## 🌟 Future Enhancements

### Planned Features
- [ ] **Camera Integration**: Real wine bottle label scanning
- [ ] **AI Wine Recognition**: Automatic wine information extraction
- [ ] **Voice Processing**: Convert voice notes to text with sentiment analysis
- [ ] **Social Features**: Share collections and tasting notes
- [ ] **Wine Recommendations**: AI-powered suggestions based on preferences
- [ ] **Cellar Management**: Track wine storage and aging potential
- [ ] **Food Pairing**: Intelligent food and wine matching
- [ ] **Price Tracking**: Monitor wine values and investment potential

### Technical Roadmap
- [ ] **Mobile App**: React Native version
- [ ] **Backend Integration**: User accounts and cloud sync
- [ ] **Real-time Collaboration**: Shared tasting sessions
- [ ] **Advanced Analytics**: Collection insights and trends
- [ ] **API Integration**: Wine database connections
- [ ] **Offline Support**: PWA capabilities

## 🤝 Contributing

Contributions are welcome! Please read the contributing guidelines and submit pull requests for any improvements.

### Development Setup
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run linting
npm run lint

# Run type checking
npm run build
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Pokemon**: Inspiration for the trading card and gamification system
- **WSET (Wine & Spirit Education Trust)**: Professional wine tasting methodology
- **Wine Community**: For the passion and knowledge that makes wine appreciation special

---

**Built with ❤️ for wine enthusiasts who believe collecting wines should be as fun as collecting Pokemon cards!**

🍷 **Gotta Taste Them All!** 🍷
