export const CATEGORIES = [
  'Makanan',
  'Transport',
  'Belanja',
  'Hiburan',
  'Lainnya'
] as const;

export const CATEGORY_COLORS = {
  Makanan: 'bg-blue-500',
  Transport: 'bg-green-500',
  Belanja: 'bg-yellow-500',
  Hiburan: 'bg-purple-500',
  Lainnya: 'bg-red-500'
} as const;

export type Category = typeof CATEGORIES[number];
