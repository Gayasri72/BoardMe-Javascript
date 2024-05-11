const PDFDocument = require('pdfkit');
const fs = require('fs');
const asyncHandler = require('express-async-handler');
const Booking = require('../models/booking_book_add');

const generateReceiptPDF = (bookingData, logoPath) => {
    const doc = new PDFDocument();

    if (fs.existsSync(logoPath)) {
        const logo = fs.readFileSync(logoPath);
        doc.image(logo, { width: 50, height: 50, align: 'left', valign: 'top' });
        doc.moveDown(1);
    }

    doc.font('Helvetica');

    doc.fontSize(24).fillColor('#333').text('Booking Receipt', { align: 'center' });
    doc.moveDown(1);

    doc.lineCap('round').moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown(1);

    const { bookingID, username, peopleCount, months, email, phoneNumber } = bookingData;


    doc.fontSize(14);
    doc.fillColor('#333').text(`Booking ID: ${bookingID}`, { align: 'left' });
    doc.moveDown(1);
    doc.fillColor('#333').text(`Username: ${username}`, { align: 'left' });
    doc.moveDown(1);
    doc.fillColor('#333').text(`People Count: ${peopleCount}`, { align: 'left' });
    doc.moveDown(1);
    doc.fillColor('#333').text(`Months: ${months}`, { align: 'left' });
    doc.moveDown(1);
    doc.fillColor('#333').text(`Email: ${email}`, { align: 'left' });
    doc.moveDown(1);
    doc.fillColor('#333').text(`Phone Number: ${phoneNumber}`, { align: 'left' });

    doc.moveDown(2);
    doc.fillColor('#555').text('Thank you for your booking!', { align: 'center' });
    doc.moveDown(1);
    doc.fillColor('#555').text('Please keep this receipt for your records.', { align: 'center' });
    
    return doc;
};


const getBookingReceipt = asyncHandler(async (req, res) => {
    const { bookingID } = req.params;
    console.log(bookingID)
    if (!bookingID) {
        return res.status(400).json({ message: 'Booking ID Required' });
    }

    try {
        const booking = await Booking.findOne({ _id: bookingID }).populate('coworkingSpace').exec();
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        const receiptData = {
            bookingID: booking._id,
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

module.exports = getBookingReceipt;
