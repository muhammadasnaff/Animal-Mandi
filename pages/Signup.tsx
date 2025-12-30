
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../services/authService';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signup(formData.name, formData.email, formData.phone);
    navigate('/');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl shadow-blue-900/10 border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-b from-[#020617] to-[#001e3c] p-8 text-white text-center">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/10">
            <i className="fa-solid fa-user-plus text-2xl"></i>
          </div>
          <h2 className="text-2xl font-black">Create Account</h2>
          <p className="text-blue-100/60 mt-2">Join the largest animal marketplace</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
            <input 
              type="text" 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="e.g. Malik Ahmed" 
              className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
            <input 
              type="email" 
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="name@example.com" 
              className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
            <input 
              type="tel" 
              required
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              placeholder="+92 3XX XXXXXXX" 
              className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Password</label>
            <input 
              type="password" 
              required
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              placeholder="••••••••" 
              className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg transition-all active:scale-95 mt-4">
            Register Now
          </button>

          <div className="text-center pt-4">
            <p className="text-sm text-gray-500">
              Already have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline">Log In</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
