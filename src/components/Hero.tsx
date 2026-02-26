'use client';

import { useState, useEffect } from 'react';
import { Company } from '@/lib/api/apetitio-service';

interface HeroProps {
  company?: Company | null;
  articleCount?: number;
  categoryCount?: number;
}

export default function Hero({ company, articleCount = 0, categoryCount = 0 }: HeroProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  const companyName = company?.name || 'Apetitio';
  const companyDesc = company?.description || 'Vaš pouzdan partner za svakodnevne namirnice';

  const slides = [
    {
      id: 1,
      badge: 'Vaša trgovina',
      title: companyName,
      description: companyDesc,
      cta: 'Pogledaj ponudu',
      ctaSecondary: 'Kontaktirajte nas',
    },
    {
      id: 2,
      badge: 'Svježe proizvodi',
      title: 'Svježe voće i povrće',
      description: 'Najkvalitetnije voće i povrće iz lokalnih izvora.',
      cta: 'Saznajte više',
      ctaSecondary: 'Naša ponuda',
    },
    {
      id: 3,
      badge: 'Akcije',
      title: 'Posebne ponude',
      description: 'Pratite naše akcije i uštedite na svakodnevnim kupovinama.',
      cta: 'Pogledaj akcije',
      ctaSecondary: 'Sve akcije',
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
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] to-[#16213e]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a2e] via-[#1a1a2e]/95 to-[#1a1a2e]/80 z-10" />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full py-12">
          {/* Left Content */}
          <div className="text-white space-y-8">
            {/* Logo & Badge */}
            <div className="flex items-center gap-4">
              {company?.logoUrl ? (
                <img src={company.logoUrl} alt={companyName} className="w-16 h-16 rounded-xl object-contain bg-white p-1" />
              ) : (
                <div className="w-16 h-16 bg-gradient-to-br from-[#e94560] to-[#ff6b6b] rounded-2xl flex items-center justify-center shadow-lg shadow-[#e94560]/30">
                  <span className="text-white font-bold text-2xl">A</span>
                </div>
              )}
              <div>
                <span className="text-2xl font-bold">{companyName}</span>
                <p className="text-gray-400 text-sm">Trgovina</p>
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

            {/* Stats */}
            <div className="flex gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-[#e94560]">{articleCount}</div>
                <div className="text-gray-400 text-sm">Proizvoda</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#e94560]">{categoryCount}</div>
                <div className="text-gray-400 text-sm">Kategorije</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#e94560]">2026</div>
                <div className="text-gray-400 text-sm">Godina</div>
              </div>
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
                    { icon: '🥐', title: 'Prehrambeni', desc: 'Svježe namirnice' },
                    { icon: '🍷', title: 'Pića', desc: 'Alkoholna i bezalkoholna' },
                    { icon: '🧴', title: 'Higijena', desc: 'Kućna i lična' },
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
