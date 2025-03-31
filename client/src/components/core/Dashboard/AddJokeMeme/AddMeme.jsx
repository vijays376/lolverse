import React from 'react'

export const AddMeme = () => {
    return (
        <div className=''>
            <div className='text-xl font-bold text-blue-800 mb-1'>
                Add Meme Image
            </div>

            <div>
                <div>
                    <input
                        type='file'
                        name='memeImage'
                        id='memeImage'
                        accept="image/*"
                        placeholder='Choose Meme Image'
                        className="border-blue-400 w-[266px] border-2 rounded-md pl-1 py-1"
                    />
                </div>
                <div className='flex flex-row space-x-2 mt-2'>
                    <button type='submit'
                        className=' bg-blue-600 text-xl rounded-lg  font-medium text-white p-1 px-2 space-x-1'>
                        Submit
                    </button>
                    <button
                        className=' bg-blue-600 text-xl rounded-lg  font-medium text-white p-1 px-2 space-x-1'>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}
