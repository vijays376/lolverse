import React from 'react'

export const AddEnglishJoke = () => {
    return (
        <div className=''>
            <div className='text-xl font-bold text-blue-800 mb-1'>
                Add English Joke
            </div>

            <div>
                <div>
                    <textarea
                        maxLength={250}
                        placeholder=' Maximum Length: 250 words'
                        className='border-2 border-blue-600 rounded-lg h-72 w-60'>
                    </textarea>
                </div>
                <div className='flex flex-row space-x-2'>
                    <button type='submit'
                        className='mt-1 bg-blue-600 text-xl rounded-lg  font-medium text-white p-1 px-2 space-x-1'>
                        Submit
                    </button>
                    <button
                        className='mt-1 bg-blue-600 text-xl rounded-lg  font-medium text-white p-1 px-2 space-x-1'>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}
