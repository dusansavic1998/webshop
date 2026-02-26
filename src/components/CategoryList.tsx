'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/lib/theme/ThemeContext';

interface Category {
  id: string;
  name: string;
  articleCount?: number;
}

interface CategoryListProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (id: string) => void;
}

export default function CategoryList({ 
  categories, 
  activeCategory, 
  onCategoryChange 
}: CategoryListProps) {
  const { theme } = useTheme();
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  // Filter categories that have articles
  const displayCategories = categories.filter(c => c.name !== 'Svi proizvodi');

  return (
    <section className={`py-8 border-y transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-[#0a0a0a] border-white/10' 
        : 'bg-white border-[#e2e8f0]'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Scrollable Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {/* All Products */}
          <button
            onClick={() => onCategoryChange('all')}
            className={`flex-shrink-0 px-5 py-2.5 rounded-full font-medium text-sm whitespace-nowrap transition-all duration-200 ${
              activeCategory === 'all'
                ? 'bg-[#0e7c86] text-white shadow-lg shadow-[#0e7c86]/20'
                : theme === 'dark'
                  ? 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
                  : 'bg-[#f8fafa] text-gray-600 hover:bg-[#e2e8f0] hover:text-gray-900'
            }`}
          >
            🛍️ Svi proizvodi
          </button>

          {displayCategories.map((category) => {
            const isActive = activeCategory === category.id;
            const isHovered = hoveredCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
                className={`flex-shrink-0 px-5 py-2.5 rounded-full font-medium text-sm whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-[#0e7c86] text-white shadow-lg shadow-[#0e7c86]/20'
                    : isHovered
                      ? theme === 'dark'
                        ? 'bg-white/20 text-white'
                        : 'bg-[#e2e8f0] text-gray-900'
                      : theme === 'dark'
                        ? 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                        : 'bg-[#f8fafa] text-gray-600 hover:bg-[#e2e8f0] hover:text-gray-900'
                }`}
              >
                {category.name}
                <span className={`ml-2 text-xs ${isActive ? 'text-white/80' : 'text-gray-400'}`}>
                  ({category.articleCount || 0})
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
