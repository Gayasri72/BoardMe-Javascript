import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/navBar/navBar';
import Home from './components/home/home';
import AddBooking from './components/addBooking/addBooking';
import Payment from './components/payment/payment'; // Rename import to PascalCase
import PayConfirm from './components/payment/payConfirm';
import Login from './components/login/login';
import AdminPayment from './components/adminPayment/adminPayment'; // Rename import to PascalCase
import Booking from './components/booking/booking';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <div style={{ display: 'flex' }}>
        <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/addBooking/:coworkingSpaceId' element={<AddBooking />} />
            <Route path='/addPay/:bookingId/:paymentAmount' element={<Payment />} />
            <Route path='/addPay/:payID' element={<PayConfirm />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/payments" element={<AdminPayment/>} /> 
            <Route path="/bookings" element={<Booking/>} /> 
          
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
