const express = require('express');
const router = express.Router();
const investmentController = require('../controllers/investment.controller');

// Get all investments
router.get('/', investmentController.getAllInvestments);

// Get single investment
router.get('/:id', investmentController.getInvestment);

// Create new investment
router.post('/', investmentController.createInvestment);

// Update investment
router.put('/:id', investmentController.updateInvestment);

// Delete investment
router.delete('/:id', investmentController.deleteInvestment);

module.exports = router; 