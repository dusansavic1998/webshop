'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function OrdersManagement() {
  const [statusFilter, setStatusFilter] = useState('all');

  const orders = [
    { id: 1, orderId: '#ORD-001', customer: 'John Doe', product: 'Premium ploče', amount: 450, status: 'completed', date: '2026-02-26' },
    { id: 2, orderId: '#ORD-002', customer: 'Jane Smith', product: 'Kocke', amount: 280, status: 'pending', date: '2026-02-25' },
    { id: 3, orderId: '#ORD-003', customer: 'Mike Johnson', product: 'Mobilijar', amount: 1200, status: 'completed', date: '2026-02-24' },
    { id: 4, orderId: '#ORD-004', customer: 'Sarah Wilson', product: 'Dekorativni elementi', amount: 180, status: 'processing', date: '2026-02-23' },
    { id: 5, orderId: '#ORD-005', customer: 'David Brown', product: 'Betonske ploče', amount: 320, status: 'completed', date: '2026-02-22' },
  ];

  const filteredOrders = statusFilter === 'all' ? orders : orders.filter(o => o.status === statusFilter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'processing': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'Završeno';
      case 'pending': return 'Na čekanju';
      case 'processing': return 'U procesu';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link href="/admin" className="text-gray-500 hover:text-gray-700">
            <span className="text-2xl">←</span>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#1a1a2e]">Narudžbe</h1>
            <p className="text-gray-500 text-sm">Pregled svih narudžbi</p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-2 mb-6">
          {['all', 'pending', 'processing', 'completed'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-full ${
                statusFilter === status 
                  ? 'bg-[#e94560] text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {status === 'all' ? 'Sve' : getStatusLabel(status)}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">ID</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Kupac</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Proizvod</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Iznos</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Datum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-[#1a1a2e]">{order.orderId}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.customer}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.product}</td>
                  <td className="px-6 py-4 text-sm font-medium text-[#1a1a2e]">KM{order.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
