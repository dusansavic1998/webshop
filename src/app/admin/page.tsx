'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = [
    { label: 'Ukupno proizvoda', value: '156', icon: '📦', change: '+12%' },
    { label: 'Blog postova', value: '24', icon: '📝', change: '+3' },
    { label: 'Ukupno posjeta', value: '12.5K', icon: '👁️', change: '+8%' },
    { label: 'Naručilaca', value: '89', icon: '👥', change: '+15%' },
  ];

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', href: '/admin' },
    { id: 'products', label: 'Proizvodi', icon: '📦', href: '/admin/products' },
    { id: 'blog', label: 'Blog', icon: '📝', href: '/admin/blog' },
    { id: 'orders', label: 'Narudžbe', icon: '🛒', href: '/admin/orders' },
    { id: 'customers', label: 'Kupci', icon: '👥', href: '/admin/customers' },
    { id: 'settings', label: 'Postavke', icon: '⚙️', href: '/admin/settings' },
  ];

  const recentOrders = [
    { id: '#ORD-001', customer: 'John Doe', product: 'Premium ploče', amount: '{450', status: 'completed' },
    { id: '#ORD-002', customer: 'Jane Smith', product: 'Kocke', amount: '{280', status: 'pending' },
    { id: '#ORD-003', customer: 'Mike Johnson', product: 'Mobilijar', amount: '{1,200', status: 'completed' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1a1a2e] text-white flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#e94560] to-[#ff6b6b] rounded-xl flex items-center justify-center">
              <span className="text-white font-bold">B</span>
            </div>
            <div>
              <span className="font-bold">BePro</span>
              <p className="text-xs text-gray-400">Admin Panel</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                activeTab === item.id 
                  ? 'bg-[#e94560] text-white' 
                  : 'text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
              onClick={() => setActiveTab(item.id)}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* User */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#e94560] rounded-full flex items-center justify-center">
              <span className="font-bold">A</span>
            </div>
            <div>
              <p className="font-medium">Admin</p>
              <p className="text-xs text-gray-400">admin@bepro.ba</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#1a1a2e]">Dashboard</h1>
            <p className="text-gray-500">Pregled vaše web stranice</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <span className="text-xl">🔔</span>
            </button>
            <Link 
              href="/admin/blog/new" 
              className="px-4 py-2 bg-[#e94560] text-white rounded-xl font-medium hover:bg-[#d63d56] transition-colors"
            >
              + Novi post
            </Link>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{stat.icon}</span>
                <span className="text-green-500 text-sm font-medium">{stat.change}</span>
              </div>
              <p className="text-3xl font-bold text-[#1a1a2e]">{stat.value}</p>
              <p className="text-gray-500 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-lg font-bold text-[#1a1a2e]">Zadnje narudžbe</h2>
          </div>
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">ID</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Kupac</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Proizvod</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Iznos</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray50">
                  <td className="px-6 py-4 text-sm font-medium text-[#1a1a2e]">{order.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.customer}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.product}</td>
                  <td className="px-6 py-4 text-sm font-medium text-[#1a1a2e]">{order.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === 'completed' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.status === 'completed' ? 'Završeno' : 'Na čekanju'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Link href="/admin/products" className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <span className="text-3xl mb-4 block">📦</span>
            <h3 className="font-bold text-[#1a1a2e]">Upravljanje proizvodima</h3>
            <p className="text-gray-500 text-sm mt-1">Dodajte, uređujte ili obrišite proizvode</p>
          </Link>
          <Link href="/admin/blog" className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <span className="text-3xl mb-4 block">✍️</span>
            <h3 className="font-bold text-[#1a1a2e]">Upravljanje blogom</h3>
            <p className="text-gray-500 text-sm mt-1">Kreirajte i uređujte blog postove</p>
          </Link>
          <Link href="/admin/settings" className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <span className="text-3xl mb-4 block">⚙️</span>
            <h3 className="font-bold text-[#1a1a2e]">Postavke stranice</h3>
            <p className="text-gray-500 text-sm mt-1">Konfigurišite izgled i ponašanje</p>
          </Link>
        </div>
      </main>
    </div>
  );
}
