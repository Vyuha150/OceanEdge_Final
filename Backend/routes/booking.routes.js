const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');

// Create a new booking
router.post('/', bookingController.createBooking);

// Get all bookings
router.get('/', bookingController.getBookings);

// Get a single booking by ID
router.get('/:id', bookingController.getBookingById);

// Update a booking
router.put('/:id', bookingController.updateBooking);

// Delete a booking
router.delete('/:id', bookingController.deleteBooking);

// Update booking status
router.patch('/:id/status', bookingController.updateBookingStatus);

module.exports = router; 