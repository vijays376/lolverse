import React from 'react'

import { CardReaction } from '../../Homepage/CardReaction'

import logo from "../../../../assets/logos/LOLVerse_logo.png"

export const MemeCard = ({ memeimageurl }) => {
    return (
        <div className='flex flex-col gradient-border'>
            <div className='flex flex-col'>
                <div className='relative '>
                    <img className=" h-96 w-[370px]"
                        src={memeimageurl} alt='No Meme Found, Try Again'
                        loading='lazy'
                    />
                </div>
                <div className='absolute bg-indigo-500 w-20 mt-[362px]'>
                    <img
                        src={logo}
                        alt='Logo'
                        loading='lazy'
                    />
                </div>
            </div>

            <CardReaction />
        </div>
    )
}
