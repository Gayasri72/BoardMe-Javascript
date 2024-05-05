import React from 'react';
import EventCreate from './EventCreate';

const EventHome = () => {
  return (
    <div className='bg-white'>
      <div className='ml-5 pt-5'>
        <h1 className='text-4xl font-bold'>Do you want to organize an event?</h1>
      </div>

      <div className='text-7xl text-blue-500 font-bold my-5 ml-20'>
        <h1>Then, we are ready to</h1>
        <h1>arrange it for you.</h1>
      </div>

      <div className="flex items-start justify-between">
        <div className='px-5'>
          <h3 className="text-xl ml-4">We can arrange your indoor events according to your requirements. Contact us to arrange your seminars, product launches, and get-togethers, etc., as per your needs.</h3>
          
          <img src="https://api.time.com/wp-content/uploads/2022/02/order-of-countries-opening-ceremony-beijing.jpg" alt="Event" className='w-3/4 mx-auto my-5' />
          <img src="https://api.time.com/wp-content/uploads/2022/02/order-of-countries-opening-ceremony-beijing.jpg" alt="Event" className='w-3/4 mx-auto my-5' />
        </div>
        <img src="https://api.time.com/wp-content/uploads/2022/02/order-of-countries-opening-ceremony-beijing.jpg" alt="Event" />
      </div>
      <EventCreate />
      <p className='text-xl font-bold my-5 text-center'>You can participate in our upcoming events organized by our company. To contact us please click the "Upcomin Events" button and book the event</p>
    </div>
  );
};

export default EventHome;
