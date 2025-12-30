
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAdmin, getStoredUsers } from '../services/authService';
import { getListings, deleteListing } from '../services/listingService';
import { User, AnimalListing } from '../types';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'listings' | 'users'>('listings');
  const [users, setUsers] = useState<User[]>(getStoredUsers());
  const [listings, setListings] = useState<AnimalListing[]>([]);

  useEffect(() => {
    if (!isAdmin()) {
      navigate('/');
      return;
    }
    setListings(getListings());
  }, [navigate]);

  const handleDeleteListing = (id: string) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      deleteListing(id);
      setListings(listings.filter(l => l.id !== id));
    }
  };

  const handleDeleteUser = (id: string) => {
    if (window.confirm('Are you sure you want to remove this user?')) {
      const updated = users.filter(u => u.id !== id);
      localStorage.setItem('mandi_all_users', JSON.stringify(updated));
      setUsers(updated);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900">Admin Panel</h1>
            <p className="text-gray-500">Manage your marketplace ecosystem</p>
          </div>
          <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-gray-200">
            <button 
              onClick={() => setActiveTab('listings')}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'listings' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:text-blue-600'}`}
            >
              Listings ({listings.length})
            </button>
            <button 
              onClick={() => setActiveTab('users')}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'users' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:text-blue-600'}`}
            >
              Users ({users.length})
            </button>
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            {activeTab === 'listings' ? (
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Animal</th>
                    <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Category</th>
                    <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Price</th>
                    <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Seller</th>
                    <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {listings.map(item => (
                    <tr key={item.id} className="hover:bg-blue-50/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={item.imageUrls[0]} className="w-12 h-12 rounded-xl object-cover" />
                          <div>
                            <p className="font-bold text-gray-900">{item.title}</p>
                            <p className="text-xs text-gray-500">{item.breed}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">{item.category}</span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-gray-900">PKR {item.price.toLocaleString()}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium">{item.sellerName}</p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => handleDeleteListing(item.id)} className="w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition flex items-center justify-center mx-auto lg:ml-auto">
                          <i className="fa-solid fa-trash-can text-xs"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">User</th>
                    <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Email</th>
                    <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Role</th>
                    <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {users.map(u => (
                    <tr key={u.id} className="hover:bg-blue-50/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={u.avatar} className="w-10 h-10 rounded-full object-cover" />
                          <p className="font-bold text-gray-900">{u.name}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{u.email}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${u.role === 'admin' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {u.role !== 'admin' && (
                          <button onClick={() => handleDeleteUser(u.id)} className="w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition flex items-center justify-center lg:ml-auto">
                            <i className="fa-solid fa-user-xmark text-xs"></i>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
