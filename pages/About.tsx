
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Header */}
      <section className="bg-green-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6">
            Digitizing the <span className="text-green-600">Live Stock</span> Market
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Animal Mandi is Pakistan's premier online marketplace designed specifically to connect livestock farmers, pet lovers, and buyers in a secure, transparent, and technology-driven ecosystem.
          </p>
        </div>
      </section>

      {/* Mission/Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="rounded-[3rem] overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1545468202-39649bdf5f5f?auto=format&fit=crop&q=80&w=800" alt="Farmer with cow" className="w-full h-full object-cover" />
            </div>
            <div className="space-y-8">
              <div>
                <span className="text-green-600 font-black text-xs uppercase tracking-widest">Our Mission</span>
                <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-4">Empowering the Local Farmer</h2>
                <p className="text-gray-600 leading-relaxed">
                  We aim to eliminate middlemen and traditional market hurdles by providing a platform where every farmer can list their animals and get a fair market price directly from buyers.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                  <i className="fa-solid fa-shield-halved text-2xl text-green-600 mb-4"></i>
                  <h4 className="font-bold mb-2">Verified Sellers</h4>
                  <p className="text-xs text-gray-500">Each listing goes through a verification process to ensure quality.</p>
                </div>
                <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                  <i className="fa-solid fa-bolt text-2xl text-amber-500 mb-4"></i>
                  <h4 className="font-bold mb-2">Instant Pricing</h4>
                  <p className="text-xs text-gray-500">Use our AI tools to get real-time market data and valuations.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team/Stats */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div>
              <div className="text-5xl font-black text-amber-400 mb-2">50K+</div>
              <div className="text-gray-400 font-bold uppercase tracking-widest text-xs">Active Users</div>
            </div>
            <div>
              <div className="text-5xl font-black text-amber-400 mb-2">10K+</div>
              <div className="text-gray-400 font-bold uppercase tracking-widest text-xs">Animals Sold</div>
            </div>
            <div>
              <div className="text-5xl font-black text-amber-400 mb-2">98%</div>
              <div className="text-gray-400 font-bold uppercase tracking-widest text-xs">Happy Sellers</div>
            </div>
            <div>
              <div className="text-5xl font-black text-amber-400 mb-2">24/7</div>
              <div className="text-gray-400 font-bold uppercase tracking-widest text-xs">AI Support</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
