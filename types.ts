
export enum AnimalCategory {
  CATTLE = 'Cattle',
  GOATS = 'Goats',
  SHEEP = 'Sheep',
  POULTRY = 'Poultry',
  PETS = 'Pets',
  OTHERS = 'Others'
}

export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
}

export interface AnimalListing {
  id: string;
  userId: string; // Associated user
  title: string;
  category: AnimalCategory;
  breed: string;
  price: number;
  location: string;
  imageUrls: string[];
  description: string;
  datePosted: string;
  sellerName: string;
  sellerPhone: string;
  isFeatured?: boolean;
  status: 'pending' | 'approved' | 'sold';
}

export interface SearchFilters {
  keyword: string;
  category: string;
  location: string;
}
