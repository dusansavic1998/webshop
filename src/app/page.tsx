'use client';

import { useState, useMemo } from 'react';
import { CartProvider } from '@/context/CartContext';
import { SyncProvider, useSync } from '@/lib/api/SyncContext';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CategoryFilter from '@/components/CategoryFilter';
import ProductGrid from '@/components/ProductGrid';
import ProductDetail from '@/components/ProductDetail';
import Cart from '@/components/Cart';
import Footer from '@/components/Footer';
import { products as mockProducts } from '@/data/products';
import { categories as mockCategories } from '@/data/products';

function ShopContent() {
  const { articles, categories, isSynced } = useSync();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // Use synced data if available, otherwise mock
  const productData = isSynced && articles.length > 0 ? articles : mockProducts;
  const categoryData = isSynced && categories.length > 0 
    ? categories.map((c: any) => ({ id: c.id, name: c.name, icon: '📁' }))
    : mockCategories;

  const filteredProducts = useMemo(() => {
    return productData.filter((product: any) => {
      const matchesCategory =
        activeCategory === 'all' || product.category === activeCategory;
      const matchesSearch =
        searchQuery === '' ||
        (product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [productData, activeCategory, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearch={handleSearch} />
      <main>
        <Hero />
        <CategoryFilter
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          categories={categoryData}
        />
        <ProductGrid 
          products={filteredProducts} 
          onProductClick={setSelectedProduct}
        />
      </main>
      <Footer />
      <Cart />
      
      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetail 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
}

export default function Home() {
  return (
    <CartProvider>
      <SyncProvider>
        <ShopContent />
      </SyncProvider>
    </CartProvider>
  );
}
