/**
 * Data Sync Service
 * 
 * Syncs data from InfosAPI to local storage
 * - Company info
 * - Articles/Products
 * - Categories
 * - Partners
 */

import { getApiClient } from './infos-client';

export interface SyncedData {
  company: {
    companyId: number;
    name: string;
    database: string;
    logoUrl?: string;
    description?: string;
  } | null;
  articles: any[];
  categories: any[];
  lastSync: string;
  syncStatus: 'idle' | 'syncing' | 'synced' | 'error';
  error?: string;
}

// Default synced data structure
const defaultSyncedData: SyncedData = {
  company: null,
  articles: [],
  categories: [],
  lastSync: '',
  syncStatus: 'idle',
};

/**
 * Load synced data from localStorage
 */
export const loadSyncedData = (): SyncedData => {
  if (typeof window === 'undefined') return defaultSyncedData;
  
  const saved = localStorage.getItem('bepro_synced_data');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return defaultSyncedData;
    }
  }
  return defaultSyncedData;
};

/**
 * Save synced data to localStorage
 */
export const saveSyncedData = (data: SyncedData): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('bepro_synced_data', JSON.stringify(data));
};

/**
 * Sync all data from InfosAPI
 */
export const syncAllData = async (): Promise<SyncedData> => {
  const client = getApiClient();
  
  // Start syncing
  let currentData = loadSyncedData();
  currentData.syncStatus = 'syncing';
  saveSyncedData(currentData);

  try {
    // 1. Get company info from verify endpoint
    const verifyResult = await client.verify();
    
    if (!verifyResult.success || !verifyResult.data) {
      throw new Error(verifyResult.error || 'Failed to verify session');
    }

    const userData = verifyResult.data;
    const company = userData.company || {
      companyId: userData.companyId || 1,
      name: userData.company?.name || 'BePro',
      database: userData.company?.database || 'infos',
      logoUrl: userData.company?.logoUrl || '',
      description: userData.company?.description || '',
    };

    // 2. Get articles from catalog
    const articlesResult = await client.getArticles({ limit: 1000 });
    const articles = articlesResult.success ? articlesResult.data || [] : [];

    // 3. Get article groups (categories)
    const groupsResult = await client.getArticleGroups();
    const categories = groupsResult.success ? groupsResult.data || [] : [];

    // 4. Build synced data
    const syncedData: SyncedData = {
      company,
      articles: articles.map((article: any) => ({
        // Map InfosAPI article to our format
        id: article.articleId,
        name: article.name,
        description: article.description || '',
        price: article.prices?.[0]?.price || 0,
        salePrice: undefined,
        category: article.articleGroupId?.toString() || 'default',
        categoryName: article.articleGroupName || '',
        image: article.images?.[0] || '',
        images: article.images || [],
        stock: 100, // Default stock
        inStock: true,
        sku: article.code || '',
        articleId: article.articleId,
        barcode: article.barcode,
        active: article.active,
        taxRate: article.taxRate,
      })),
      categories: categories.map((group: any) => ({
        id: group.articleGroupId.toString(),
        name: group.name,
        parentId: group.parentId?.toString(),
      })),
      lastSync: new Date().toISOString(),
      syncStatus: 'synced',
    };

    // 5. Save to localStorage
    saveSyncedData(syncedData);

    return syncedData;
  } catch (error) {
    currentData = loadSyncedData();
    currentData.syncStatus = 'error';
    currentData.error = error instanceof Error ? error.message : 'Unknown error';
    saveSyncedData(currentData);
    throw error;
  }
};

/**
 * Check if data has been synced
 */
export const isDataSynced = (): boolean => {
  const data = loadSyncedData();
  return data.syncStatus === 'synced' && data.articles.length > 0;
};

/**
 * Get company info
 */
export const getCompanyInfo = () => {
  const data = loadSyncedData();
  return data.company;
};

/**
 * Get synced articles
 */
export const getSyncedArticles = () => {
  const data = loadSyncedData();
  return data.articles;
};

/**
 * Get synced categories
 */
export const getSyncedCategories = () => {
  const data = loadSyncedData();
  return data.categories;
};

/**
 * Clear synced data (for logout/reset)
 */
export const clearSyncedData = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('bepro_synced_data');
};
