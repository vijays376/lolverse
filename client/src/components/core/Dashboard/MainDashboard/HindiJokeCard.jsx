import React from 'react'

import hinditemplate from "../../../../assets/images/hindi_joke_template_3.jpg"
import { CardReaction } from '../../Homepage/CardReaction'

export const HindiJokeCard = ({ lines, wordsPerLine }) => {
    return (
        <div className='flex flex-col gradient-border'>
            <div className='flex flex-col'>
                <div className='relative'>
                    <img className=" h-96"
                        src={hinditemplate} alt='No Joke Found, Try Again'
                    />
                </div>
                <div className='absolute yatra-one-regular text-xl text-center text-black'>
                    {
                        wordsPerLine === 7 ?
                            <div className='ml-8 mt-2'>
                                {
                                    lines.map((line, index) => (
                                        <p key={index}>{line}</p>
                                    ))
                                }
                            </div>
                            : wordsPerLine === 6 ?
                                <div className='ml-10 mt-7'>
                                    {
                                        lines.map((line, index) => (
                                            <p key={index}>{line}</p>
                                        ))
                                    }
                                </div>
                                : wordsPerLine === 5 ?
                                    <div className='ml-14 mt-9'>
                                        {
                                            lines.map((line, index) => (
                                                <p key={index}>{line}</p>
                                            ))
                                        }
                                    </div>
                                    :
                                    <div className='ml-[88px] mt-12'>
                                        {
                                            lines.map((line, index) => (
                                                <p key={index}>{line}</p>
                                            ))
                                        }
                                    </div>
                    }
                </div>
            </div>

            <CardReaction />
        </div>
    )
}
