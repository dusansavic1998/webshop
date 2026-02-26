'use client';

import { useState } from 'react';
import { useTheme } from '@/lib/theme/ThemeContext';

interface SearchSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  resultCount: number;
}

export default function SearchSection({ 
  searchQuery, 
  onSearchChange,
  resultCount 
}: SearchSectionProps) {
  const { theme } = useTheme();

  return (
    <div className={`py-6 px-6 lg:px-12 transition-colors duration-300 ${
      theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Pretraži proizvode..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className={`w-full h-12 pl-12 pr-4 rounded-xl border transition-all outline-none text-sm ${
                theme === 'dark'
                  ? 'bg-[#1a1a1a] border-white/10 text-white placeholder-gray-500 focus:border-[#0e7c86]'
                  : 'bg-[#f8fafa] border-[#e2e8f0] text-[#1a2a33] focus:border-[#0e7c86]'
              }`}
            />
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
              style={{ color: theme === 'dark' ? '#64748b' : '#94a3b8' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Results Count */}
          <div className="flex items-center gap-2">
            <span style={{ color: theme === 'dark' ? '#64748b' : '#64748b' }}>
              Pronađeno
            </span>
            <span className="font-bold text-[#0e7c86]">
              {resultCount}
            </span>
            <span style={{ color: theme === 'dark' ? '#64748b' : '#64748b' }}>
              proizvoda
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}