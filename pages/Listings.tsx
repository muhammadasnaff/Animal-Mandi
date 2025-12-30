
import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CATEGORIES } from '../constants';
import AnimalCard from '../components/AnimalCard';
import { AnimalCategory, AnimalListing } from '../types';
import { getListings } from '../services/listingService';
import { getCurrentUser } from '../services/authService';

const Listings: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [allListings, setAllListings] = useState<AnimalListing[]>([]);
  const currentUser = getCurrentUser();
  
  // Local filter states
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLocation, setSelectedLocation] = useState<string>('All Cities');
  const [search, setSearch] = useState('');
  const [isMyAdsView, setIsMyAdsView] = useState(false);

  // Sync state with URL params on mount and when params change
  useEffect(() => {
    setAllListings(getListings());
    
    const query = searchParams.get('q') || '';
    const cat = searchParams.get('category') || 'All';
    const loc = searchParams.get('location') || 'All Cities';
    const view = searchParams.get('view');
    
    setSearch(query);
    setSelectedCategory(cat === 'All Categories' ? 'All' : cat);
    setSelectedLocation(loc);
    setIsMyAdsView(view === 'my-ads');
  }, [searchParams]);

  const filteredListings = useMemo(() => {
    return allListings.filter(item => {
      // 1. Ownership Filter (My Ads)
      if (isMyAdsView && currentUser) {
        if (item.userId !== currentUser.id) return false;
      }

      // 2. Category Filter
      const matchesCategory = selectedCategory === 'All' || 
                              selectedCategory === 'All Categories' || 
                              item.category === selectedCategory;
      
      // 3. Location Filter
      const matchesLocation = selectedLocation === 'All Cities' || 
                              item.location.toLowerCase().includes(selectedLocation.toLowerCase());

      // 4. Search Keyword Filter
      const searchLower = search.toLowerCase().trim();
      const matchesSearch = !searchLower || 
                           item.title.toLowerCase().includes(searchLower) || 
                           item.breed.toLowerCase().includes(searchLower) ||
                           item.description.toLowerCase().includes(searchLower);
      
      return matchesCategory && matchesLocation && matchesSearch;
    });
  }, [selectedCategory, selectedLocation, search, allListings, isMyAdsView, currentUser]);

  const handleUpdateParams = (updates: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value && value !== 'All' && value !== 'All Cities' && value !== 'All Categories') {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });
    setSearchParams(newParams);
  };

  const clearMyAdsFilter = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('view');
    setSearchParams(newParams);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 space-y-8">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-[#001e3c] mb-6 flex items-center gap-2">
                <i className="fa-solid fa-sliders text-blue-600"></i> Filters
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 block">Location</label>
                  <select 
                    value={selectedLocation}
                    onChange={(e) => handleUpdateParams({ location: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl text-sm border border-gray-100 focus:ring-2 focus:ring-blue-500 outline-none appearance-none bg-gray-50 cursor-pointer hover:border-blue-200 transition-colors"
                  >
                    <option>All Cities</option>
                    <option>Lahore</option>
                    <option>Karachi</option>
                    <option>Islamabad</option>
                    <option>Faisalabad</option>
                    <option>Multan</option>
                    <option>Sahiwal</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 block">Categories</label>
                  <div className="space-y-2">
                    <button 
                      onClick={() => handleUpdateParams({ category: 'All' })}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${selectedCategory === 'All' ? 'bg-[#001e3c] text-white shadow-lg' : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'}`}
                    >
                      All Animals
                    </button>
                    {CATEGORIES.map(cat => (
                      <button 
                        key={cat.name}
                        onClick={() => handleUpdateParams({ category: cat.name })}
                        className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${selectedCategory === cat.name ? 'bg-[#001e3c] text-white shadow-lg' : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'}`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#001e3c] p-8 rounded-3xl text-white shadow-xl shadow-blue-900/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
              <h4 className="font-bold mb-2 relative z-10">Need Help?</h4>
              <p className="text-xs text-blue-100/60 mb-6 leading-relaxed relative z-10">Our AI expert can help you find the best breed for your budget and needs.</p>
              <button 
                onClick={() => {
                   const aiBtn = document.querySelector('[title="Ask our AI Expert"]') as HTMLElement;
                   if (aiBtn) aiBtn.click();
                }}
                className="bg-blue-600 text-white w-full py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white hover:text-[#001e3c] transition-all duration-300 relative z-10 shadow-sm"
              >
                Talk to AI Expert
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
              <div className="flex flex-col gap-2 w-full md:w-[28rem]">
                {isMyAdsView && (
                  <div className="flex items-center gap-2 mb-2 animate-fade-in">
                    <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-2">
                      <i className="fa-solid fa-user"></i> My Listings
                    </span>
                    <button 
                      onClick={clearMyAdsFilter}
                      className="text-[10px] font-bold text-gray-400 hover:text-red-500 uppercase tracking-widest transition-colors"
                    >
                      Show All Ads
                    </button>
                  </div>
                )}
                <div className="relative w-full">
                  <i className="fa-solid fa-magnifying-glass absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <input 
                    type="text" 
                    placeholder="Search breed, title, or description..."
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      handleUpdateParams({ q: e.target.value });
                    }}
                    className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white border border-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm hover:shadow-md"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 bg-white px-4 py-2 rounded-full border border-gray-50 shadow-sm">
                <span className="font-bold text-[#001e3c]">{filteredListings.length}</span> results found
              </div>
            </div>

            {filteredListings.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 animate-fade-in">
                {filteredListings.map(animal => (
                  <AnimalCard key={animal.id} animal={animal} />
                ))}
              </div>
            ) : (
              <div className="text-center py-32 bg-white rounded-[3.5rem] shadow-sm border border-gray-100">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-200">
                   <i className={`fa-solid ${isMyAdsView ? 'fa-layer-group' : 'fa-search'} text-4xl`}></i>
                </div>
                <h3 className="text-2xl font-black text-[#001e3c] mb-2">
                  {isMyAdsView ? "You haven't posted any ads yet" : "No matched results"}
                </h3>
                <p className="text-gray-500 max-w-sm mx-auto">
                  {isMyAdsView 
                    ? "Start your journey by posting your first advertisement in the Mandi."
                    : "We couldn't find anything matching your current filters. Try broadening your search."}
                </p>
                <div className="mt-8 flex gap-4 justify-center">
                  {isMyAdsView ? (
                    <Link 
                      to="/post-ad"
                      className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg hover:bg-[#001e3c] transition-all duration-300 active:scale-95"
                    >
                      Post Your First Ad
                    </Link>
                  ) : (
                    <button 
                      onClick={() => {
                        setSearchParams({});
                        setSelectedCategory('All');
                        setSelectedLocation('All Cities');
                        setSearch('');
                      }}
                      className="bg-[#001e3c] text-white px-8 py-3 rounded-2xl font-bold shadow-lg hover:bg-blue-600 transition-all duration-300 active:scale-95"
                    >
                      Clear all filters
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listings;
