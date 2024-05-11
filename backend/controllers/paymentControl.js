const asyncHandler = require('express-async-handler');
const Payment = require('../models/pay');

// Add a new payment
const addPayment = asyncHandler(async (req, res) => {
    const { bookingId, paymentAmount, cardName, cardCVV, cardExpiry, cardNumber,cardtype } = req.body;
    
    try {
        const payment = new Payment({
            booking: bookingId,
            paymentAmount,
            cardName,
            cardCVV,
            cardExpiry,
            cardNumber,
            cardtype
        });

        await payment.save();

        res.status(201).json({ message: 'Payment added successfully', payment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all payments
const getAllPayments = asyncHandler(async (req, res) => {
    try {
        const payments = await Payment.find();
        res.status(200).json({ payments });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single payment by ID
const getPaymentById = asyncHandler(async (req, res) => {
    const { id } = req.params;
console.log(id)
    try {
        const payment = await Payment.findById(id).exec();
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        console.log('200')
        res.status(200).json({ payment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a single payment by ID
const updatePaymentById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { paymentAmount,cardtype, cardName, cardCVV, cardExpiry, cardNumber } = req.body;
console.log(paymentAmount,cardtype, cardName, cardCVV, cardExpiry, cardNumber)
    try {
        const payment = await Payment.findByIdAndUpdate(id, { paymentAmount, cardName, cardCVV, cardExpiry, cardNumber }, { new: true });
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        console.log('update 200')
        res.status(200).json({ message: 'Payment updated successfully', payment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a single payment by ID
const deletePaymentById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const payment = await Payment.findByIdAndDelete(id);
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.status(200).json({ message: 'Payment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const deleteAllPayments = asyncHandler(async (req, res) => {
    try {
        await Payment.deleteMany({});
        res.status(200).json({ message: 'All payments deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = {
    addPayment,
    getAllPayments,
    getPaymentById,
    updatePaymentById,
    deletePaymentById,
    deleteAllPayments
};
