
import React, { useState, useEffect } from 'react';
import { CATEGORIES } from '../constants';
import AnimalCard from '../components/AnimalCard';
import { Link, useNavigate } from 'react-router-dom';
import { AnimalListing } from '../types';
import { getFeaturedListings } from '../services/listingService';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [featuredListings, setFeaturedListings] = useState<AnimalListing[]>([]);
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('All Cities');
  const [category, setCategory] = useState('All Categories');

  useEffect(() => {
    setFeaturedListings(getFeaturedListings());
  }, []);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const params = new URLSearchParams();
    if (search) params.append('q', search);
    if (location !== 'All Cities') params.append('location', location);
    if (category !== 'All Categories') params.append('category', category);
    navigate(`/listings?${params.toString()}`);
  };

  const stats = [
    { label: 'Active Listings', value: '12,500+' },
    { label: 'Verified Sellers', value: '8,200+' },
    { label: 'Daily Visits', value: '45,000+' },
    { label: 'Success Rate', value: '94%' },
  ];

  const steps = [
    {
      icon: 'fa-camera-retro',
      title: 'Take Photos',
      desc: 'Snap clear photos of your animal from different angles.'
    },
    {
      icon: 'fa-wand-magic-sparkles',
      title: 'AI Valuation',
      desc: 'Get instant breed & price insights from our AI expert.'
    },
    {
      icon: 'fa-bullhorn',
      title: 'Reach Buyers',
      desc: 'Connect with thousands of verified buyers instantly.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Midnight Blue Gradient */}
      <section className="relative py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-[#020617] to-[#001e3c] text-white">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-4xl lg:text-5xl font-bold mb-3">
              Find Best Livestock in Pakistan
            </h1>
            <p className="text-lg text-blue-100/80 mb-10">
              With thousands of animals, we have just the right one for you
            </p>

            <form 
              onSubmit={handleSearch}
              className="bg-white rounded-md flex flex-col md:flex-row items-stretch overflow-hidden shadow-2xl max-w-5xl mx-auto border border-white/10"
            >
              <div className="flex-1 flex items-center border-b md:border-b-0 md:border-r border-gray-100">
                <input 
                  type="text" 
                  placeholder="Animal Breed or Title" 
                  className="w-full px-5 py-4 text-gray-800 focus:outline-none text-sm font-medium"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="flex-1 flex items-center border-b md:border-b-0 md:border-r border-gray-100 bg-white">
                <select 
                  className="w-full px-5 py-4 text-gray-500 bg-transparent focus:outline-none text-sm appearance-none cursor-pointer"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  <option>All Cities</option>
                  <option>Lahore</option>
                  <option>Karachi</option>
                  <option>Islamabad</option>
                  <option>Faisalabad</option>
                  <option>Multan</option>
                </select>
                <i className="fa-solid fa-caret-down text-gray-400 mr-4"></i>
              </div>
              <div className="flex-1 flex items-center bg-white">
                <select 
                  className="w-full px-5 py-4 text-gray-500 bg-transparent focus:outline-none text-sm appearance-none cursor-pointer"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>All Categories</option>
                  {CATEGORIES.map(cat => (
                    <option key={cat.name} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
                <i className="fa-solid fa-caret-down text-gray-400 mr-4"></i>
              </div>
              <button 
                type="submit" 
                className="bg-blue-600 hover:bg-[#020617] text-white px-8 py-4 transition-all duration-300 flex items-center justify-center min-w-[80px]"
              >
                <i className="fa-solid fa-magnifying-glass text-xl"></i>
              </button>
            </form>
            
            <div className="mt-8">
              <Link 
                to="/listings" 
                className="inline-flex items-center gap-2 border border-white/30 rounded-md px-6 py-2.5 text-sm font-medium hover:bg-white/10 hover:border-white transition-all duration-300"
              >
                Advanced Search <i className="fa-solid fa-chevron-right text-[10px]"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center group p-6 rounded-3xl hover:bg-blue-50 transition-all duration-300 cursor-default">
                <h3 className="text-4xl font-black text-[#001e3c] mb-2 group-hover:text-blue-600 transition-colors duration-300">{stat.value}</h3>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-xl">
              <h2 className="text-4xl font-black text-[#001e3c] mb-4">What are you looking for?</h2>
              <p className="text-gray-500">Browse through our extensive categories to find the best breeds at competitive prices.</p>
            </div>
            <Link to="/listings" className="text-blue-600 font-bold hover:text-[#001e3c] transition-colors duration-300 group flex items-center gap-2 underline-offset-4 hover:underline">
              View All Categories <i className="fa-solid fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {CATEGORIES.map((cat) => (
              <Link 
                key={cat.name} 
                to={`/listings?category=${cat.name}`}
                className="group flex flex-col items-center p-8 rounded-[2.5rem] bg-white border border-gray-100 hover:bg-[#001e3c] hover:border-[#001e3c] hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
              >
                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-blue-600 text-3xl mb-4 group-hover:scale-110 group-hover:bg-white/10 group-hover:text-white transition-all duration-500 shadow-sm">
                  <i className={`fa-solid ${cat.icon}`}></i>
                </div>
                <h3 className="font-bold text-[#001e3c] group-hover:text-white transition-colors duration-300">{cat.name}</h3>
                <span className="text-[10px] text-gray-400 group-hover:text-blue-200 transition-colors duration-300 uppercase font-black tracking-widest mt-1">
                  {cat.count} Items
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-black text-[#001e3c] mb-4">Easy as 1-2-3</h2>
            <p className="text-gray-500 leading-relaxed">Whether you're selling a pedigree bull or looking for a family pet, our platform makes it seamless.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="hidden lg:block absolute top-1/3 left-0 w-full h-0.5 border-t-2 border-dashed border-gray-100 -z-0"></div>
            
            {steps.map((step, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center p-8 bg-white rounded-[2.5rem] border border-gray-50 hover:shadow-xl transition-all duration-300 group">
                <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center text-3xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-sm">
                  <i className={`fa-solid ${step.icon}`}></i>
                </div>
                <div className="absolute top-6 left-1/2 -translate-x-1/2 -translate-y-full mb-2 bg-[#001e3c] text-white text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center shadow-lg">
                  {idx + 1}
                </div>
                <h4 className="text-xl font-bold text-[#001e3c] mb-3">{step.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-4xl font-black text-[#001e3c] mb-2">Recent Listings</h2>
              <p className="text-gray-500">Verified and ready for delivery</p>
            </div>
            <Link to="/listings" className="text-blue-600 font-bold hover:text-[#001e3c] flex items-center gap-2 transition-colors duration-300">
              Explore All <i className="fa-solid fa-arrow-right text-xs"></i>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {featuredListings.map(animal => (
              <AnimalCard key={animal.id} animal={animal} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-[#020617] to-[#001e3c] rounded-[3rem] p-12 lg:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-900/10">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl lg:text-6xl font-black mb-8">Ready to Start Trading?</h2>
              <p className="text-xl text-blue-100/70 mb-12">Join the largest digital animal market in the country today. It only takes a minute to post your first ad.</p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link to="/signup" className="bg-white text-[#001e3c] font-black px-12 py-5 rounded-2xl shadow-xl hover:bg-blue-50 hover:-translate-y-1 transition-all duration-300 active:scale-95 text-lg">
                  Get Started Now
                </Link>
                <Link to="/listings" className="bg-blue-600 border-2 border-blue-500 text-white font-black px-12 py-5 rounded-2xl hover:bg-transparent hover:border-white transition-all duration-300 hover:-translate-y-1 active:scale-95 text-lg">
                  Browse Animals
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
