import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link
import './home.css'; // Import custom CSS file

const Home = () => {
    const [selection, setSelection] = useState('All');
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchData();
    }, [selection]);

    const fetchData = async () => {
        try {
            let url = 'http://localhost:3500/booking_co';
            switch (selection) {
                case 'Private Office':
                    url = 'http://localhost:3500/booking_co/pvt';
                    break;
                case 'Coworking Space':
                    url = 'http://localhost:3500/booking_co/co';
                    break;
                case 'Virtual Office':
                    url = 'http://localhost:3500/booking_co/vir';
                    break;
                case 'Airport Lounge':
                    url = 'http://localhost:3500/booking_co/air';
                    break;
                default:
                    url = 'http://localhost:3500/booking_co';
            }
            const response = await axios.get(url);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="home-container">
            <div className="sidebar">
                <p className="sidebar-title">Co-Working</p>
                <ul className="selection-list">
                    <li className={`selection-item ${selection === 'All' ? 'active' : ''}`} onClick={() => setSelection('All')}>All</li>
                    <li className={`selection-item ${selection === 'Private Office' ? 'active' : ''}`} onClick={() => setSelection('Private Office')}>Private Office</li>
                    <li className={`selection-item ${selection === 'Coworking Space' ? 'active' : ''}`} onClick={() => setSelection('Coworking Space')}>Coworking Space</li>
                    <li className={`selection-item ${selection === 'Virtual Office' ? 'active' : ''}`} onClick={() => setSelection('Virtual Office')}>Virtual Office</li>
                    <li className={`selection-item ${selection === 'Airport Lounge' ? 'active' : ''}`} onClick={() => setSelection('Airport Lounge')}>Airport Lounge</li>
                </ul>
            </div>
            <div className="content">
                <div className="card-container">
                    <input
                        type="text"
                        placeholder="Search by name"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                    {filteredData.map((item, index) => (
                        <div key={index} className="card" >
                            <div className="image-container">
                                <img src={item.imageurls} alt={item.name} className="card-image" />
                            </div>
                            <div className="card-details">
                                <p className="card-name"><strong>Name:</strong> {item.name}</p>
                                <p className="card-detail"><strong>Details:</strong> {item.details}</p>
                                <p className="card-type"><strong>Type:</strong> {item.type}</p>
                                <p className="card-amount"><strong>Total Amount:</strong> {item.totalAmount}</p>
                                <Link to={`/addBooking/${item._id}`} className="quick-quote-link">
                                    <button className="quick-quote-btn">Quick Quote</button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
