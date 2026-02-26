'use client';

import { Category } from '@/data/products';

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  categories?: Category[];
}

export default function CategoryFilter({ 
  activeCategory, 
  onCategoryChange,
  categories 
}: CategoryFilterProps) {
  // Use provided categories or default
  const displayCategories = categories || [
    { id: 'all', name: 'Svi proizvodi', icon: '🛍️' },
    { id: 'plosce', name: 'Betonske ploče', icon: '⬜' },
    { id: 'kocke', name: 'Kocke & Pločnici', icon: '🧱' },
    { id: 'mobilijar', name: 'Mobilijar', icon: '🪑' },
    { id: 'dekorativni', name: 'Dekorativni elementi', icon: '🏛️' },
  ];

  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {displayCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id.toString())}
              className={`
                flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm whitespace-nowrap
                transition-all duration-300 ease-out
                ${
                  activeCategory === category.id.toString()
                    ? 'bg-[#e94560] text-white shadow-lg shadow-[#e94560]/30'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                }
              `}
            >
              <span className="text-base">{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
