import React, { useState } from 'react';
import axios from 'axios';

function ContactUs() {
  // State variables to hold form input values
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Send POST request to backend API
      const response = await axios.post('/api/contact', {
        name,
        email,
        phone,
        message
      });
      // Handle success response
      console.log('Contact created successfully:', response.data);
      // Clear form after successful submission
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setErrorMessage('');
    } catch (error) {
      // Handle error response
      console.error('Error creating contact:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Something went wrong. Please try again later.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen bg-primary'>
      <div className='border border-gray-300 rounded w-1/2'>
        <div className='p-8'>
          <h2 className='text-2xl mb-4'>Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label htmlFor="name" className='block text-sm font-bold mb-2'>Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter Name"
                className='w-full border rounded px-3 py-2 outline-none'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className='mb-4'>
              <label htmlFor="email" className='block text-sm font-bold mb-2'>Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter Email"
                className='w-full border rounded px-3 py-2 outline-none'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className='mb-4'>
              <label htmlFor="phone" className='block text-sm font-bold mb-2'>Phone</label>
              <input
                type="tel"
                id="phone"
                placeholder="Enter Number"
                className='w-full border rounded px-3 py-2 outline-none'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className='mb-4'>
              <label htmlFor="message" className='block text-sm font-bold mb-2'>Message</label>
              <textarea
                id="message"
                placeholder="Enter your message"
                className='w-full border rounded px-3 py-2 outline-none'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Submit'}
            </button>
            {errorMessage && (
              <p className="text-red-500 mt-2">{errorMessage}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
