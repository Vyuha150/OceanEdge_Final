import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaUser, FaPhone, FaEnvelope, FaGlobe, FaWhatsapp } from 'react-icons/fa';

const Booking = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    country: '',
    contactPreference: 'phone',
    purpose: [],
    package: '',
    checkIn: '',
    checkOut: '',
    adults: '',
    children: '',
    infants: '',
    accommodation: '',
    rooms: '',
    view: '',
    mealPreference: '',
    specialRequirements: []
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const { checked } = e.target;
      if (name === 'purpose' || name === 'specialRequirements') {
        setFormData(prev => ({
          ...prev,
          [name]: checked 
            ? [...prev[name], value]
            : prev[name].filter(item => item !== value)
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          status: 'pending',
          createdAt: new Date().toISOString()
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit booking');
      }

      const data = await response.json();
      
      // Show success message
      alert('Booking request submitted successfully! We will contact you soon.');
      
      // Reset form
      setFormData({
        fullName: '',
        phoneNumber: '',
        email: '',
        country: '',
        contactPreference: 'phone',
        purpose: [],
        package: '',
        checkIn: '',
        checkOut: '',
        adults: '',
        children: '',
        infants: '',
        accommodation: '',
        rooms: '',
        view: '',
        mealPreference: '',
        specialRequirements: []
      });
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('Failed to submit booking. Please try again.');
    }
  };

  return (
    <div className="min-h-screen pt-32 bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-serif text-center mb-12 text-[#D4B678]">Book Your Stay</h1>
        
        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Personal Information Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gray-800/50 p-8 rounded-xl"
          >
            <h2 className="text-2xl font-serif mb-6 text-[#D4B678]">Personal Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Full Name</label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-[#D4B678] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Phone Number</label>
                <div className="relative">
                  <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-[#D4B678] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Email Address</label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-[#D4B678] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Country of Residence</label>
                <div className="relative">
                  <FaGlobe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-[#D4B678] focus:outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium mb-3">Preferred Mode of Contact</label>
              <div className="flex space-x-4">
                {['Phone', 'Email', 'WhatsApp'].map((option) => (
                  <label key={option} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="contactPreference"
                      value={option.toLowerCase()}
                      checked={formData.contactPreference === option.toLowerCase()}
                      onChange={handleChange}
                      className="text-[#D4B678] focus:ring-[#D4B678]"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Trip Details Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gray-800/50 p-8 rounded-xl"
          >
            <h2 className="text-2xl font-serif mb-6 text-[#D4B678]">Trip Details</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-3">Purpose of Visit</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    'Vacation', 'Honeymoon', 'Wedding Ceremony', 'Family Reunion',
                    'Corporate Seminar', 'Business Retreat', 'Wellness Retreat',
                    'Adventure Trip', 'Photography / Filming', 'Solo Travel',
                    'Cultural Exploration'
                  ].map((purpose) => (
                    <label key={purpose} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="purpose"
                        value={purpose}
                        checked={formData.purpose.includes(purpose)}
                        onChange={handleChange}
                        className="text-[#D4B678] focus:ring-[#D4B678]"
                      />
                      <span>{purpose}</span>
                    </label>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Other (Please specify)"
                  className="mt-3 w-full px-4 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-[#D4B678] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-3">Preferred Tourism Package</label>
                <select
                  name="package"
                  value={formData.package}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-[#D4B678] focus:outline-none"
                >
                  <option value="">Select a package</option>
                  {[
                    'All-Inclusive Luxury', 'Romantic Getaway', 'Group Package',
                    'Adventure & Activities', 'Family Special', 'Eco-Tourism',
                    'Premium Corporate Package', 'Customized Package',
                    'Not Sure Yet / Need Help'
                  ].map((pkg) => (
                    <option key={pkg} value={pkg}>{pkg}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Check-In Date</label>
                  <div className="relative">
                    <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="date"
                      name="checkIn"
                      value={formData.checkIn}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-[#D4B678] focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium">Check-Out Date</label>
                  <div className="relative">
                    <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="date"
                      name="checkOut"
                      value={formData.checkOut}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-[#D4B678] focus:outline-none"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Adults</label>
                  <input
                    type="number"
                    name="adults"
                    value={formData.adults}
                    onChange={handleChange}
                    min="1"
                    className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-[#D4B678] focus:outline-none"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium">Children (Below 12)</label>
                  <input
                    type="number"
                    name="children"
                    value={formData.children}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-[#D4B678] focus:outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium">Infants (Below 2)</label>
                  <input
                    type="number"
                    name="infants"
                    value={formData.infants}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-[#D4B678] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Accommodation Preferences Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-gray-800/50 p-8 rounded-xl"
          >
            <h2 className="text-2xl font-serif mb-6 text-[#D4B678]">Accommodation Preferences</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-3">Type of Accommodation</label>
                <select
                  name="accommodation"
                  value={formData.accommodation}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-[#D4B678] focus:outline-none"
                >
                  <option value="">Select accommodation type</option>
                  {[
                    'Beachfront Villa', 'Ocean View Suite', 'Private Cottage',
                    'Luxury Tent', 'Presidential Suite'
                  ].map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Other (Specify)"
                  className="mt-3 w-full px-4 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-[#D4B678] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Number of Rooms Required</label>
                  <input
                    type="number"
                    name="rooms"
                    value={formData.rooms}
                    onChange={handleChange}
                    min="1"
                    className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-[#D4B678] focus:outline-none"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium">Preferred View</label>
                  <select
                    name="view"
                    value={formData.view}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-[#D4B678] focus:outline-none"
                  >
                    <option value="">Select preferred view</option>
                    {['Ocean View', 'Garden View', 'Poolside', 'Doesn\'t Matter'].map((view) => (
                      <option key={view} value={view}>{view}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-3">Meal Preferences</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {['Veg', 'Non-Veg', 'Vegan', 'Jain', 'Gluten-Free'].map((preference) => (
                    <label key={preference} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="mealPreference"
                        value={preference}
                        checked={formData.mealPreference === preference}
                        onChange={handleChange}
                        className="text-[#D4B678] focus:ring-[#D4B678]"
                      />
                      <span>{preference}</span>
                    </label>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Other (Specify)"
                  className="mt-3 w-full px-4 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-[#D4B678] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-3">Special Requirements</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    'Accessible Room', 'Private Pool', 'Butler Service',
                    'Romantic Setup', 'Event Arrangement'
                  ].map((requirement) => (
                    <label key={requirement} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="specialRequirements"
                        value={requirement}
                        checked={formData.specialRequirements.includes(requirement)}
                        onChange={handleChange}
                        className="text-[#D4B678] focus:ring-[#D4B678]"
                      />
                      <span>{requirement}</span>
                    </label>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Other (Specify)"
                  className="mt-3 w-full px-4 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-[#D4B678] focus:outline-none"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center"
          >
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-[#cd754a] to-[#dfb562] text-white bg-[#D4B678]  rounded-lg font-medium hover:bg-[#c4a668] transition-colors duration-300"
            >
              Submit Booking Request
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default Booking;