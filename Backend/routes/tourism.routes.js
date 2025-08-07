const express = require('express');
const router = express.Router();
const tourismController = require('../controllers/tourism.controller');

// Create a new tourism package
router.post('/', tourismController.createTourismPackage);

// Get all tourism packages
router.get('/', tourismController.getTourismPackages);

// Get a single tourism package by ID
router.get('/:id', tourismController.getTourismPackageById);

// Update a tourism package
router.put('/:id', tourismController.updateTourismPackage);

// Delete a tourism package
router.delete('/:id', tourismController.deleteTourismPackage);

// Update tourism package status
router.patch('/:id/status', tourismController.updateTourismPackageStatus);

// Get tourism packages by category
router.get('/category/:category', tourismController.getTourismPackagesByCategory);

module.exports = router; 