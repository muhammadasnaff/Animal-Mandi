
import { AnimalListing } from '../types';
import { MOCK_LISTINGS } from '../constants';

const LISTINGS_KEY = 'mandi_animal_listings';

// Initialize with mock data if nothing exists
if (!localStorage.getItem(LISTINGS_KEY)) {
  localStorage.setItem(LISTINGS_KEY, JSON.stringify(MOCK_LISTINGS));
}

export const getListings = (): AnimalListing[] => {
  const data = localStorage.getItem(LISTINGS_KEY);
  return data ? JSON.parse(data) : MOCK_LISTINGS;
};

export const getListingById = (id: string): AnimalListing | undefined => {
  const listings = getListings();
  return listings.find(l => l.id === id);
};

export const addListing = (listing: Omit<AnimalListing, 'id' | 'datePosted' | 'status'>): AnimalListing => {
  const listings = getListings();
  const newListing: AnimalListing = {
    ...listing,
    id: Date.now().toString(),
    datePosted: new Date().toISOString().split('T')[0],
    status: 'approved', // Auto-approve for this prototype
    isFeatured: false
  };
  listings.unshift(newListing); // Add to beginning
  localStorage.setItem(LISTINGS_KEY, JSON.stringify(listings));
  return newListing;
};

export const deleteListing = (id: string) => {
  const listings = getListings();
  const updated = listings.filter(l => l.id !== id);
  localStorage.setItem(LISTINGS_KEY, JSON.stringify(updated));
};

export const getFeaturedListings = (): AnimalListing[] => {
  return getListings().filter(l => l.isFeatured || l.status === 'approved').slice(0, 8);
};
