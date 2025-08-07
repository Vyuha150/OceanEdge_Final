import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const InvestmentManagement = () => {
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentInvestment, setCurrentInvestment] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    size: '',
    bedrooms: '',
    image: '',
    description: '',
    features: [],
    status: 'available'
  });

  useEffect(() => {
    fetchInvestments();
  }, []);

  const fetchInvestments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/investments');
      setInvestments(response.data.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch investments');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentInvestment) {
        await axios.put(`http://localhost:5000/api/investments/${currentInvestment._id}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/investments', formData);
      }
      setIsModalOpen(false);
      fetchInvestments();
      resetForm();
    } catch (err) {
      setError('Failed to save investment');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this investment?')) {
      try {
        await axios.delete(`http://localhost:5000/api/investments/${id}`);
        fetchInvestments();
      } catch (err) {
        setError('Failed to delete investment');
      }
    }
  };

  const handleEdit = (investment) => {
    setCurrentInvestment(investment);
    setFormData({
      title: investment.title,
      price: investment.price,
      size: investment.size,
      bedrooms: investment.bedrooms,
      image: investment.image,
      description: investment.description,
      features: investment.features,
      status: investment.status
    });
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setCurrentInvestment(null);
    setFormData({
      title: '',
      price: '',
      size: '',
      bedrooms: '',
      image: '',
      description: '',
      features: [],
      status: 'available'
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Investment Properties</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsModalOpen(true)}
          className="bg-[#dfb562] text-white px-4 py-2 rounded-lg"
        >
          Add New Investment
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {investments.map((investment) => (
          <motion.div
            key={investment._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <img src={investment.image} alt={investment.title} className="w-full h-48 object-cover rounded-lg mb-4" />
            <h3 className="text-xl font-bold text-gray-800">{investment.title}</h3>
            <p className="text-gray-600 mt-2">{investment.description}</p>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Price:</span>
                <span className="font-medium">{investment.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Size:</span>
                <span className="font-medium">{investment.size}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Bedrooms:</span>
                <span className="font-medium">{investment.bedrooms}</span>
              </div>
              <div className="mt-2">
                <span className="text-gray-500">Features:</span>
                <ul className="list-disc list-inside mt-1">
                  {investment.features.map((feature, index) => (
                    <li key={index} className="text-sm text-gray-600">{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleEdit(investment)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Edit
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDelete(investment._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg p-6 w-full max-w-2xl"
          >
            <h2 className="text-2xl font-bold mb-4">
              {currentInvestment ? 'Edit Investment' : 'Add New Investment'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Size</label>
                <input
                  type="text"
                  value={formData.size}
                  onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Bedrooms</label>
                <input
                  type="text"
                  value={formData.bedrooms}
                  onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Features (comma separated)</label>
                <input
                  type="text"
                  value={formData.features.join(', ')}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value.split(',').map(f => f.trim()) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  required
                > 
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="coming_soon">Coming Soon</option>
                </select>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    resetForm();
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="bg-[#dfb562] text-white px-4 py-2 rounded"
                >
                  {currentInvestment ? 'Update' : 'Create'}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default InvestmentManagement;