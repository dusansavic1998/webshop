'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'Opće postavke' },
    { id: 'company', label: 'Podaci o firmi' },
    { id: 'api', label: 'API postavke' },
    { id: 'appearance', label: 'Izgled' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link href="/admin" className="text-gray-500 hover:text-gray-700">
            <span className="text-2xl">←</span>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#1a1a2e]">Postavke</h1>
            <p className="text-gray-500 text-sm">Konfiguracija sistema</p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-64 bg-white rounded-2xl p-4 shadow-sm h-fit">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-4 py-3 rounded-xl mb-1 ${
                  activeTab === tab.id 
                    ? 'bg-[#e94560] text-white' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 bg-white rounded-2xl p-6 shadow-sm">
            {activeTab === 'general' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-[#1a1a2e]">Opće postavke</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ime stranice</label>
                  <input 
                    type="text" 
                    defaultValue="BePro - Betonski proizvodi"
                    className="w-full px-4 py-2 rounded-xl border border-gray-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Opis</label>
                  <textarea 
                    rows={3}
                    defaultValue="Vaš pouzdan partner za betonske proizvode"
                    className="w-full px-4 py-2 rounded-xl border border-gray-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Jezik</label>
                  <select className="w-full px-4 py-2 rounded-xl border border-gray-200">
                    <option>Bosanski</option>
                    <option>English</option>
                    <option>Hrvatski</option>
                    <option>Српски</option>
                  </select>
                </div>

                <button className="px-4 py-2 bg-[#e94560] text-white rounded-xl hover:bg-[#d63d56]">
                  Sačuvaj
                </button>
              </div>
            )}

            {activeTab === 'company' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-[#1a1a2e]">Podaci o firmi</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ime firme</label>
                    <input type="text" defaultValue="BePro d.o.o." className="w-full px-4 py-2 rounded-xl border border-gray-200" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">PIB</label>
                    <input type="text" defaultValue="123456789" className="w-full px-4 py-2 rounded-xl border border-gray-200" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Adresa</label>
                  <input type="text" defaultValue="Zmaja od Bosne 123, Sarajevo" className="w-full px-4 py-2 rounded-xl border border-gray-200" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                    <input type="text" defaultValue="+387 60 123 456" className="w-full px-4 py-2 rounded-xl border border-gray-200" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" defaultValue="info@bepro-doo.com" className="w-full px-4 py-2 rounded-xl border border-gray-200" />
                  </div>
                </div>

                <button className="px-4 py-2 bg-[#e94560] text-white rounded-xl hover:bg-[#d63d56]">
                  Sačuvaj
                </button>
              </div>
            )}

            {activeTab === 'api' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-[#1a1a2e]">API postavke</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">API URL</label>
                  <input 
                    type="text" 
                    defaultValue="http://localhost"
                    className="w-full px-4 py-2 rounded-xl border border-gray-200" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">API Token</label>
                  <input 
                    type="password" 
                    defaultValue="••••••••••••••••"
                    className="w-full px-4 py-2 rounded-xl border border-gray-200" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Timeout (ms)</label>
                  <input 
                    type="number" 
                    defaultValue="30000"
                    className="w-full px-4 py-2 rounded-xl border border-gray-200" 
                  />
                </div>

                <button className="px-4 py-2 bg-[#e94560] text-white rounded-xl hover:bg-[#d63d56]">
                  Sačuvaj
                </button>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-[#1a1a2e]">Izgled</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Primarna boja</label>
                  <div className="flex gap-3">
                    <input type="color" defaultValue="#e94560" className="w-12 h-10 rounded" />
                    <input type="text" defaultValue="#e94560" className="flex-1 px-4 py-2 rounded-xl border border-gray-200" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sekundarna boja</label>
                  <div className="flex gap-3">
                    <input type="color" defaultValue="#1a1a2e" className="w-12 h-10 rounded" />
                    <input type="text" defaultValue="#1a1a2e" className="flex-1 px-4 py-2 rounded-xl border border-gray-200" />
                  </div>
                </div>

                <button className="px-4 py-2 bg-[#e94560] text-white rounded-xl hover:bg-[#d63d56]">
                  Sačuvaj
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
