import { useState } from 'react';
import axios from 'axios';

const ContactUsForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    satisfaction: 'Yes', // Default value
  });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/contact', formData);
      setMessage(response.data.message);
      setIsError(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        satisfaction: 'Yes',
      });
    } catch (error) {
      setMessage(error.response.data.message);
      setIsError(true);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-100 rounded-md shadow-lg p-8 w-9/12">
        <h2 className="text-2xl font-bold mb-4 text-center">Contact Us</h2>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="border border-gray-300 rounded-md py-2 px-4 w-full h-32 resize-none focus:outline-none focus:border-blue-500"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Are you satisfied with our website?</label>
            <div>
              <label className="mr-4">
                <input
                  type="radio"
                  name="satisfaction"
                  value="Yes"
                  checked={formData.satisfaction === 'Yes'}
                  onChange={handleChange}
                  className="mr-1"
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="satisfaction"
                  value="No"
                  checked={formData.satisfaction === 'No'}
                  onChange={handleChange}
                  className="mr-1"
                />
                No
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
          {message && (
            <div className={`mt-4 ${isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'} border border-${isError ? 'red' : 'green'}-400 px-4 py-2 rounded-md text-center`}>
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactUsForm;
