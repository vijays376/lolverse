import React from 'react'

export const Logout = () => {
  return (
    <div className='pl-4 '>
      <div className='text-3xl font-bold mb-4'>
        Logout
      </div>
      <div>
        <p className='text-2xl font-semibold'>
          Are you sure want to Logout ?
        </p>
        <button
        className='mt-3 bg-blue-600 text-2xl rounded-md  font-medium text-white p-1 px-2 space-x-1'>
          {/* onClick navigate to Login page */}
          Logout
        </button>
      </div>
    </div>
  )
}
