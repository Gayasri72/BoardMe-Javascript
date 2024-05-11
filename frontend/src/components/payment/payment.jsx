import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import './payment.css';

const Payment = () => {
    const { bookingId, paymentAmount } = useParams();
    const [amountToPay] = useState(paymentAmount);
    const [isEditing, setIsEditing] = useState(false);
    const [cardtype, setCardtype] = useState('');
    const [cardName, setCardName] = useState('');

    const [cardExpiry, setCardExpiry] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardCVV, setCardCVV] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Validation logic
            if (!validateInputs()) return;

            const response = await axios.post('http://localhost:3500/pay/payments', {
                bookingId,
                paymentAmount,
                paymentDate: new Date().toISOString().slice(0, 10),
                paymentTime: new Date().toLocaleTimeString(),
                cardtype,
                cardName,
                cardExpiry,
                cardNumber,
                cardCVV
            });

            Swal.fire({
                icon: 'success',
                title: 'Payment Submitted Successfully!',
                text: 'Your payment has been successfully submitted.',
                timer: 2000,
                timerProgressBar: true,
            });
            window.location.href = `/addPay/${response.data.payment._id}`
        } catch (error) {
            console.error('Error submitting payment:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to submit payment!',
            });
        }
    };

    const validateInputs = () => {
        
        const cardNumberRegex = /^[0-9]{16}$/;
        const expiryRegex = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;
        const cvvRegex = /^[0-9]{3,4}$/;
    
        if (!cardNumber || !cardNumberRegex.test(cardNumber)) {
            alert('Please enter a valid card number.');
            return false;
        }
    
        if (!cardExpiry || !expiryRegex.test(cardExpiry)) {
            alert('Please enter a valid expiry date in the format MM/YY.');
            return false;
        }
    
        if (!cardCVV || !cvvRegex.test(cardCVV)) {
            alert('Please enter a valid CVV.');
            return false;
        }
    
        return true;
    };
    

    return (
        <div className="payment-container">
            <div className="payment-card">
                <div className="payment-title">Payment Details</div>
                <form className="payment-form" onSubmit={handleSubmit}>
                    <div className="payment-row">
                        <div className="payment-group">
                            <label>Booking ID</label>
                            <input type="text" value={bookingId} disabled />
                        </div>
                        <div className="payment-group">
                            <label>Amount to Pay</label>
                            <input type="text" value={amountToPay} disabled />
                        </div>
                    </div>
                    <div className="payment-row">
                        <div className="payment-group">
                            <label>Payment Date</label>
                            <input type="text" value={new Date().toISOString().slice(0, 10)} disabled />
                        </div>
                        <div className="payment-group">
                            <label>Payment Time</label>
                            <input type="text" value={new Date().toLocaleTimeString()} disabled />
                        </div>
                    </div>
                    <div className="payment-row">
                    <div className="payment-group">
                            <label>Card type</label>
                            <input type="text" name="cardtype" value={cardtype} onChange={(e) => setCardtype(e.target.value)} required />
                        </div>
                    
                        <div className="payment-group">
                            <label>Card Name</label>
                            <input type="text" name="cardName" value={cardName} onChange={(e) => setCardName(e.target.value)} required />
                        </div>
                        <div className="payment-group">
                            <label>Card Expiry</label>
                            <input type="text" name="cardExpiry" value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} required />
                        </div>
                    </div>
                    <div className="payment-row">
                        <div className="payment-group">
                            <label>Card Number</label>
                            <input type="text" name="cardNumber" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required />
                        </div>
                        <div className="payment-group">
                            <label>CVV</label>
                            <input type="text" name="cvv" value={cardCVV} onChange={(e) => setCardCVV(e.target.value)} required />
                        </div>
                    </div>
                    <button type="submit" className="payment-btn">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Payment;
