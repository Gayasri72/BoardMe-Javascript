import React, { useState } from 'react';
import axios from 'axios';

const AddPackage = () => {
  const [packageDetails, setPackageDetails] = useState({
    pac_name: '',
    features: '',
    price: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPackageDetails({ ...packageDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/package', packageDetails);
      console.log(res.data); // Handle response as needed
      
      // Reset form fields
      setPackageDetails({
        pac_name: '',
        features: '',
        price: '',
      });

      // Optionally, you can close the form here using state or other methods
      
      // Optionally, you can redirect the user to another page after successful submission
      // history.push('/packages');
    } catch (error) {
      console.error('Error adding package:', error);
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg">

       


        <h2 className="text-2xl font-semibold mb-4">Add Package</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Package Name:</label>
            <input
              type="text"
              name="pac_name"
              value={packageDetails.pac_name}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Features:</label>
            <textarea
              name="features"
              value={packageDetails.features}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Price:</label>
            <input
              type="text"
              name="price"
              value={packageDetails.price}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Package
          </button>
        </form>
      </div>
     
    </>
  );
};

export default AddPackage;
