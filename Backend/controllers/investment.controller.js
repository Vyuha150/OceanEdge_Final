const Investment = require('../models/investment.model');

// Get all investments
exports.getAllInvestments = async (req, res) => {
  try {
    const investments = await Investment.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: investments.length,
      data: investments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching investments',
      error: error.message
    });
  }
};

// Get single investment
exports.getInvestment = async (req, res) => {
  try {
    const investment = await Investment.findById(req.params.id);
    
    if (!investment) {
      return res.status(404).json({
        success: false,
        message: 'Investment not found'
      });
    }

    res.status(200).json({
      success: true,
      data: investment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching investment',
      error: error.message
    });
  }
};

// Create new investment
exports.createInvestment = async (req, res) => {
  try {
    // Validate required fields
    const requiredFields = ['title', 'price', 'size', 'bedrooms', 'image', 'description', 'features'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
        missingFields
      });
    }

    // Validate status if provided
    if (req.body.status && !['available', 'sold', 'reserved'].includes(req.body.status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value. Must be one of: available, sold, reserved'
      });
    }

    const investment = await Investment.create({
      ...req.body,
      status: req.body.status || 'available'
    });
    
    res.status(201).json({
      success: true,
      data: investment
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating investment',
      error: error.message
    });
  }
};

exports.updateInvestment = async (req, res) => {
  try {
    const investment = await Investment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!investment) {
      return res.status(404).json({
        success: false,
        message: 'Investment not found'
      });
    }

    res.status(200).json({
      success: true,
      data: investment
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating investment',
      error: error.message
    });
  }
};

// Delete investment
exports.deleteInvestment = async (req, res) => {
  try {
    const investment = await Investment.findByIdAndDelete(req.params.id);

    if (!investment) {
      return res.status(404).json({
        success: false,
        message: 'Investment not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting investment',
      error: error.message
    });
  }
}; 