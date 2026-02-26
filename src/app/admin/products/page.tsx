'use client';

import { useState } from 'react';
import Link from 'next/link';

// ============================================
// TYPES
// ============================================

interface Product {
  id: number;
  articleId?: number;
  sku?: string;
  name: string;
  description?: string;
  price: number;
  salePrice?: number;
  image?: string;
  images?: string[];
  stock: number;
  inStock: boolean;
  isLocal: boolean;
  categoryName?: string;
  // Content Builder fields (for local products)
  longDescription?: string;
  specifications?: Record<string, string>;
  features?: string[];
  ingredients?: string[];
  nutritionInfo?: Record<string, string>;
  brand?: string;
  weight?: string;
  countryOfOrigin?: string;
}

interface Category {
  id: number;
  name: string;
  isLocal: boolean;
}

// ============================================
// MOCK DATA
// ============================================

const mockProducts: Product[] = [
  // API Products (read-only)
  { 
    id: 1, articleId: 1, sku: '00001', name: 'Brašno T-400 1kg Klas', 
    price: 1.99, stock: 100, inStock: true, isLocal: false, 
    categoryName: 'Prehrambeni', description: 'Kvalitetno pšenično brašno' 
  },
  { 
    id: 2, articleId: 2, sku: '00002', name: 'Ulje suncokretovo 1L Bimal', 
    price: 2.49, stock: 50, inStock: true, isLocal: false, 
    categoryName: 'Prehrambeni', description: 'Prvoklasno suncokretovo ulje' 
  },
  { 
    id: 3, articleId: 3, sku: '00003', name: 'So kuhinjska 1kg', 
    price: 0.99, stock: 200, inStock: true, isLocal: false, 
    categoryName: 'Prehrambeni', description: 'Čista kuhinjska so' 
  },
  // Local Products (Content Builder)
  { 
    id: 101, 
    sku: 'LOC-001', 
    name: 'Premium Sok od Narandže', 
    price: 3.99, 
    stock: 45, 
    inStock: true, 
    isLocal: true, 
    categoryName: 'Pića',
    description: 'Svježe cijeđeni sok od narandže',
    longDescription: 'Naš Premium sok od narandže je napravljen od najkvalitetnijih narandži iz brazilskih plantaža. Proizvod je 100% prirodan, bez dodanih konzervansa i šećera.\n\n### Idealno za:\n- Doručak\n- Smoothie\n- Koktele',
    specifications: {
      'Volumen': '1L',
      'Pakovanje': 'Tetra Pak',
      'Rok trajanja': '30 dana',
      'Čuvanje': 'Na hladnom',
    },
    features: [
      '100% prirodno',
      'Bez dodatnog šećera',
      'Bogato vitaminom C',
      'Bez konzervansa',
    ],
    ingredients: ['Sok od narandže (100%)'],
    nutritionInfo: {
      'Energija': '180 kJ / 42 kcal',
      'Masti': '0g',
      'Ugljikohidrati': '10g',
      'Šećer': '8g',
      'Protein': '0.5g',
    },
    brand: 'Apetitio',
    weight: '1L',
    countryOfOrigin: 'Brazil',
    images: [
      'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400',
      'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400',
    ],
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400',
  },
  { 
    id: 102, 
    sku: 'LOC-002', 
    name: 'Organička Zeleni Čaj Kutija', 
    price: 7.99, 
    stock: 20, 
    inStock: true, 
    isLocal: true, 
    categoryName: 'Pića',
    description: 'Premium organski zeleni čaj',
    longDescription: 'Najbolji organski zeleni čaj iz Kine. Svaki paket sadrži 50 vrećica čaja najvišeg kvaliteta.\n\n### Prednosti:\n- Antioksidansi\n- Metabolizam\n- Opuštanje',
    specifications: {
      'Broj vrećica': '50',
      'Težina': '100g',
      'Vrsta': 'Zeleni čaj',
      'Organski': 'Da',
    },
    features: [
      '100% organski',
      'Premium kvalitet',
      'Antioksidativno djelovanje',
      'Prirodna aroma',
    ],
    ingredients: ['Listovi zelenog čaja (100%)'],
    brand: 'TeaMaster',
    weight: '100g',
    countryOfOrigin: 'Kina',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400',
  },
];

