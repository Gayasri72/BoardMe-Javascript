const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking_co');

// Get all bookings
router.get('/', bookingController.getAllBookings);

// Get all virtual offices
router.get('/vir', bookingController.getAllVirtual);

// Get all airport lounges
router.get('/air', bookingController.getAllAirport);

// Get all private offices
router.get('/pvt', bookingController.getAllpvt);

// Get all coworking spaces
router.get('/co', bookingController.getAllCo);

// Create a new booking
router.post('/', bookingController.createBooking);

router.delete('/',bookingController.deleteAllBookings)

module.exports = router;
