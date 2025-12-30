
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AnimalListing } from '../types';
import { getListingById } from '../services/listingService';

const AnimalDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [animal, setAnimal] = useState<AnimalListing | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  useEffect(() => {
    if (id) {
      const found = getListingById(id);
      setAnimal(found);
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!animal) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <i className="fa-solid fa-triangle-exclamation text-5xl text-blue-500 mb-4"></i>
        <h2 className="text-2xl font-bold text-gray-900">Animal Not Found</h2>
        <p className="text-gray-500 mt-2 mb-8">The animal you're looking for might have been sold or removed.</p>
        <Link to="/listings" className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg hover:bg-blue-700 transition">
          Back to Listings
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <Link to="/listings" className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 font-medium mb-8 transition">
          <i className="fa-solid fa-arrow-left"></i> Back to Listings
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-100 relative group">
              <img 
                src={animal.imageUrls[activeImageIdx]} 
                alt={animal.title} 
                className="w-full h-auto object-cover aspect-[4/3] transition-all duration-500"
              />
              
              {animal.imageUrls.length > 1 && (
                <>
                  <button 
                    onClick={() => setActiveImageIdx(prev => (prev === 0 ? animal.imageUrls.length - 1 : prev - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow-lg hover:bg-white transition opacity-0 group-hover:opacity-100"
                  >
                    <i className="fa-solid fa-chevron-left text-gray-800"></i>
                  </button>
                  <button 
                    onClick={() => setActiveImageIdx(prev => (prev === animal.imageUrls.length - 1 ? 0 : prev + 1))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow-lg hover:bg-white transition opacity-0 group-hover:opacity-100"
                  >
                    <i className="fa-solid fa-chevron-right text-gray-800"></i>
                  </button>
                </>
              )}
            </div>
            
            {/* Thumbnails */}
            {animal.imageUrls.length > 1 && (
              <div className="flex flex-wrap gap-4">
                {animal.imageUrls.map((url, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${activeImageIdx === idx ? 'border-blue-600 scale-105 shadow-md' : 'border-transparent hover:border-gray-300'}`}
                  >
                    <img src={url} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
            
            <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl">
                <i className="fa-solid fa-shield-check"></i>
              </div>
              <div>
                <h4 className="font-bold text-blue-900">Verified Listing</h4>
                <p className="text-sm text-blue-700">This animal has been reviewed by Mandi moderators.</p>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-8">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                  {animal.category}
                </span>
                <span className="text-gray-400 text-xs font-bold">Posted on {animal.datePosted}</span>
              </div>
              <h1 className="text-4xl font-black text-gray-900 leading-tight mb-2">{animal.title}</h1>
              <div className="flex items-center gap-2 text-blue-700 font-black text-3xl">
                PKR {animal.price.toLocaleString()}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-blue-600">
                  <i className="fa-solid fa-dna"></i>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Breed</p>
                  <p className="font-bold text-gray-800">{animal.breed}</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-blue-500">
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Location</p>
                  <p className="font-bold text-gray-800">{animal.location}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Description</h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                {animal.description}
              </p>
            </div>

            {/* Seller Contact */}
            <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-blue-100">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <i className="fa-solid fa-user-tie text-blue-600"></i> Seller Information
              </h3>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 font-black text-2xl">
                  {animal.sellerName.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-xl text-gray-900">{animal.sellerName}</h4>
                  <p className="text-gray-500 text-sm">Member since 2024</p>
                </div>
              </div>

              <div className="grid gap-3">
                <a 
                  href={`tel:${animal.sellerPhone}`} 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-3 active:scale-95"
                >
                  <i className="fa-solid fa-phone"></i>
                  Call Seller
                </a>
                <a 
                  href={`https://wa.me/${animal.sellerPhone.replace(/\s+/g, '')}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-3 active:scale-95"
                >
                  <i className="fa-brands fa-whatsapp text-xl"></i>
                  WhatsApp
                </a>
              </div>
              <p className="text-center text-[10px] text-gray-400 mt-6 font-bold uppercase tracking-widest">
                Always meet in public places and inspect the animal before paying.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalDetail;
