'use client';

import { useState, useEffect } from 'react';
import { useSync, useCompany } from '@/lib/api/SyncContext';

export default function Hero() {
  const { company, isSynced, isSyncing, syncData, lastSync } = useSync();
  const [activeSlide, setActiveSlide] = useState(0);

  // If not synced, show sync prompt
  if (!isSynced) {
    return (
      <section className="relative h-[85vh] min-h-[600px] mt-16 md:mt-20 flex items-center justify-center bg-gradient-to-br from-[#1a1a2e] to-[#16213e]">
        <div className="text-center px-4">
          <div className="w-24 h-24 bg-[#e94560] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#e94560]/30">
            <span className="text-white font-bold text-4xl">B</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Dobrodošli u BePro
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-lg mx-auto">
            Da biste započeli, potrebno je sinkronizirati podatke sa vašim poslovnim sistemom.
          </p>

          <button
            onClick={syncData}
            disabled={isSyncing}
            className={`px-8 py-4 font-semibold rounded-full transition-all transform hover:scale-105 ${
              isSyncing
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-[#e94560] hover:bg-[#d63d56] shadow-lg shadow-[#e94560]/30'
            } text-white`}
          >
            {isSyncing ? (
              <span className="flex items-center gap-3">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Sinkronizacija u toku...
              </span>
            ) : (
              '🔄 Započni sinkronizaciju'
            )}
          </button>

          <p className="text-gray-400 text-sm mt-4">
            Podaci će biti preuzeti sa vašeg InfosAPI sistema
          </p>
        </div>
      </section>
    );
  }

  const companyName = company?.name || 'BePro';
  const companyDesc = company?.description || 'Betonski proizvodi vrhunskog kvaliteta';

  const slides = [
    {
      id: 1,
      badge: lastSync ? `Zadnja sinkronizacija: ${new Date(lastSync).toLocaleDateString('bs-BA')}` : 'Više od 38 godina iskustva',
      title: `${companyName} - Betonski proizvodi`,
      description: companyDesc,
      cta: 'Pogledaj ponudu',
      ctaSecondary: 'Kontaktirajte nas',
    },
    {
      id: 2,
      badge: 'Novo u ponudi',
      title: 'Uređenje Dvorišta i Okoline',
      description: 'Od betonskih ploča do kocki, fontana i vrtnog mobilijara - sve na jednom mjestu.',
      cta: 'Saznajte više',
      ctaSecondary: 'Katalozi',
    },
    {
      id: 3,
      badge: 'Ekološki prihvatljivo',
      title: 'Prirodna Rješenja za Vaš Prostor',
      description: 'Fokusirani smo na funkcionalna, estetski usklađena i ekološki prihvatljiva rješenja.',
      cta: 'Naši proizvodi',
      ctaSecondary: 'Reference',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const currentSlide = slides[activeSlide];

  return (
    <section className="relative h-[85vh] min-h-[600px] mt-16 md:mt-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#1a1a2e]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a2e] via-[#1a1a2e]/95 to-[#1a1a2e]/80 z-10" />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full py-12">
          {/* Left Content */}
          <div className="text-white space-y-8">
            {/* Logo & Badge */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#e94560] to-[#ff6b6b] rounded-2xl flex items-center justify-center shadow-lg shadow-[#e94560]/30">
                <span className="text-white font-bold text-2xl">B</span>
              </div>
              <div>
                <span className="text-2xl font-bold">{companyName}</span>
                <p className="text-gray-400 text-sm">Betonski proizvodi</p>
              </div>
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <span className="w-2 h-2 bg-[#e94560] rounded-full animate-pulse"></span>
              <span className="text-sm font-medium">{currentSlide.badge}</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              {currentSlide.title}
            </h1>
            
            {/* Description */}
            <p className="text-lg md:text-xl text-gray-300 max-w-lg">
              {currentSlide.description}
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button className="px-8 py-4 bg-[#e94560] hover:bg-[#d63d56] text-white font-semibold rounded-full transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-[#e94560]/30">
                {currentSlide.cta}
              </button>
              <button className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full border border-white/20 transition-all">
                {currentSlide.ctaSecondary}
              </button>
            </div>

            {/* Sync Status */}
            <div className="flex items-center gap-4 pt-2">
              <span className="text-green-400 text-sm">✓ Podaci sinkronizirani</span>
              <button 
                onClick={syncData}
                className="text-gray-400 hover:text-white text-sm underline"
              >
                Osvježi
              </button>
            </div>
          </div>

          {/* Right Side - Visual */}
          <div className="hidden lg:block relative">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#e94560]/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl"></div>
              
              <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
                <div className="space-y-6">
                  {[
                    { icon: '📦', title: 'Proizvodi', desc: `${useArticles?.()?.length || 0} artikala` },
                    { icon: '📂', title: 'Kategorije', desc: `${useCategories?.()?.length || 0} grupa` },
                    { icon: '🏢', title: 'Kompanija', desc: companyName },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#e94560]/20 rounded-xl flex items-center justify-center text-2xl">
                        {item.icon}
                      </div>
                      <div>
                        <div className="font-semibold text-white">{item.title}</div>
                        <div className="text-gray-400 text-sm">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveSlide(idx)}
            className={`w-3 h-3 rounded-full transition-all ${
              activeSlide === idx ? 'bg-[#e94560] w-8' : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
}

// Custom hooks for use in component
function useArticles() {
  const { articles } = useSync();
  return articles;
}

function useCategories() {
  const { categories } = useSync();
  return categories;
}
