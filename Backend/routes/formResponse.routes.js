const express = require('express');
const router = express.Router();
const formResponseController = require('../controllers/formResponse.controller');

// Create a new form response
router.post('/', formResponseController.createFormResponse);

// Get all form responses with optional type and status filters
router.get('/', formResponseController.getFormResponses);

// Get a single form response by ID
router.get('/:id', formResponseController.getFormResponse);

// Update form response status
router.patch('/:id/status', formResponseController.updateFormResponseStatus);

// Delete a form response
router.delete('/:id', formResponseController.deleteFormResponse);

module.exports = router; 