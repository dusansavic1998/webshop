'use client';

import { useState, useEffect } from 'react';

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const slides = [
    {
      id: 1,
      badge: 'Vaša trgovina',
      title: 'Apetitio',
      subtitle: 'Kvalitet na prvom mjestu',
      description: 'Širok asortiman prehrambenih i kućnih proizvoda. Svježe namirnice, pića, higijena i još mnogo toga.',
      cta: 'Pogledaj ponudu',
      features: ['🥗 Svježe namirnice', '🚚 Brza dostava', '💯 Kvalitet'],
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=600&fit=crop',
    },
    {
      id: 2,
      badge: 'Novo u ponudi',
      title: 'Zdravlje',
      subtitle: 'Prirodni proizvodi',
      description: 'Otkrijte našu novu liniju organskih i zdravih proizvoda. 100% prirodno, bez aditiva.',
      cta: 'Saznajte više',
      features: ['🌿 Organsko', '⭐ Premium kvalitet', '💚 Zdravo'],
      image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800&h=600&fit=crop',
    },
    {
      id: 3,
      badge: 'Akcija',
      title: 'Uštedite',
      subtitle: 'Sa nama',
      description: 'Pratite naše akcije i specijalne ponude. Najbolje cijene za vaš novčanik.',
      cta: 'Pogledaj akcije',
      features: ['💰 Najbolje cijene', '🏷️ Akcije', '🎁 Popusti'],
      image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const current = slides[activeSlide];

  return (
    <section className="relative min-h-[90vh] mt-16 overflow-hidden bg-[#0a0a0a]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={current.image} 
          alt=""
          className="w-full h-full object-cover opacity-40 transition-opacity duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 via-transparent to-transparent"></div>
      </div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 h-full min-h-[90vh] flex items-center">
        <div className={`grid lg:grid-cols-2 gap-16 items-center w-full py-20 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0e7c86]/20 rounded-full border border-[#0e7c86]/30 backdrop-blur-sm">
              <span className="w-2 h-2 bg-[#e8b931] rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-[#0e7c86]">{current.badge}</span>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight" 
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                {current.title}
              </h1>
              <p className="text-2xl md:text-3xl text-[#0e7c86] font-medium">
                {current.subtitle}
              </p>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-300 max-w-md leading-relaxed">
              {current.description}
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-3">
              {current.features.map((feature, idx) => (
                <span 
                  key={idx}
                  className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full text-sm text-white/80 border border-white/10"
                >
                  {feature}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="group relative px-8 py-4 bg-[#0e7c86] text-white font-semibold rounded-full overflow-hidden transition-all hover:shadow-lg hover:shadow-[#0e7c86]/30">
                <span className="relative z-10">{current.cta}</span>
                <div className="absolute inset-0 bg-[#0a5d65] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </button>
              <button className="px-8 py-4 bg-white/5 text-white font-semibold rounded-full border border-white/20 backdrop-blur-sm hover:bg-white/10 transition-all">
                Kontaktirajte nas
              </button>
            </div>
          </div>

          {/* Right - Featured Card */}
          <div className="hidden lg:block relative">
            <div className="relative">
              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#e8b931]/20 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#0e7c86]/20 rounded-full blur-3xl"></div>

              {/* Main Card */}
              <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl overflow-hidden">
                {/* Card Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#0e7c86] to-[#14a3ad] rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-xl">A</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Apetitio</h3>
                      <p className="text-xs text-gray-400">Online trgovina</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-[#e8b931]/20 text-[#e8b931] text-xs font-medium rounded-full">
                    Otvoreno
                  </span>
                </div>

                {/* Quick Info */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { value: '500+', label: 'Proizvoda' },
                    { value: '18', label: 'Kategorije' },
                    { value: '24/7', label: 'Dostava' },
                  ].map((stat, idx) => (
                    <div key={idx} className="text-center p-4 bg-white/5 rounded-2xl">
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-xs text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Quick Links */}
                <div className="space-y-2">
                  {['Prehrambeni proizvodi', 'Pića', 'Higijena i hemija'].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group">
                      <span className="text-sm text-gray-300 group-hover:text-white">{item}</span>
                      <svg className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
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
            className={`h-1 rounded-full transition-all duration-300 ${
              activeSlide === idx 
                ? 'bg-[#e8b931] w-12' 
                : 'bg-white/20 w-4 hover:bg-white/40'
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 z-20 hidden md:flex flex-col items-center gap-2 text-white/30">
        <span className="text-xs tracking-widest">SCROLL</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent"></div>
      </div>
    </section>
  );
}
