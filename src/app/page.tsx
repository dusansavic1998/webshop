'use client';

import { useState, useEffect, useMemo } from 'react';
import { CartProvider } from '@/context/CartContext';
import { ThemeProvider } from '@/lib/theme/ThemeContext';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductDetail from '@/components/ProductDetail';
import Cart from '@/components/Cart';
import Footer from '@/components/Footer';
import { syncApetitioData, Article, Category, Company } from '@/lib/api/apetitio-service';
import { useTheme } from '@/lib/theme/ThemeContext';

function ProductsSection() {
  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await syncApetitioData();
        setArticles(data.articles);
        setCategories(data.categories);
      } catch (error) {
        console.error('Failed to load data:', error);
      }
    };
    loadData();
  }, []);

  const categoriesWithCount = useMemo(() => {
    return categories.map(cat => ({
      ...cat,
      articleCount: articles.filter(a => a.category === cat.id).length,
    })).filter(c => c.articleCount > 0);
  }, [categories, articles]);

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory = activeCategory === 'all' || article.category === activeCategory;
      const matchesSearch = searchQuery === '' ||
        article.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [articles, activeCategory, searchQuery]);

  return (
    <section className={`py-12 transition-colors duration-300 ${
      theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Title */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold" 
              style={{ fontFamily: "'Playfair Display', serif", color: theme === 'dark' ? '#fff' : '#1a2a33' }}>
            Proizvodi
          </h2>
          <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Pregledajte našu ponudu proizvoda
          </p>
        </div>

        {/* Categories Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === 'all'
                ? 'bg-[#0e7c86] text-white'
                : theme === 'dark'
                  ? 'bg-white/10 text-white/70 hover:bg-white/20'
                  : 'bg-[#f8fafa] text-gray-600 hover:bg-[#e2e8f0]'
            }`}
          >
            Svi
          </button>
          {categoriesWithCount.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#0e7c86] text-white'
                  : theme === 'dark'
                    ? 'bg-white/10 text-white/70 hover:bg-white/20'
                    : 'bg-[#f8fafa] text-gray-600 hover:bg-[#e2e8f0]'
              }`}
            >
              {cat.name} ({cat.articleCount})
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Pretraži proizvode..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full h-12 pl-12 pr-4 rounded-xl border transition-all outline-none ${
              theme === 'dark'
                ? 'bg-[#1a1a1a] border-white/10 text-white placeholder-gray-500 focus:border-[#0e7c86]'
                : 'bg-[#f8fafa] border-[#e2e8f0] text-gray-900 focus:border-[#0e7c86]'
            }`}
          />
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center gap-2">
          <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Pronađeno
          </span>
          <span className="font-bold text-[#0e7c86]">{filteredArticles.length}</span>
          <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            proizvoda
          </span>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {filteredArticles.slice(0, 20).map((product) => {
            const image = product.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop';
            const price = product.price || 9.99;
            
            return (
              <div
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className={`group rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl ${
                  theme === 'dark' 
                    ? 'bg-[#1a1a1a] hover:bg-[#252525]' 
                    : 'bg-white hover:shadow-lg border border-[#e2e8f0]'
                }`}
              >
                {/* Image */}
                <div className="aspect-square overflow-hidden bg-gray-100 relative">
                  <img
                    src={image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Quick Add Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="absolute bottom-3 right-3 w-10 h-10 bg-[#0e7c86] text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-[#0a5d65]"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className={`font-medium text-sm line-clamp-2 mb-2 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-[#0e7c86]">
                      €{price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🔍</div>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Nema proizvoda za prikaz
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function ShopContent() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#0e7c86] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Učitavanje...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] transition-colors duration-300">
      <Header />
      <main>
        <Hero />
        <ProductsSection />
      </main>
      <Footer />
      <Cart />
    </div>
  );
}

export default function Home() {
  return (
    <CartProvider>
      <ThemeProvider>
        <ShopContent />
      </ThemeProvider>
    </CartProvider>
  );
}