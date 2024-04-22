import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function ContactDetails() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userId } = useSelector(state => state.user); // Assuming you store the user ID in your Redux state

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(`/api/contact/user/${userId}`);
        setContacts(response.data.contacts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching contacts:', error);
        setLoading(false);
      }
    };

    if (userId) {
      fetchContacts();
    }
  }, [userId]);

  const handleDelete = async (contactId) => {
    try {
      await axios.delete(`/api/contact/${contactId}`);
      // Remove the deleted contact from the state
      setContacts(contacts.filter(contact => contact._id !== contactId));
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  return (
    <div className='container mx-auto'>
      <h2 className='text-2xl font-bold mb-4'>Contact Details</h2>
      <div className="table-container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className='table-auto border-collapse border border-gray-400 w-full'>
            {/* Table header */}
            {/* Table body */}
          </table>
        )}
      </div>
    </div>
  );
}

export default ContactDetails;
