export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  category: string;
  image: string;
  rating: number;
  inStock: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export const categories: Category[] = [
  { id: 'all', name: 'Svi proizvodi', icon: '🛍️' },
  { id: 'plosce', name: 'Betonske ploče', icon: '⬜' },
  { id: 'kocke', name: 'Kocke & Pločnici', icon: '🧱' },
  { id: 'mobilijar', name: 'Mobilijar', icon: '🪑' },
  { id: 'dekorativni', name: 'Dekorativni elementi', icon: '🏛️' },
];

export const products: Product[] = [
  {
    id: 1,
    name: 'Premium Line Betonske Ploče',
    description: 'Premium Line ploče predstavljaju spoj bezvremenskog dizajna i vrhunskog kvaliteta. Dostupne u poliranoj, brušenoj i pjeskarenoj obradi.',
    price: 45.99,
    salePrice: 39.99,
    category: 'plosce',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    rating: 4.9,
    inStock: true,
  },
  {
    id: 2,
    name: 'Sancha Line Betonske Ploče',
    description: 'Sancha Line betonske ploče su ploče bez završne kvarcne obrade, zbog čega površina ostaje prirodnija i sirovija.',
    price: 28.99,
    category: 'plosce',
    image: 'https://images.unsplash.com/photo-1598522325074-042db73aa4e6?w=400&h=400&fit=crop',
    rating: 4.6,
    inStock: true,
  },
  {
    id: 3,
    name: 'Kocke za Dvorište Premium',
    description: 'Trajne kocke za uređenje dvorišta, prilaza i staza. Otporne na sve vremenske uvjete.',
    price: 32.99,
    salePrice: 26.99,
    category: 'kocke',
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop',
    rating: 4.8,
    inStock: true,
  },
  {
    id: 4,
    name: 'Dekorativni Kameni Zid',
    description: 'Dekorativna cigla i kamen za uređenje interijera i eksterijera. Idealno za fasade i zidove.',
    price: 24.99,
    category: 'dekorativni',
    image: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?w=400&h=400&fit=crop',
    rating: 4.7,
    inStock: true,
  },
  {
    id: 5,
    name: 'Vrtna Klupa Betonska',
    description: 'Estetski dizajnirana vrtna klupa od visokokvalitetnog betona. Otporna na vremenske uvjete.',
    price: 189.99,
    salePrice: 159.99,
    category: 'mobilijar',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop',
    rating: 4.5,
    inStock: true,
  },
  {
    id: 6,
    name: 'Vrtna Fontana',
    description: 'Prekrasna betonska fontana za vrt. Donosi smiraj i ljepotu u vaš prostor.',
    price: 349.99,
    category: 'mobilijar',
    image: 'https://images.unsplash.com/photo-1576021182211-9ea8dced3690?w=400&h=400&fit=crop',
    rating: 4.8,
    inStock: true,
  },
  {
    id: 7,
    name: 'Roštilj Betonski Premium',
    description: 'Profesionalni betonski roštilj za savršene užitke na otvorenom. Trajan i funkcionalan.',
    price: 279.99,
    category: 'mobilijar',
    image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=400&h=400&fit=crop',
    rating: 4.9,
    inStock: true,
  },
  {
    id: 8,
    name: 'Nosači za Solarne Panele',
    description: 'Betonski nosač za fotonaponske module. Pametno i sigurno rješenje za solarnu energiju.',
    price: 89.99,
    salePrice: 74.99,
    category: 'dekorativni',
    image: 'https://images.unsplash.com/photo-1509391366360-2e1f62e5e7e7?w=400&h=400&fit=crop',
    rating: 4.6,
    inStock: true,
  },
  {
    id: 9,
    name: 'Betonski Pločnik za Stazu',
    description: 'Idealno rješenje za staze u vrtu ili dvorištu. Jednostavna ugradnja i dugotrajnost.',
    price: 22.99,
    category: 'kocke',
    image: 'https://images.unsplash.com/photo-1604762524889-3e2fcc145683?w=400&h=400&fit=crop',
    rating: 4.4,
    inStock: true,
  },
  {
    id: 10,
    name: 'Okvir zaCvijeće Betonski',
    description: 'Elegantni betonski okviri za cvijeće. Idealni za uređenje terase ili balkona.',
    price: 34.99,
    salePrice: 27.99,
    category: 'dekorativni',
    image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=400&fit=crop',
    rating: 4.3,
    inStock: true,
  },
  {
    id: 11,
    name: 'Vrtni Stol Sa Klupama Set',
    description: 'Komplet vrtnog stola sa 4 klupe. Savršen za okupljanja u vrtu.',
    price: 449.99,
    category: 'mobilijar',
    image: 'https://images.unsplash.com/photo-1617364852223-75c57ffaec56?w=400&h=400&fit=crop',
    rating: 4.7,
    inStock: true,
  },
  {
    id: 12,
    name: 'Sredstvo za Zaštitu Betona',
    description: 'Concrete je specijalizovano sredstvo za zaštitu betonskih proizvoda. Duboko prodire i štiti površinu.',
    price: 29.99,
    category: 'dekorativni',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    rating: 4.5,
    inStock: true,
  },
];

export const heroProducts = [
  {
    id: 1,
    name: 'Betonske Ploče Premium',
    description: 'Spoj bezvremenskog dizajna i vrhunskog kvaliteta',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
  },
];
