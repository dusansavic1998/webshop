/**
 * InfosOriginal API Client
 * 
 * Complete API client for InfosOriginal microservices
 * Based on Postman collection structure
 * 
 * Base URL: http://localhost (or your MacBook IP)
 */

import { cache } from 'react';

// ============================================
// CONFIG
// ============================================

const getConfig = () => ({
  baseUrl: process.env.INFOS_API_URL || 'http://localhost',
  token: process.env.INFOS_API_TOKEN || '',
  timeout: parseInt(process.env.INFOS_API_TIMEOUT || '30000', 10),
  cacheRevalidate: parseInt(process.env.CACHE_REVALIDATE_TIME || '60', 10),
});

// ============================================
// TYPES
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

// Auth Types
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    userId: number;
    username: string;
    company: {
      companyId: number;
      name: string;
      database: string;
    };
  };
}

export interface Company {
  companyId: number;
  name: string;
  database: string;
  logoUrl?: string;
  description?: string;
}

// Catalog - Articles
export interface Article {
  articleId: number;
  name: string;
  code?: string;
  barcode?: string;
  active: boolean;
  isSerialBased: boolean;
  isWebShop: boolean;
  articleTypeId: number;
  articleTypeName?: string;
  taxRateId: number;
  taxRate?: number;
  unitsOfMeasureId: number;
  unitsOfMeasureName?: string;
  manufacturerId?: number;
  supplierId?: number;
  description?: string;
  articleGroupId?: number;
  articleGroupName?: string;
  images?: string[];
  prices?: ArticlePrice[];
}

export interface ArticlePrice {
  priceListId: number;
  priceListName: string;
  price: number;
  priceWithoutTax: number;
}

export interface ArticleGroup {
  articleGroupId: number;
  name: string;
  parentId?: number;
}

export interface ArticleType {
  articleTypeId: number;
  name: string;
}

export interface UnitsOfMeasure {
  unitsOfMeasureId: number;
  code: string;
  name: string;
}

export interface TaxRate {
  taxRateId: number;
  code: string;
  rate: number;
}

// Catalog - Partners
export interface Partner {
  partnerId: number;
  taxId: string;
  personalCode?: string;
  vatNumber?: string;
  name: string;
  settlementId?: number;
  settlementName?: string;
  streetName?: string;
  streetNumber?: string;
  vatPayer: boolean;
  partnerType: 'legalEntity' | 'individual';
  phone1?: string;
  phone2?: string;
  fax?: string;
  email?: string;
  website?: string;
  note?: string;
}

export interface PartnerBranch {
  partnerBranchId: number;
  partnerId: number;
  name: string;
  taxId?: string;
  settlementId?: number;
  streetName?: string;
  streetNumber?: string;
  phone?: string;
  fax?: string;
  email?: string;
}

// Catalog - Settlements
export interface Country {
  countryId: number;
  name: string;
  alpha2Code: string;
  alpha3Code: string;
  emojiFlag: string;
  flagLink?: string;
}

export interface CityMunicipality {
  cityMunicipalityId: number;
  name: string;
  countryId: number;
  countryName?: string;
  administrativeUnitId?: number;
}

export interface Settlement {
  settlementId: number;
  name: string;
  postalCode: string;
  cityMunicipalityId: number;
}

// PriceList
export interface PriceListHeader {
  priceListId: number;
  name: string;
  validFrom: string;
  validTo?: string;
  active: boolean;
}

export interface PriceListItem {
  priceListItemId: number;
  priceListId: number;
  articleId: number;
  articleName?: string;
  price: number;
  priceWithoutTax: number;
}

// ============================================
// API CLIENT
// ============================================

class InfosApiClient {
  private baseUrl: string;
  private token: string;
  private timeout: number;

  constructor() {
    const config = getConfig();
    this.baseUrl = config.baseUrl;
    this.token = config.token;
    this.timeout = config.timeout;
  }

