import React, { useState } from 'react';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'phone') {
      setPhone(value);
    } else if (name === 'message') {
      setMessage(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, phone, message })
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Contact created successfully:', data.contact);
        // Clear form fields
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
      } else {
        console.error('Error:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white shadow-md rounded px-8 py-8 w-full max-w-xl">
        <h1 className="text-3xl mb-6 text-center font-bold text-gray-800">Contact Us</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-800 text-sm font-semibold mb-2">Name</label>
            <input type="text" id="name" name="name" value={name} onChange={handleChange} placeholder="Enter Your Name" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500" required />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-800 text-sm font-semibold mb-2">Email</label>
            <input type="email" id="email" name="email" value={email} onChange={handleChange} placeholder="Enter Your Email" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500" required />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-800 text-sm font-semibold mb-2">Phone</label>
            <input type="text" id="phone" name="phone" value={phone} onChange={handleChange} placeholder="Enter Your Phone Number" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500" required />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-800 text-sm font-semibold mb-2">Message</label>
            <textarea id="message" name="message" value={message} onChange={handleChange} placeholder="Enter Your Message" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500" rows="4" required ></textarea>
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
