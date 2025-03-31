import React from 'react'

import bittusharma from "../../assets/images/bittusharmamiddle.png"

export const UserDetails = () => {

    const username = "user123"
    const email = "user123@gmail.com"
    const bio = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum velit magnam quod reiciendis corporis necessitatibus sequi obcaecati dolores harum optio!"

    return (
        <div className=''>
            <div className='flex flex-row space-x-4 '>
                <img
                    className='rounded-full bg-black h-24'
                    src={bittusharma}
                />
                <div className='text-[18px] font-normal pt-6'>
                    <p>Username: <span className='font-medium'>{username}</span></p>
                    <p>Email Address: <span className='font-medium'>{email}</span></p>
                </div>
            </div>
            <div className='mt-2'>
                <div className='text-xl font-semibold'>
                    Bio
                </div>
                <p className='border-2 h-[110px] w-[1000px] mt-1'>
                    {bio}
                </p>
            </div>
        </div>
    )
}
