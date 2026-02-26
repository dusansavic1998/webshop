'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useTheme } from '@/lib/theme/ThemeContext';

interface HeaderProps {
  onSearch: (query: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const { cartCount, setIsCartOpen } = useCart();
  const { theme, toggleTheme } = useTheme();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-[#0a0a0a]/95 border-white/10' 
        : 'bg-white/95 border-[#e2e8f0]'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-18 py-4">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-br from-[#0e7c86] to-[#14a3ad] rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <div>
              <span className="text-xl font-bold" style={{ color: theme === 'dark' ? '#fff' : '#1a2a33' }}>
                Apetitio
              </span>
              <p className="text-xs" style={{ color: theme === 'dark' ? '#64748b' : '#64748b' }}>
                Online trgovina
              </p>
            </div>
          </a>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Pretraži proizvode..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  onSearch(e.target.value);
                }}
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
            </div>
          </form>

          {/* Icons */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-3 rounded-xl transition-colors ${
                theme === 'dark'
                  ? 'hover:bg-white/10 text-white'
                  : 'hover:bg-[#f8fafa] text-[#64748b]'
              }`}
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Home */}
            <button className={`p-3 rounded-xl hover:bg-[#f8fafa] transition-colors hidden sm:flex items-center gap-2 ${
              theme === 'dark' ? 'text-white hover:bg-white/10' : 'text-[#64748b]'
            }`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </button>

            {/* Phone */}
            <button className={`p-3 rounded-xl hover:bg-[#f8fafa] transition-colors ${
              theme === 'dark' ? 'text-white hover:bg-white/10' : 'text-[#64748b]'
            }`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </button>

            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className={`relative p-3 rounded-xl hover:bg-[#f8fafa] transition-colors ${
                theme === 'dark' ? 'text-white hover:bg-white/10' : 'text-[#64748b]'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#0e7c86] text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
