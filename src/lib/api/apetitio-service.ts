/**
 * Apetitio API Service
 * Complete sync with InfosAPI for Apetitio company
 */

import { cache } from 'react';

// ============================================
// CONFIG
// ============================================

const getConfig = () => ({
  baseUrl: process.env.APETITIO_API_URL || 'http://192.168.100.228/api',
  timeout: parseInt(process.env.API_TIMEOUT || '30000', 10),
});

// ============================================
// TYPES
// ============================================

export interface Company {
  companyId: number;
  name: string;
  database: string;
  logoUrl: string;
  description: string;
}

export interface Article {
  id: number;
  articleId: number;
  code: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  category: string;
  categoryName: string;
  image: string;
  images: string[];
  stock: number;
  inStock: boolean;
  sku: string;
  active: boolean;
  taxRate: number;
  articleTypeName: string;
  unitsOfMeasureName: string;
}

export interface Category {
  id: string;
  name: string;
  code: string;
  parentId: string | null;
  parentName: string | null;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface SyncedData {
  company: Company | null;
  articles: Article[];
  categories: Category[];
  lastSync: string;
  syncStatus: 'idle' | 'syncing' | 'synced' | 'error';
  error?: string;
}

// ============================================
// API CLIENT
// ============================================

class ApetitioApiClient {
  private baseUrl: string;
  private timeout: number;

  constructor() {
    const config = getConfig();
    this.baseUrl = config.baseUrl;
    this.timeout = config.timeout;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);

      const data = await response.json();
      
      if (data.status === 'success' && data.data) {
        return { success: true, data: data.data };
      }
      
      return { success: false, error: data.message || 'API error' };
    } catch (error) {
      clearTimeout(timeoutId);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  async login(username: string, password: string) {
    return this.request<{ token: string }>('/authUser/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  }

  async selectCompany(token: string, companyId: number, fiscalYear: number = 2026) {
    return this.request<{ token: string; company: Company }>('/authUser/selectCompany', {
      method: 'POST',
      body: JSON.stringify({ companyId, fiscalYear }),
      headers: { 'Authorization': `Bearer ${token}` },
    });
  }

  async getArticles(token: string, limit: number = 100) {
    return this.request<any[]>('/catalog/article/get?limit=' + limit, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
  }

  async getArticleGroups(token: string) {
    return this.request<any[]>('/catalog/articleGroup/get', {
      headers: { 'Authorization': `Bearer ${token}` },
    });
  }
}

// ============================================
// SYNC SERVICE
// ============================================

let apiClient: ApetitioApiClient | null = null;

const getClient = (): ApetitioApiClient => {
  if (!apiClient) {
    apiClient = new ApetitioApiClient();
  }
  return apiClient;
};

export const syncApetitioData = async (): Promise<SyncedData> => {
  const client = getClient();
  
  try {
    // 1. Login
    const loginResult = await client.login('infos-admin', 'InfosUser');
    if (!loginResult.success || !loginResult.data) {
      throw new Error(loginResult.error || 'Login failed');
    }
    const loginToken = loginResult.data.token;

    // 2. Select company
    const companyResult = await client.selectCompany(loginToken, 1, 2026);
    if (!companyResult.success || !companyResult.data) {
      throw new Error(companyResult.error || 'Failed to select company');
    }
    const { token: companyToken, company } = companyResult.data;

    // 3. Get articles
    const articlesResult = await client.getArticles(companyToken, 100);
    const articlesData = articlesResult.success ? articlesResult.data || [] : [];

    // 4. Get categories
    const groupsResult = await client.getArticleGroups(companyToken);
    const groupsData = groupsResult.success ? groupsResult.data || [] : [];

    // Map articles
    const articles: Article[] = articlesData.map((item: any) => ({
      id: item.articleId,
      articleId: item.articleId,
      code: item.code || '',
      name: item.name || '',
      description: item.description || '',
      price: 0, // Will be fetched from price list
      salePrice: undefined,
      category: item.articleGroupId?.toString() || '1',
      categoryName: item.articleGroupName || '',
      image: '',
      images: [],
      stock: 100,
      inStock: item.active !== false,
      sku: item.code || '',
      active: item.active !== false,
      taxRate: parseFloat(item.taxRate) || 17,
      articleTypeName: item.articleTypeName || '',
      unitsOfMeasureName: item.unitsOfMeasureName || 'Komad',
    }));

    // Map categories
    const categories: Category[] = groupsData.map((item: any) => ({
      id: item.articleGroupId.toString(),
      name: item.name,
      code: item.code || '',
      parentId: item.parentId?.toString() || null,
      parentName: item.parentName || null,
    }));

    return {
      company,
      articles,
      categories,
      lastSync: new Date().toISOString(),
      syncStatus: 'synced',
    };
  } catch (error) {
    return {
      company: null,
      articles: [],
      categories: [],
      lastSync: '',
      syncStatus: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

// ============================================
// CACHED FETCHERS
// ============================================

export const getArticles = cache(async (): Promise<Article[]> => {
  const data = await syncApetitioData();
  return data.articles;
});

export const getCategories = cache(async (): Promise<Category[]> => {
  const data = await syncApetitioData();
  return data.categories;
});

export const getCompany = cache(async (): Promise<Company | null> => {
  const data = await syncApetitioData();
  return data.company;
});
