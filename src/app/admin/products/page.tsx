'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Types
interface Product {
  id: number;
  articleId?: number;
  sku?: string;
  name: string;
  description?: string;
  price: number;
  salePrice?: number;
  image?: string;
  stock: number;
  inStock: boolean;
  isLocal: boolean;
  categoryName?: string;
}

interface Category {
  id: number;
  name: string;
  isLocal: boolean;
}

// Mock data for demo (since we don't have real DB)
const mockProducts: Product[] = [
  { id: 1, articleId: 1, sku: '00001', name: 'Brašno T-400 1kg Klas', price: 1.99, stock: 100, inStock: true, isLocal: false, categoryName: 'Prehrambeni' },
  { id: 2, articleId: 2, sku: '00002', name: 'Ulje suncokretovo 1L Bimal', price: 2.49, stock: 50, inStock: true, isLocal: false, categoryName: 'Prehrambeni' },
  { id: 3, articleId: 3, sku: '00003', name: 'So kuhinjska 1kg', price: 0.99, stock: 200, inStock: true, isLocal: false, categoryName: 'Prehrambeni' },
  { id: 4, articleId: 4, sku: '00004', name: 'Šećer kristal 1kg', price: 1.49, stock: 80, inStock: true, isLocal: false, categoryName: 'Prehrambeni' },
  { id: 5, articleId: 5, sku: '00005', name: 'Kafa Zlatna Džezva 100g', price: 3.99, stock: 30, inStock: true, isLocal: false, categoryName: 'Prehrambeni' },
  { id: 6, id: 101, name: 'Lokalni proizvod - Test', price: 9.99, stock: 10, inStock: true, isLocal: true, categoryName: 'Lokalno' },
  { id: 7, id: 102, name: 'Novi proizvod iz admin panel', price: 15.00, stock: 25, inStock: true, isLocal: true, categoryName: 'Lokalno' },
];

const mockCategories: Category[] = [
  { id: 1, name: 'Prehrambeni proizvodi', isLocal: false },
  { id: 2, name: 'Pića', isLocal: false },
  { id: 3, name: 'Grickalice i slatkiši', isLocal: false },
  { id: 4, name: 'Higijena i hemija', isLocal: false },
  { id: 101, name: 'Lokalna kategorija', isLocal: true },
];

export default function ProductsManagement() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [categories] = useState<Category[]>(mockCategories);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filterType, setFilterType] = useState<'all' | 'api' | 'local'>('all');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.categoryName === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = 
      filterType === 'all' || 
      (filterType === 'api' && !product.isLocal) ||
      (filterType === 'local' && product.isLocal);
    return matchesCategory && matchesSearch && matchesType;
  });

  const apiProductsCount = products.filter(p => !p.isLocal).length;
  const localProductsCount = products.filter(p => p.isLocal).length;

  const handleDelete = (id: number) => {
    if (confirm('Da li ste sigurni da želite obrisati ovaj proizvod?')) {
      // If from API, call API to delete
      // If local, just remove from local DB
      setProducts(products.filter(p => p.id !== id));
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
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div 
            onClick={() => setFilterType('all')}
            className={`bg-white rounded-xl p-4 cursor-pointer border-2 ${filterType === 'all' ? 'border-[#e94560]' : 'border-transparent'}`}
          >
            <div className="text-2xl font-bold text-[#1a1a2e]">{products.length}</div>
            <div className="text-gray-500 text-sm">Svi proizvodi</div>
          </div>
          <div 
            onClick={() => setFilterType('api')}
            className={`bg-white rounded-xl p-4 cursor-pointer border-2 ${filterType === 'api' ? 'border-blue-500' : 'border-transparent'}`}
          >
            <div className="text-2xl font-bold text-blue-600">{apiProductsCount}</div>
            <div className="text-gray-500 text-sm">Iz API-ja</div>
          </div>
          <div 
            onClick={() => setFilterType('local')}
            className={`bg-white rounded-xl p-4 cursor-pointer border-2 ${filterType === 'local' ? 'border-green-500' : 'border-transparent'}`}
          >
            <div className="text-2xl font-bold text-green-600">{localProductsCount}</div>
            <div className="text-gray-500 text-sm">Lokalni</div>
          </div>
        </div>

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
            <option value="all">Sve kategorije</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Proizvod</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Šifra</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Cijena</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Izvor</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">Akcije</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        {product.image ? (
                          <img src={product.image} alt="" className="w-full h-full object-cover rounded-lg" />
                        ) : (
                          <span className="text-xl">📦</span>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-[#1a1a2e]">{product.name}</p>
                        <p className="text-gray-500 text-sm">{product.categoryName}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {product.sku || product.articleId || '-'}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-[#1a1a2e]">
                    €{product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.isLocal 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {product.isLocal ? '🏠 Lokalno' : '🔗 API'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {product.inStock ? '✓ Na stanju' : '✗ Nema'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => { setEditingProduct(product); setShowModal(true); }}
                        className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                        title={product.isLocal ? 'Uredi' : 'Uredi (lokalno)'}
                      >
                        ✏️
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                        title={product.isLocal ? 'Obriši' : 'Obriši lokalno'}
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Nema pronađenih proizvoda</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal for Create/Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold text-[#1a1a2e]">
                {editingProduct ? (editingProduct.isLocal ? 'Uredi lokalni proizvod' : 'Uredi proizvod (lokalno)') : 'Novi lokalni proizvod'}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {editingProduct 
                  ? 'Izmjene se čuvaju lokalno. Za izmjene na API-ju, koristite InfosAPI.'
                  : 'Novi proizvod se kreira lokalno i NEMA vezu sa API-jem.'}
              </p>
            </div>
            <form className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Naziv *</label>
                <input 
                  type="text" 
                  defaultValue={editingProduct?.name}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-[#e94560]"
                  placeholder="Naziv proizvoda"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Šifra (SKU)</label>
                  <input 
                    type="text" 
                    defaultValue={editingProduct?.sku}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-[#e94560]"
                    placeholder="npr. LOCAL-001"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cijena (KM)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    defaultValue={editingProduct?.price}
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
                    defaultValue={editingProduct?.categoryName || 'Lokalno'}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-[#e94560]"
                  >
                    {categories.filter(c => c.isLocal).map(cat => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
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
                  placeholder="https://..."
                />
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <p className="text-sm text-yellow-800">
                  <strong>ℹ️ Napomena:</strong> Novi proizvodi se čuvaju LOKALNO i nemaju vezu sa InfosAPI-jem. 
                  Da biste dodali proizvod na API, koristite Infos Admin panel.
                </p>
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
