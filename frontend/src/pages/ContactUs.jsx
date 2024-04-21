import React, { useState } from 'react';
import axios from 'axios';

export const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [contactSent, setContactSent] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send form data to the contact us endpoint
      await axios.post('/ContactUs', formData); // Update endpoint to match your backend route
      // Clear the form after successful submission
      setFormData({ name: '', email: '', message: '' });
      // Set contactSent to true to display success message
      setContactSent(true);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      {contactSent && <p className="text-green-500">Message sent successfully!</p>}
      <p className="text-lg mb-4">Feel free to reach out to us for any inquiries or assistance.</p>
      <form className="mb-8" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium">Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="border-gray-300 border rounded-md px-4 py-2 w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="border-gray-300 border rounded-md px-4 py-2 w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-sm font-medium">Message</label>
          <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="4" className="border-gray-300 border rounded-md px-4 py-2 w-full"></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">Send Message</button>
      </form>
      <p className="text-sm">You can also reach us via email at <a href="mailto:info@example.com" className="text-blue-500">info@example.com</a>.</p>
    </div>
  );
};

export default ContactUs;
