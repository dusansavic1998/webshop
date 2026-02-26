/**
 * Image Upload Service
 * 
 * Handles image uploads for articles and blog posts
 * Supports: local storage, cloud storage (S3, Cloudinary), or external API
 */

import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';

// ============================================
// CONFIG
// ============================================

interface ImageConfig {
  uploadDir: string;
  maxFileSize: number;
  allowedTypes: string[];
  baseUrl: string;
}

const getConfig = (): ImageConfig => ({
  uploadDir: process.env.UPLOAD_DIR || 'public/uploads',
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880', 10),
  allowedTypes: (process.env.ALLOWED_IMAGE_TYPES || 'image/jpeg,image/png,image/webp,image/gif').split(','),
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
});

// ============================================
// TYPES
// ============================================

export interface UploadResult {
  success: boolean;
  url?: string;
  path?: string;
  error?: string;
  filename: string;
}

export interface ImageInfo {
  filename: string;
  originalName: string;
  mimetype: string;
  size: number;
  url: string;
  width?: number;
  height?: number;
  uploadedAt: Date;
}

// ============================================
// IMAGE SERVICE
// ============================================

class ImageService {
  private uploadDir: string;
  private maxFileSize: number;
  private allowedTypes: string[];
  private baseUrl: string;

  constructor() {
    const config = getConfig();
    this.uploadDir = config.uploadDir;
    this.maxFileSize = config.maxFileSize;
    this.allowedTypes = config.allowedTypes;
    this.baseUrl = config.baseUrl;
  }

  /**
   * Initialize upload directory
   */
  async init(): Promise<void> {
    const dir = join(process.cwd(), this.uploadDir);
    if (!existsSync(dir)) {
      await mkdir(dir, { recursive: true });
    }
  }

  /**
   * Validate image file
   */
  validateImage(file: File): { valid: boolean; error?: string } {
    if (!this.allowedTypes.includes(file.type)) {
      return { valid: false, error: `Nedozvoljen tip fajla. Dozvoljeni: ${this.allowedTypes.join(', ')}` };
    }
    if (file.size > this.maxFileSize) {
      return { valid: false, error: `Fajl je prevelik. Maksimalna veličina: ${this.maxFileSize / 1024 / 1024}MB` };
    }
    return { valid: true };
  }

  /**
   * Generate unique filename
   */
  generateFilename(originalName: string): string {
    const ext = originalName.split('.').pop() || 'jpg';
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `${timestamp}-${random}.${ext}`;
  }

  /**
   * Upload single image
   */
  async uploadImage(file: File, subfolder: string = 'articles'): Promise<UploadResult> {
    try {
      const validation = this.validateImage(file);
      if (!validation.valid) {
        return { success: false, error: validation.error, filename: file.name };
      }

      await this.init();

      const filename = this.generateFilename(file.name);
      const folderPath = join(process.cwd(), this.uploadDir, subfolder);
      
      // Create subfolder if not exists
      if (!existsSync(folderPath)) {
        await mkdir(folderPath, { recursive: true });
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      const filePath = join(folderPath, filename);
      
      await writeFile(filePath, buffer);

      const url = `${this.baseUrl}/${this.uploadDir}/${subfolder}/${filename}`;

      return {
        success: true,
        url,
        path: `${this.uploadDir}/${subfolder}/${filename}`,
        filename,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Greška pri uploadu',
        filename: file.name,
      };
    }
  }

  /**
   * Upload multiple images
   */
  async uploadImages(files: File[], subfolder: string = 'articles'): Promise<UploadResult[]> {
    const results = await Promise.all(
      files.map(file => this.uploadImage(file, subfolder))
    );
    return results;
  }

  /**
   * Delete image
   */
  async deleteImage(path: string): Promise<boolean> {
    try {
      const { unlink } = await import('fs/promises');
      const fullPath = join(process.cwd(), path);
      if (existsSync(fullPath)) {
        await unlink(fullPath);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  /**
   * Get image URL
   */
  getImageUrl(filename: string, subfolder: string = 'articles'): string {
    return `${this.baseUrl}/${this.uploadDir}/${subfolder}/${filename}`;
  }
}

// ============================================
// SINGLETON
// ============================================

let imageService: ImageService | null = null;

export const getImageService = (): ImageService => {
  if (!imageService) {
    imageService = new ImageService();
  }
  return imageService;
};

// ============================================
// HELPER FUNCTIONS
// ============================================

export const uploadArticleImage = async (file: File): Promise<UploadResult> => {
  const service = getImageService();
  return service.uploadImage(file, 'articles');
};

export const uploadBlogImage = async (file: File): Promise<UploadResult> => {
  const service = getImageService();
  return service.uploadImage(file, 'blog');
};

export const uploadMultipleImages = async (files: File[], subfolder: string = 'articles'): Promise<UploadResult[]> => {
  const service = getImageService();
  return service.uploadImages(files, subfolder);
};

export const deleteImage = async (path: string): Promise<boolean> => {
  const service = getImageService();
  return service.deleteImage(path);
};
