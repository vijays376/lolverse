import React from 'react'

import { MdComment } from "react-icons/md";
import { RiShareForwardFill } from "react-icons/ri";

import { AnimatedEmoji } from './AnimatedEmoji'
import LottieEmoji from './LaughEmoji';

export const CardReaction = () => {
    return (
        <div className='flex flex-row'>
            <div className='w-8/12'>
                <AnimatedEmoji />
            </div>
            <div className='flex flex-row w-5/12 justify-around mt-2 '>
                <div>
                    <MdComment className='size-16 cursor-pointer' />
                </div>
                <div>
                    <RiShareForwardFill className='size-16 cursor-pointer' />
                </div>
            </div>
        </div>
    )
}
