const express = require('express');
const router = express.Router();
const propertyRegistrationController = require('../controllers/propertyRegistration.controller');

// Create new property registration
router.post('/', propertyRegistrationController.createPropertyRegistration);

// Get all property registrations with pagination and filtering
router.get('/', propertyRegistrationController.getAllPropertyRegistrations);

// Get single property registration
router.get('/:id', propertyRegistrationController.getPropertyRegistration);

// Update property registration
router.put('/:id', propertyRegistrationController.updatePropertyRegistration);

// Delete property registration
router.delete('/:id', propertyRegistrationController.deletePropertyRegistration);

// Get registrations by property
router.get('/property/:propertyId', propertyRegistrationController.getRegistrationsByProperty);

// Update registration status
router.patch('/:id/status', propertyRegistrationController.updateRegistrationStatus);

module.exports = router; 