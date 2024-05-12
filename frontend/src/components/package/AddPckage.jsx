import  { useState, useEffect } from 'react';
import axios from 'axios';

//add package
const AddPackage = ({ handleClose, formData, updateData }) => {
  const [packageDetails, setPackageDetails] = useState({
    pac_name: '',
    features: '',
    price: '',
  });

  useEffect(() => {
    setPackageDetails(formData);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPackageDetails({ ...packageDetails, [name]: value });
  };

  //validation
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation check for price
    const enteredPrice = parseFloat(packageDetails.price);
    if (isNaN(enteredPrice) || enteredPrice <= 0) {
      alert('Please enter a valid price');
      return; // Exit the function if validation fails
    }
    try {
      let res;
      if (packageDetails._id) {
        res = await axios.put(`/api/package/${packageDetails._id}`, packageDetails);
      } else {
        res = await axios.post('/api/package', packageDetails);
      }
      console.log(res.data); // Handle response as needed
      handleClose();
      updateData(); // Update data after successful submission
    } catch (error) {
      console.error('Error adding/editing package:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">{packageDetails._id ? 'Edit Package' : 'Add Package'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="pac_name" className="block text-sm font-medium text-gray-700">Package Name:</label>
            <input
              type="text"
              id="pac_name"
              name="pac_name"
              value={packageDetails.pac_name}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="features" className="block text-sm font-medium text-gray-700">Features:</label>
            <textarea
              id="features"
              name="features"
              value={packageDetails.features}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price:</label>
            <input
              type="text"
              id="price"
              name="price"
              value={packageDetails.price}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {packageDetails._id ? 'Update Package' : 'Add Package'}
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="ml-2 w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPackage;
