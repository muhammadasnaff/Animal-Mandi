
import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            
            {/* Contact Info */}
            <div className="md:col-span-1 space-y-8">
              <div>
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Get in Touch</h1>
                <p className="text-gray-500">Have questions about listings or need technical support? We're here to help.</p>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 flex-shrink-0">
                    <i className="fa-solid fa-location-dot text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Our Office</h4>
                    <p className="text-sm text-gray-500">7th Floor, Software Park, Ferozepur Road, Lahore, Pakistan</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 flex-shrink-0">
                    <i className="fa-solid fa-phone text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Call Us</h4>
                    <p className="text-sm text-gray-500">+92 42 111-MANDI (62634)</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 flex-shrink-0">
                    <i className="fa-solid fa-envelope text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Email Us</h4>
                    <p className="text-sm text-gray-500">support@animalmandi.pk</p>
                  </div>
                </div>
              </div>

              <div className="pt-8 flex gap-4">
                <a href="#" className="w-10 h-10 bg-white shadow-sm rounded-lg flex items-center justify-center text-gray-400 hover:text-green-600 transition"><i className="fa-brands fa-facebook-f"></i></a>
                <a href="#" className="w-10 h-10 bg-white shadow-sm rounded-lg flex items-center justify-center text-gray-400 hover:text-green-600 transition"><i className="fa-brands fa-twitter"></i></a>
                <a href="#" className="w-10 h-10 bg-white shadow-sm rounded-lg flex items-center justify-center text-gray-400 hover:text-green-600 transition"><i className="fa-brands fa-instagram"></i></a>
              </div>
            </div>

            {/* Form */}
            <div className="md:col-span-2">
              <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl shadow-gray-200/50 border border-gray-100">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Full Name</label>
                      <input type="text" placeholder="John Doe" className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-green-500 outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Email Address</label>
                      <input type="email" placeholder="john@example.com" className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-green-500 outline-none" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Subject</label>
                    <input type="text" placeholder="How can we help?" className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-green-500 outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Message</label>
                    <textarea rows={6} placeholder="Your message here..." className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-green-500 outline-none"></textarea>
                  </div>
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-5 rounded-3xl shadow-xl transition-all flex items-center justify-center gap-3">
                    Send Message
                    <i className="fa-solid fa-paper-plane"></i>
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
