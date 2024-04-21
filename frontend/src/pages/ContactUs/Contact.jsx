import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Contact() {

    const [contacts, setContacts] = useState([
        { Name: "Kavindu", Email: "Kavindu@gmail.com", Phone: "072553342342", Message: "gsfhsfosjfo lsfvnsofjosjf" }
    ]);

    return (
        <div className='flex justify-center items-center h-screen bg-primary'>
            <div className='w-3/4 bg-white rounded p-6 shadow-lg'>
                <table className='w-full table-auto'>
                    <thead>
                        <tr>
                            <th className='px-4 py-2'>Name</th>
                            <th className='px-4 py-2'>Email</th>
                            <th className='px-4 py-2'>Phone</th>
                            <th className='px-4 py-2'>Message</th>
                            <th className='px-4 py-2'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contact, index) => (
                            <tr key={index} className={(index % 2 === 0) ? 'bg-gray-100' : ''}>
                                <td className='border px-4 py-2'>{contact.Name}</td>
                                <td className='border px-4 py-2'>{contact.Email}</td>
                                <td className='border px-4 py-2'>{contact.Phone}</td>
                                <td className='border px-4 py-2'>{contact.Message}</td>
                                <td className='border px-4 py-2'>
                                    <Link to="/update" className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mr-2'>Update</Link>
                                    <Link to="/update" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>Delete</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Contact;
