/**
 * Blog Post Types & Mock Data
 * In production, this would come from the API
 */

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: {
    name: string;
    avatar: string;
  };
  category: string;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  featured: boolean;
}

// Mock blog posts data
export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Betonske ploče za savršen izgled vašeg dvorišta',
    slug: 'betonske-ploce-za-dvoriste',
    excerpt: 'Saznajte kako odabrati pravu vrstu betonskih ploča za vaše dvorište i stvoriti prekrasan vanjski prostor.',
    content: `
## Uvod

Betonske ploče su idealno rješenje za uređenje vanjskih površina. Nude trajnost, jednostavnu ugradnju i raznovrstan dizajn.

## Vrste betonskih ploča

### Premium Line
Premium Line ploče predstavljaju spoj bezvremenskog dizajna i vrhunskog kvaliteta. Dostupne su u poliranoj, brušenoj i pjeskarenoj obradi.

### Budget Line
Budget Line ploče su pristupačnija opcija sa prirodnijim izgledom.

## Prednosti

- Dugotrajnost
- Otpornost na vremenske uvjete
- Jednostavno održavanje
- Raznovrstan dizajn
    `,
    featuredImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop',
    author: {
      name: 'BePro Tim',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
    },
    category: 'Vodiči',
    tags: ['betonske ploče', 'uredjenje dvorišta', 'vanjski prostor'],
    status: 'published',
    publishedAt: '2026-02-09T10:00:00Z',
    createdAt: '2026-02-01T08:00:00Z',
    updatedAt: '2026-02-09T10:00:00Z',
    views: 1250,
    featured: true,
  },
  {
    id: '2',
    title: 'Kako održavati betonske površine zimi',
    slug: 'odrzavanje-betona-zimi',
    excerpt: 'Zimski mjeseci mogu biti izazov za betonske površine. Saznajte kako ih pravilno održavati.',
    content: 'Full article content here...',
    featuredImage: 'https://images.unsplash.com/photo-1598522325074-042db73aa4e6?w=800&h=400&fit=crop',
    author: {
      name: 'BePro Tim',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
    },
    category: 'Savjeti',
    tags: ['održavanje', 'zima', 'betonske ploče'],
    status: 'published',
    publishedAt: '2026-01-09T10:00:00Z',
    createdAt: '2026-01-05T08:00:00Z',
    updatedAt: '2026-01-09T10:00:00Z',
    views: 890,
    featured: false,
  },
  {
    id: '3',
    title: 'Novo u ponudi: Premium Line 2026',
    slug: 'novo-ponuda-premium-line-2026',
    excerpt: 'Predstavljamo novu kolekciju Premium Line betonskih ploča za 2026. godinu.',
    content: 'Full article content here...',
    featuredImage: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=400&fit=crop',
    author: {
      name: 'BePro Tim',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
    },
    category: 'Novosti',
    tags: ['nova kolekcija', 'premium line', '2026'],
    status: 'published',
    publishedAt: '2025-12-24T10:00:00Z',
    createdAt: '2025-12-20T08:00:00Z',
    updatedAt: '2025-12-24T10:00:00Z',
    views: 2100,
    featured: true,
  },
  {
    id: '4',
    title: 'Dekorativni zidovi - trendovi za 2026',
    slug: 'dekorativni-zidovi-trendovi-2026',
    excerpt: 'Saznajte koje dekoracije su u trendu i kako transformirati vaš prostor.',
    content: 'Full article content here...',
    featuredImage: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?w=800&h=400&fit=crop',
    author: {
      name: 'BePro Tim',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
    },
    category: 'Trendovi',
    tags: ['dekorativni zidovi', 'trendovi', 'interijer'],
    status: 'draft',
    createdAt: '2026-02-15T08:00:00Z',
    updatedAt: '2026-02-15T08:00:00Z',
    views: 0,
    featured: false,
  },
];

export const categories = [
  'Svi',
  'Novosti',
  'Vodiči',
  'Savjeti',
  'Trendovi',
];
