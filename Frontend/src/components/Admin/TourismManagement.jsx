import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FiEdit2, FiTrash2, FiPlus, FiEye } from 'react-icons/fi';

const TourismManagement = () => {
  const [packages, setPackages] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    alt: '',
    quote: '',
    price: '',
    description: '',
    duration: '',
    features: ['', '', '', ''],
    category: 'holiday',
    status: 'active'
  });

  useEffect(() => {
    fetchPackages();
    fetchRegistrations();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/tourism`);
      setPackages(response.data.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch tourism packages');
      setLoading(false);
    }
  };

  const fetchRegistrations = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/registrations?type=tourism`);
      setRegistrations(response.data.data);
    } catch (err) {
      console.error('Error fetching registrations:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'features') {
      const featureArray = value.split(',').map(item => item.trim()).filter(item => item !== '');
      while (featureArray.length < 4) {
        featureArray.push('');
      }
      setFormData({
        ...formData,
        features: featureArray
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.features.length < 4 || formData.features.some(feature => !feature)) {
      setError('Please provide at least 4 features');
      return;
    }

    try {
      if (selectedPackage) {
        await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/tourism/${selectedPackage._id}`, {
          ...formData,
          features: formData.features.slice(0, 4)
        });
      } else {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/tourism`, {
          ...formData,
          features: formData.features.slice(0, 4)
        });
      }
      fetchPackages();
      setShowForm(false);
      setFormData({
        title: '',
        image: '',
        alt: '',
        quote: '',
        price: '',
        description: '',
        duration: '',
        features: ['', '', '', ''],
        category: 'holiday',
        status: 'active'
      });
      setSelectedPackage(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save package');
    }
  };

  const handleEdit = (pkg) => {
    setSelectedPackage(pkg);
    setFormData({
      title: pkg.title,
      image: pkg.image,
      alt: pkg.alt,
      quote: pkg.quote,
      price: pkg.price,
      description: pkg.description,
      duration: pkg.duration,
      features: pkg.features,
      category: pkg.category,
      status: pkg.status
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/tourism/${id}`);
        fetchPackages();
      } catch (err) {
        setError('Failed to delete package');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        {error}
        <button 
          onClick={fetchPackages}
          className="ml-4 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Tourism Package Management</h2>
        <button
          onClick={() => {
            setShowForm(true);
            setSelectedPackage(null);
            setFormData({
              title: '',
              image: '',
              alt: '',
              quote: '',
              price: '',
              description: '',
              duration: '',
              features: ['', '', '', ''],
              category: 'holiday',
              status: 'active'
            });
          }}
          className="flex items-center px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
        >
          <FiPlus className="mr-2" />
          Add New Package
        </button>
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <h3 className="text-xl font-semibold mb-4">
            {selectedPackage ? 'Edit Package' : 'Add New Package'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Alt Text</label>
                <input
                  type="text"
                  name="alt"
                  value={formData.alt}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Quote</label>
                <input
                  type="text"
                  name="quote"
                  value={formData.quote}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Duration</label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                >
                  <option value="holiday">Holiday</option>
                  <option value="wedding">Wedding</option>
                  <option value="honeymoon">Honeymoon</option>
                  <option value="adventure">Adventure</option>
                  <option value="wellness">Wellness</option>
                  <option value="cultural">Cultural</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                >
                  <option value="active">Active</option>
                  <option value="coming_soon">Coming Soon</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  required
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Features (Enter exactly 4 features, separated by commas)
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <textarea
                  name="features"
                  value={formData.features.join(', ')}
                  onChange={handleInputChange}
                  rows="4"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  required
                  placeholder="Enter exactly 4 features, separated by commas"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Example: Beachfront ceremony setups, Customized wedding planning, Luxury accommodation for guests, Professional photography services
                </p>
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
              >
                {selectedPackage ? 'Update Package' : 'Add Package'}
              </button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <motion.div
            key={pkg._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="relative h-48">
              <img
                src={pkg.image}
                alt={pkg.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-lg">
                {pkg.price}
              </div>
              <div className="absolute bottom-4 left-4 px-2 py-1 rounded-lg bg-gray-900/80 text-white text-sm">
                {pkg.category}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{pkg.title}</h3>
              <p className="text-gray-600 mb-4">{pkg.quote}</p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">{pkg.duration}</span>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  pkg.status === 'active' ? 'bg-green-100 text-green-800' :
                  pkg.status === 'coming_soon' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {pkg.status}
                </span>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => handleEdit(pkg)}
                  className="text-amber-500 hover:text-amber-600"
                >
                  <FiEdit2 size={20} />
                </button>
                <button
                  onClick={() => handleDelete(pkg._id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <FiTrash2 size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Package Registrations</h3>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Package
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {registrations.map((registration) => (
                <tr key={registration._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {packages.find(pkg => pkg._id === registration.packageId)?.title || 'Unknown Package'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {registration.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {registration.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      registration.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      registration.status === 'contacted' ? 'bg-blue-100 text-blue-800' :
                      registration.status === 'completed' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {registration.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => {
                        // Handle view registration details
                      }}
                      className="text-amber-500 hover:text-amber-600"
                    >
                      <FiEye size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TourismManagement; 