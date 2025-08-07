const FormResponse = require('../models/formResponse.model');
const Tourism = require('../models/tourism.model');
const Investment = require('../models/investment.model');

// Create a new form response
exports.createFormResponse = async (req, res) => {
  try {
    const { type } = req.body;

    // Validate type-specific fields
    if (type === 'tourism') {
      const tourism = await Tourism.findById(req.body.packageId);
      if (!tourism) {
        return res.status(404).json({
          success: false,
          message: 'Tourism package not found'
        });
      }
      req.body.packageTitle = tourism.title;
    } else if (type === 'investment') {
      const investment = await Investment.findById(req.body.propertyId);
      if (!investment) {
        return res.status(404).json({
          success: false,
          message: 'Property not found'
        });
      }
      req.body.propertyTitle = investment.title;
    }

    const formResponse = new FormResponse(req.body);
    await formResponse.save();

    res.status(201).json({
      success: true,
      message: 'Form response created successfully',
      data: formResponse
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating form response',
      error: error.message
    });
  }
};

// Get all form responses
exports.getFormResponses = async (req, res) => {
  try {
    const { type, status } = req.query;
    const query = {};

    if (type) query.type = type;
    if (status) query.status = status;

    const formResponses = await FormResponse.find(query)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: 'Form responses retrieved successfully',
      data: formResponses
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error retrieving form responses',
      error: error.message
    });
  }
};

// Get a single form response
exports.getFormResponse = async (req, res) => {
  try {
    const formResponse = await FormResponse.findById(req.params.id);
    if (!formResponse) {
      return res.status(404).json({
        success: false,
        message: 'Form response not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Form response retrieved successfully',
      data: formResponse
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error retrieving form response',
      error: error.message
    });
  }
};

// Update form response status
exports.updateFormResponseStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const formResponse = await FormResponse.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!formResponse) {
      return res.status(404).json({
        success: false,
        message: 'Form response not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Form response status updated successfully',
      data: formResponse
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating form response status',
      error: error.message
    });
  }
};

// Delete a form response
exports.deleteFormResponse = async (req, res) => {
  try {
    const formResponse = await FormResponse.findByIdAndDelete(req.params.id);
    if (!formResponse) {
      return res.status(404).json({
        success: false,
        message: 'Form response not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Form response deleted successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error deleting form response',
      error: error.message
    });
  }
}; 