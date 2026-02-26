'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/lib/theme/ThemeContext';
import { CartProvider } from '@/context/CartContext';
import { ThemeProvider } from '@/lib/theme/ThemeContext';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Cart from '@/components/Cart';
import Footer from '@/components/Footer';
import { syncApetitioData, Article, Category, Company } from '@/lib/api/apetitio-service';

// Better external image search
const getProductImage = (name: string): string => {
  const n = name.toLowerCase();
  
  const imageMap: Record<string, string> = {
    // Bread & Flour
    'brašno': 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&h=800&fit=crop',
    'kruh': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=800&fit=crop',
    'pecivo': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=800&fit=crop',
    'burek': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=800&fit=crop',
    
    // Oils & Condiments  
    'ulje': 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&h=800&fit=crop',
    'ocat': 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800&h=800&fit=crop',
    'so': 'https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?w=800&h=800&fit=crop',
    
    // Sugar & Sweets
    'šećer': 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?w=800&h=800&fit=crop',
    'čokolada': 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=800&h=800&fit=crop',
    'bombone': 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=800&h=800&fit=crop',
    'keks': 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&h=800&fit=crop',
    'čips': 'https://images.unsplash.com/photo-1621447504864-d8686e12698c?w=800&h=800&fit=crop',
    'slatkiš': 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&h=800&fit=crop',
    'karamel': 'https://images.unsplash.com/photo-1551024601-564d6dbf7f31?w=800&h=800&fit=crop',
    
    // Beverages
    'kafa': 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=800&fit=crop',
    'čaj': 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&h=800&fit=crop',
    'sok': 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=800&h=800&fit=crop',
    'voda': 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&h=800&fit=crop',
    'pivo': 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=800&h=800&fit=crop',
    'vino': 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&h=800&fit=crop',
    'rakija': 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&h=800&fit=crop',
    
    // Dairy
    'mlijeko': 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&h=800&fit=crop',
    'sir': 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=800&h=800&fit=crop',
    'jogurt': 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&h=800&fit=crop',
    'kajmak': 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=800&h=800&fit=crop',
    'pavlaka': 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&h=800&fit=crop',
    'maslac': 'https://images.unsplash.com/photo-1589985270826-4b924bbdb32d?w=800&h=800&fit=crop',
    
    // Fruits & Vegetables
    'voće': 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800&h=800&fit=crop',
    'povrće': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&h=800&fit=crop',
    'jabuka': 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cde6?w=800&h=800&fit=crop',
    'banana': 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=800&h=800&fit=crop',
    'narandža': 'https://images.unsplash.com/photo-1547514701-42782101795e?w=800&h=800&fit=crop',
    'limun': 'https://images.unsplash.com/photo-1590502593747-42a996133562?w=800&h=800&fit=crop',
    
    // Meat
    'meso': 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800&h=800&fit=crop',
    'piletina': 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=800&h=800&fit=crop',
    'govedina': 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=800&h=800&fit=crop',
    'svinjetina': 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=800&h=800&fit=crop',
    'riba': 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&h=800&fit=crop',
    
    // Hygiene
    'higijena': 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&h=800&fit=crop',
    'sapun': 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=800&h=800&fit=crop',
    'šampon': 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&h=800&fit=crop',
    'pasta': 'https://images.unsplash.com/photo-1559599238-3087936c427c?w=800&h=800&fit=crop',
    'dezodorans': 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=800&h=800&fit=crop',
    
    // Household
    'deterdžent': 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=800&h=800&fit=crop',
    'prašak': 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800&h=800&fit=crop',
    'jastuk': 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&h=800&fit=crop',
    'posteljina': 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14d1?w=800&h=800&fit=crop',
  };

  for (const [key, url] of Object.entries(imageMap)) {
    if (n.includes(key)) return url;
  }
  
  // Default product images
  return 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=800&fit=crop';
};

// ============================================
// PRODUCT DETAIL PAGE
// ============================================

