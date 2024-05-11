const mongoose = require('mongoose');

// Define the payment schema
const paymentSchema = new mongoose.Schema({
    booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true
    },
    paymentAmount: {
        type: Number,
        required: true
    },
    paymentDate: {
        type: Date,
        default: Date.now
    },
    paymentTime: {
        type: String,
        default: new Date().toLocaleTimeString()
    },
    cardtype: {
        type: String,
        required: true
    },
    cardName: {
        type: String,
        required: true
    },
    cardCVV: {
        type: String,
        required: true
    },
    cardExpiry: {
        type: String,
        required: true
    },
    cardNumber: {
        type: String,
        required: true
    }
});


const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
