
import { AnimalCategory, AnimalListing, User } from './types';

export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: 'Admin User',
    email: 'admin@mandi.com',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/150?u=admin'
  },
  {
    id: 'u2',
    name: 'Malik Ahmed',
    email: 'malik@example.com',
    role: 'user',
    phone: '+92 300 1234567',
    avatar: 'https://i.pravatar.cc/150?u=malik'
  }
];

export const MOCK_LISTINGS: AnimalListing[] = [
  {
    id: '1',
    userId: 'u2',
    title: 'Pure Breed Sahiwal Bull',
    category: AnimalCategory.CATTLE,
    breed: 'Sahiwal',
    price: 250000,
    location: 'Sahiwal, Punjab',
    imageUrls: ['https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&q=80&w=800'],
    description: 'Very healthy, pure breed Sahiwal bull for sale. Perfect for upcoming Eid or breeding purposes.',
    datePosted: '2024-05-15',
    sellerName: 'Malik Ahmed',
    sellerPhone: '+92 300 1234567',
    isFeatured: true,
    status: 'approved'
  },
  {
    id: '2',
    userId: 'u2',
    title: 'Teddy Goat Pair',
    category: AnimalCategory.GOATS,
    breed: 'Teddy',
    price: 45000,
    location: 'Lahore, Punjab',
    imageUrls: ['https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&q=80&w=800'],
    description: 'Active and healthy pair of teddy goats. 6 months old.',
    datePosted: '2024-05-18',
    sellerName: 'Ali Raza',
    sellerPhone: '+92 312 9876543',
    isFeatured: true,
    status: 'approved'
  },
  {
    id: '3',
    userId: 'u3',
    title: 'German Shepherd Puppy',
    category: AnimalCategory.PETS,
    breed: 'German Shepherd',
    price: 35000,
    location: 'Islamabad, ICT',
    imageUrls: ['https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&q=80&w=800'],
    description: 'Quality German Shepherd puppy. Vaccinated and dewormed. 2 months old.',
    datePosted: '2024-05-20',
    sellerName: 'Sara Khan',
    sellerPhone: '+92 333 5556667',
    status: 'approved'
  },
  {
    id: '4',
    userId: 'u4',
    title: 'Aseel Rooster',
    category: AnimalCategory.POULTRY,
    breed: 'Aseel',
    price: 15000,
    location: 'Faisalabad, Punjab',
    imageUrls: ['https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80&w=800'],
    description: 'Fighter breed Aseel rooster. High stamina and pedigree.',
    datePosted: '2024-05-22',
    sellerName: 'Hamza Malik',
    sellerPhone: '+92 345 1112233',
    status: 'approved'
  }
];

export const CATEGORIES = [
  { name: AnimalCategory.CATTLE, icon: 'fa-cow', count: 124 },
  { name: AnimalCategory.GOATS, icon: 'fa-hippo', count: 450 },
  { name: AnimalCategory.SHEEP, icon: 'fa-sheep', count: 89 },
  { name: AnimalCategory.POULTRY, icon: 'fa-egg', count: 1200 },
  { name: AnimalCategory.PETS, icon: 'fa-dog', count: 320 },
  { name: AnimalCategory.OTHERS, icon: 'fa-horse', count: 45 }
];
