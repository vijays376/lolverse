import React from 'react'
import { NavLink } from 'react-router-dom'

import { PlayGiggle } from '../components/core/Homepage/PlayGiggle'
import { CardSection } from '../components/core/Homepage/CardSection'
import { Footer } from "../components/common/Footer"

import logo from "../assets/logos/LOLVerse_logo.png"

export const Home = () => {
    return (
        <div className='mt-24'>
            <PlayGiggle />
            <CardSection />

            <div className='text-center font-semibold text-6xl mt-16'>
                <div className='flex flex-row mx-auto justify-center space-x-4 my-4'>
                    <div className='flex flex-col justify-center text-[#3c4043]'>
                        <div className='flex flex-row justify-center space-x-4 my-4'>
                            <div>
                                Want to
                            </div>
                            <div>
                                <NavLink to="/login">
                                    <div className='new-gradient font-bold text-3xl text-lime-300 rounded-full h-12 ml-5 mt-2 p-1 w-80'>
                                        <button>
                                            + Add a Joke/Meme
                                        </button>
                                    </div>
                                </NavLink>
                            </div>


                        </div>

                        <div className='flex flex-row text-5xl space-x-6 my-2'>
                            <div className='mt-3'>
                                to become a part of
                            </div>
                            <div>
                                <img src={logo} alt='Logo' width={300} loading='lazy' />
                            </div>
                            <div className='mt-3'>
                                community.
                            </div>
                        </div>

                        <div className='flex flex-row justify-center my-4 mt-2'>
                            Just a
                            <div>
                                <NavLink to="/login">
                                    <div className=' font-semibold bg-blue-700 text-2xl py-2 px-6 text-white rounded-xl ml-6 tracking-widest h-12 mt-3 mx-4'>
                                        LOGIN
                                    </div>
                                </NavLink>
                            </div>
                            away.
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}
