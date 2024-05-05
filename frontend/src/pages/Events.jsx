import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const EventList = () => {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [events, setEvents] = useState([])
    const navigate = useNavigate()

    const handleBookNowClick = (event) => {
        setSelectedEvent(event);
    };

    const handleClosePopup = () => {
        setSelectedEvent(null);
    };

    const getAllEvents = async () => {
        try {
            const resp = await axios.get(`${import.meta.env.VITE_SERVER}/event`);
            console.log(resp.data);
            setEvents(resp.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllEvents()
    }, [])

    return (
        <>
            <div className="max-w-screen-xl mx-auto">
                <h1 className="text-center font-bold text-3xl mb-6">All Events</h1>
                <div className='flex flex-col w-full items-center justify-center'>
                {events.length > 0 && events?.map((event, index) => (
                    <div key={index} className={`relative w-1/2 block mt-${index === 0 ? '12' : '8'}`}>
                        <div className="relative">
                            <img src={import.meta.env.VITE_SERVER +event?.image} alt={`Event ${event?._id}`} className="w-full h-auto rounded-lg" />
                            <div className="mt-2 text-center font-bold">{event?.description}</div>
                            <span className="bg-gray-800 text-white px-2 py-1 rounded-full absolute top-0 right-0 m-2">Event ID: {event?.eventId}</span>
                            <button onClick={() => handleBookNowClick(event)} className="bg-green-500 text-white px-4 py-2 rounded-md mt-4 absolute right-0">Book Now</button> <br /><br /><br />
                        </div>
                        <div className='px-4 bg-green-500 py-1 rounded-full absolute left-2 top-2'>
                        {event?.status}
                        </div>
                    </div>

                ))}
                </div>
                <br />
                {selectedEvent && (
                    <div className="fixed top-10 right-0 bottom-10 left-0 flex justify-center items-center">
                        <div className="bg-gray-800 bg-opacity-75 absolute top-10 left-0 bottom-10 w-full h-auto flex justify-center items-center">
                            <div className="bg-white p-8 rounded-lg flex justify-between" style={{ marginTop: '10px', marginBottom: '10px', height: '80%' }}>
                                <button onClick={handleClosePopup} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                                <div className='w-1/3'>
                                <img src={selectedEvent?.image} alt={`Event ${selectedEvent?._id}`} className="w-full h-full object-cover rounded-lg mr-4" />
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold mb-4">Event Details</h2>
                                    <p>{selectedEvent?.description}</p><br />
                                    <p><strong>Coordinator:</strong> {selectedEvent?.coordinator}</p>
                                    <p><strong>Date:</strong> {selectedEvent?.date}</p>
                                    <p><strong>Other Details:</strong> {selectedEvent?.otherDetails}</p>

                                </div>
                                <button className='px-4 py-2 rounded-xl bg-green-400 text-white' onClick={()=>navigate(`/book/${selectedEvent._id}`)}>Buy Now</button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </>
    );
};

export default EventList;
