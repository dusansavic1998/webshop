'use client';

import { useState, useEffect } from 'react';

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      id: 1,
      badge: 'Više od 38 godina iskustva',
      title: 'Betonski proizvodi vrhunskog kvaliteta',
      description: 'Preko 500 različitih proizvoda za uređenje vašeg prostora. Kvaliteta koja traje generacijama.',
      cta: 'Pogledaj ponudu',
      ctaSecondary: 'Kontaktirajte nas',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    },
    {
      id: 2,
      badge: 'Novo u ponudi',
      title: 'Uređenje Dvorišta i Okoline',
      description: 'Od betonskih ploča do kocki, fontana i vrtnog mobilijara - sve na jednom mjestu.',
      cta: 'Saznajte više',
      ctaSecondary: 'Katalozi',
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop',
    },
    {
      id: 3,
      badge: 'Ekološki prihvatljivo',
      title: 'Prirodna Rješenja za Vaš Prostor',
      description: 'Fokusirani smo na funkcionalna, estetski usklađena i ekološki prihvatljiva rješenja.',
      cta: 'Naši proizvodi',
      ctaSecondary: 'Reference',
      image: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?w=800&h=600&fit=crop',
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
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a2e] via-[#1a1a2e]/95 to-[#1a1a2e]/80 z-10" />
        
        {/* Background image */}
        <img
          src={currentSlide.image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
        />
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
                <span className="text-2xl font-bold">BePro</span>
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

            {/* Stats */}
            <div className="flex gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-[#e94560]">38+</div>
                <div className="text-gray-400 text-sm">Godina iskustva</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#e94560]">500+</div>
                <div className="text-gray-400 text-sm">Proizvoda</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#e94560]">1000+</div>
                <div className="text-gray-400 text-sm">Projekata</div>
              </div>
            </div>
          </div>

          {/* Right Side - Visual */}
          <div className="hidden lg:block relative">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#e94560]/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl"></div>
              
              {/* Card showcase */}
              <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
                <div className="space-y-6">
                  {/* Feature items */}
                  {[
                    { icon: '⬜', title: 'Betonske ploče', desc: 'Premium i Budget line' },
                    { icon: '🧱', title: 'Kocke & Pločnici', desc: 'Za dvorišta i staze' },
                    { icon: '🏛️', title: 'Dekorativni elementi', desc: 'Zidovi, fontane, figure' },
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

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 z-20 animate-bounce hidden md:block">
        <div className="flex flex-col items-center gap-2 text-white/50">
          <span className="text-xs writing-vertical">Scroll</span>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
