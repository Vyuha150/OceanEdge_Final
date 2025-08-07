import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FiUser, FiMail, FiPhone, FiCalendar, FiPackage, FiHome, FiMessageSquare } from 'react-icons/fi';

const FormResponses = () => {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    fetchResponses();
  }, []);

  const fetchResponses = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/registrations`);
      setResponses(response.data.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch responses');
      setLoading(false);
    }
  };

  const filterResponses = (type) => {
    if (type === 'all') return responses;
    return responses.filter(response => response.type === type);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      case 'contacted':
        return 'bg-amber-100 text-amber-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'tourism':
        return <FiPackage className="w-5 h-5" />;
      case 'investment':
        return <FiHome className="w-5 h-5" />;
      default:
        return <FiMessageSquare className="w-5 h-5" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <div className="inline-block bg-red-900/20 border border-red-500/50 text-red-400 px-6 py-4 rounded-xl">
          <p className="text-base">{error}</p>
          <button 
            onClick={fetchResponses}
            className="mt-4 px-5 py-2 bg-gradient-to-r from-[#cd754a] to-[#dfb562] text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-2 md:p-6 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h2 className="text-3xl font-[fairplay] font-bold text-white tracking-tight">Form Responses</h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-6 py-2.5 rounded-lg transition-all duration-200 font-medium ${
              activeTab === 'all'
                ? 'bg-gradient-to-r from-[#cd754a] to-[#dfb562] text-white shadow-lg shadow-[#dfb562]/20'
                : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-gray-700'
            }`}
          >
            All Responses
          </button>
          <button
            onClick={() => setActiveTab('tourism')}
            className={`px-6 py-2.5 rounded-lg transition-all duration-200 font-medium ${
              activeTab === 'tourism'
                ? 'bg-gradient-to-r from-[#cd754a] to-[#dfb562] text-white shadow-lg shadow-[#dfb562]/20'
                : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-gray-700'
            }`}
          >
            Tourism
          </button>
          <button
            onClick={() => setActiveTab('investment')}
            className={`px-6 py-2.5 rounded-lg transition-all duration-200 font-medium ${
              activeTab === 'investment'
                ? 'bg-gradient-to-r from-[#cd754a] to-[#dfb562] text-white shadow-lg shadow-[#dfb562]/20'
                : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-gray-700'
            }`}
          >
            Investment
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filterResponses(activeTab).map((response) => (
          <motion.div
            key={response._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-br from-black/60 to-gray-800/20 backdrop-blur-sm rounded-xl border border-gray-800/50 overflow-hidden hover:border-[#D4B678]/50 transition-all duration-300 shadow-lg"
          >
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-[#cd754a]/20 to-[#dfb562]/20 rounded-lg">
                    {getIcon(response.type)}
                  </div>
                  <span className="text-lg font-semibold capitalize text-white">{response.type}</span>
                </div>
                <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${getStatusColor(response.status || 'new')}`}>
                  {response.status || 'new'}
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-300">
                  <FiUser className="text-gray-400 w-5 h-5" />
                  <span className="font-medium">{response.name}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <FiMail className="text-gray-400 w-5 h-5" />
                  <span>{response.email}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <FiPhone className="text-gray-400 w-5 h-5" />
                  <span>{response.phone}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <FiCalendar className="text-gray-400 w-5 h-5" />
                  <span>{new Date(response.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              {response.type === 'investment' && (
                <div className="pt-4 border-t border-gray-800/50">
                  <div className="space-y-2 text-gray-300">
                    <p>
                      <span className="font-medium">Property:</span> {response.propertyId?.title || 'N/A'}
                    </p>
                    <p>
                      <span className="font-medium">Price:</span> {response.propertyId?.price || 'N/A'}
                    </p>
                    <p>
                      <span className="font-medium">Requirements:</span> {response.requirements}
                    </p>
                  </div>
                </div>
              )}

              {response.type === 'tourism' && (
                <div className="pt-4 border-t border-gray-800/50">
                  <div className="space-y-2 text-gray-300">
                    <p>
                      <span className="font-medium">Package:</span> {response.packageId?.title || 'N/A'}
                    </p>
                    <p>
                      <span className="font-medium">Price:</span> {response.packageId?.price || 'N/A'}
                    </p>
                    <p>
                      <span className="font-medium">Requirements:</span> {response.requirements}
                    </p>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-gray-800/50">
                <div className="space-y-2 text-gray-300">
                  <p>
                    <span className="font-medium">Location:</span> {response.country}, {response.state}
                  </p>
                  <p>
                    <span className="font-medium">Occupation:</span> {response.occupation}
                  </p>
                  {response.message && (
                    <div className="mt-3">
                      <p className="font-medium text-white mb-1">Message:</p>
                      <p className="text-sm bg-gray-900/50 p-3 rounded-md">{response.message}</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-3">
                <button className="px-4 py-2 bg-blue-900/20 text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-900/30 transition-colors">
                  Contact
                </button>
                <button className="px-4 py-2 bg-green-900/20 text-green-400 border border-green-500/30 rounded-lg hover:bg-green-900/30 transition-colors">
                  Approve
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {filterResponses(activeTab).length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-400 text-lg">No responses found</p>
        </div>
      )}
    </div>
  );
};

export default FormResponses;