const Registration = require('../models/registration.model');
const Investment = require('../models/investment.model');

// Create new property registration
exports.createPropertyRegistration = async (req, res) => {
  try {
    const {
      propertyId,
      name,
      email,
      country,
      state,
      phone,
      occupation,
      requirements
    } = req.body;

    // Validate required fields
    if (!propertyId || !name || !email || !country || !state || !phone || !occupation || !requirements) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Check if property exists
    const property = await Investment.findById(propertyId);
    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    // Create registration
    const registration = await Registration.create({
      propertyId,
      name,
      email,
      country,
      state,
      phone,
      occupation,
      requirements
    });

    // Add registration to property
    property.registrations.push(registration._id);
    await property.save();

    res.status(201).json({
      success: true,
      message: 'Registration created successfully',
      data: registration
    });
  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error creating registration',
      error: error.message
    });
  }
};

// Get all property registrations
exports.getAllPropertyRegistrations = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    
    const query = {};
    if (status) query.status = status;

    const registrations = await Registration.find(query)
      .populate('propertyId', 'title price')
      .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Registration.countDocuments(query);

    res.status(200).json({
      success: true,
      data: registrations,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching registrations',
      error: error.message
    });
  }
};

// Get single property registration
exports.getPropertyRegistration = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id)
      .populate('propertyId', 'title price size bedrooms');

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found'
      });
    }

    res.status(200).json({
      success: true,
      data: registration
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching registration',
      error: error.message
    });
  }
};

// Update property registration
exports.updatePropertyRegistration = async (req, res) => {
  try {
    const {
      name,
      email,
      country,
      state,
      phone,
      occupation,
      requirements,
      status
    } = req.body;

    const registration = await Registration.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        country,
        state,
        phone,
        occupation,
        requirements,
        status
      },
      { new: true, runValidators: true }
    );

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Registration updated successfully',
      data: registration
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error updating registration',
      error: error.message
    });
  }
};

// Delete property registration
exports.deletePropertyRegistration = async (req, res) => {
  try {
    const registration = await Registration.findByIdAndDelete(req.params.id);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found'
      });
    }

    // Remove registration from property
    await Investment.findByIdAndUpdate(
      registration.propertyId,
      { $pull: { registrations: registration._id } }
    );

    res.status(200).json({
      success: true,
      message: 'Registration deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting registration',
      error: error.message
    });
  }
};

// Get registrations by property
exports.getRegistrationsByProperty = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const { page = 1, limit = 10, status } = req.query;

    const query = { propertyId };
    if (status) query.status = status;

    const registrations = await Registration.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Registration.countDocuments(query);

    res.status(200).json({
      success: true,
      data: registrations,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching registrations',
      error: error.message
    });
  }
};

// Update registration status
exports.updateRegistrationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const registration = await Registration.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Status updated successfully',
      data: registration
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating status',
      error: error.message
    });
  }
}; 