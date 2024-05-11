import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './payConfirm.css'; // Import CSS file for styling

function PayConfirm() {
    const { payID } = useParams();
    const [paymentDetails, setPaymentDetails] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedPaymentDetails, setUpdatedPaymentDetails] = useState(null);

    useEffect(() => {
        const fetchPaymentDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3500/pay/payments/${payID}`);
                setPaymentDetails(response.data.payment);
            } catch (error) {
                console.error('Error fetching payment details:', error);
                // Handle error if needed
            }
        };

        fetchPaymentDetails();
    }, [payID]);

    const handleUpdate = () => {
        setIsEditing(true);
        // Set the updated payment details to the current payment details
        setUpdatedPaymentDetails(paymentDetails);
    };

    const handleHome= () =>{
        window.location.href = `/`
    }

    const handleCancelUpdate = () => {
        setIsEditing(false);
        // Reset the updated payment details to null
        setUpdatedPaymentDetails(null);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        // Update the updated payment details state based on the form input changes
        setUpdatedPaymentDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3500/pay/payments/${payID}`, updatedPaymentDetails);
            // After successful update, fetch the updated payment details
            const response = await axios.get(`http://localhost:3500/pay/payments/${payID}`);
            setPaymentDetails(response.data.payment);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating payment details:', error);
            // Handle error if needed
        }
    };

    return (
        <div className="payment-container">
            {paymentDetails ? (
                <div className="payment-details">
                    {isEditing ? (
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label>Booking ID:</label>
                                <span>{paymentDetails.booking}</span>
                            </div>
                            <div>
                                <label>Amount Paid:</label>
                                <span>{paymentDetails.paymentAmount}</span>
                            </div>
                            <div>
                                <label>Payment Date:</label>
                                <span>{paymentDetails.paymentDate}</span>
                            </div>
                            <div>
                                <label>Payment Time:</label>
                                <span>{paymentDetails.paymentTime}</span>
                            </div>
                            <div>
                                <label>Card Name:</label>
                                <input type="text" name="cardName" value={updatedPaymentDetails.cardName} onChange={handleFormChange} />
                            </div>
                            <div>
                                <label>Card Expiry:</label>
                                <input type="number" name="cardExpiry" value={updatedPaymentDetails.cardExpiry} onChange={handleFormChange} />
                            </div>
                            <div>
                                <label>Card Number:</label>
                                <input type="number" name="cardNumber" value={updatedPaymentDetails.cardNumber} onChange={handleFormChange} />
                            </div>
                            <div>
                                <label>Card CVV:</label>
                                <input type="number" name="cardCVV" value={updatedPaymentDetails.cardCVV} onChange={handleFormChange} />
                            </div>
                            <button type="submit">Submit</button>
                            <button type="button" onClick={handleCancelUpdate}>Cancel</button>
                        </form>
                    ) : (
                        <div>
                            <h2>Payment Details</h2>
                            <div>
                                <label>Booking ID:</label>
                                <span>{paymentDetails.booking}</span>
                            </div>
                            <div>
                                <label>Amount Paid:</label>
                                <span>{paymentDetails.paymentAmount}</span>
                            </div>
                            <div>
                                <label>Payment Date:</label>
                                <span>{paymentDetails.paymentDate}</span>
                            </div>
                            <div>
                                <label>Payment Time:</label>
                                <span>{paymentDetails.paymentTime}</span>
                            </div>
                            <div>
                                <label>Card Name:</label>
                                <span>{paymentDetails.cardName}</span>
                            </div>
                            <div>
                                <label>Card Expiry:</label>
                                <span>{paymentDetails.cardExpiry}</span>
                            </div>
                            <div>
                                <label>Card Number:</label>
                                <span>{paymentDetails.cardNumber}</span>
                            </div>
                            <div>
                                <label>Card CVV:</label>
                                <span>{paymentDetails.cardCVV}</span>
                            </div>
                            <div className="button-container">
    <button onClick={handleUpdate} className='btn-up'>Update</button>
    <button onClick={handleHome} className='btn-up'>Home</button>
</div>

                        </div>
                    )}
                </div>
            ) : (
                <p>Loading payment details...</p>
            )}
        </div>
    );
}

export default PayConfirm;
