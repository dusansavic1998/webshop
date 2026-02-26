/**
 * Database Service
 * 
 * Works with PostgreSQL (Prisma) or local storage as fallback
 * Syncs with InfosAPI
 */

import { PrismaClient } from '@prisma/client';

// Initialize Prisma
const prisma = new PrismaClient();

// ============================================
// TYPES
// ============================================

export interface CompanyData {
  companyId: number;
  name: string;
  database: string;
  logoUrl?: string;
  description?: string;
}

export interface CategoryData {
  id?: number;
  categoryId: string;
  name: string;
  code?: string;
  parentId?: string;
  isLocal: boolean;
  companyId: number;
}

export interface ProductData {
  id?: number;
  articleId?: number;
  sku?: string;
  name: string;
  description?: string;
  price: number;
  salePrice?: number;
  image?: string;
  images?: string[];
  stock?: number;
  inStock?: boolean;
  isLocal: boolean;
  isActive?: boolean;
  taxRate?: number;
  categoryId?: number;
  companyId: number;
}

export interface BlogPostData {
  id?: number;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featuredImage?: string;
  authorName?: string;
  category?: string;
  tags?: string[];
  status?: 'draft' | 'published' | 'archived';
  publishedAt?: Date;
  views?: number;
  isFeatured?: boolean;
  companyId: number;
}

// ============================================
// COMPANY
// ============================================

export const dbCompany = {
  async create(data: CompanyData) {
    return prisma.company.upsert({
      where: { companyId: data.companyId },
      update: data,
      create: data,
    });
  },

  async get(companyId: number) {
    return prisma.company.findUnique({
      where: { companyId },
    });
  },

  async getFirst() {
    return prisma.company.findFirst();
  },
};

// ============================================
// CATEGORIES
// ============================================

export const dbCategory = {
  async create(data: CategoryData) {
    return prisma.category.create({ data });
  },

  async update(id: number, data: Partial<CategoryData>) {
    return prisma.category.update({ where: { id }, data });
  },

  async delete(id: number) {
    return prisma.category.delete({ where: { id } });
  },

  async getAll(companyId: number) {
    return prisma.category.findMany({
      where: { companyId },
      orderBy: { name: 'asc' },
    });
  },

  async getById(id: number) {
    return prisma.category.findUnique({ where: { id } });
  },

  async getByCategoryId(categoryId: string, companyId: number) {
    return prisma.category.findFirst({
      where: { categoryId, companyId },
    });
  },
};

// ============================================
// PRODUCTS
// ============================================

export const dbProduct = {
  async create(data: ProductData) {
    return prisma.product.create({ data });
  },

  async update(id: number, data: Partial<ProductData>) {
    return prisma.product.update({ where: { id }, data });
  },

  async delete(id: number) {
    return prisma.product.delete({ where: { id } });
  },

  async getAll(companyId: number, params?: { categoryId?: number; isLocal?: boolean }) {
    return prisma.product.findMany({
      where: {
        companyId,
        ...(params?.categoryId && { categoryId: params.categoryId }),
        ...(params?.isLocal !== undefined && { isLocal: params.isLocal }),
      },
      include: { category: true },
      orderBy: { name: 'asc' },
    });
  },

  async getById(id: number) {
    return prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });
  },

  async getByArticleId(articleId: number) {
    return prisma.product.findUnique({
      where: { articleId },
    });
  },

  async upsertFromApi(data: ProductData & { articleId: number }) {
    return prisma.product.upsert({
      where: { articleId: data.articleId },
      update: data,
      create: data,
    });
  },
};

// ============================================
// BLOG POSTS
// ============================================

export const dbBlogPost = {
  async create(data: BlogPostData) {
    return prisma.blogPost.create({ data });
  },

  async update(id: number, data: Partial<BlogPostData>) {
    return prisma.blogPost.update({ where: { id }, data });
  },

  async delete(id: number) {
    return prisma.blogPost.delete({ where: { id } });
  },

  async getAll(companyId: number, params?: { status?: string }) {
    return prisma.blogPost.findMany({
      where: {
        companyId,
        ...(params?.status && { status: params.status }),
      },
      orderBy: { createdAt: 'desc' },
    });
  },

  async getById(id: number) {
    return prisma.blogPost.findUnique({ where: { id } });
  },

  async getBySlug(slug: string) {
    return prisma.blogPost.findUnique({ where: { slug } });
  },
};

// ============================================
// SYNC SERVICE
// ============================================

export const syncFromApi = async (apiData: {
  company: any;
  articles: any[];
  categories: any[];
}) => {
  try {
    // 1. Save company
    const company = await dbCompany.create({
      companyId: apiData.company.companyId,
      name: apiData.company.name,
      database: apiData.company.database,
      logoUrl: apiData.company.logoUrl,
      description: apiData.company.description,
    });

    // 2. Sync categories (only API ones, isLocal=false)
    for (const cat of apiData.categories) {
      await prisma.category.upsert({
        where: { categoryId: cat.articleGroupId.toString() },
        update: { isLocal: false },
        create: {
          categoryId: cat.articleGroupId.toString(),
          name: cat.name,
          code: cat.code,
          parentId: cat.parentId?.toString(),
          isLocal: false,
          companyId: company.id,
        },
      });
    }

    // 3. Sync products (only API ones, isLocal=false)
    for (const art of apiData.articles) {
      const cat = await dbCategory.getByCategoryId(
        art.articleGroupId?.toString() || '1',
        company.id
      );

      await prisma.product.upsert({
        where: { articleId: art.articleId },
        update: { isLocal: false },
        create: {
          articleId: art.articleId,
          sku: art.code,
          name: art.name,
          description: art.description,
          price: 0, // Will be fetched from price list
          image: '',
          images: [],
          stock: 100,
          inStock: art.active !== false,
          isLocal: false,
          taxRate: parseFloat(art.taxRate) || 17,
          categoryId: cat?.id,
          companyId: company.id,
        },
      });
    }

    return { success: true, company };
  } catch (error) {
    console.error('Sync error:', error);
    return { success: false, error };
  }
};

export default prisma;
