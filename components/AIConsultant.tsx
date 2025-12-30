
import React, { useState } from 'react';
import { getAnimalExpertAdvice } from '../services/geminiService';

const AIConsultant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    const result = await getAnimalExpertAdvice(query);
    setResponse(result);
    setLoading(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-blue-700 hover:scale-110 transition-all z-40 border-4 border-white"
        title="Ask our AI Expert"
      >
        <i className="fa-solid fa-robot text-2xl"></i>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-end z-50 p-4">
          <div className="bg-white w-full max-w-md h-full rounded-3xl shadow-2xl flex flex-col animate-slide-in-right overflow-hidden">
            <div className="p-6 bg-blue-600 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <i className="fa-solid fa-user-doctor"></i>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Mandi Expert AI</h3>
                  <p className="text-xs text-blue-100">Ask about care, breeds or prices</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform">
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
            </div>

            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {response ? (
                <div className="bg-blue-50 p-4 rounded-2xl text-gray-800 text-sm leading-relaxed border border-blue-100">
                  <div className="font-bold text-blue-700 mb-2 flex items-center gap-2">
                    <i className="fa-solid fa-circle-check"></i> Advice:
                  </div>
                  {response}
                </div>
              ) : (
                <div className="text-center py-12">
                  <i className="fa-solid fa-comment-dots text-4xl text-gray-200 mb-4"></i>
                  <p className="text-gray-400 italic">"How can I help you with your livestock today?"</p>
                </div>
              )}
              {loading && (
                <div className="flex justify-center py-4">
                  <div className="animate-bounce text-blue-600 space-x-1">
                    <span className="inline-block w-2 h-2 bg-current rounded-full"></span>
                    <span className="inline-block w-2 h-2 bg-current rounded-full"></span>
                    <span className="inline-block w-2 h-2 bg-current rounded-full"></span>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="p-6 border-t bg-gray-50">
              <div className="relative">
                <input 
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask a question..."
                  className="w-full pl-4 pr-12 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition shadow-sm"
                />
                <button 
                  type="submit"
                  disabled={loading}
                  className="absolute right-2 top-2 w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 disabled:bg-gray-400 transition"
                >
                  <i className="fa-solid fa-paper-plane text-xs"></i>
                </button>
              </div>
              <p className="mt-4 text-[10px] text-gray-400 text-center uppercase tracking-widest font-bold">
                Powered by Gemini AI
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AIConsultant;
