const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['investment', 'tourism'],
    required: true
  },
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Investment',
    required: function() {
      return this.type === 'investment';
    }
  },
  packageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tourism',
    required: function() {
      return this.type === 'tourism';
    }
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  country: {
    type: String,
    required: true,
    trim: true
  },
  state: {
    type: String,
    required: true,
    trim: true
  },
  occupation: {
    type: String,
    required: true,
    trim: true
  },
  requirements: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'contacted', 'completed', 'cancelled'],
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
registrationSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration; 