'use client';

import { useState } from 'react';
import { blogPosts, categories, BlogPost } from '@/data/blog';

export default function BlogManagement() {
  const [posts, setPosts] = useState<BlogPost[]>(blogPosts);
  const [selectedCategory, setSelectedCategory] = useState('Svi');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'Svi' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-700';
      case 'draft': return 'bg-yellow-100 text-yellow-700';
      case 'archived': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'published': return 'Objavljen';
      case 'draft': return 'Nacrt';
      case 'archived': return 'Arhiviran';
      default: return status;
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Da li ste sigurni da želite obrisati ovaj post?')) {
      setPosts(posts.filter(p => p.id !== id));
    }
  };

  const handleToggleFeatured = (id: string) => {
    setPosts(posts.map(p => 
      p.id === id ? { ...p, featured: !p.featured } : p
    ));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/admin" className="text-gray-500 hover:text-gray-700">
              <span className="text-2xl">←</span>
            </a>
            <div>
              <h1 className="text-2xl font-bold text-[#1a1a2e]">Upravljanje blogom</h1>
              <p className="text-gray-500 text-sm">Kreirajte i uređujte blog postove</p>
            </div>
          </div>
          <button 
            onClick={() => { setEditingPost(null); setShowModal(true); }}
            className="px-4 py-2 bg-[#e94560] text-white rounded-xl font-medium hover:bg-[#d63d56]"
          >
            + Novi post
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Pretraži postove..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-[#e94560] focus:ring-2 focus:ring-[#e94560]/20"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${
                  selectedCategory === cat 
                    ? 'bg-[#e94560] text-white' 
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Post</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Kategorije</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Pregledi</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Datum</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">Akcije</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPosts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img 
                        src={post.featuredImage} 
                        alt={post.title}
                        className="w-16 h-12 object-cover rounded-lg"
                      />
                      <div>
                        <p className="font-medium text-[#1a1a2e] line-clamp-1">{post.title}</p>
                        <p className="text-gray-500 text-sm line-clamp-1">{post.excerpt}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}>
                      {getStatusLabel(post.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {post.views.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('bs-BA') : '-'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleToggleFeatured(post.id)}
                        className={`p-2 rounded-lg ${post.featured ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                        title={post.featured ? 'Ukloni sa istaknutih' : 'Istakni'}
                      >
                        ⭐
                      </button>
                      <button 
                        onClick={() => { setEditingPost(post); setShowModal(true); }}
                        className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                      >
                        ✏️
                      </button>
                      <button 
                        onClick={() => handleDelete(post.id)}
                        className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Nema pronađenih postova</p>
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
                {editingPost ? 'Uredi post' : 'Novi post'}
              </h2>
            </div>
            <form className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Naslov</label>
                <input 
                  type="text" 
                  defaultValue={editingPost?.title}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-[#e94560]"
                  placeholder="Unesite naslov..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sažetak</label>
                <textarea 
                  defaultValue={editingPost?.excerpt}
                  rows={2}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-[#e94560]"
                  placeholder="Kratki sažetak..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sadržaj</label>
                <textarea 
                  defaultValue={editingPost?.content}
                  rows={8}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-[#e94560]"
                  placeholder="Sadržaj posta..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1"> kategorija</label>
                  <select 
                    defaultValue={editingPost?.category}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-[#e94560]"
                  >
                    {categories.filter(c => c !== 'Svi').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select 
                    defaultValue={editingPost?.status || 'draft'}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-[#e94560]"
                  >
                    <option value="draft">Nacrt</option>
                    <option value="published">Objavi</option>
                    <option value="archived">Arhiviraj</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image URL</label>
                <input 
                  type="text" 
                  defaultValue={editingPost?.featuredImage}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-[#e94560]"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tagovi (odvojeni zarezom)</label>
                <input 
                  type="text" 
                  defaultValue={editingPost?.tags.join(', ')}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-[#e94560]"
                  placeholder="tag1, tag2, tag3"
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
                  {editingPost ? 'Sačuvaj' : 'Kreiraj'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
