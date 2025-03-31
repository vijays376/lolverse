import React from 'react'

export const Settings = () => {
  return (
    <div className='pl-4 '>
      <div className='text-3xl font-bold mb-2'>
        Settings
      </div>
      <div>
          <p className='text-2xl font-semibold'>
            Are you sure want to delete your account ?
          </p>
          <p className='-mt-1 text-red-600 font-medium'>
            It will delete all your information present on the application.
          </p>
          <button
            className='mt-3 bg-rose-600 text-2xl rounded-md  font-medium text-white p-1 px-2 space-x-1'>
            {/* onClick navigate to Login page */}
            Delete Account
          </button>
        </div>
    </div>
  )
}
