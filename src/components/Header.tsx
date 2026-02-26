'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useTheme } from '@/lib/theme/ThemeContext';

interface Company {
  name: string;
  logoUrl?: string;
  description?: string;
}

interface HeaderProps {
  company?: Company | null;
}

export default function Header({ company }: HeaderProps) {
  const { cartCount, setIsCartOpen } = useCart();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-[#0a0a0a]/95 border-white/10' 
        : 'bg-white/95 border-[#e2e8f0]'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-18 py-4">
          {/* Logo with company image */}
          <a href="/" className="flex items-center gap-3">
            {company?.logoUrl ? (
              <img 
                src={company.logoUrl} 
                alt={company.name} 
                className="w-11 h-11 rounded-xl object-contain bg-white p-1 shadow-md"
              />
            ) : (
              <div className="w-11 h-11 bg-gradient-to-br from-[#0e7c86] to-[#14a3ad] rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">A</span>
              </div>
            )}
            <div>
              <span className="text-xl font-bold" style={{ color: theme === 'dark' ? '#fff' : '#1a2a33' }}>
                {company?.name || 'Apetitio'}
              </span>
              <p className="text-xs" style={{ color: theme === 'dark' ? '#64748b' : '#64748b' }}>
                Online trgovina
              </p>
            </div>
          </a>

          {/* Right Icons */}
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