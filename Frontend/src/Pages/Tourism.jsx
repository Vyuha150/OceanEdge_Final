import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Consultation from '../components/Consultation'
import bg from '../assets/Tourism.jpg'
import axios from 'axios'

const Tourism = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [tourismPackages, setTourismPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTourismPackages();
  }, []);

  const fetchTourismPackages = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/tourism`);
      setTourismPackages(response.data.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch tourism packages');
      setLoading(false);
      console.error('Error fetching tourism packages:', err);
    }
  };

  const handleBookNow = (pkg) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'wedding':
        return (
          <svg className="w-5 h-5 text-[#cd754a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        );
      case 'honeymoon':
        return (
          <svg className="w-5 h-5 text-[#cd754a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
          </svg>
        );
      case 'adventure':
        return (
          <svg className="w-5 h-5 text-[#cd754a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-[#cd754a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={fetchTourismPackages}
            className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-hidden bg-black text-white">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-[60vh] flex items-center justify-center"
      >
        <div className="absolute inset-0 z-0">
          <img 
            src={bg}
            alt="Beach"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-bold font-serif mb-6">
            <span className="text-white">Tourism</span>{" "}
            <span className="text-[#dfb562]">Packages</span>
          </h1>
          <p className="text-xl text-gray-200">
            Discover our handcrafted tourism experiences designed to create unforgettable memories
          </p>
        </motion.div>
      </motion.div>

      <div className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tourismPackages.map((pkg, index) => (
              <motion.div 
                key={pkg._id} 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-b from-gray-800 to-gray-900/80 rounded-2xl overflow-hidden transition-all duration-300 border border-gray-700 hover:shadow-xl hover:border-[#cd754a]/30"
              >
                <div className="relative">
                  <motion.img 
                    initial={{ scale: 1.2 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    src={pkg.image}
                    alt={pkg.alt}
                    className="w-full h-52 object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <motion.div 
                    initial={{ x: 100 }}
                    whileInView={{ x: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="absolute top-4 right-4 bg-gradient-to-r from-[#cd754a] to-[#dfb562] px-4 py-2 rounded-xl text-sm font-medium text-white shadow-lg"
                  >
                    <span className="text-xs font-medium">Starting from</span>
                    <br />
                    <span className="text-lg font-bold">{pkg.price}</span>
                  </motion.div>
                  <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-lg bg-gray-900/80 text-white text-sm font-medium flex items-center gap-2">
                    {getCategoryIcon(pkg.category)}
                    <span className="capitalize">{pkg.category}</span>
                  </div>
                </div>
                
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="p-6 md:p-8"
                >
                  <h3 className="text-2xl md:text-3xl font-bold mb-3 text-[#dfb562] bg-clip-text text-transparent bg-gradient-to-r from-[#cd754a] to-[#dfb562]">
                    {pkg.title}
                  </h3>
                  <p className='text-lg md:text-xl font-semibold mb-4 text-[#dfb562] bg-clip-text text-transparent bg-gradient-to-r from-[#cd754a] to-[#dfb562]'>
                    {pkg.quote}
                  </p>
                  <p className="text-gray-300 mb-6 text-base leading-relaxed tracking-wide">
                    {pkg.description}
                  </p>
                  
                  <div className="flex items-center gap-4 mb-6 text-sm text-gray-400">
                    <div className="flex items-center gap-1.5">
                      {getCategoryIcon(pkg.category)}
                      <span className="text-gray-300 font-medium">{pkg.duration}</span>
                    </div>
                    <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                      pkg.status === 'active' ? 'bg-green-500/10 text-green-500' :
                      pkg.status === 'coming_soon' ? 'bg-amber-500/10 text-amber-500' :
                      'bg-red-500/10 text-red-500'
                    }`}>
                      {pkg.status === 'active' ? 'Available Now' :
                       pkg.status === 'coming_soon' ? 'Coming Soon' :
                       'Not Available'}
                    </span>
                  </div>

                  <ul className="grid grid-cols-2 gap-3 mb-6 text-gray-300">
                    {pkg.features.map((feature, index) => (
                      <motion.li 
                        key={index} 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2.5 p-2.5 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors"
                      >
                        <svg className="w-5 h-5 text-[#cd754a]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {feature}
                      </motion.li>
                    ))}
                  </ul>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleBookNow(pkg)}
                    disabled={pkg.status !== 'active'}
                    className={`w-full py-3 rounded-lg font-medium transition-all duration-300 ${
                      pkg.status === 'active'
                        ? 'bg-gradient-to-r from-[#cd754a] to-[#dfb562] text-white hover:opacity-90'
                        : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {pkg.status === 'active' ? 'Book Now' :
                     pkg.status === 'coming_soon' ? 'Coming Soon' :
                     'Not Available'}
                  </motion.button>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl"
            >
              <Consultation 
                type="tourism" 
                onClose={() => setIsModalOpen(false)} 
                selectedPackage={selectedPackage}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tourism;