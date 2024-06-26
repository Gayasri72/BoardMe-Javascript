import { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';

const ContactManager = () => {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [satisfactionFilter, setSatisfactionFilter] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('/api/contact');
        setContacts(response.data); // Assuming response.data directly contains contacts
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, []);

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

  const generatePDF = () => {
    const doc = new jsPDF();
    let y = 10;
    doc.text('Contact Details', 10, y);
    y += 10;

    filteredContacts.forEach(contact => {
      doc.text(`Name: ${contact.name}`, 10, y);
      y += 10;
      doc.text(`Email: ${contact.email}`, 10, y);
      y += 10;
      doc.text(`Phone: ${contact.phone}`, 10, y);
      y += 10;
      doc.text(`Message: ${truncateMessage(contact.message, 50)}`, 10, y);
      y += 10;
      doc.text(`Satisfaction: ${contact.satisfaction}`, 10, y);
      y += 10;
      y += 5; // Add some spacing between each contact
    });

    doc.save('contacts.pdf');
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-lg font-bold mb-4">Contact Details</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search contacts..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded-md py-2 px-4 w-full"
        />
      </div>
      <div className="mb-4">
        <span className="mr-2">Satisfaction:</span>
        <label className="mr-4">
          <input
            type="radio"
            name="satisfactionFilter"
            value=""
            checked={satisfactionFilter === ''}
            onChange={() => setSatisfactionFilter('')}
            className="mr-1"
          />
          All
        </label>
        <label>
          <input
            type="radio"
            name="satisfactionFilter"
            value="Yes"
            checked={satisfactionFilter === 'Yes'}
            onChange={() => setSatisfactionFilter('Yes')}
            className="mr-1"
          />
          Yes
        </label>
        <label className="ml-4">
          <input
            type="radio"
            name="satisfactionFilter"
            value="No"
            checked={satisfactionFilter === 'No'}
            onChange={() => setSatisfactionFilter('No')}
            className="mr-1"
          />
          No
        </label>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Message</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Satisfaction</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredContacts.map(contact => (
              <tr key={contact._id}>
                <td className="px-6 py-4 whitespace-nowrap">{contact.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{contact.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{contact.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap cursor-pointer" onClick={() => handleShowMessage(contact.message)}>
                  {truncateMessage(contact.message, 50)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{contact.satisfaction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={generatePDF}>Download PDF</button>
      </div>
      {selectedMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">Message</h3>
            <p>{selectedMessage}</p>
            <button className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md" onClick={() => setSelectedMessage(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactManager;
