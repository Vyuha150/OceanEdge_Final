import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiEye, FiCheck, FiX, FiPhone, FiMail, FiMessageSquare } from 'react-icons/fi';
import axios from 'axios';

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/bookings`);
      setBookings(response.data.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch bookings');
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/bookings/${bookingId}/status`, {
        status: newStatus
      });
      
      // Update local state without refetching
      setBookings(bookings.map(booking => 
        booking._id === bookingId ? { ...booking, status: newStatus } : booking
      ));
      
    } catch (err) {
      console.error('Error updating booking status:', err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-amber-100 text-amber-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
            onClick={fetchBookings}
            className="mt-4 px-5 py-2 bg-gradient-to-r from-[#cd754a] to-[#dfb562] text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-2 md:p-0">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-[fairplay] font-bold text-white">Booking Management</h2>
      </div>

      <div className="bg-gradient-to-br from-black/60 to-gray-800/20 backdrop-blur-sm rounded-xl border border-gray-800/50 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-800/50">
            <thead className="bg-black/40">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Guest Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Package/Room
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Check-In
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Check-Out
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/30">
              {bookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-white">{booking.fullName}</div>
                        <div className="text-sm text-gray-400">{booking.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">{booking.package || booking.accommodation}</div>
                    <div className="text-xs text-gray-400">{booking.rooms ? `${booking.rooms} room(s)` : ''}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {new Date(booking.checkIn).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {new Date(booking.checkOut).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1.5 text-xs rounded-full font-medium ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                    <button
                      onClick={() => {
                        setSelectedBooking(booking);
                        setShowDetails(true);
                      }}
                      className="text-amber-500 hover:text-amber-600 transition-colors"
                    >
                      <FiEye size={20} />
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(booking._id, 'confirmed')}
                      className="text-green-500 hover:text-green-600 transition-colors"
                    >
                      <FiCheck size={20} />
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(booking._id, 'cancelled')}
                      className="text-red-500 hover:text-red-600 transition-colors"
                    >
                      <FiX size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Details Modal */}
      {showDetails && selectedBooking && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-black/90 to-gray-900/90 rounded-xl border border-gray-800/50 p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6 border-b border-gray-800/50 pb-4">
              <h3 className="text-2xl font-[fairplay] font-bold text-white">Booking Details</h3>
              <button
                onClick={() => setShowDetails(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FiX size={24} />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-400">Guest Information</h4>
                  <p className="text-white">{selectedBooking.fullName}</p>
                  <div className="flex items-center gap-2 text-gray-300">
                    <FiMail className="w-4 h-4" /> 
                    <span>{selectedBooking.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <FiPhone className="w-4 h-4" /> 
                    <span>{selectedBooking.phoneNumber}</span>
                  </div>
                  <p className="text-gray-300">{selectedBooking.country}</p>
                </div>
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-400">Stay Details</h4>
                  <div className="bg-gray-900/50 p-3 rounded-lg space-y-1">
                    <p className="text-sm text-gray-300">Check-in: <span className="text-white">{new Date(selectedBooking.checkIn).toLocaleDateString()}</span></p>
                    <p className="text-sm text-gray-300">Check-out: <span className="text-white">{new Date(selectedBooking.checkOut).toLocaleDateString()}</span></p>
                    <p className="text-sm text-gray-300">
                      Guests: <span className="text-white">{selectedBooking.adults} adults, {selectedBooking.children} children, {selectedBooking.infants} infants</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-400">Package & Preferences</h4>
                <div className="bg-gray-900/50 p-3 rounded-lg space-y-1">
                  <p className="text-sm text-gray-300">Package: <span className="text-white">{selectedBooking.package}</span></p>
                  <p className="text-sm text-gray-300">Accommodation: <span className="text-white">{selectedBooking.accommodation}</span></p>
                  <p className="text-sm text-gray-300">View Preference: <span className="text-white">{selectedBooking.view}</span></p>
                  <p className="text-sm text-gray-300">Meal Preference: <span className="text-white">{selectedBooking.mealPreference}</span></p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-400">Special Requirements</h4>
                <div className="bg-gray-900/50 p-3 rounded-lg">
                  {selectedBooking.specialRequirements.length > 0 ? (
                    <ul className="list-disc list-inside space-y-1">
                      {selectedBooking.specialRequirements.map((req, index) => (
                        <li key={index} className="text-sm text-gray-300">{req}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-400">No special requirements</p>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap justify-end gap-4 pt-4 border-t border-gray-800/50">
                <button
                  onClick={() => {
                    handleStatusUpdate(selectedBooking._id, 'confirmed');
                    setShowDetails(false);
                  }}
                  className="px-5 py-2.5 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  Confirm Booking
                </button>
                <button
                  onClick={() => {
                    handleStatusUpdate(selectedBooking._id, 'cancelled');
                    setShowDetails(false);
                  }}
                  className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default BookingManagement;