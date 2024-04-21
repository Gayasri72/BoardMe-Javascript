import React from 'react'

function ContactUs() {
  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name :</label>
        <input type="text" id="name" name="name" onChange={handleOnChange} value={rest.name} />

        <label htmlFor="email">Email :</label>
        <input type="email" id="email" name="email" onChange={handleOnChange} value={rest.email || ''} />

        <label htmlFor="mobile">Mobile :</label>
        <input type="number" id="mobile" name="mobile" onChange={handleOnChange} value={rest.mobile || ''} />

        <button className="btn" type="submit">Submit</button>
      </form>
      
    </div>
  )
}

export default ContactUs
