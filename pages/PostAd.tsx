
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AnimalCategory, AnimalListing } from '../types';
import { analyzeAnimalImage } from '../services/geminiService';
import { getCurrentUser } from '../services/authService';
import { addListing } from '../services/listingService';

const PostAd: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(getCurrentUser());
  const [loading, setLoading] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);
  
  // Form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<AnimalCategory>(AnimalCategory.CATTLE);
  const [breed, setBreed] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newImages: string[] = [];
      
      for (let i = 0; i < files.length; i++) {
        if (images.length + newImages.length >= 5) break; // Limit to 5 images
        
        const file = files[i];
        const base64String = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
        newImages.push(base64String);
      }
      
      const updatedImages = [...images, ...newImages];
      setImages(updatedImages);
      
      // Analyze the first image if it's the first one uploaded or no analysis exists
      if (updatedImages.length > 0 && !aiAnalysis) {
        setLoading(true);
        const analysis = await analyzeAnimalImage(updatedImages[0].split(',')[1]);
        setAiAnalysis(analysis || "Analysis failed.");
        setLoading(false);
      }
    }
  };

  const removeImage = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
    if (updated.length === 0) setAiAnalysis(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (images.length === 0) {
      alert("Please upload at least one photo of your animal.");
      return;
    }

    try {
      addListing({
        userId: user.id,
        title,
        category,
        breed,
        price: Number(price),
        location: 'Current Location', 
        imageUrls: images,
        description,
        sellerName: user.name,
        sellerPhone: user.phone || '0300-0000000'
      });

      alert('Successfully posted! Your animal is now live in the Mandi.');
      navigate('/listings');
    } catch (err) {
      console.error(err);
      alert('Error posting advertisement.');
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-32 text-center max-w-lg">
        <div className="bg-white p-12 rounded-[3rem] shadow-xl border border-gray-100">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 mx-auto mb-6 text-3xl">
            <i className="fa-solid fa-user-lock"></i>
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-4">Account Required</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            You need to be logged in to post an advertisement on Animal Mandi. It takes less than a minute!
          </p>
          <div className="flex flex-col gap-3">
            <Link to="/login" className="bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-blue-700 transition">Log In</Link>
            <Link to="/signup" className="text-gray-700 font-bold py-4 rounded-2xl border border-gray-200 hover:bg-gray-50 transition">Create Free Account</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden animate-fade-in">
        <div className="bg-gradient-to-r from-[#020617] to-[#001e3c] p-8 text-white">
          <h1 className="text-3xl font-bold">Post An Ad</h1>
          <p className="text-blue-100/60 mt-2">Reach thousands of buyers across the country</p>
        </div>

        <form className="p-8 space-y-8" onSubmit={handleSubmit}>
          <section>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <i className="fa-solid fa-camera text-blue-600"></i> Animal Photos
              </h3>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{images.length} / 5</span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-6">
              {images.map((img, idx) => (
                <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden group shadow-md">
                  <img src={img} className="w-full h-full object-cover" />
                  <button 
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition"
                  >
                    <i className="fa-solid fa-xmark text-xs"></i>
                  </button>
                  {idx === 0 && (
                    <div className="absolute bottom-0 inset-x-0 bg-blue-600 text-[8px] text-white font-black text-center py-1 uppercase tracking-tighter">
                      Main Photo
                    </div>
                  )}
                </div>
              ))}
              
              {images.length < 5 && (
                <div className="relative aspect-square border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center hover:bg-gray-50 hover:border-blue-300 transition cursor-pointer">
                  <i className="fa-solid fa-plus text-2xl text-gray-300"></i>
                  <span className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">Add Photo</span>
                  <input 
                    type="file" 
                    multiple
                    accept="image/*" 
                    className="absolute inset-0 opacity-0 cursor-pointer" 
                    onChange={handleImageChange}
                  />
                </div>
              )}
            </div>

            <div className="bg-blue-50 rounded-3xl p-6 border border-blue-100">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-blue-700 flex items-center gap-2">
                  <i className="fa-solid fa-wand-magic-sparkles text-blue-500"></i> AI Insights
                </h4>
                {loading && <i className="fa-solid fa-circle-notch animate-spin text-blue-600"></i>}
              </div>
              {aiAnalysis ? (
                <div className="text-sm text-gray-600 space-y-2">
                  <p className="whitespace-pre-wrap">{aiAnalysis}</p>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-xs text-gray-400 italic">
                    Upload photos to get AI suggestions for breed and market value.
                  </p>
                </div>
              )}
            </div>
          </section>

          <section className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Listing Title</label>
              <input 
                type="text" 
                required 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Beautiful White Aseel Rooster" 
                className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Category</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value as AnimalCategory)}
                className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {Object.values(AnimalCategory).map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Breed</label>
              <input 
                type="text" 
                required 
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                placeholder="e.g. Sahiwal, Gulabi" 
                className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Price (PKR)</label>
              <input 
                type="number" 
                required 
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter amount" 
                className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>
          </section>

          <section className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Description</label>
            <textarea 
              rows={4} 
              required 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the animal's health, age, temperament..." 
              className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
            ></textarea>
          </section>

          <div className="pt-8">
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-3xl shadow-xl transition-all flex items-center justify-center gap-3 active:scale-95">
              <i className="fa-solid fa-circle-check text-xl"></i>
              Post My Ad Now
            </button>
            <p className="text-center text-xs text-gray-400 mt-4">
              By posting, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostAd;
