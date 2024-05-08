import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios'; // Don't forget to import axios

const DashContact = () => {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [satisfactionFilter, setSatisfactionFilter] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingContact, setEditingContact] = useState(null);
  const { currentUser } = useSelector(state => state.user);

  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('/api/contact');
        const currentUserEmail = currentUser.email;
        const currentUserContacts = response.data.filter(contact => contact.email === currentUserEmail);
        setContacts(currentUserContacts);
      } catch (error) {
        console.error('Error fetching contacts:', error);
        setError('Failed to fetch contacts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, [currentUser]);

  const filteredContacts = contacts.filter(contact => {
    const isMatchingSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            contact.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            contact.message.toLowerCase().includes(searchQuery.toLowerCase());

    if (satisfactionFilter === '') {
      return isMatchingSearch;
    } else {
      return isMatchingSearch && contact.satisfaction === satisfactionFilter;
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

  const handleEditContact = (contactId) => {
    const contactToEdit = contacts.find(contact => contact._id === contactId);
    setEditingContact(contactToEdit);
  };

  const handleCancelEdit = () => {
    setEditingContact(null);
  };

  const handleUpdateContact = async (updatedContact) => {
    try {
      setLoading(true);
      setError(null);
      const { email, ...contactData } = updatedContact; // Exclude email from updated contact
      const response = await axios.put(`/api/contact/${updatedContact._id}`, contactData);
      const updatedContactIndex = contacts.findIndex(contact => contact._id === updatedContact._id);
      const updatedContacts = [...contacts];
      updatedContacts[updatedContactIndex] = response.data;
      setContacts(updatedContacts);
      setEditingContact(null);
    } catch (error) {
      console.error('Error updating contact:', error);
      setError('Failed to update contact. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteContact = async (contactId) => {
    try {
      setLoading(true);
      setError(null);
      await axios.delete(`/api/contact/${contactId}`);
      setContacts(prevContacts => prevContacts.filter(contact => contact._id !== contactId));
    } catch (error) {
      console.error('Error deleting contact:', error);
      setError('Failed to delete contact. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto mt-8 px-4">
      <h2 className="text-2xl font-bold mb-8">Contact Details</h2>
      <div className="flex justify-between mb-6">
        <input
          type="text"
          placeholder="Search contacts..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded-md py-2 px-4 w-full max-w-xs"
        />
        <div className="flex items-center space-x-4">
          <span className="text-gray-700">Satisfaction:</span>
          <div>
            <input
              type="radio"
              name="satisfactionFilter"
              value=""
              checked={satisfactionFilter === ''}
              onChange={() => setSatisfactionFilter('')}
              className="mr-1"
            />
            <label className="mr-4">All</label>
          </div>
          <div>
            <input
              type="radio"
              name="satisfactionFilter"
              value="Yes"
              checked={satisfactionFilter === 'Yes'}
              onChange={() => setSatisfactionFilter('Yes')}
              className="mr-1"
            />
            <label className="mr-4">Yes</label>
          </div>
          <div>
            <input
              type="radio"
              name="satisfactionFilter"
              value="No"
              checked={satisfactionFilter === 'No'}
              onChange={() => setSatisfactionFilter('No')}
              className="mr-1"
            />
            <label>No</label>
          </div>
        </div>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Message</th>
              <th className="px-4 py-2 text-left">Satisfaction</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.map(contact => (
              <tr key={contact._id} className="border-b border-gray-200">
                <td className="px-4 py-2">{contact.name}</td>
                <td className="px-4 py-2">{contact.email}</td>
                <td className="px-4 py-2">{contact.phone}</td>
                <td className="px-4 py-2 cursor-pointer" onClick={() => handleShowMessage(contact.message)}>
                  {truncateMessage(contact.message, 50)}
                </td>
                <td className="px-4 py-2">{contact.satisfaction}</td>
                <td className="px-4 py-2">
                  <button onClick={() => handleEditContact(contact._id)} className="mr-2 px-3 py-1 bg-blue-500 text-white rounded-md">Edit</button>
                  <button onClick={() => handleDeleteContact(contact._id)} className="px-3 py-1 bg-red-500 text-white rounded-md">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">Message</h3>
            <p>{selectedMessage}</p>
            <button onClick={() => setSelectedMessage(null)} className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md">Close</button>
          </div>
        </div>
      )}
      {editingContact && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">Edit Contact</h3>
            <EditContactForm
              contact={editingContact}
              onUpdateContact={handleUpdateContact}
              onCancel={handleCancelEdit}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const EditContactForm = ({ contact, onUpdateContact, onCancel }) => {
  const [updatedContact, setUpdatedContact] = useState({ ...contact });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedContact(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!updatedContact.name || !updatedContact.phone || !updatedContact.message) {
      setError("Please fill in all required fields.");
      return;
    }
    if (!validatePhone(updatedContact.phone)) {
      setError("Please enter a valid phone number.");
      return;
    }
    onUpdateContact(updatedContact);
  };

  const validatePhone = phone => {
    const re = /^\d{10}$/;
    return re.test(phone);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input type="text" id="name" name="name" value={updatedContact.name} onChange={handleChange} className="border border-gray-300 rounded-md py-2 px-4 w-full" />
      </div>
      <div className="mb-4">
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
        <input type="text" id="phone" name="phone" value={updatedContact.phone} onChange={handleChange} className="border border-gray-300 rounded-md py-2 px-4 w-full" />
      </div>
      <div className="mb-4">
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
        <textarea id="message" name="message" value={updatedContact.message} onChange={handleChange} className="border border-gray-300 rounded-md py-2 px-4 w-full h-32"></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Satisfaction</label>
        <select name="satisfaction" value={updatedContact.satisfaction} onChange={handleChange} className="border border-gray-300 rounded-md py-2 px-4 w-full">
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="flex justify-end">
        <button type="button" onClick={onCancel} className="mr-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md">Cancel</button>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Update</button>
      </div>
    </form>
  );
};

export default DashContact;
