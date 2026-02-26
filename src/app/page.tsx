'use client';

import { useState, useEffect, useMemo } from 'react';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CategoryFilter from '@/components/CategoryFilter';
import ProductGrid from '@/components/ProductGrid';
import ProductDetail from '@/components/ProductDetail';
import Cart from '@/components/Cart';
import Footer from '@/components/Footer';
import { syncApetitioData, Article, Category, Company } from '@/lib/api/apetitio-service';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [company, setCompany] = useState<Company | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await syncApetitioData();
        setCompany(data.company);
        setArticles(data.articles);
        setCategories(data.categories);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // Filter articles by category
  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory = activeCategory === 'all' || article.category === activeCategory;
      const matchesSearch = searchQuery === '' ||
        article.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.description?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [articles, activeCategory, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#e94560] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Učitavanje podataka sa API-ja...</p>
        </div>
      </div>
    );
  }

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <Header onSearch={handleSearch} />
        <main>
          <Hero company={company} articleCount={articles.length} categoryCount={categories.length} />
          <CategoryFilter
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            categories={categories.map(c => ({ id: c.id, name: c.name, icon: '📁' }))}
          />
          <ProductGrid 
            products={filteredArticles.map(a => ({
              ...a,
              price: a.price || 9.99,
              image: a.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop'
            }))} 
            onProductClick={setSelectedProduct}
          />
        </main>
        <Footer />
        <Cart />
        
        {selectedProduct && (
          <ProductDetail 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
          />
        )}
      </div>
    </CartProvider>
  );
}
