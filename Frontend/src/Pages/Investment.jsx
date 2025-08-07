import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiFilter, FiMapPin, FiHome, FiDollarSign } from 'react-icons/fi';
import PropertyRegistrationForm from '../components/PropertyRegistrationForm';
import axios from 'axios';

const Investment = () => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    priceRange: 'all',
    bedrooms: 'all',
    status: 'all'
  });

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/investments');
      setProperties(response.data.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch properties');
      setLoading(false);
      console.error('Error fetching properties:', err);
    }
  };

  const handleRequestDetails = (property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPrice = filters.priceRange === 'all' || 
                        (filters.priceRange === 'under1cr' && parseFloat(property.price.replace(/[^0-9.]/g, '')) < 1) ||
                        (filters.priceRange === '1to2cr' && parseFloat(property.price.replace(/[^0-9.]/g, '')) >= 1 && parseFloat(property.price.replace(/[^0-9.]/g, '')) < 2) ||
                        (filters.priceRange === 'over2cr' && parseFloat(property.price.replace(/[^0-9.]/g, '')) >= 2);
    
    const matchesBedrooms = filters.bedrooms === 'all' || 
                           property.bedrooms.includes(filters.bedrooms);
    
    const matchesStatus = filters.status === 'all' || 
                         property.status === filters.status;

    return matchesSearch && matchesPrice && matchesBedrooms && matchesStatus;
  });

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
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-hidden bg-black text-white">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-[60vh] flex items-center justify-center mb-16"
      >
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop"
            alt="Luxury Property"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        >
          <div className="inline-block px-4 py-1 font-mono rounded-full text-amber-400 text-md font-medium mb-4">
            YOUR NEXT SMART INVESTMENT
          </div>
          <h1 className="text-4xl bg-clip-text text-transparent bg-gradient-to-r from-white to-[#dfb562] md:text-6xl font-bold mb-6">
            Luxury Living <span className="font-serif italic">&</span> <br className="md:hidden" />{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#cd754a] to-[#dfb562]">Smart Investment</span>
          </h1>
          <p className="text-gray-300 max-w-2xl font-semibold  mx-auto text-base md:text-lg">
            Own a piece of paradise that offers both an exceptional lifestyle and a strategic investment opportunity with compelling returns.
          </p>
        </motion.div>
      </motion.div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-12">
        <div className="bg-gray-900/50 backdrop-blur rounded-xl p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search properties..."
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                value={filters.priceRange}
                onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
              >
                <option value="all">All Prices</option>
                <option value="under1cr">Under ₹1 Cr</option>
                <option value="1to2cr">₹1-2 Cr</option>
                <option value="over2cr">Over ₹2 Cr</option>
              </select>
              <select
                className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                value={filters.bedrooms}
                onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value })}
              >
                <option value="all">All Bedrooms</option>
                <option value="2">2 Bedrooms</option>
                <option value="3">3 Bedrooms</option>
                <option value="4">4+ Bedrooms</option>
              </select>
              <select
                className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              >
                <option value="all">All Status</option>
                <option value="available">Available</option>
                <option value="sold">Sold</option>
                <option value="reserved">Reserved</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-white to-[#dfb562] md:text-3xl font-bold text-center mb-8 md:mb-12"
        >
          Featured Property Collections
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProperties.map((property, idx) => (
            <motion.div
              key={property._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="bg-gray-900/50 backdrop-blur rounded-xl overflow-hidden shadow-xl border border-gray-800 hover:border-amber-500/50 transition-all duration-300"
            >
              <div className="relative">
                <img src={property.image} alt={property.title} className="w-full h-72 object-cover" />
                <div className="absolute top-4 right-4 bg-gradient-to-r from-[#cd754a] to-[#dfb562] backdrop-blur-sm text-white px-3 py-1.5 rounded-lg font-medium">
                  {property.price}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#dfb562]">{property.title}</h3>
                <div className="flex text-sm text-gray-400 mb-3 space-x-4">
                  <span className="flex items-center">
                    <FiHome className="w-4 h-4 mr-1" />
                    {property.size}
                  </span>
                  <span className="flex items-center">
                    <FiMapPin className="w-4 h-4 mr-1" />
                    {property.bedrooms}
                  </span>
                </div>
                <p className="text-gray-300 mb-4 line-clamp-2">{property.description}</p>
                <div className="mb-6">
                  <h4 className="font-medium mb-3 text-gray-200">Key Features:</h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {property.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center text-gray-300 text-sm"
                      >
                        <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleRequestDetails(property)}
                  className="w-full bg-gradient-to-r from-[#cd754a] to-[#dfb562] text-white py-3 rounded-lg font-medium transition-all duration-300"
                >
                  Request Details
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Modal */}
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
              <PropertyRegistrationForm 
                propertyId={selectedProperty?._id} 
                onClose={() => setIsModalOpen(false)} 
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Investment;
