import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('/api/contact');
        setContacts(response.data.contacts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching contacts:', error);
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div className='container mx-auto'>
      <h2 className='text-2xl font-bold mb-4'>Contact Details</h2>
      <div className="table-container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className='table-auto border-collapse border border-gray-400 w-full'>
            <thead>
              <tr>
                <th className='border px-4 py-2'>Name</th>
                <th className='border px-4 py-2'>Email</th>
                <th className='border px-4 py-2'>Phone</th>
                <th className='border px-4 py-2'>Message</th>
                <th className='border px-4 py-2'>Created At</th>
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
    </div>
  );
}

export default ContactList;
