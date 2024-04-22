import { useState } from 'react';
import axios from 'axios';

function ContactUs() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [satisfied, setSatisfied] = useState(''); // State for radio button selection

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('/api/contact', {
        name,
        email,
        phone,
        message,
        satisfied // Include the selected option in the request
      });

      console.log(response.data);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setSatisfied('');
      
      alert('Message sent successfully!');
    } catch (error) {
      console.error('Error submitting message:', error);
      alert('Failed to send message. Please try again later.');
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
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Name" className='w-full border rounded px-3 py-2 outline-none' required />
            </div>
            <div className='mb-4'>
              <label htmlFor="email" className='block text-sm font-bold mb-2'>Email</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" className='w-full border rounded px-3 py-2 outline-none' required />
            </div>
            <div className='mb-4'>
              <label htmlFor="phone" className='block text-sm font-bold mb-2'>Phone</label>
              <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter Number" className='w-full border rounded px-3 py-2 outline-none' required />
            </div>
            <div className='mb-4'>
              <label htmlFor="message" className='block text-sm font-bold mb-2'>Message</label>
              <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Enter your message" className='w-full border rounded px-3 py-2 outline-none' required ></textarea>
            </div>
            <div className='mb-4'>
              <span className="block text-sm font-bold mb-2">Are you satisfied with our website?</span>
              <label htmlFor="satisfiedYes" className="inline-block mr-4">
                <input type="radio" id="satisfiedYes" name="satisfied" value="Yes" checked={satisfied === 'Yes'} onChange={(e) => setSatisfied(e.target.value)} className="mr-2" />
                Yes
              </label>
              <label htmlFor="satisfiedNo" className="inline-block">
                <input type="radio" id="satisfiedNo" name="satisfied" value="No" checked={satisfied === 'No'} onChange={(e) => setSatisfied(e.target.value)} className="mr-2" />
                No
              </label>
            </div>
            <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContactUs;
