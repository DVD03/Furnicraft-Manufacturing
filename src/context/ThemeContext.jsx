import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const themeMap = {
  'Wood & Timber': { 
    key: 'wood', 
    primary: '#d97706', 
    badge: 'Ceylon Teak & Timber Joinery', 
    glowClass: 'theme-wood', 
    gradient: 'from-amber-500 via-amber-600 to-orange-600',
    colorName: 'Amber Teak' 
  },
  'Glass & Mirror': { 
    key: 'glass', 
    primary: '#06b6d4', 
    badge: 'Crystal Cyan 12mm Glazing & Mirror', 
    glowClass: 'theme-glass', 
    gradient: 'from-cyan-400 via-cyan-500 to-blue-600',
    colorName: 'Crystal Cyan' 
  },
  'Pantry & Kitchen': { 
    key: 'pantry', 
    primary: '#f59e0b', 
    badge: 'Italian Quartz & Acrylic Pantry', 
    glowClass: 'theme-pantry', 
    gradient: 'from-yellow-400 via-amber-500 to-yellow-600',
    colorName: 'Gold Pantry' 
  },
  'House Furniture': { 
    key: 'wood', 
    primary: '#d97706', 
    badge: 'Master Bedroom & Living Suite', 
    glowClass: 'theme-wood', 
    gradient: 'from-amber-500 via-orange-500 to-amber-700',
    colorName: 'Mahogany Warmth' 
  },
  'Hotel Furniture': { 
    key: 'luxury', 
    primary: '#f43f5e', 
    badge: 'Resort Villa & Suite Furniture', 
    glowClass: 'theme-luxury', 
    gradient: 'from-rose-400 via-pink-500 to-amber-500',
    colorName: 'Rose Luxury' 
  },
  'Construction & Architecture': { 
    key: 'construction', 
    primary: '#ff6600', 
    badge: '40 Days / 40 Lakhs Villa Build', 
    glowClass: 'theme-construction', 
    gradient: 'from-orange-500 via-orange-600 to-amber-600',
    colorName: 'Architectural Orange' 
  },
  'Flooring Products': { 
    key: 'modern', 
    primary: '#94a3b8', 
    badge: 'Engineered Oak & Parquet Floor', 
    glowClass: 'theme-modern', 
    gradient: 'from-slate-400 via-slate-500 to-zinc-600',
    colorName: 'Modern Slate' 
  },
  'Outdoor Furniture': { 
    key: 'outdoor', 
    primary: '#10b981', 
    badge: 'All-Weather Teak Patio & Deck', 
    glowClass: 'theme-outdoor', 
    gradient: 'from-emerald-400 via-emerald-500 to-teal-600',
    colorName: 'Emerald Outdoor' 
  },
  'Accessories & Art': { 
    key: 'luxury', 
    primary: '#eab308', 
    badge: 'Artisan Decor & Sculptures', 
    glowClass: 'theme-luxury', 
    gradient: 'from-yellow-400 via-amber-500 to-orange-500',
    colorName: 'Artisan Gold' 
  },
  'All': { 
    key: 'wood', 
    primary: '#dfa732', 
    badge: 'Furnicraft Signature Masterpieces', 
    glowClass: 'theme-wood', 
    gradient: 'from-amber-400 via-yellow-500 to-orange-500',
    colorName: 'Furnicraft Signature' 
  }
};

export const ThemeProvider = ({ children }) => {
  const [activeCategory, setActiveCategory] = useState('All');

  const setCategoryTheme = (categoryName) => {
    setActiveCategory(categoryName);
  };

  const currentTheme = themeMap[activeCategory] || themeMap['All'];

  return (
    <ThemeContext.Provider value={{ activeCategory, setCategoryTheme, currentTheme }}>
      <div className={`transition-colors duration-700 ${currentTheme.glowClass}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
