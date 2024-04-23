import React, { useState } from 'react';
import axios from 'axios';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    option: 'Yes', // Default value for the radio button
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/contact', formData);
      console.log('Form submitted successfully');
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        option: 'Yes',
      });
      document.getElementById('message').style.height = 'auto';
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {/* Left Column */}
      <div className="flex-1 px-8 py-4 ml-12">
        <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 3a7 7 0 0 1 7 7c0 2.461-1.332 4.853-3.095 6.095l-.091.076C12.608 17.903 11.328 19 10 19s-2.607-1.097-6.814-3.729l-.093-.078C3.33 14.853 2 12.461 2 10A7 7 0 0 1 10 3zm0 2a5 5 0 0 0-5 5c0 1.757.955 3.434 2.504 5.068l.097.082C7.949 15.287 8.481 15 10 15s2.051.287 2.399.15l.098-.083C14.044 13.434 15 11.757 15 10a5 5 0 0 0-5-5zm0 2a3 3 0 0 0-3 3c0 .989.49 2.017 1.621 3.207l.072.06C8.483 13.702 9.176 14 10 14s1.517-.298 2.307-.733l.073-.062C14.51 10.017 15 8.989 15 8a3 3 0 0 0-3-3z" />
            </svg>
            <span>+1 123 456 7890</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M17 5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V5zM9 2a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm4.293 11.707a1 1 0 0 0-1.414 0l-1 1a1 1 0 1 0 1.414 1.414l1-1a1 1 0 0 0 0-1.414zM12 9a1 1 0 1 0-2 0v1a1 1 0 0 0 2 0V9z" />
            </svg>
            <span>info@example.com</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-3.586l1.293-1.293a1 1 0 0 0-1.414-1.414L9 12.586l-2.293-2.293a1 1 0 1 0-1.414 1.414L7.414 15H5a1 1 0 0 1-1-1V5zm-1 11a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2z" />
            </svg>
            <span>123 Main Street, City, Country</span>
          </div>
        </div>
      </div>
      {/* Right Column */}
      <div className="flex-1 px-8 py-4">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Message"
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
          />
          <div className="flex items-center mb-4">
            <label className="mr-4">
              <input
                type="radio"
                name="option"
                value="Yes"
                checked={formData.option === 'Yes'}
                onChange={handleChange}
                className="mr-1"
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="option"
                value="No"
                checked={formData.option === 'No'}
                onChange={handleChange}
                className="mr-1"
              />
              No
            </label>
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
