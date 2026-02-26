/**
 * External API Connector for BePro Webshop
 * 
 * Handles connection, authentication, data fetching, and caching
 * for external product API.
 * 
 * Environment variables required:
 * - EXTERNAL_API_URL: Base URL of the external API
 * - EXTERNAL_API_TOKEN: JWT token for authentication
 * - EXTERNAL_API_TIMEOUT: Request timeout in ms (default: 30000)
 * - CACHE_REVALIDATE_TIME: ISR cache revalidation time in seconds (default: 3600)
 */

import { cache } from 'react';

// ============================================
// TYPES
// ============================================

export interface ExternalProduct {
  id: string | number;
  sku: string;
  name: string;
  description?: string;
  price: number;
  salePrice?: number;
  category: string | number;
  categoryName?: string;
  images: string[];
  stock: number;
  inStock: boolean;
  attributes?: Record<string, unknown>;
  createdAt?: string;
  updatedAt?: string;
}

export interface ExternalCategory {
  id: string | number;
  name: string;
  slug?: string;
  parentId?: string | number;
  image?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}

export interface ProductsResponse {
  products: ExternalProduct[];
  total: number;
  page: number;
  limit: number;
}

// ============================================
// CONFIG
// ============================================

const getConfig = () => ({
  baseUrl: process.env.EXTERNAL_API_URL || 'https://api.bepro-doo.com',
  token: process.env.EXTERNAL_API_TOKEN || '',
  timeout: parseInt(process.env.EXTERNAL_API_TIMEOUT || '30000', 10),
  cacheRevalidate: parseInt(process.env.CACHE_REVALIDATE_TIME || '3600', 10),
});

// ============================================
// API CLIENT
// ============================================

class ExternalApiClient {
  private baseUrl: string;
  private token: string;
  private timeout: number;

  constructor() {
    const config = getConfig();
    this.baseUrl = config.baseUrl;
    this.token = config.token;
    this.timeout = config.timeout;
  }

  /**
   * Make authenticated request to external API
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`,
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        if (response.status === 401) {
          return {
            success: false,
            error: 'Nevalidan ili istekao JWT token',
            timestamp: new Date().toISOString(),
          };
        }

        if (response.status === 404) {
          return {
            success: false,
            error: 'Resurs nije pronađen',
            timestamp: new Date().toISOString(),
          };
        }

        return {
          success: false,
          error: `API greška: ${response.status} ${response.statusText}`,
          timestamp: new Date().toISOString(),
        };
      }

      const data = await response.json();
      
      return {
        success: true,
        data,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          return {
            success: false,
            error: 'Vrijeme zahtjeva je isteklo',
            timestamp: new Date().toISOString(),
          };
        }

        return {
          success: false,
          error: `Mrežna greška: ${error.message}`,
          timestamp: new Date().toISOString(),
        };
      }

      return {
        success: false,
        error: 'Nepoznata greška',
        timestamp: new Date().toISOString(),
      };
    }
  }

  /**
   * Fetch all products with optional filters
   */
  async getProducts(params?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    inStock?: boolean;
  }): Promise<ApiResponse<ProductsResponse>> {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.set('page', params.page.toString());
    if (params?.limit) queryParams.set('limit', params.limit.toString());
    if (params?.category) queryParams.set('category', params.category);
    if (params?.search) queryParams.set('search', params.search);
    if (params?.inStock !== undefined) queryParams.set('inStock', params.inStock.toString());

    const query = queryParams.toString();
    const endpoint = `/products${query ? `?${query}` : ''}`;

    return this.request<ProductsResponse>(endpoint);
  }

  /**
   * Fetch single product by ID or SKU
   */
  async getProduct(identifier: string | number): Promise<ApiResponse<ExternalProduct>> {
    return this.request<ExternalProduct>(`/products/${identifier}`);
  }

  /**
   * Fetch all categories
   */
  async getCategories(): Promise<ApiResponse<ExternalCategory[]>> {
    return this.request<ExternalCategory[]>('/categories');
  }

  /**
   * Fetch products by category
   */
  async getProductsByCategory(
    categoryId: string | number,
    params?: { page?: number; limit?: number }
  ): Promise<ApiResponse<ProductsResponse>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.set('page', params.page.toString());
    if (params?.limit) queryParams.set('limit', params.limit.toString());

    const query = queryParams.toString();
    const endpoint = `/categories/${categoryId}/products${query ? `?${query}` : ''}`;

    return this.request<ProductsResponse>(endpoint);
  }

  /**
   * Check API health/connection
   */
  async healthCheck(): Promise<ApiResponse<{ status: string }>> {
    return this.request<{ status: string }>('/health');
  }
}

