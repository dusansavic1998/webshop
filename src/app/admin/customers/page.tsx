'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CustomersManagement() {
  const [searchQuery, setSearchQuery] = useState('');

  const customers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+387 60 123 456', orders: 5, totalSpent: 1250 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+387 60 234 567', orders: 3, totalSpent: 890 },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', phone: '+387 60 345 678', orders: 8, totalSpent: 3200 },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', phone: '+387 60 456 789', orders: 2, totalSpent: 450 },
    { id: 5, name: 'David Brown', email: 'david@example.com', phone: '+387 60 567 890', orders: 12, totalSpent: 5600 },
  ];

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-gray-500 hover:text-gray-700">
              <span className="text-2xl">←</span>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-[#1a1a2e]">Kupci</h1>
              <p className="text-gray-500 text-sm">Pregled svih kupaca</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Pretraži kupce..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-96 px-4 py-2 rounded-xl border border-gray-200 focus:border-[#e94560] focus:ring-2 focus:ring-[#e94560]/20"
          />
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Ime</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Email</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Telefon</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Narudžbe</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Ukupno potrošeno</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">Akcije</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-[#1a1a2e]">{customer.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{customer.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{customer.phone}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{customer.orders}</td>
                  <td className="px-6 py-4 text-sm font-medium text-[#e94560]">€{customer.totalSpent}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-blue-600 hover:text-blue-800 text-sm">Detalji</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
