
import React from 'react';
import { Link } from 'react-router-dom';
import { AnimalListing } from '../types';

interface AnimalCardProps {
  animal: AnimalListing;
}

const AnimalCard: React.FC<AnimalCardProps> = ({ animal }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
      <div className="relative h-56 overflow-hidden">
        <img 
          src={animal.imageUrls[0]} 
          alt={animal.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {animal.isFeatured && (
          <div className="absolute top-4 left-4 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
            Featured
          </div>
        )}
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-blue-700 font-bold shadow-sm border border-blue-50">
          PKR {animal.price.toLocaleString()}
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
            {animal.title}
          </h3>
          <button className="text-gray-400 hover:text-red-500 transition">
            <i className="fa-regular fa-heart text-xl"></i>
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mb-4 text-sm text-gray-500">
          <span className="flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded">
            <i className="fa-solid fa-tag text-blue-500"></i> {animal.breed}
          </span>
          <span className="flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded">
            <i className="fa-solid fa-location-dot text-blue-400"></i> {animal.location}
          </span>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
              {animal.sellerName.charAt(0)}
            </div>
            <span className="text-sm font-medium text-gray-700">{animal.sellerName}</span>
          </div>
          <Link 
            to={`/animal/${animal.id}`}
            className="text-blue-600 font-bold text-sm hover:underline"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AnimalCard;