// ============================================
// API CLIENT INSTANCE
// ============================================

// Singleton instance
let apiClient: ExternalApiClient | null = null;

export const getApiClient = (): ExternalApiClient => {
  if (!apiClient) {
    apiClient = new ExternalApiClient();
  }
  return apiClient;
};

// ============================================
// CACHED DATA FETCHERS (ISR)
// ============================================

/**
 * Get all products with caching (ISR)
 * Revalidates every hour by default
 */
export const getProducts = cache(async (params?: {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  inStock?: boolean;
}): Promise<ApiResponse<ProductsResponse>> => {
  const config = getConfig();
  const client = getApiClient();
  
  // For ISR, we just return the data - Next.js handles caching
  return client.getProducts(params);
});

/**
 * Get single product with caching
 */
export const getProduct = cache(async (identifier: string | number): Promise<ApiResponse<ExternalProduct>> => {
  const client = getApiClient();
  return client.getProduct(identifier);
});

/**
 * Get all categories with caching
 */
export const getCategories = cache(async (): Promise<ApiResponse<ExternalCategory[]>> => {
  const client = getApiClient();
  return client.getCategories();
});

/**
 * Get products by category with caching
 */
export const getProductsByCategory = cache(async (
  categoryId: string | number,
  params?: { page?: number; limit?: number }
): Promise<ApiResponse<ProductsResponse>> => {
  const client = getApiClient();
  return client.getProductsByCategory(categoryId, params);
});

// ============================================
// DATA MAPPER
// ============================================

/**
 * Map external product to internal format
 */
export const mapProductToInternal = (externalProduct: ExternalProduct) => {
  return {
    id: Number(externalProduct.id) || 0,
    name: externalProduct.name || '',
    description: externalProduct.description || '',
    price: Number(externalProduct.price) || 0,
    salePrice: externalProduct.salePrice ? Number(externalProduct.salePrice) : undefined,
    category: String(externalProduct.category) || 'default',
    categoryName: externalProduct.categoryName || '',
    image: externalProduct.images?.[0] || '/placeholder.jpg',
    images: externalProduct.images || [],
    stock: Number(externalProduct.stock) || 0,
    inStock: externalProduct.inStock ?? externalProduct.stock > 0,
    sku: externalProduct.sku || '',
    attributes: externalProduct.attributes || {},
  };
};

/**
 * Map external category to internal format
 */
export const mapCategoryToInternal = (externalCategory: ExternalCategory) => {
  return {
    id: String(externalCategory.id),
    name: externalCategory.name,
    slug: externalCategory.slug || externalCategory.name.toLowerCase().replace(/\s+/g, '-'),
    parentId: externalCategory.parentId ? String(externalCategory.parentId) : undefined,
    image: externalCategory.image,
  };
};

// ============================================
// ERROR HANDLING HELPERS
// ============================================

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public isRetryable: boolean = false
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const handleApiError = (error: unknown): string => {
  if (error instanceof ApiError) {
    return error.message;
  }

  if (error instanceof Error) {
    // Network errors are usually retryable
    if (error.message.includes('fetch') || error.message.includes('network')) {
      return 'Mrežna greška. Provjerite internet konekciju.';
    }
    return error.message;
  }

  return 'Nepoznata greška';
};
