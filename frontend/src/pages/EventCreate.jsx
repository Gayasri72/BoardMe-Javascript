import React, { useState } from 'react';
import axios from 'axios'; // Import axios for handling form submission
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const EventCreate = () => {

    const {currentUser} = useSelector((state) => state.user)
    console.log('user', currentUser);
  const [formData, setFormData] = useState({
    eventId:'',
    userId:currentUser?._id,
    businessName: '',
    eventIdea: '',
    description: '',
    date: '',
    timeFrom: '',
    timeTo: '',
    city: '',
    coordinatorName: '',
    coordinatorContactNo: '',
    paymentMethod: 'credit', // Default to credit
    image: null, // For image upload
    email:''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formD = new FormData();
      formD.append('image', formData.image);
      formD.append('userId', currentUser?._id);
      formD.append('eventId', formData.eventId);
      formD.append('businessName', formData.businessName);
      formD.append('eventIdea', formData.eventIdea);
      formD.append('description', formData.description);
      formD.append('date', formData.date);
      formD.append('timeFrom', formData.timeFrom);
      formD.append('timeTo', formData.timeTo);
      formD.append('city', formData.city);
      formD.append('coordinatorName', formData.coordinatorName);
      formD.append('coordinatorContactNo', formData.coordinatorContactNo);
      formD.append('paymentMethod', formData.paymentMethod);
      formD.append('email', formData.email);
      console.log(formD);
      const response = await axios.post(`${import.meta.env.VITE_SERVER}/event`, formD, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      toast.success('Event Request Submitted')
    } catch (error) {
      console.error('Error creating event:', error);
      toast.error(error?.response?.data?.message)
    }
  };

  const styles = {
    backgroundImage:'url(https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg)',
    backgroundSize:'cover'
  }

  return (
    <div style={styles}>
      <div className="max-w-xl mx-auto">
        <br />
        <h1 className="text-2xl font-semibold mb-4">Event Creating Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
          <div>
              <label htmlFor="eventId" className="block mb-1">Event Id</label>
              <input type="text" id="eventId" name="eventId" value={formData.eventId} onChange={handleChange} className="w-full border rounded-md px-3 py-2" required />
            </div>
            <div>
              <label htmlFor="businessName" className="block mb-1">Business Name</label>
              <input type="text" id="businessName" name="businessName" value={formData.businessName} onChange={handleChange} className="w-full border rounded-md px-3 py-2" required />
            </div>
            <div>
              <label htmlFor="eventIdea" className="block mb-1">Event Idea</label>
              <input type="text" id="eventIdea" name="eventIdea" value={formData.eventIdea} onChange={handleChange} className="w-full border rounded-md px-3 py-2" required />
            </div>
            <div>
              <label htmlFor="eventIdea" className="block mb-1">Email To Contact</label>
              <input type="email" id="email" name="email" value={formData?.email} onChange={handleChange} className="w-full border rounded-md px-3 py-2" required />
            </div>
            <div className="col-span-2">
              <label htmlFor="description" className="block mb-1">Description</label>
              <textarea id="description" name="description" value={formData.description} onChange={handleChange} className="w-full border rounded-md px-3 py-2" required></textarea>
            </div>
            <div>
              <label htmlFor="date" className="block mb-1">Date</label>
              <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} className="w-full border rounded-md px-3 py-2" required />
            </div>
            <div>
              <label htmlFor="timeFrom" className="block mb-1">Time From</label>
              <input type="time" id="timeFrom" name="timeFrom" value={formData.timeFrom} onChange={handleChange} className="w-full border rounded-md px-3 py-2" required />
            </div>
            <div>
              <label htmlFor="timeTo" className="block mb-1">Time To</label>
              <input type="time" id="timeTo" name="timeTo" value={formData.timeTo} onChange={handleChange} className="w-full border rounded-md px-3 py-2" required />
            </div>
            <div>
              <label htmlFor="city" className="block mb-1">City</label>
              <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} className="w-full border rounded-md px-3 py-2" required />
            </div>
            <div>
              <label htmlFor="coordinatorName" className="block mb-1">Coordinator Name</label>
              <input type="text" id="coordinatorName" name="coordinatorName" value={formData.coordinatorName} onChange={handleChange} className="w-full border rounded-md px-3 py-2" required />
            </div>
            <div>
              <label htmlFor="coordinatorContactNo" className="block mb-1">Coordinator Contact No</label>
              <input type="tel" id="coordinatorContactNo" name="coordinatorContactNo" value={formData.coordinatorContactNo} onChange={handleChange} className="w-full border rounded-md px-3 py-2" required />
            </div>
            <div>
              <label htmlFor="paymentMethod" className="block mb-1">Payment Method</label>
              <select id="paymentMethod" name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} className="w-full border rounded-md px-3 py-2" required>
                <option value="credit">Credit</option>
                <option value="debit">Debit</option>
              </select>
            </div>
            <div>
              <label htmlFor="image" className="block mb-1">Event Posters</label>
              <input type="file" id="image" name="image" onChange={handleImageChange} className="w-full border rounded-md px-3 py-2" accept="image/*" required />
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">Create Event</button>
            <button type="button" className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded" onClick={() => window.location.href = '#'}>Cancel</button>
          </div><br />
        </form>
      </div>
    </div>
  );
};

export default EventCreate;
