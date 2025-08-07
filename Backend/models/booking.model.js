const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    contactPreference: {
        type: String,
        enum: ['phone', 'email', 'whatsapp'],
        default: 'phone'
    },
    purpose: [{
        type: String
    }],
    package: {
        type: String,
        required: true
    },
    checkIn: {
        type: Date,
        required: true
    },
    checkOut: {
        type: Date,
        required: true
    },
    adults: {
        type: Number,
        required: true,
        min: 1
    },
    children: {
        type: Number,
        default: 0
    },
    infants: {
        type: Number,
        default: 0
    },
    accommodation: {
        type: String,
        required: true
    },
    rooms: {
        type: Number,
        required: true,
        min: 1
    },
    view: {
        type: String,
        required: true
    },
    mealPreference: {
        type: String,
        required: true
    },
    specialRequirements: [{
        type: String
    }],
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt field before saving
bookingSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
