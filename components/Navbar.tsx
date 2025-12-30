
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../services/authService';
import { User } from '../types';

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(getCurrentUser());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setUser(getCurrentUser());
    setIsMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    setUser(null);
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-lg shadow-xl py-3' : 'bg-white py-5'}`}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-blue-600 p-2.5 rounded-xl shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform duration-300">
              <i className="fa-solid fa-paw text-white text-xl"></i>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-[#001e3c] tracking-tighter">
              Animal <span className="text-blue-600">Mandi</span>
            </h1>
          </Link>
          
          <div className="hidden lg:flex items-center gap-10">
            <Link to="/" className={`text-sm font-bold transition-all duration-300 ${isActive('/') ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'}`}>Home</Link>
            <Link to="/listings" className={`text-sm font-bold transition-all duration-300 ${isActive('/listings') ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'}`}>Animals</Link>
            {user?.role === 'admin' && (
              <Link to="/admin" className={`text-sm font-bold transition-all duration-300 ${isActive('/admin') ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'}`}>Admin</Link>
            )}
            <Link to="/about" className={`text-sm font-bold transition-all duration-300 ${isActive('/about') ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'}`}>About</Link>
            <Link to="/contact" className={`text-sm font-bold transition-all duration-300 ${isActive('/contact') ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'}`}>Contact</Link>
          </div>

          <div className="flex items-center gap-3">
            <Link 
              to="/post-ad" 
              className="hidden sm:flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-2xl font-bold hover:bg-[#001e3c] hover:shadow-xl transition-all duration-300 active:scale-95 text-sm"
            >
              <i className="fa-solid fa-plus-circle"></i>
              Post Ad
            </Link>

            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 p-1 pr-3 rounded-2xl transition-all border border-gray-100"
                >
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-xl object-cover border border-white" />
                  <span className="text-sm font-bold text-gray-700 hidden sm:inline">{user.name.split(' ')[0]}</span>
                  <i className={`fa-solid fa-chevron-down text-[10px] text-gray-400 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`}></i>
                </button>
                
                {isMenuOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-[2rem] shadow-2xl py-3 border border-gray-100 animate-fade-in z-50">
                    <Link to="/listings?view=my-ads" className="flex items-center gap-3 px-5 py-2.5 text-sm font-bold text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all">
                      <i className="fa-solid fa-layer-group w-4"></i> My Ads
                    </Link>
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-5 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 transition-all">
                      <i className="fa-solid fa-sign-out-alt w-4"></i> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-2xl">
                <Link to="/login" className="text-xs font-bold text-gray-700 hover:bg-white px-4 py-2 rounded-xl transition-all">Login</Link>
                <Link to="/signup" className="text-xs font-bold bg-[#001e3c] text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition-all shadow-md">Join</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
