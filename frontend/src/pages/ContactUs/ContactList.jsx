import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ContactList() {
  // State variable to hold contact data
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch contact data from backend
  const fetchContacts = async () => {
    try {
      const response = await axios.get('/api/contact');
      setContacts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  return (
    <div className='container mx-auto'>
      <h2 className='text-2xl font-bold mb-4'>Contact Details</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className='table-auto'>
          <thead>
            <tr>
              <th className='px-4 py-2'>Name</th>
              <th className='px-4 py-2'>Email</th>
              <th className='px-4 py-2'>Phone</th>
              <th className='px-4 py-2'>Message</th>
              <th className='px-4 py-2'>Created At</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map(contact => (
              <tr key={contact._id}>
                <td className='border px-4 py-2'>{contact.name}</td>
                <td className='border px-4 py-2'>{contact.email}</td>
                <td className='border px-4 py-2'>{contact.phone}</td>
                <td className='border px-4 py-2'>{contact.message}</td>
                <td className='border px-4 py-2'>{new Date(contact.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ContactList;
