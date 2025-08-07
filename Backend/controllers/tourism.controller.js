const Tourism = require('../models/tourism.model');

// Create a new tourism package
exports.createTourismPackage = async (req, res) => {
    try {
        const tourismPackage = new Tourism(req.body);
        await tourismPackage.save();
        
        res.status(201).json({
            success: true,
            message: 'Tourism package created successfully',
            data: tourismPackage
        });
    } catch (error) {
        console.error('Error creating tourism package:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating tourism package',
            error: error.message
        });
    }
};

// Get all tourism packages
exports.getTourismPackages = async (req, res) => {
    try {
        const { category, status } = req.query;
        const query = {};
        
        if (category) {
            query.category = category;
        }
        
        if (status) {
            query.status = status;
        }
        
        const packages = await Tourism.find(query).sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            data: packages
        });
    } catch (error) {
        console.error('Error fetching tourism packages:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching tourism packages',
            error: error.message
        });
    }
};

// Get a single tourism package by ID
exports.getTourismPackageById = async (req, res) => {
    try {
        const tourismPackage = await Tourism.findById(req.params.id);
        
        if (!tourismPackage) {
            return res.status(404).json({
                success: false,
                message: 'Tourism package not found'
            });
        }
        
        res.status(200).json({
            success: true,
            data: tourismPackage
        });
    } catch (error) {
        console.error('Error fetching tourism package:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching tourism package',
            error: error.message
        });
    }
};

// Update a tourism package
exports.updateTourismPackage = async (req, res) => {
    try {
        const tourismPackage = await Tourism.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!tourismPackage) {
            return res.status(404).json({
                success: false,
                message: 'Tourism package not found'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Tourism package updated successfully',
            data: tourismPackage
        });
    } catch (error) {
        console.error('Error updating tourism package:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating tourism package',
            error: error.message
        });
    }
};

// Delete a tourism package
exports.deleteTourismPackage = async (req, res) => {
    try {
        const tourismPackage = await Tourism.findByIdAndDelete(req.params.id);
        
        if (!tourismPackage) {
            return res.status(404).json({
                success: false,
                message: 'Tourism package not found'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Tourism package deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting tourism package:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting tourism package',
            error: error.message
        });
    }
};

// Update tourism package status
exports.updateTourismPackageStatus = async (req, res) => {
    try {
        const { status } = req.body;
        
        if (!['active', 'inactive', 'coming_soon'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status value'
            });
        }
        
        const tourismPackage = await Tourism.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        
        if (!tourismPackage) {
            return res.status(404).json({
                success: false,
                message: 'Tourism package not found'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Tourism package status updated successfully',
            data: tourismPackage
        });
    } catch (error) {
        console.error('Error updating tourism package status:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating tourism package status',
            error: error.message
        });
    }
};

// Get tourism packages by category
exports.getTourismPackagesByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        
        const packages = await Tourism.find({ 
            category,
            status: 'active'
        }).sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            data: packages
        });
    } catch (error) {
        console.error('Error fetching tourism packages by category:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching tourism packages by category',
            error: error.message
        });
    }
}; 