  setToken(token: string) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }

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
          ...(this.token && { 'Authorization': `Bearer ${this.token}` }),
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        if (response.status === 401) {
          return { success: false, error: 'Nevalidna sesija. Prijavite se ponovo.' };
        }
        return { success: false, error: `Greška: ${response.status}` };
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          return { success: false, error: 'Vrijeme je isteklo' };
        }
        return { success: false, error: error.message };
      }
      return { success: false, error: 'Nepoznata greška' };
    }
  }

  // ============================================
  // AUTH
  // ============================================

  async login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    return this.request<LoginResponse>('/api/authUser/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async verify(): Promise<ApiResponse<any>> {
    return this.request('/api/authUser/verify', { method: 'POST' });
  }

  async getCompanies(): Promise<ApiResponse<Company[]>> {
    return this.request<Company[]>('/api/authUser/getCompanies');
  }

  async selectCompany(companyId: number, fiscalYear: number = new Date().getFullYear()): Promise<ApiResponse<any>> {
    return this.request('/api/authUser/selectCompany', {
      method: 'POST',
      body: JSON.stringify({ companyId, fiscalYear }),
    });
  }

  async getUsers(): Promise<ApiResponse<any[]>> {
    return this.request('/api/authUser/users/get');
  }

  async getRoles(): Promise<ApiResponse<any[]>> {
    return this.request('/api/authUser/roles/get');
  }

  // ============================================
  // CATALOG - ARTICLES
  // ============================================

  async getArticles(params?: { 
    search?: string; 
    page?: number; 
    limit?: number;
    articleGroupId?: number;
    active?: boolean;
  }): Promise<ApiResponse<Article[]>> {
    const query = new URLSearchParams();
    if (params?.search) query.set('searchTerm', params.search);
    if (params?.page) query.set('offset', params.page.toString());
    if (params?.limit) query.set('limit', params.limit.toString());
    
    const endpoint = `/api/catalog/article/get${query.toString() ? '?' + query : ''}`;
    return this.request(endpoint);
  }

  async getArticle(id: number): Promise<ApiResponse<Article>> {
    return this.request<Article>(`/api/catalog/article/get/${id}`);
  }

  async createArticle(article: Partial<Article>): Promise<ApiResponse<Article>> {
    return this.request('/api/catalog/article/create', {
      method: 'POST',
      body: JSON.stringify([article]),
    });
  }

  async updateArticle(article: Partial<Article>): Promise<ApiResponse<Article>> {
    return this.request('/api/catalog/article/edit', {
      method: 'PUT',
      body: JSON.stringify([article]),
    });
  }

  async deleteArticle(ids: number[]): Promise<ApiResponse<void>> {
    return this.request('/api/catalog/article/delete', {
      method: 'DELETE',
      body: JSON.stringify(ids),
    });
  }

  async getArticleGroups(): Promise<ApiResponse<ArticleGroup[]>> {
    return this.request('/api/catalog/articleGroup/get');
  }

  async getArticleTypes(): Promise<ApiResponse<ArticleType[]>> {
    return this.request('/api/catalog/articleType/get');
  }

  async getUnitsOfMeasure(): Promise<ApiResponse<UnitsOfMeasure[]>> {
    return this.request('/api/catalog/unitsOfMeasure/get');
  }

  async getTaxRates(): Promise<ApiResponse<TaxRate[]>> {
    return this.request('/api/catalog/taxRate/get');
  }

  // Article Barcodes
  async getArticleBarcodes(articleId: number): Promise<ApiResponse<any[]>> {
    return this.request(`/api/catalog/articleBarcode/get?articleId=${articleId}`);
  }

  async createArticleBarcode(barcode: { articleId: number; barcode: string; label?: string }): Promise<ApiResponse<any>> {
    return this.request('/api/catalog/articleBarcode/create', {
      method: 'POST',
      body: JSON.stringify([barcode]),
    });
  }

  // ============================================
  // CATALOG - PARTNERS
  // ============================================

  async getPartners(params?: { search?: string; page?: number; limit?: number }): Promise<ApiResponse<Partner[]>> {
    const query = new URLSearchParams();
    if (params?.search) query.set('searchTerm', params.search);
    if (params?.page) query.set('offset', params.page.toString());
    
    const endpoint = `/api/catalog/partners/get${query.toString() ? '?' + query : ''}`;
    return this.request(endpoint);
  }

  async getPartner(id: number): Promise<ApiResponse<Partner>> {
    return this.request<Partner>(`/api/catalog/partners/get/${id}`);
  }

  async createPartner(partner: Partial<Partner>): Promise<ApiResponse<Partner>> {
    return this.request('/api/catalog/partners/create', {
      method: 'POST',
      body: JSON.stringify([partner]),
    });
  }

  async updatePartner(partner: Partial<Partner>): Promise<ApiResponse<Partner>> {
    return this.request('/api/catalog/partners/edit', {
      method: 'PUT',
      body: JSON.stringify([partner]),
    });
  }

  async deletePartner(ids: number[]): Promise<ApiResponse<void>> {
    return this.request('/api/catalog/partners/delete', {
      method: 'DELETE',
      body: JSON.stringify(ids),
    });
  }

  async getPartnerBranches(partnerId: number): Promise<ApiResponse<PartnerBranch[]>> {
    return this.request(`/api/catalog/partnerBranch/get?partnerId=${partnerId}`);
  }

  // ============================================
  // CATALOG - SETTLEMENTS
  // ============================================

  async getCountries(search?: string): Promise<ApiResponse<Country[]>> {
    const endpoint = search 
      ? `/api/catalog/country/get?searchTerm=${search}`
      : '/api/catalog/country/get';
    return this.request(endpoint);
  }

  async getCities(params?: { countryId?: number; search?: string }): Promise<ApiResponse<CityMunicipality[]>> {
    const query = new URLSearchParams();
    if (params?.search) query.set('searchTerm', params.search);
    
    const endpoint = `/api/catalog/cityMunicipality/get${query.toString() ? '?' + query : ''}`;
    return this.request(endpoint);
  }

  async getSettlements(params?: { cityMunicipalityId?: number; search?: string }): Promise<ApiResponse<Settlement[]>> {
    const query = new URLSearchParams();
    if (params?.search) query.set('searchTerm', params.search);
    
    const endpoint = `/api/catalog/settlements/get${query.toString() ? '?' + query : ''}`;
    return this.request(endpoint);
  }

  // ============================================
  // PRICE LIST
  // ============================================

  async getPriceLists(): Promise<ApiResponse<PriceListHeader[]>> {
    return this.request('/api/catalog/priceListHeader/get');
  }

  async getPriceListItems(priceListId: number): Promise<ApiResponse<PriceListItem[]>> {
    return this.request(`/api/catalog/priceList/get?priceListId=${priceListId}`);
  }

  async createPriceList(header: Partial<PriceListHeader>, items: any[]): Promise<ApiResponse<any>> {
    return this.request('/api/catalog/priceList/create', {
      method: 'POST',
      body: JSON.stringify({ header, items }),
    });
  }
}

// ============================================
// SINGLETON
// ============================================

let apiClient: InfosApiClient | null = null;

export const getApiClient = (): InfosApiClient => {
  if (!apiClient) {
    apiClient = new InfosApiClient();
  }
  return apiClient;
};

// ============================================
// CACHED FETCHERS (for Next.js)
// ============================================

export const getArticles = cache(async (params?: any): Promise<ApiResponse<Article[]>> => {
  const client = getApiClient();
  return client.getArticles(params);
});

export const getArticle = cache(async (id: number): Promise<ApiResponse<Article>> => {
  const client = getApiClient();
  return client.getArticle(id);
});

export const getPartners = cache(async (params?: any): Promise<ApiResponse<Partner[]>> => {
  const client = getApiClient();
  return client.getPartners(params);
});

export const getArticleGroups = cache(async (): Promise<ApiResponse<ArticleGroup[]>> => {
  const client = getApiClient();
  return client.getArticleGroups();
});

export const getCountries = cache(async (search?: string): Promise<ApiResponse<Country[]>> => {
  const client = getApiClient();
  return client.getCountries(search);
});
