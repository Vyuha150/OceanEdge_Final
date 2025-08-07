const Registration = require('../models/registration.model');
const Investment = require('../models/investment.model');

// Create a new registration
exports.createRegistration = async (req, res) => {
    try {
        const { type, propertyId, packageId, name, email, phone, country, state, occupation, requirements, message } = req.body;

        // Validate required fields based on type
        if (type === 'investment' && !propertyId) {
            return res.status(400).json({
                success: false,
                message: 'Property ID is required for investment registration'
            });
        }

        if (type === 'tourism' && !packageId) {
            return res.status(400).json({
                success: false,
                message: 'Package ID is required for tourism registration'
            });
        }

        const registration = new Registration({
            type,
            propertyId,
            packageId,
            name,
            email,
            phone,
            country,
            state,
            occupation,
            requirements,
            message
        });

        await registration.save();

        res.status(201).json({
            success: true,
            message: 'Registration created successfully',
            data: registration
        });
    } catch (error) {
        console.error('Error creating registration:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating registration',
            error: error.message
        });
    }
};

// Get all registrations
exports.getRegistrations = async (req, res) => {
    try {
        const { type, status } = req.query;
        const query = {};

        if (type) {
            query.type = type;
        }

        if (status) {
            query.status = status;
        }

        const registrations = await Registration.find(query)
            .populate('propertyId')
            .populate('packageId')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: registrations
        });
    } catch (error) {
        console.error('Error fetching registrations:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching registrations',
            error: error.message
        });
    }
};

// Get a single registration by ID
exports.getRegistrationById = async (req, res) => {
    try {
        const registration = await Registration.findById(req.params.id)
            .populate('propertyId')
            .populate('packageId');

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
        console.error('Error fetching registration:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching registration',
            error: error.message
        });
    }
};

// Update registration status
exports.updateRegistrationStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!['pending', 'contacted', 'completed', 'cancelled'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status value'
            });
        }

        const registration = await Registration.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!registration) {
            return res.status(404).json({
                success: false,
                message: 'Registration not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Registration status updated successfully',
            data: registration
        });
    } catch (error) {
        console.error('Error updating registration status:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating registration status',
            error: error.message
        });
    }
};

// Delete a registration
exports.deleteRegistration = async (req, res) => {
    try {
        const registration = await Registration.findByIdAndDelete(req.params.id);

        if (!registration) {
            return res.status(404).json({
                success: false,
                message: 'Registration not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Registration deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting registration:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting registration',
            error: error.message
        });
    }
};

// Get all registrations for a property
exports.getPropertyRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({ propertyId: req.params.propertyId })
      .sort({ createdAt: -1 })
      .select('name email country state phone occupation requirements status createdAt');

    res.status(200).json({
      success: true,
      count: registrations.length,
      data: registrations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching registrations',
      error: error.message
    });
  }
};

// Get all registrations (admin)
exports.getAllRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find()
      .populate('propertyId', 'title price')
      .sort({ createdAt: -1 })
      .select('name email country state phone occupation requirements status createdAt');

    res.status(200).json({
      success: true,
      count: registrations.length,
      data: registrations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching registrations',
      error: error.message
    });
  }
}; 