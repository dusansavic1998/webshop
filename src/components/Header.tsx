'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Light theme constants
const theme = 'light';

interface HeaderProps {
  company?: { name: string; logoUrl?: string } | null;
}

export default function Header({ company }: HeaderProps) {
  const [cartCount, setCartCount] = useState(0);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-18 py-4">
          <a href="/" className="flex items-center gap-3">
            {company?.logoUrl ? (
              <img src={company.logoUrl} alt={company.name} className="w-11 h-11 rounded-xl object-contain bg-white p-1 shadow-md" />
            ) : (
              <div className="w-11 h-11 bg-gradient-to-br from-[#0e7c86] to-[#14a3ad] rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">A</span>
              </div>
            )}
            <div>
              <span className="text-xl font-bold text-gray-900">{company?.name || 'Apetitio'}</span>
              <p className="text-xs text-gray-500">Online trgovina</p>
            </div>
          </a>

          <div className="flex items-center gap-2">
            <button className="relative p-3 rounded-xl hover:bg-gray-100 transition-colors text-gray-600">
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