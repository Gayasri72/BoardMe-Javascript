import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import './addBooking.css'; 

const AddBooking = () => {
    const { coworkingSpaceId } = useParams();
    const [step, setStep] = useState(1);
    const [peopleCount, setPeopleCount] = useState('');
    const [duration, setDuration] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [bookingDetails, setBookingDetails] = useState(null); 
    const [updatedPeopleCount, setUpdatedPeopleCount] = useState('');
    const [updatedDuration, setUpdatedDuration] = useState('');
    const [updatedEmail, setUpdatedEmail] = useState('');
    const [updatedPhone, setUpdatedPhone] = useState('');
    const [isEditing, setIsEditing] = useState(false); 

    const [detailsFetched, setDetailsFetched] = useState(false);

    const fetchBookingDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:3500/bookingEach/bookings/${bookingDetails.booking._id}`);
            setBookingDetails(response.data);
            setDetailsFetched(true); 
        } catch (error) {
            console.error('Error fetching booking details:', error);
        }
    };
    const handleContinue = () => {
        if (step === 1) {
            if (!peopleCount) {
                alert('Please select the number of people for the office.');
                return;
            }
        } else if (step === 2) {
            if (!duration) {
                alert('Please select the duration for the office.');
                return;
            }
        }
        setStep(step + 1);
    };

    const handleGoBack = () => {
        setStep(step - 1);
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:3500/bookingEach/bookings', {
                coworkingSpaceId,
                peopleCount,
                months: duration,
                email,
                phoneNumber: phone
            });
            setBookingDetails(response.data); 
            setStep(step + 1);
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Booking added successfully!',
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            });
        }
    };

    const handleUpdate = () => {
        setIsEditing(true); 
        setUpdatedPeopleCount(bookingDetails.booking.peopleCount);
        setUpdatedDuration(bookingDetails.booking.months);
        setUpdatedEmail(bookingDetails.booking.email);
        setUpdatedPhone(bookingDetails.booking.phoneNumber);
    };

    const handleEditCancel = () => {
        setIsEditing(false); 
     };

    const handleEditSubmit = async () => {
        try {
            await axios.put(`http://localhost:3500/bookingEach/bookings/${bookingDetails.booking._id}`, {
                peopleCount: updatedPeopleCount,
                months: updatedDuration,
                email: updatedEmail,
                phoneNumber: updatedPhone
            });
            setIsEditing(false); 
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Booking details updated successfully!',
            });
            fetchBookingDetails();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to update booking details!',
            });
        }
    };

    useEffect(() => {

        if (step === 4 && !detailsFetched) { 
            fetchBookingDetails();
        }
    }, [bookingDetails, step, detailsFetched]);

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3500/bookingEach/bookings/${bookingDetails.booking._id}`);
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Booking deleted successfully!',
                timer: 2000,
                timerProgressBar: true,
            }).then(() => {
                window.location.href = '/';

            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to delete booking!',
            });
        }
    };



    const handleProceedToPayment = () => {
        window.location.href = `/addPay/${bookingDetails.booking._id}/${bookingDetails.booking.coworkingSpace.totalAmount}`;
    };

    const handlePeopleCountSelect = (count) => {
        setPeopleCount(count);
    };

    const handleDurationSelect = (duration) => {
        setDuration(duration);
    };

    return (
        <>
        <div className="container">
            <div className="card-Book">
                <div className="title">Get a quick quote. It only takes a minute!</div>
                <hr className="hr" />
                {step === 1 && (
                    <div>
                        <div className="subtitle">How many people is the office for?</div>
                        <div className="options">
                            <button onClick={() => handlePeopleCountSelect('1')} className={peopleCount === '1' ? 'selected' : ''}>1</button>
                            <button onClick={() => handlePeopleCountSelect('2')} className={peopleCount === '2' ? 'selected' : ''}>2</button>
                            <button onClick={() => handlePeopleCountSelect('3-5')} className={peopleCount === '3-5' ? 'selected' : ''}>3-5</button>
                            <button onClick={() => handlePeopleCountSelect('5-9')} className={peopleCount === '5-9' ? 'selected' : ''}>5-9</button>
                        </div>
                    </div>
                )}
                {step === 2 && (
                    <div>
                        <div className="subtitle">How long do you need it for?</div>
                        <div className="options">
                            <button onClick={() => handleDurationSelect('0-6 months')} className={duration === '0-6 months' ? 'selected' : ''}>0-6 months</button>
                            <button onClick={() => handleDurationSelect('6-12 months')} className={duration === '6-12 months' ? 'selected' : ''}>6-12 months</button>
                            <button onClick={() => handleDurationSelect('12+ months')} className={duration === '12+ months' ? 'selected' : ''}>12+ months</button>
                            <button onClick={() => handleDurationSelect('not sure')} className={duration === 'not sure' ? 'selected' : ''}>Not sure</button>
                        </div>
                    </div>
                )}
                {step === 3 && (
                    <div>
                        <div className="subtitle">Please enter your details so we can contact you</div>
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" />
                        <input type="number" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="input" />
                    </div>
                )}
                {step === 4 && bookingDetails && (
                    <div>
                        <div className="subtitle">Booking Details</div>
                        <form className="booking-details-form">
                            {/* Render inputs with booking details */}
                            {isEditing ? (
                                <>
                                    <label htmlFor="peopleCount">Count of people:</label>
                                    <input type="text" value={updatedPeopleCount} onChange={(e) => setUpdatedPeopleCount(e.target.value)} />
                                    <label htmlFor="months">Months:</label>
                                    <input type="text" value={updatedDuration} onChange={(e) => setUpdatedDuration(e.target.value)} />
                                    <label htmlFor="email">Email:</label>
                                    <input type="email" value={updatedEmail} onChange={(e) => setUpdatedEmail(e.target.value)} />
                                    <label htmlFor="phoneNumber">Phone Number:</label>
                                    <input type="number" value={updatedPhone} onChange={(e) => setUpdatedPhone(e.target.value)} />
                                </>
                            ) : (
                                <>
                                    <label htmlFor="peopleCount">Count of people:</label>
                                    <input type="text" id="peopleCount" value={bookingDetails.booking.peopleCount} disabled />

                                    <label htmlFor="months">Months:</label>
                                    <input type="text" id="months" value={bookingDetails.booking.months} disabled />

                                    <label htmlFor="email">Email:</label>
                                    <input type="text" id="email" value={bookingDetails.booking.email} disabled />

                                    <label htmlFor="phoneNumber">Phone Number:</label>
                                    <input type="text" id="phoneNumber" value={bookingDetails.booking.phoneNumber} disabled />

                                </>
                            )}
                        </form>

                        <div className="btn-container-a">
                            {isEditing ? (
                                <>
                                    <button onClick={handleEditSubmit} className="btn">Submit</button>
                                    <button onClick={handleEditCancel} className="btn">Cancel</button>
                                </>
                            ) : (
                                <>
                                    <button onClick={handleUpdate} className="btn">Update</button>
                                    <button onClick={handleDelete} className="btn">Delete</button>
                                    <button onClick={handleProceedToPayment} className="btn">Proceed to Payment</button>
                                </>
                            )}
                        </div>
                    </div>
                )}
                <div className="btn-container-a">
                    {step > 1 && step !== 4 && <button onClick={handleGoBack} className="btn">Go back</button>}
                    {step < 3 && <button onClick={handleContinue} className="btn">Continue</button>}
                    {step === 3 && <button onClick={handleSubmit} className="btn">Submit</button>}
                </div>
            </div>
        </div>
        </>
    );
};

export default AddBooking;
