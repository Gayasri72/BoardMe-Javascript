const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentControl');

// Route to add a new payment
router.post('/payments', paymentController.addPayment);

// Route to get all payments
router.get('/payments', paymentController.getAllPayments);

// Route to get a single payment by ID
router.get('/payments/:id', paymentController.getPaymentById);

// Route to update a single payment by ID
router.put('/payments/:id', paymentController.updatePaymentById);

// Route to delete a single payment by ID
router.delete('/payments/:id', paymentController.deletePaymentById);

router.delete('/payments', paymentController.deleteAllPayments);

module.exports = router;
