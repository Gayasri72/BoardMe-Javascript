import React from 'react'

const AdvertisementCard = ({ Advertisement }) => {
    return (
        <div className={`flex items-stretch gap-3 p-10 bg-gray-200 rounded-xl w-full mx-auto relative`}>
            <div className='w-1/3 aspect-square'>
                <img src={Advertisement.image} className='w-full h-full object-cover' />
            </div>
            <div className='p-3 h-52 w-full bg-white'>
                <h2 className='text-2xl font-semibold capitalize mb-4'>{Advertisement.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: Advertisement.content }} />
                <br />
                <br />
                {new Date(Advertisement?.createdAt).toDateString()}
            </div>
        </div>
    )
}

export default AdvertisementCard