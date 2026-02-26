'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/lib/theme/ThemeContext';

// Category images based on names
const categoryImages: Record<string, string> = {
  'Prehrambeni proizvodi': 'https://images.unsplash.com/photo-1506617420156-8e4536971650?w=600&h=400&fit=crop',
  'Pića': 'https://images.unsplash.com/photo-1527960471264-932f39eb5844?w=600&h=400&fit=crop',
  'Grickalice i slatkiši': 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&h=400&fit=crop',
  'Higijena i hemija': 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=400&fit=crop',
  'Zamrznuti program': 'https://images.unsplash.com/photo-1570197788417-0e82375c0821?w=600&h=400&fit=crop',
  'Mlečni proizvodi': 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=600&h=400&fit=crop',
  'Hleb i pekarski proizvodi': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=400&fit=crop',
  'Osnovne životne namirnice': 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600&h=400&fit=crop',
  'Voće i povrće': 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600&h=400&fit=crop',
  'Alkoholna pića': 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&h=400&fit=crop',
  'Bezalkoholna pića': 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=600&h=400&fit=crop',
  'Čokolade i bombone': 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=600&h=400&fit=crop',
  'Keks i napolitanke': 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&h=400&fit=crop',
  'Čips i smoki': 'https://images.unsplash.com/photo-1621447504864-d8686e12698c?w=600&h=400&fit=crop',
  'Kućna hemija': 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=600&h=400&fit=crop',
  'Lična higijena': 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=400&fit=crop',
  'Meso i prerađevine': 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=600&h=400&fit=crop',
  'Pomfrit i gotova jela': 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&h=400&fit=crop',
  // Default
  'default': 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=400&fit=crop',
};

interface Category {
  id: string;
  name: string;
  articleCount?: number;
}

interface CategoryShowcaseProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (id: string) => void;
}

export default function CategoryShowcase({ 
  categories, 
  activeCategory, 
  onCategoryChange 
}: CategoryShowcaseProps) {
  const { theme } = useTheme();
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  // Filter categories that have articles (show all for now, can filter by articleCount)
  const displayCategories = categories.filter(c => c.name !== 'Svi proizvodi');

  const getCategoryImage = (name: string) => {
    return categoryImages[name] || categoryImages['default'];
  };

  return (
    <section className={`py-16 ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" 
              style={{ fontFamily: "'Playfair Display', serif" }}
              style={{ color: theme === 'dark' ? '#fff' : '#1a2a33' }}>
            Kategorije
          </h2>
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Odaberite kategoriju i pregledajte našu ponudu
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {displayCategories.slice(0, 8).map((category, idx) => {
            const isActive = activeCategory === category.id;
            const isHovered = hoveredCategory === category.id;
            const image = getCategoryImage(category.name);
            
            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
                className={`relative group overflow-hidden rounded-2xl aspect-[4/3] transition-all duration-300 ${
                  isActive 
                    ? 'ring-4 ring-[#0e7c86] scale-[1.02]' 
                    : 'hover:scale-[1.02] hover:shadow-xl'
                }`}
              >
                {/* Image */}
                <img 
                  src={image}
                  alt={category.name}
                  className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 ${
                    isHovered ? 'scale-110' : 'scale-100'
                  }`}
                />
                
                {/* Overlay */}
                <div className={`absolute inset-0 transition-opacity duration-300 ${
                  isActive || isHovered 
                    ? 'bg-gradient-to-t from-black/70 via-black/30 to-transparent' 
                    : 'bg-gradient-to-t from-black/50 via-transparent to-transparent'
                }`}></div>
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6">
                  <h3 className={`font-semibold text-lg md:text-xl text-white mb-1 transition-transform duration-300 ${
                    isHovered ? 'translate-y-0' : ''
                  }`}>
                    {category.name}
                  </h3>
                  
                  {/* Article count badge */}
                  <div className={`inline-flex items-center gap-1 text-xs ${
                    isActive || isHovered ? 'text-white/90' : 'text-white/70'
                  }`}>
                    <span>📦</span>
                    <span>{category.articleCount || Math.floor(Math.random() * 50) + 10} proizvoda</span>
                  </div>
                </div>

                {/* Active Indicator */}
                {isActive && (
                  <div className="absolute top-3 right-3 w-8 h-8 bg-[#0e7c86] rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <button className="px-8 py-3 bg-[#0e7c86] text-white font-semibold rounded-full hover:bg-[#0a5d65] transition-all hover:shadow-lg hover:shadow-[#0e7c86]/30">
            Pogledaj sve kategorije
          </button>
        </div>
      </div>
    </section>
  );
}
