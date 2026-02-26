'use client';

import { useState } from 'react';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: any; // Can be from API or local
  onProductClick: (product: any) => void;
}

export default function ProductCard({ product, onProductClick }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart();

  // Handle both synced and mock data formats
  const displayPrice = product.salePrice || product.price || 0;
  const originalPrice = product.price && product.salePrice ? product.price : null;
  const hasDiscount = originalPrice && originalPrice > displayPrice;
  const discountPercent = hasDiscount
    ? Math.round(((originalPrice - displayPrice) / originalPrice) * 100)
    : 0;

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      'plosce': '⬜ Betonske ploče',
      'kocke': '🧱 Kocke',
      'mobilijar': '🪑 Mobilijar',
      'dekorativni': '🏛️ Dekorativno',
      'default': '📦 Proizvod',
    };
    return labels[category] || labels['default'];
  };

  const isInStock = product.inStock !== false;

  return (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={() => onProductClick(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image || product.images?.[0] || '/placeholder.jpg'}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />

        {/* Category Tag */}
        <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700">
          {getCategoryLabel(product.category?.toString())}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsWishlisted(!isWishlisted);
          }}
          className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
        >
          <svg
            className={`w-5 h-5 transition-colors ${
              isWishlisted ? 'text-[#e94560] fill-current' : 'text-gray-400'
            }`}
            fill={isWishlisted ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>

        {/* Sale Badge */}
        {hasDiscount && (
          <div className="absolute bottom-3 left-3 px-3 py-1 bg-[#e94560] text-white text-xs font-bold rounded-full">
            -{discountPercent}%
          </div>
        )}

        {/* Quick Add Button */}
        <div
          className={`absolute bottom-3 right-3 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="px-4 py-2 bg-[#1a1a2e] text-white text-sm font-medium rounded-full shadow-lg hover:bg-[#e94560] transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Dodaj
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <h3 className="font-semibold text-[#1a1a2e] line-clamp-2 min-h-[3rem]">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-[#1a1a2e]">
            {{displayPrice.toFixed(2)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-gray-400 line-through">
              {{originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Stock Status */}
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${
              isInStock ? 'bg-green-500' : 'bg-red-500'
            }`}
          ></span>
          <span className="text-sm text-gray-500">
            {isInStock ? 'Na stanju' : 'Nije dostupno'}
          </span>
        </div>
      </div>
    </div>
  );
}
