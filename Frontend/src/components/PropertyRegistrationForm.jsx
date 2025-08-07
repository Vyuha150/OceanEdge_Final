import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const PropertyRegistrationForm = ({ propertyId, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    state: '',
    phone: '',
    occupation: '',
    requirements: '',
    agreeToTerms: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.country.trim()) newErrors.country = 'Country is required';
    if (!formData.state.trim()) newErrors.state = 'State/Province is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.occupation.trim()) newErrors.occupation = 'Occupation is required';
    if (!formData.requirements.trim()) newErrors.requirements = 'Property requirements are required';
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/registrations`, {
        type: 'investment',
        propertyId,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        state: formData.state,
        occupation: formData.occupation,
        requirements: formData.requirements,
        message: `Property ID: ${propertyId}\nCountry: ${formData.country}\nState: ${formData.state}\nOccupation: ${formData.occupation}\nRequirements: ${formData.requirements}`
      });

      if (response.data.success) {
        // Reset form and close modal
        setFormData({
          name: '',
          email: '',
          country: '',
          state: '',
          phone: '',
          occupation: '',
          requirements: '',
          agreeToTerms: false
        });
        onClose();
        
        // Show success message
        alert('Registration successful! We will contact you soon.');
      } else {
        throw new Error(response.data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response?.data?.errors) {
        setSubmitError(error.response.data.errors.join(', '));
      } else {
        setSubmitError(error.message || 'Registration failed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900 rounded-xl p-6 max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-white mb-6">Property Registration</h2>
      
      {submitError && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {submitError}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-300 mb-2">Full Name*</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className={`w-full px-4 py-2 rounded-lg bg-gray-800 text-white border ${
              errors.name ? 'border-red-500' : 'border-gray-700'
            } focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Email Address*</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className={`w-full px-4 py-2 rounded-lg bg-gray-800 text-white border ${
              errors.email ? 'border-red-500' : 'border-gray-700'
            } focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 mb-2">Phone Number*</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className={`w-full px-4 py-2 rounded-lg bg-gray-800 text-white border ${
                errors.phone ? 'border-red-500' : 'border-gray-700'
              } focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors`}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Occupation*</label>
            <input
              type="text"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              placeholder="Enter your occupation"
              className={`w-full px-4 py-2 rounded-lg bg-gray-800 text-white border ${
                errors.occupation ? 'border-red-500' : 'border-gray-700'
              } focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors`}
            />
            {errors.occupation && <p className="text-red-500 text-sm mt-1">{errors.occupation}</p>}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          
          <div>
            <label className="block text-gray-300 mb-2">State/Province*</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="Enter your state or province"
              className={`w-full px-4 py-2 rounded-lg bg-gray-800 text-white border ${
                errors.state ? 'border-red-500' : 'border-gray-700'
              } focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors`}
            />
            {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Country of Residence*</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Enter your country"
              className={`w-full px-4 py-2 rounded-lg bg-gray-800 text-white border ${
                errors.country ? 'border-red-500' : 'border-gray-700'
              } focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors`}
            />
            {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
          </div>
        </div>

        

        <div>
          <label className="block text-gray-300 mb-2">Property Requirements & Preferences*</label>
          <textarea
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            placeholder="Please describe your ideal property, budget range, timeline, etc."
            rows="4"
            className={`w-full px-4 py-2 rounded-lg bg-gray-800 text-white border ${
              errors.requirements ? 'border-red-500' : 'border-gray-700'
            } focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors resize-none`}
          />
          {errors.requirements && <p className="text-red-500 text-sm mt-1">{errors.requirements}</p>}
        </div>

        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            className="mt-1 h-4 w-4 text-amber-500 focus:ring-amber-500 border-gray-700 rounded"
          />
          <label className="text-gray-300 text-sm">
            I agree to the <a href="/terms" className="text-amber-500 hover:underline">Terms of Service</a> and{' '}
            <a href="/privacy" className="text-amber-500 hover:underline">Privacy Policy</a>*
          </label>
        </div>
        {errors.agreeToTerms && <p className="text-red-500 text-sm">{errors.agreeToTerms}</p>}

        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              isSubmitting
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#cd754a] to-[#dfb562] text-white hover:opacity-90'
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default PropertyRegistrationForm; 