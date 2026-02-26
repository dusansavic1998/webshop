/**
 * Hybrid Data Source
 * 
 * Combines external API with local mock data as fallback.
 * Use this to fetch data - it automatically handles API availability.
 */

import { getProducts as getApiProducts, getCategories as getApiCategories } from './client';
import { products as mockProducts, categories as mockCategories, Product, Category } from '@/data/products';

/**
 * Check if external API is configured
 */
const isApiConfigured = (): boolean => {
  return !!(
    process.env.EXTERNAL_API_URL && 
    process.env.EXTERNAL_API_TOKEN
  );
};

/**
 * Get all products - uses API if configured, otherwise mock data
 */
export const getAllProducts = async (): Promise<Product[]> => {
  if (!isApiConfigured()) {
    console.log('[DataSource] Using mock products data');
    return mockProducts;
  }

  try {
    const response = await getApiProducts();
    
    if (response.success && response.data) {
      console.log('[DataSource] Using external API products');
      return response.data.products.map((p: any) => ({
        id: Number(p.id) || 0,
        name: p.name || '',
        description: p.description || '',
        price: Number(p.price) || 0,
        salePrice: p.salePrice ? Number(p.salePrice) : undefined,
        category: String(p.category) || 'default',
        image: p.images?.[0] || '',
        rating: 4.5, // Default rating
        inStock: p.inStock ?? (p.stock > 0),
      }));
    }
    
    console.warn('[DataSource] API failed, using mock data:', response.error);
    return mockProducts;
  } catch (error) {
    console.error('[DataSource] API error, using mock data:', error);
    return mockProducts;
  }
};

/**
 * Get categories - uses API if configured, otherwise mock data
 */
export const getAllCategories = async (): Promise<Category[]> => {
  if (!isApiConfigured()) {
    console.log('[DataSource] Using mock categories data');
    return mockCategories;
  }

  try {
    const response = await getApiCategories();
    
    if (response.success && response.data) {
      console.log('[DataSource] Using external API categories');
      return response.data.map((c: any) => ({
        id: String(c.id),
        name: c.name,
        icon: '📁', // Default icon
      }));
    }
    
    console.warn('[DataSource] API failed, using mock data:', response.error);
    return mockCategories;
  } catch (error) {
    console.error('[DataSource] API error, using mock data:', error);
    return mockCategories;
  }
};

/**
 * Get products by category
 */
export const getProductsByCategory = async (categoryId: string): Promise<Product[]> => {
  const allProducts = await getAllProducts();
  
  if (categoryId === 'all') {
    return allProducts;
  }
  
  return allProducts.filter(p => p.category === categoryId);
};

/**
 * Search products
 */
export const searchProducts = async (query: string): Promise<Product[]> => {
  const allProducts = await getAllProducts();
  const lowerQuery = query.toLowerCase();
  
  return allProducts.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery)
  );
};
