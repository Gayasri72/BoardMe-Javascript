import React from 'react'

function UpdateCuntact() {
  return (
    <div className='flex justify-center items-center h-screen bg-primary'>
    <div className='border border-gray-300 rounded w-1/2'>
      <div className='p-8'>
        <h2 className='text-2xl mb-4'>Contact Us</h2>
        <div className='mb-4'>
          <label htmlFor="name" className='block text-sm font-bold mb-2'>Name</label>
          <input type="text" id="name" placeholder="Enter Name" className='w-full border rounded px-3 py-2 outline-none' />
        </div>
        <div className='mb-4'>
          <label htmlFor="email" className='block text-sm font-bold mb-2'>Email</label>
          <input type="email" id="email" placeholder="Enter Email" className='w-full border rounded px-3 py-2 outline-none' />
        </div>
        <div className='mb-4'>
          <label htmlFor="phone" className='block text-sm font-bold mb-2'>Phone</label>
          <input type="tel" id="phone" placeholder="Enter Number" className='w-full border rounded px-3 py-2 outline-none' />
        </div>
        <div className='mb-4'>
          <label htmlFor="message" className='block text-sm font-bold mb-2'>Message</label>
          <textarea id="message" placeholder="Enter your message" className='w-full border rounded px-3 py-2 outline-none'></textarea>
        </div>
        <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          Update
        </button>
      </div>
    </div>
  </div>
  )
}

export default UpdateCuntact
