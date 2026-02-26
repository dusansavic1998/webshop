'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  SyncedData, 
  syncAllData, 
  loadSyncedData, 
  isDataSynced,
  getCompanyInfo,
  getSyncedArticles,
  getSyncedCategories 
} from '@/lib/api/sync-service';

interface SyncContextType {
  isSynced: boolean;
  isSyncing: boolean;
  syncError: string | null;
  lastSync: string | null;
  company: SyncedData['company'];
  articles: any[];
  categories: any[];
  syncData: () => Promise<void>;
}

const SyncContext = createContext<SyncContextType | undefined>(undefined);

export function SyncProvider({ children }: { children: ReactNode }) {
  const [isSynced, setIsSynced] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [lastSync, setLastSync] = useState<string | null>(null);
  const [company, setCompany] = useState<SyncedData['company']>(null);
  const [articles, setArticles] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  // Load data on mount
  useEffect(() => {
    const data = loadSyncedData();
    setIsSynced(data.syncStatus === 'synced');
    setLastSync(data.lastSync || null);
    setCompany(data.company);
    setArticles(data.articles);
    setCategories(data.categories);
  }, []);

  const syncData = async () => {
    setIsSyncing(true);
    setSyncError(null);
    
    try {
      const data = await syncAllData();
      setIsSynced(true);
      setLastSync(data.lastSync);
      setCompany(data.company);
      setArticles(data.articles);
      setCategories(data.categories);
    } catch (error) {
      setSyncError(error instanceof Error ? error.message : 'Sync failed');
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <SyncContext.Provider value={{
      isSynced,
      isSyncing,
      syncError,
      lastSync,
      company,
      articles,
      categories,
      syncData,
    }}>
      {children}
    </SyncContext.Provider>
  );
}

export function useSync() {
  const context = useContext(SyncContext);
  if (!context) {
    throw new Error('useSync must be used within SyncProvider');
  }
  return context;
}

// Helper hooks
export function useCompany() {
  const { company } = useSync();
  return company;
}

export function useArticles() {
  const { articles, isSynced } = useSync();
  return { articles, isSynced };
}

export function useCategories() {
  const { categories, isSynced } = useSync();
  return { categories, isSynced };
}
