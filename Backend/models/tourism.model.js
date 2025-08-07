const mongoose = require('mongoose');

const tourismSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    alt: {
        type: String,
        required: true
    },
    quote: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    features: [{
        type: String,
        required: true
    }],
    category: {
        type: String,
        enum: ['holiday', 'wedding', 'spiritual', 'senior', 'nri', 'custom', 'meeting'],
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'coming_soon'],
        default: 'active'
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


tourismSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Tourism = mongoose.model('Tourism', tourismSchema);

module.exports = Tourism; 