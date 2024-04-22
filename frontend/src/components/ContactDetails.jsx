import React, { useEffect, useState } from 'react';

const ContactDetails = () => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await fetch('/api/contact', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}` // Assuming you are using JWT token for authentication
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setContacts(data.contacts);
                } else {
                    console.error('Failed to fetch contacts:', response.statusText);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchContacts();
    }, []);

    return (
        <div>
            <h1>Contact Details</h1>
            <ul>
                {contacts.length === 0 ? (
                    <p>No contacts found.</p>
                ) : (
                    contacts.map(contact => (
                        <li key={contact._id}>
                            <p>Name: {contact.name}</p>
                            <p>Email: {contact.email}</p>
                            <p>Phone: {contact.phone}</p>
                            <p>Message: {contact.message}</p>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default ContactDetails;