function ProductDetailPage({ 
  product, 
  onBack 
}: { 
  product: any; 
  onBack: () => void;
}) {
  const { theme } = useTheme();
  const image = getProductImage(product.name);
  const price = product.price || (Math.random() * 20 + 1);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white'} pt-24 pb-12`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Back Button */}
        <button 
          onClick={onBack}
          className={`flex items-center gap-2 mb-8 ${
            theme === 'dark' ? 'text-white/70 hover:text-white' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Nazad
        </button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="aspect-square rounded-3xl overflow-hidden bg-gray-100">
            <img src={image} alt={product.name} className="w-full h-full object-cover" />
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold" style={{ color: theme === 'dark' ? '#fff' : '#1a2a33' }}>
                {product.name}
              </h1>
              {product.categoryName && (
                <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {product.categoryName}
                </p>
              )}
            </div>

            <div className="text-4xl font-bold text-[#0e7c86]">
              KM{price.toFixed(2)}
            </div>

            <p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              {product.description || 'Kvalitetan proizvod iz naše ponude. Najbolji izbor za vašu porodicu.'}
            </p>

            <div className="flex gap-4 pt-4">
              <button className="flex-1 px-8 py-4 bg-[#0e7c86] text-white font-semibold rounded-full hover:bg-[#0a5d65] transition-all">
                Dodaj u košaricu
              </button>
              <button className={`px-6 py-4 rounded-full border transition-all ${
                theme === 'dark' 
                  ? 'border-white/20 text-white hover:bg-white/10' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            {/* Info */}
            <div className={`pt-6 border-t ${theme === 'dark' ? 'border-white/10' : 'border-gray-200'}`}>
              <div className="grid grid-cols-3 gap-4">
                <div className={`p-4 rounded-xl text-center ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'}`}>
                  <div className="text-2xl mb-1">🚚</div>
                  <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Dostava</div>
                </div>
                <div className={`p-4 rounded-xl text-center ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'}`}>
                  <div className="text-2xl mb-1">↩️</div>
                  <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Povrat</div>
                </div>
                <div className={`p-4 rounded-xl text-center ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'}`}>
                  <div className="text-2xl mb-1">🛡️</div>
                  <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Garancija</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// MAIN PAGE
// ============================================

function ShopContent() {
  const router = useRouter();
  const [company, setCompany] = useState<Company | null>(null);
  const [articleCount, setArticleCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await syncApetitioData();
        setCompany(data.company);
        setArticles(data.articles);
        setCategories(data.categories);
        setArticleCount(data.articles.length);
        setCategoryCount(data.categories.length);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setIsLoading(false);
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
      const matchesSearch = searchQuery === '' || article.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [articles, activeCategory, searchQuery]);

  const handleProductClick = (product: any) => {
    const price = product.price || (Math.random() * 20 + 1);
    setSelectedProduct({ ...product, image: getProductImage(product.name), price });
  };

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

  // Show product detail page if selected
  if (selectedProduct) {
    return (
      <CartProvider>
        <ThemeProvider>
          <Header company={company} />
          <ProductDetailPage 
            product={selectedProduct} 
            onBack={() => setSelectedProduct(null)} 
          />
          <Footer />
          <Cart />
        </ThemeProvider>
      </CartProvider>
    );
  }

  return (
    <CartProvider>
      <ThemeProvider>
        <div className="min-h-screen bg-white dark:bg-[#0a0a0a] transition-colors duration-300">
          <Header company={company} />
          <main>
            <Hero company={company} articleCount={articleCount} categoryCount={categoryCount} />
            
            {/* Products Section */}
            <section className="py-12 bg-white dark:bg-[#0a0a0a]">
              <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-8" style={{ fontFamily: "'Playfair Display', serif", color: '#1a2a33' }}>
                  Proizvodi
                </h2>

                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <button onClick={() => setActiveCategory('all')} className="px-4 py-2 rounded-full text-sm font-medium bg-[#0e7c86] text-white">Svi</button>
                  {categoriesWithCount.map((cat) => (
                    <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`px-4 py-2 rounded-full text-sm font-medium ${activeCategory === cat.id ? 'bg-[#0e7c86] text-white' : 'bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-white/70'}`}>
                      {cat.name} ({cat.articleCount})
                    </button>
                  ))}
                </div>

                {/* Search */}
                <div className="relative mb-8">
                  <input type="text" placeholder="Pretraži proizvode..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-12 pl-12 pr-4 rounded-xl border bg-gray-50 dark:bg-[#1a1a1a] dark:border-white/10 dark:text-white" />
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                {/* Results Count */}
                <div className="mb-6 flex items-center gap-2">
                  <span className="text-gray-500">Pronađeno</span>
                  <span className="font-bold text-[#0e7c86]">{filteredArticles.length}</span>
                  <span className="text-gray-500">proizvoda</span>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                  {filteredArticles.slice(0, 25).map((product) => {
                    const image = getProductImage(product.name);
                    const price = product.price || (Math.random() * 20 + 1);
                    
                    return (
                      <div key={product.id} onClick={() => handleProductClick(product)}
                        className="group rounded-2xl overflow-hidden cursor-pointer bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-white/10 hover:shadow-xl transition-all">
                        <div className="aspect-square overflow-hidden bg-gray-100 relative">
                          <img src={image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                          <button className="absolute bottom-3 right-3 w-10 h-10 bg-[#0e7c86] text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                          </button>
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium text-sm line-clamp-2 mb-2 text-gray-900 dark:text-white">{product.name}</h3>
                          <span className="text-lg font-bold text-[#0e7c86]">KM{price.toFixed(2)}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          </main>
          <Footer />
          <Cart />
        </div>
      </ThemeProvider>
    </CartProvider>
  );
}

export default function Home() {
  return <ShopContent />;
}