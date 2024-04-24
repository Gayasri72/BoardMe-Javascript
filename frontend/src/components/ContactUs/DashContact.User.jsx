// ContactUser.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactUser = ({ userEmail }) => {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [subscriptionFilter, setSubscriptionFilter] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [editContact, setEditContact] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(`/api/contact?email=${userEmail}`);
        setContacts(response.data.contacts);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, [userEmail]);

  const filteredContacts = contacts.filter(contact => {
    const isMatchingSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            contact.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            contact.message.toLowerCase().includes(searchQuery.toLowerCase());

    if (subscriptionFilter === '') {
      return isMatchingSearch;
    } else {
      return isMatchingSearch && contact.option === subscriptionFilter;
    }
  });

  const truncateMessage = (message, maxLength) => {
    if (message.length <= maxLength) {
      return message;
    } else {
      return message.slice(0, maxLength) + '...';
    }
  };

  const handleShowMessage = (message) => {
    setSelectedMessage(message);
  };

  const handleEdit = (contact) => {
    setEditContact(contact);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedContact = await axios.put(`/api/contact/${editContact._id}`, editContact);
      setContacts(prevContacts => prevContacts.map(contact => contact._id === updatedContact.data.contact._id ? updatedContact.data.contact : contact));
      setEditContact(null);
      console.log('Contact updated successfully');
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditContact(prevContact => ({
      ...prevContact,
      [name]: value
    }));
  };

  return (
    <div className="container mx-auto mt-8 px-4">
      <h2 className="text-lg font-bold mb-4">Contact Details</h2>
      {/* Add search and filter UI */}
      <div>
        {/* Search input */}
        <input
          type="text"
          placeholder="Search contacts..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        {/* Subscription filter */}
        <select
          value={subscriptionFilter}
          onChange={e => setSubscriptionFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      {/* Contacts table */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Message</th>
            <th>Subscription</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredContacts.map(contact => (
            <tr key={contact._id}>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td onClick={() => handleShowMessage(contact.message)}>
                {truncateMessage(contact.message, 50)}
              </td>
              <td>{contact.option}</td>
              <td>
                <button onClick={() => handleEdit(contact)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Display selected message */}
      {selectedMessage && (
        <div>
          <h3>Selected Message</h3>
          <p>{selectedMessage}</p>
        </div>
      )}
      {/* Edit contact form */}
      {editContact && (
        <form onSubmit={handleEditSubmit}>
          <input
            type="text"
            name="name"
            value={editContact.name}
            onChange={handleEditChange}
          />
          {/* Add other input fields */}
          <button type="submit">Save</button>
        </form>
      )}
    </div>
  );
};

export default ContactUser;
