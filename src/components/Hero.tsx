'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/lib/theme/ThemeContext';

interface Company {
  name: string;
  logoUrl?: string;
  description?: string;
}

interface HeroProps {
  company?: Company | null;
  articleCount?: number;
  categoryCount?: number;
}

export default function Hero({ company, articleCount = 0, categoryCount = 0 }: HeroProps) {
  const { theme } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const companyName = company?.name || 'Apetitio';
  const companyDesc = company?.description || 'Vaša pouzdana trgovina sa najboljim proizvodima';

  return (
    <section className="relative min-h-[70vh] mt-[72px] overflow-hidden bg-gradient-to-br from-[#0e7c86] via-[#0a5d65] to-[#2c3e50]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 h-full min-h-[70vh] flex items-center">
        <div className={`grid lg:grid-cols-2 gap-12 items-center w-full py-16 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Left - Company Info */}
          <div className="space-y-6">
            {/* Company Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-md rounded-full border border-white/20">
              <span className="w-2 h-2 bg-[#e8b931] rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-white/90">Vaša pouzdana trgovina</span>
            </div>

            {/* Company Name & Logo */}
            <div className="flex items-center gap-4">
              {company?.logoUrl ? (
                <img src={company.logoUrl} alt={companyName} className="w-20 h-20 rounded-2xl object-contain bg-white p-2 shadow-lg" />
              ) : (
                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">{companyName.charAt(0)}</span>
                </div>
              )}
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {companyName}
                </h1>
                <p className="text-white/70">Maloprodajni lanac</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-lg text-white/80 max-w-lg leading-relaxed">
              {companyDesc}
            </p>

            {/* Stats */}
            <div className="flex gap-8 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{articleCount}+</div>
                <div className="text-sm text-white/60">Proizvoda</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{categoryCount}+</div>
                <div className="text-sm text-white/60">Kategorije</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-sm text-white/60">Dostava</div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex gap-4 pt-2">
              <button className="px-8 py-4 bg-white text-[#0e7c86] font-semibold rounded-full hover:shadow-lg transition-all hover:scale-105">
                Pogledaj ponudu
              </button>
              <button className="px-8 py-4 bg-white/10 text-white font-semibold rounded-full border border-white/30 backdrop-blur-sm hover:bg-white/20 transition-all">
                Kontaktirajte nas
              </button>
            </div>
          </div>

          {/* Right - Visual Card */}
          <div className="hidden lg:block relative">
            <div className="relative">
              {/* Decorative */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#e8b931]/30 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>

              {/* Main Card */}
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                <h3 className="text-white font-semibold text-xl mb-6">Zašto odabrati nas?</h3>
                <div className="space-y-4">
                  {[
                    { icon: '🥗', title: 'Svježe namirnice', desc: 'Kvalitetni prehrambeni proizvodi' },
                    { icon: '🚚', title: 'Brza dostava', desc: 'Dostava na vašu adresu' },
                    { icon: '💯', title: 'Kvalitet', desc: 'Provjereni dobavljači' },
                    { icon: '💰', title: 'Najbolje cijene', desc: 'Akcije i popusti' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                      <div className="text-2xl">{item.icon}</div>
                      <div>
                        <div className="font-medium text-white">{item.title}</div>
                        <div className="text-xs text-white/60">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}