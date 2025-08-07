const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  bedrooms: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  features: [{
    type: String,
    required: true
  }],
  status: {
    type: String,
    enum: ['available', 'sold', 'reserved'],
    default: 'available'
  },
  registrations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Registration'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});


investmentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Investment = mongoose.model('Investment', investmentSchema);

module.exports = Investment; 