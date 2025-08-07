const mongoose = require('mongoose');

const formResponseSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['tourism', 'investment'],
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['new', 'in_progress', 'completed'],
    default: 'new',
  },
  // Tourism specific fields
  packageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tourism',
    required: function() {
      return this.type === 'tourism';
    },
  },
  packageTitle: {
    type: String,
    required: function() {
      return this.type === 'tourism';
    },
  },
  travelDate: {
    type: Date,
    required: function() {
      return this.type === 'tourism';
    },
  },
  // Investment specific fields
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Investment',
    required: function() {
      return this.type === 'investment';
    },
  },
  propertyTitle: {
    type: String,
    required: function() {
      return this.type === 'investment';
    },
  },
  investmentAmount: {
    type: Number,
    required: function() {
      return this.type === 'investment';
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('FormResponse', formResponseSchema); 