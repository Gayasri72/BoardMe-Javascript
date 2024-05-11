import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './booking.css'; // Import CSS file for styling

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:3500/bookingEach/bookings');
        setBookings(response.data.bookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  // Filter bookings based on search term
  const filteredBookings = bookings.filter((booking) =>
    booking.coworkingSpace.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownloadReceipt = async (bookingID) => {
    try {
        const response = await axios.get(`http://localhost:3500/bookingEach/booking/receipt/${bookingID}`, {
        responseType: 'blob', // Set responseType to blob to receive binary data
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `receipt_${bookingID}.pdf`);

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading receipt:', error);
    }
  };

  return (
    <div className="booking-container">
      <h2 className="booking-heading">Bookings</h2>
      {/* Search input */}
      <input
        type="text"
        placeholder="Search by coworking space name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <table>
        <thead>
          <tr>
            <th>Coworking Space Name</th>
            <th>People Count</th>
            <th>Months</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Action</th> {/* Add action column for download button */}
          </tr>
        </thead>
        <tbody>
          {filteredBookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.coworkingSpace.name}</td>
              <td>{booking.peopleCount}</td>
              <td>{booking.months}</td>
              <td>{booking.email}</td>
              <td>{booking.phoneNumber}</td>
              <td>
                <button className="download-button" onClick={() => handleDownloadReceipt(booking._id)}>Download Receipt</button>
              </td> {/* Add download button */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Booking;
