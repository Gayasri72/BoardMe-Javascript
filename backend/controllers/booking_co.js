
const asyncHandler = require('express-async-handler');
const CoworkingSpace = require('../models/booking_book');


const calculateTotalAmount = (type) => {
    switch(type) {
        case 'Private Office':
        case 'Coworking Space':
            return 300;
        case 'Virtual Office':
            return 200;
        case 'Airport Lounge':
            return 500;
        default:
            return 0; // Return 0 for unknown types or handle error accordingly
    }
};

// Create booking with total amount calculation
const createBooking = asyncHandler(async (req, res) => {
    try {
        const { name, details, type, imageurls } = req.body;
        const totalAmount = calculateTotalAmount(type);
        const coworkingSpace = new CoworkingSpace({ name, details, type, imageurls, totalAmount });
        await coworkingSpace.save();
        res.status(201).json({ message: 'Coworking space added successfully', coworkingSpace });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to get all coworking spaces
const getAllBookings = asyncHandler( async (req, res) => {
    try {
        const coworkingSpaces = await CoworkingSpace.find();
        res.json(coworkingSpaces);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

const getAllVirtual = asyncHandler( async (req, res) => {
    try {
        const virtualOffices = await CoworkingSpace.find({ type: 'Virtual Office' });
        res.json(virtualOffices);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to get all airport lounges
const getAllAirport = asyncHandler( async (req, res) => {
    try {
        const airportLounges = await CoworkingSpace.find({ type: 'Airport Lounge' });
        res.json(airportLounges);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to get all private offices
const getAllpvt = asyncHandler( async (req, res) => {
    try {
        const privateOffices = await CoworkingSpace.find({ type: 'Private Office' });
        res.json(privateOffices);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

const getAllCo = asyncHandler( async (req, res) => {
    try {
        const coworkingSpaces = await CoworkingSpace.find({ type: 'Coworking Space' });
        res.json(coworkingSpaces);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

const deleteAllBookings = asyncHandler(async (req, res) => {
    try {
        await CoworkingSpace.deleteMany({});
        res.status(200).json({ message: 'All coworking spaces deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = {
    getAllBookings,
    createBooking,
    getAllAirport,
    getAllVirtual,
    getAllpvt,
    getAllCo,
    deleteAllBookings
};