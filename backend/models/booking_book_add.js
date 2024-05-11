const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    coworkingSpace: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CoworkingSpace',
        required: true
    },
    peopleCount: {
        type: String,
        required: true
    },
    months: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: { 
        type: Number,
        required: true
    
    }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
