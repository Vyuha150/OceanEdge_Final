const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registration.controller');

// Create a new registration
router.post('/', registrationController.createRegistration);

// Get all registrations (with optional type and status filters)
router.get('/', registrationController.getRegistrations);

// Get a single registration by ID
router.get('/:id', registrationController.getRegistrationById);

// Update registration status
router.patch('/:id/status', registrationController.updateRegistrationStatus);

// Delete a registration
router.delete('/:id', registrationController.deleteRegistration);

module.exports = router; 