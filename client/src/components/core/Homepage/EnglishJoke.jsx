import React from 'react'

import englishtemplate from "../../../assets/images/english_joke_template.jpg"
import { CardReaction } from './CardReaction'

export const EnglishJoke = ({ ques, ans }) => {
    return (
        <div className='flex flex-col gradient-border'>
            <div className='flex flex-col'>
                <div className='relative'>
                    <img className=" h-96 w-[370px]"
                        src={englishtemplate} alt='No Joke Found, Try Again'
                    />
                </div>
                <div className='absolute mt-1 ml-32'>
                    <div className='noto-sans text-xl  text-black ml-10 mt-2 text-center border-black border-1'>
                        <span className='font-bold'>Ques: </span>
                        <div className='font-semibold'>
                            {
                                ques.map((que, index) => (
                                    <p key={index}>{que}</p>
                                ))
                            }
                        </div>
                    </div>
                    <div className='noto-sans text-lg font-medium text-black ml-10 mt-2 text-center border-black border-1'>
                        <span className='font-bold'>Ans: </span>
                        <div className='font-medium'>
                            {
                                ans.map((an, index) => (
                                    <p key={index}>{an}</p>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>

            <CardReaction />
        </div>
    )
}
