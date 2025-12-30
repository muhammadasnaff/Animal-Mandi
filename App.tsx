
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PostAd from './pages/PostAd';
import Listings from './pages/Listings';
import AnimalDetail from './pages/AnimalDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import AIConsultant from './components/AIConsultant';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/post-ad" element={<PostAd />} />
            <Route path="/listings" element={<Listings />} />
            <Route path="/animal/:id" element={<AnimalDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        
        <footer className="bg-[#020617] text-blue-200/60 py-16 border-t border-white/5">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              <div className="col-span-1 md:col-span-1">
                <div className="flex items-center gap-2 mb-6">
                  <div className="bg-blue-600 p-2 rounded-lg">
                    <i className="fa-solid fa-paw text-white text-xl"></i>
                  </div>
                  <h1 className="text-xl font-extrabold text-white">
                    Animal <span className="text-blue-400">Mandi</span>
                  </h1>
                </div>
                <p className="text-sm leading-relaxed text-gray-400">
                  Leading marketplace for livestock and pets in the region. 
                  Empowering farmers and buyers with AI technology and verified deals.
                </p>
              </div>
              
              <div>
                <h4 className="text-white font-bold mb-6">Quick Links</h4>
                <ul className="space-y-4 text-sm">
                  <li><a href="/#/about" className="hover:text-blue-300 transition">About Us</a></li>
                  <li><a href="/#/listings" className="hover:text-blue-300 transition">Animal Categories</a></li>
                  <li><a href="/#/listings" className="hover:text-blue-300 transition">Pricing Policy</a></li>
                  <li><a href="/#/contact" className="hover:text-blue-300 transition">Contact Us</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-bold mb-6">Support</h4>
                <ul className="space-y-4 text-sm">
                  <li><a href="/#/contact" className="hover:text-blue-300 transition">Contact Support</a></li>
                  <li><a href="/#/about" className="hover:text-blue-300 transition">Safety Tips</a></li>
                  <li><a href="/#/about" className="hover:text-blue-300 transition">Terms & Conditions</a></li>
                  <li><a href="/#/about" className="hover:text-blue-300 transition">Privacy Policy</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-bold mb-6">Newsletter</h4>
                <p className="text-sm mb-4 text-gray-400">Get the latest market rates and hot deals.</p>
                <div className="flex gap-2">
                  <input type="email" placeholder="Email address" className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm w-full focus:ring-2 focus:ring-blue-600 outline-none text-white placeholder-gray-600" />
                  <button className="bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 transition">
                    <i className="fa-solid fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-500 uppercase tracking-widest font-bold">
              <p>&copy; 2024 Animal Mandi. All rights reserved.</p>
              <div className="flex gap-6 text-lg normal-case tracking-normal">
                <a href="#" className="hover:text-blue-400 transition"><i className="fa-brands fa-facebook"></i></a>
                <a href="#" className="hover:text-blue-400 transition"><i className="fa-brands fa-twitter"></i></a>
                <a href="#" className="hover:text-blue-400 transition"><i className="fa-brands fa-whatsapp"></i></a>
                <a href="#" className="hover:text-blue-400 transition"><i className="fa-brands fa-youtube"></i></a>
              </div>
            </div>
          </div>
        </footer>

        <AIConsultant />
      </div>
    </Router>
  );
};

export default App;
