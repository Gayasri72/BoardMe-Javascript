import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

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

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (contactId) => {
    try {
      await axios.delete(`/api/contact/${contactId}`);
      // Remove the deleted contact from the state
      setContacts(contacts.filter(contact => contact._id !== contactId));
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  // Filter contacts by email
  const filteredContacts = contacts.filter(contact =>
    contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='container mx-auto'>
      <h2 className='text-2xl font-bold mb-4'>Contact Details</h2>
      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search by email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 outline-none"
        />
      </div>
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
                <th className='border px-4 py-2'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map(contact => (
                <tr key={contact._id}>
                  <td className='border px-4 py-2'>{contact.name}</td>
                  <td className='border px-4 py-2'>{contact.email}</td>
                  <td className='border px-4 py-2'>{contact.phone}</td>
                  <td className='border px-4 py-2'>{contact.message}</td>
                  <td className='border px-4 py-2'>{new Date(contact.createdAt).toLocaleString()}</td>
                  <td className='border px-4 py-2'>
                    <button onClick={() => handleDelete(contact._id)} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>
                      Delete
                    </button>
                    {/* Add buttons for updating or other actions */}
                  </td>
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
