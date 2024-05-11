import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './adminPayment.css'; // Import CSS file for styling

function AdminPayment() {
  const [payments, setPayments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3500/pay/payments');
        setPayments(response.data.payments);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredPayments = payments.filter((payment) =>
    payment.cardNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="admin-payment-container">
      <h2>Payments</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Card Number"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <table className="payment-table">
        <thead>
          <tr>
            <th>Card Number</th>
            <th>Card Name</th>
            <th>Booking</th>
            <th>Payment Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredPayments.map((payment) => (
            <tr key={payment._id}>
              <td>{payment.cardNumber}</td>
              <td>{payment.cardName}</td>
              <td>{payment.booking}</td>
              <td>${payment.paymentAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPayment;
