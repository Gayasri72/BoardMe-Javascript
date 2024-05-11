const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking_book_add');
const generateReceiptPDF = require('../pdfGenerator/generateReceiptPDF')

// Route to add a new booking
router.post('/bookings', bookingController.addBooking);

// Route to get all bookings
router.get('/bookings', bookingController.getAllBookings);

// Route to get a single booking by ID
router.get('/bookings/:id', bookingController.getBookingById);

// Route to update a booking by ID
router.put('/bookings/:id', bookingController.updateBooking);

// Route to delete a booking by ID
router.delete('/bookings/:id', bookingController.deleteBooking);

router.delete('/bookings', bookingController.deleteAllBookings);


router.get('/booking/receipt/:bookingID', generateReceiptPDF);

module.exports = router;
