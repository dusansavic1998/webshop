'use client';

import { useState } from 'react';
import Link from 'next/link';
import { products } from '@/data/products';

export default function ProductsManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const categories = ['all', 'plosce', 'kocke', 'mobilijar', 'dekorativni'];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'plosce': return 'Betonske ploče';
      case 'kocke': return 'Kocke';
      case 'mobilijar': return 'Mobilijar';
      case 'dekorativni': return 'Dekorativni';
      default: return cat;
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('Da li ste sigurni da želite obrisati ovaj proizvod?')) {
      alert('Proizvod obrisan (demo)');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-gray-500 hover:text-gray-700">
              <span className="text-2xl">←</span>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-[#1a1a2e]">Proizvodi</h1>
              <p className="text-gray-500 text-sm">Upravljanje proizvodima</p>
            </div>
          </div>
          <button 
            onClick={() => { setEditingProduct(null); setShowModal(true); }}
            className="px-4 py-2 bg-[#e94560] text-white rounded-xl font-medium hover:bg-[#d63d56]"
          >
            + Novi proizvod
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Pretraži proizvode..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-[#e94560] focus:ring-2 focus:ring-[#e94560]/20"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 rounded-xl border border-gray-200 focus:border-[#e94560]"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'Sve kategorije' : getCategoryLabel(cat)}
              </option>
            ))}
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-video relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 px-2 py-1 bg-white/90 rounded-full text-xs font-medium">
                  {getCategoryLabel(product.category)}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-[#1a1a2e] line-clamp-2 mb-2">{product.name}</h3>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-xl font-bold text-[#e94560]">€{product.price}</span>
                    {product.salePrice && (
                      <span className="text-sm text-gray-400 line-through ml-2">€{product.salePrice}</span>
                    )}
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {product.inStock ? 'Na stanju' : 'Nema'}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => { setEditingProduct(product); setShowModal(true); }}
                    className="flex-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200"
                  >
                    ✏️ Uredi
                  </button>
                  <button 
                    onClick={() => handleDelete(product.id)}
                    className="px-3 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Nema pronađenih proizvoda</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold text-[#1a1a2e]">
                {editingProduct ? 'Uredi proizvod' : 'Novi proizvod'}
              </h2>
            </div>
            <form className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Naziv</label>
                <input 
                  type="text" 
                  defaultValue={editingProduct?.name}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-[#e94560]"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cijena</label>
                  <input 
                    type="number" 
                    defaultValue={editingProduct?.price}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-[#e94560]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Akcijska cijena</label>
                  <input 
                    type="number" 
                    defaultValue={editingProduct?.salePrice}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-[#e94560]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Opis</label>
                <textarea 
                  defaultValue={editingProduct?.description}
                  rows={3}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-[#e94560]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1"> kategorija</label>
                  <select 
                    defaultValue={editingProduct?.category || 'plosce'}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-[#e94560]"
                  >
                    {categories.filter(c => c !== 'all').map(cat => (
                      <option key={cat} value={cat}>{getCategoryLabel(cat)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Na stanju</label>
                  <select 
                    defaultValue={editingProduct?.inStock ? 'true' : 'false'}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-[#e94560]"
                  >
                    <option value="true">Da</option>
                    <option value="false">Ne</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL slike</label>
                <input 
                  type="text" 
                  defaultValue={editingProduct?.image}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-[#e94560]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl"
                >
                  Odustani
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-[#e94560] text-white rounded-xl hover:bg-[#d63d56]"
                >
                  {editingProduct ? 'Sačuvaj' : 'Kreiraj'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
