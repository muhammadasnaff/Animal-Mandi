
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = login(identifier, password);
    if (user) {
      navigate('/');
    } else {
      setError('Invalid credentials. Check your email/mobile or password.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl shadow-blue-900/10 border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-b from-[#020617] to-[#001e3c] p-8 text-white text-center">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/10">
            <i className="fa-solid fa-lock text-2xl"></i>
          </div>
          <h2 className="text-2xl font-black">Welcome Back</h2>
          <p className="text-blue-100/60 text-sm mt-2">Login with Email or Mobile Number</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium flex items-center gap-2">
              <i className="fa-solid fa-circle-exclamation"></i>
              {error}
            </div>
          )}
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Email or Mobile Number</label>
            <div className="relative">
              <i className="fa-solid fa-user absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input 
                type="text" 
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Email or +92 3XX XXXXXXX" 
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Password</label>
            <div className="relative">
              <i className="fa-solid fa-key absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg transition-all active:scale-95">
            Sign In
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-500">
              Don't have an account? <Link to="/signup" className="text-blue-600 font-bold hover:underline">Create Account</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
