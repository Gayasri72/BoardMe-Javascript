const asyncHandler = require('express-async-handler');
const Booking = require('../models/booking_book_add');

const addBooking = asyncHandler(async (req, res) => {
    const { coworkingSpaceId, peopleCount, months, email, phoneNumber} = req.body;

    try {
        const booking = new Booking({
            coworkingSpace: coworkingSpaceId,
            peopleCount,
            months,
            email,
            phoneNumber
        });

        await booking.save();

        res.status(201).json({ message: 'Booking added successfully', booking });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const getAllBookings = asyncHandler(async (req, res) => {
    try {
        const bookings = await Booking.find().populate('coworkingSpace');
        res.status(200).json({ bookings });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const getBookingById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const booking = await Booking.findById(id).populate('coworkingSpace');
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json({ booking });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const updateBooking = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { peopleCount, months, email, phoneNumber } = req.body;

    try {
        const booking = await Booking.findByIdAndUpdate(id, { peopleCount, months, email, phoneNumber }, { new: true });
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json({ message: 'Booking updated successfully', booking });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const deleteBooking = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const booking = await Booking.findByIdAndDelete(id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const deleteAllBookings = asyncHandler(async (req, res) => {
    try {
        await Booking.deleteMany({});
        res.status(200).json({ message: 'All bookings deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


const getBookingReceipt = asyncHandler(async (req, res) => {
    const { bookingID } = req.params;
    if (!bookingID) {
        return res.status(400).json({ message: 'Booking ID Required' });
    }

    try {
        const booking = await Booking.findOne({ bookingID }).exec();
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        const receiptData = {
            bookingID: booking.bookingID,
            username: booking.coworkingSpace.name,
            peopleCount: booking.peopleCount,
            months: booking.months,
            email: booking.email,
            phoneNumber: booking.phoneNumber,
        };

        const logoPath = './assets/LOGO.png';
        const doc = generateReceiptPDF(receiptData, logoPath); 
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="receipt.pdf"');
        doc.pipe(res);
        doc.end();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = {
    addBooking,
    getAllBookings,
    getBookingById,
    updateBooking,
    deleteBooking,
    deleteAllBookings
};