const mockCategories: Category[] = [
  { id: 1, name: 'Prehrambeni proizvodi', isLocal: false },
  { id: 2, name: 'Pića', isLocal: false },
  { id: 3, name: 'Grickalice i slatkiši', isLocal: false },
  { id: 4, name: 'Higijena i hemija', isLocal: false },
  { id: 101, name: 'Lokalna kategorija', isLocal: true },
];

// ============================================
// CONTENT BUILDER COMPONENT
// ============================================

function ContentBuilder({ 
  product, 
  onSave 
}: { 
  product: Product | null; 
  onSave: (data: Product) => void;
}) {
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState<Product>(product || {
    id: Date.now(),
    name: '',
    price: 0,
    description: '',
    longDescription: '',
    image: '',
    images: [],
    stock: 0,
    inStock: true,
    isLocal: true,
    categoryName: 'Lokalna kategorija',
    specifications: {},
    features: [],
    ingredients: [],
    nutritionInfo: {},
    brand: '',
    weight: '',
    countryOfOrigin: '',
  });

  const tabs = [
    { id: 'basic', label: 'Osnovno', icon: '📝' },
    { id: 'description', label: 'Opis', icon: '📄' },
    { id: 'specs', label: 'Specifikacije', icon: '📋' },
    { id: 'features', label: 'Karakteristike', icon: '✨' },
    { id: 'nutrition', label: 'Nutritivno', icon: '🥗' },
    { id: 'images', label: 'Slike', icon: '🖼️' },
  ];

  return (
    <div className="flex h-[600px]">
      {/* Tabs */}
      <div className="w-48 bg-gray-50 border-r p-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full text-left px-3 py-2 rounded-lg mb-1 flex items-center gap-2 ${
              activeTab === tab.id 
                ? 'bg-[#e94560] text-white' 
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            <span>{tab.icon}</span>
            <span className="text-sm">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {activeTab === 'basic' && (
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Osnovne informacije</h3>
            <div>
              <label className="block text-sm font-medium mb-1">Naziv proizvoda *</label>
              <input 
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Naziv proizvoda"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Cijena (KM)</label>
                <input 
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Akcijska cijena</label>
                <input 
                  type="number"
                  step="0.01"
                  value={formData.salePrice || ''}
                  onChange={(e) => setFormData({...formData, salePrice: parseFloat(e.target.value) || undefined})}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Šifra (SKU)</label>
                <input 
                  type="text"
                  value={formData.sku || ''}
                  onChange={(e) => setFormData({...formData, sku: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Na stanju</label>
                <select 
                  value={formData.inStock ? 'true' : 'false'}
                  onChange={(e) => setFormData({...formData, inStock: e.target.value === 'true'})}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="true">Da</option>
                  <option value="false">Ne</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Kratki opis</label>
              <textarea 
                value={formData.description || ''}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={2}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Brand</label>
                <input 
                  type="text"
                  value={formData.brand || ''}
                  onChange={(e) => setFormData({...formData, brand: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Težina/Veličina</label>
                <input 
                  type="text"
                  value={formData.weight || ''}
                  onChange={(e) => setFormData({...formData, weight: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Porijeklo</label>
                <input 
                  type="text"
                  value={formData.countryOfOrigin || ''}
                  onChange={(e) => setFormData({...formData, countryOfOrigin: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'description' && (
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Detaljan opis</h3>
            <p className="text-sm text-gray-500">Koristi Markdown za formatiranje (## naslov, **bold**, - lista)</p>
            <textarea 
              value={formData.longDescription || ''}
              onChange={(e) => setFormData({...formData, longDescription: e.target.value})}
              rows={15}
              className="w-full px-4 py-2 border rounded-lg font-mono text-sm"
              placeholder="## Naslov&#10;&#10;Tekst opisa...&#10;&#10;- Stavka 1&#10;- Stavka 2"
            />
          </div>
        )}

        {activeTab === 'specs' && (
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Specifikacije proizvoda</h3>
            <div className="space-y-2">
              {Object.entries(formData.specifications || {}).map(([key, value], idx) => (
                <div key={idx} className="flex gap-2">
                  <input 
                    value={key}
                    onChange={(e) => {
                      const newSpecs = {...formData.specifications};
                      const val = newSpecs[key];
                      delete newSpecs[key];
                      newSpecs[e.target.value] = val;
                      setFormData({...formData, specifications: newSpecs});
                    }}
                    className="flex-1 px-3 py-2 border rounded-lg"
                    placeholder="Naziv"
                  />
                  <input 
                    value={value}
                    onChange={(e) => setFormData({
                      ...formData, 
                      specifications: {...formData.specifications, [key]: e.target.value}
                    })}
                    className="flex-1 px-3 py-2 border rounded-lg"
                    placeholder="Vrijednost"
                  />
                  <button 
                    onClick={() => {
                      const newSpecs = {...formData.specifications};
                      delete newSpecs[key];
                      setFormData({...formData, specifications: newSpecs});
                    }}
                    className="px-3 py-2 bg-red-100 text-red-600 rounded-lg"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button 
                onClick={() => setFormData({
                  ...formData, 
                  specifications: {...formData.specifications, '': ''}
                })}
                className="text-[#e94560] text-sm font-medium"
              >
                + Dodaj specifikaciju
              </button>
            </div>
          </div>
        )}

        {activeTab === 'features' && (
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Karakteristike</h3>
            <div className="space-y-2">
              {(formData.features || []).map((feature, idx) => (
                <div key={idx} className="flex gap-2">
                  <input 
                    value={feature}
                    onChange={(e) => {
                      const newFeatures = [...(formData.features || [])];
                      newFeatures[idx] = e.target.value;
                      setFormData({...formData, features: newFeatures});
                    }}
                    className="flex-1 px-3 py-2 border rounded-lg"
                  />
                  <button 
                    onClick={() => {
                      const newFeatures = (formData.features || []).filter((_, i) => i !== idx);
                      setFormData({...formData, features: newFeatures});
                    }}
                    className="px-3 py-2 bg-red-100 text-red-600 rounded-lg"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button 
                onClick={() => setFormData({
                  ...formData, 
                  features: [...(formData.features || []), '']
                })}
                className="text-[#e94560] text-sm font-medium"
              >
                + Dodaj karakteristiku
              </button>
            </div>
          </div>
        )}

        {activeTab === 'nutrition' && (
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Nutritivne informacije</h3>
            <p className="text-sm text-gray-500">Na 100g proizvoda</p>
            <div className="space-y-2">
              {Object.entries(formData.nutritionInfo || {}).map(([key, value], idx) => (
                <div key={idx} className="flex gap-2">
                  <input 
                    value={key}
                    onChange={(e) => {
                      const newInfo = {...formData.nutritionInfo};
                      const val = newInfo[key];
                      delete newInfo[key];
                      newInfo[e.target.value] = val;
                      setFormData({...formData, nutritionInfo: newInfo});
                    }}
                    className="flex-1 px-3 py-2 border rounded-lg"
                    placeholder="Naziv"
                  />
                  <input 
                    value={value}
                    onChange={(e) => setFormData({
                      ...formData, 
                      nutritionInfo: {...formData.nutritionInfo, [key]: e.target.value}
                    })}
                    className="flex-1 px-3 py-2 border rounded-lg"
                    placeholder="Vrijednost"
                  />
                  <button 
                    onClick={() => {
                      const newInfo = {...formData.nutritionInfo};
                      delete newInfo[key];
                      setFormData({...formData, nutritionInfo: newInfo});
                    }}
                    className="px-3 py-2 bg-red-100 text-red-600 rounded-lg"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button 
                onClick={() => setFormData({
                  ...formData, 
                  nutritionInfo: {...formData.nutritionInfo, '': ''}
                })}
                className="text-[#e94560] text-sm font-medium"
              >
                + Dodaj nutritivnu vrijednost
              </button>
            </div>
          </div>
        )}

        {activeTab === 'images' && (
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Slike proizvoda</h3>
            <div>
              <label className="block text-sm font-medium mb-1">Glavna slika (URL)</label>
              <input 
                type="text"
                value={formData.image || ''}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="https://..."
              />
              {formData.image && (
                <img src={formData.image} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-lg" />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Dodatne slike</label>
              <div className="space-y-2">
                {(formData.images || []).map((img, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input 
                      value={img}
                      onChange={(e) => {
                        const newImages = [...(formData.images || [])];
                        newImages[idx] = e.target.value;
                        setFormData({...formData, images: newImages});
                      }}
                      className="flex-1 px-3 py-2 border rounded-lg"
                    />
                    <button 
                      onClick={() => {
                        const newImages = (formData.images || []).filter((_, i) => i !== idx);
                        setFormData({...formData, images: newImages});
                      }}
                      className="px-3 py-2 bg-red-100 text-red-600 rounded-lg"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button 
                  onClick={() => setFormData({
                    ...formData, 
                    images: [...(formData.images || []), '']
                  })}
                  className="text-[#e94560] text-sm font-medium"
                >
                  + Dodaj sliku
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="mt-6 pt-4 border-t flex justify-end gap-2">
          <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            Odustani
          </button>
          <button 
            onClick={() => onSave(formData)}
            className="px-6 py-2 bg-[#e94560] text-white rounded-lg hover:bg-[#d63d56]"
          >
            Sačuvaj proizvod
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function ProductsManagement() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'list' | 'builder'>('list');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.categoryName === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSaveProduct = (data: Product) => {
    if (editingProduct) {
      setProducts(products.map(p => p.id === data.id ? data : p));
    } else {
      setProducts([...products, { ...data, id: Date.now() }]);
    }
    setViewMode('list');
    setEditingProduct(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-gray-500 hover:text-gray-700">
              <span className="text-2xl">←</span>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-[#1a1a2e]">Proizvodi</h1>
              <p className="text-gray-500 text-sm">Content Builder + Pregled</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-xl font-medium ${viewMode === 'list' ? 'bg-[#e94560] text-white' : 'bg-gray-100 text-gray-600'}`}
            >
              📋 Lista
            </button>
            <button 
              onClick={() => { setEditingProduct(null); setViewMode('builder'); }}
              className={`px-4 py-2 rounded-xl font-medium ${viewMode === 'builder' ? 'bg-[#e94560] text-white' : 'bg-gray-100 text-gray-600'}`}
            >
              ➕ Novi proizvod
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {viewMode === 'list' ? (
          <>
            {/* Filters */}
            <div className="flex gap-4 mb-6">
              <input
                type="text"
                placeholder="Pretraži..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2 rounded-xl border"
              />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 rounded-xl border"
              >
                <option value="all">Sve kategorije</option>
                {mockCategories.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <div 
                  key={product.id} 
                  className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="aspect-square bg-gray-100 relative">
                    <img 
                      src={product.image || 'https://via.placeholder.com/400'} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <span className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${
                      product.isLocal 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {product.isLocal ? '🏠 Lokalno' : '🔗 API'}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-[#1a1a2e] line-clamp-1">{product.name}</h3>
                    <p className="text-gray-500 text-sm line-clamp-1">{product.categoryName}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xl font-bold text-[#e94560]">{{product.price.toFixed(2)}</span>
                      <button 
                        onClick={() => {
                          setEditingProduct(product);
                          setViewMode('builder');
                        }}
                        className="px-3 py-1 bg-gray-100 rounded-lg text-sm hover:bg-gray-200"
                      >
                        {product.isLocal ? '✏️ Uredi' : '👁️ Pregled'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <ContentBuilder 
              product={editingProduct} 
              onSave={handleSaveProduct} 
            />
          </div>
        )}
      </div>
    </div>
  );
}