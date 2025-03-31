import React from 'react'

import { ContactUs } from './ContactUs'
import { ContactUsForm } from '../components/common/ContactUsForm'

import logo from "../assets/logos/LOLVerse_logo.png"
import laughingemoji from "../assets/images/laughing_emoji.png"
import laughingboy from "../assets/images/blue_laughing_boy.png"
import laughinggroup from "../assets/images/Group_laugh.png"
import Footer from '../components/common/Footer'

export const AboutUs = () => {
    return (
        <div className='mt-24'>
            <div className='gradient-text py-5 text-8xl  px-2 text-center font-semibold'>
                Hey there, Laugh Lovers!
            </div>
            {/* Section 1 */}
            <div className='flex flex-col justify-center py-4 mb-20'>
                <div className='flex flex-row justify-center space-x-4'>
                    <div className='text-7xl my-2 px-2 text-red-600 font-semibold'>
                        Welcome to
                    </div>
                    <div>
                        <img src={logo} alt='Logo' width={400} height={300} loading='lazy' />
                    </div>
                </div>
                <div className='text-5xl text-center text-red-600 font-semibold'>
                    Your One-Stop Solution for Laughter!
                </div>
            </div>

            {/* Section 2 */}
            <div className='flex flex-row my-6 '>
                <div className='w-3/4 ml-20 '>
                    <img src={laughingemoji} alt='Laughing Emoji' width={900} height={340} loading='lazy' />
                </div>
                <div className='w-3/5 mb-10 mt-12 ml-24 mr-32'>
                    <div className='text-[#3c4043] text-6xl font-bold mt-2 mb-2 '>
                        Who We Are
                    </div>
                    <div className='text-[#222324] text-2xl font-semibold'>
                        We're your friendly neighborhood jokesters, meme-makers, and all-around humor enthusiasts
                        who believe life's too short for boring. We bring a splash of fun to every moment,
                        ensuring that laughter is always within reach. From quick-witted quips to hilarious memes,
                        we're here to brighten your day and keep the good times rolling.
                    </div>
                </div>
            </div>


            {/* Section 3 */}
            <div className='flex flex-row my-16 '>
                <div className='flex flex-col w-1/2 mr-36 ml-36'>
                    <div className='mb-6'>
                        <div className='text-[#3c4043] text-6xl font-bold mt-4 mb-2'>
                            What We Do
                        </div>
                        <div className='text-[#222324] text-2xl font-semibold'>
                            We bring you the best of both worlds: English and Hindi jokes and memes
                            that'll have you rolling on the floor with laughter.
                            Think of us as your comedy buffet no calories, just endless laughs.
                            Dive into our treasure trove of jokes and memes, guaranteed to make you laugh till your sides hurt.
                        </div>
                    </div>
                    <div className='mb-10'>
                        <div className='text-[#3c4043] text-6xl font-bold mt-2 mb-2 '>
                            Our mission
                        </div>
                        <div className='text-[#222324] text-2xl font-semibold'>
                            To tickle your funny bone and give your laugh muscles a workout.
                            We’re all about crafting the perfect blend of humor to make you smile and chuckle throughout the day.
                            We’ve got jokes, memes, and hilarious tidbits that'll have you laughing out loud in public places,
                            causing your friends to give you that
                            <span className='font-bold'> "Are you Okay ?"</span> look.
                        </div>
                    </div>
                </div>
                <div className='w-1/2 mr-20 mt-6'>
                    <img src={laughingboy} width={800} height={900} alt="Laughing_Boy" loading="lazy" />
                </div>
            </div>

            {/* Section 4 */}
            <div className='flex flex-row my-6 '>
                <div className='w-3/4 ml-24'>
                    <img src={laughinggroup} alt="Laughing_Group" width={620} height={440} loading="lazy" />
                </div>
                <div className='w-3/5 mb-10 mt-14 ml-24 mr-32'>
                    <div className='text-[#3c4043] text-6xl font-bold mt-2 mb-2 '>
                        Why LOLVerse ?
                    </div>
                    <div className='text-[#222324] text-2xl font-semibold'>
                        Because we're not just a website; we're like your friends group - always ready to share a laugh,
                        make a joke, and make you feel at home. Whether you need a quick escape from the daily grind
                        or someone to brighten your day, we've got the perfect jokes and memes to keep you smiling.😊😊
                    </div>
                </div>
            </div>

            {/* Section 5 */}
            <div className='flex flex-col text-center'>
                <div className='text-[#3c4043] text-6xl font-bold mt-4 mb-2'>
                    Give Us a Laugh - or Some Feedback!
                </div>
                <div className='text-2xl font-semibold text-red-600 text-center mx-80 '>
                    Your opinion matters to us! We want to know what you love, what makes you chuckle, and what could we use a little more.
                    Whether it's a suggestion for a new joke, a meme you think we should see, or just some feedback, we're all ears.
                    Fill out the form below, and let's make LOLVerse even more awesome together!
                </div>
            </div>

            <div className='flex justify-center h-screen ml-[140px] mt-10'>
                <ContactUsForm />
            </div>

            <div className='text-2xl font-semibold text-red-600 text-center mx-80 px-32 -mt-16'>
                We promise to read every message and take your feedback seriously....
                or at least as seriously as we can with a smile on our faces.
                <div>
                    Thanks for helping us keep the laughter rolling!
                </div>
            </div>

            <Footer />
        </div>
    )
}




{/*<div className='h-40 pl-28 mt-28 w-1/2'>
                    <img src={laughinggroup} alt="Laughing_Group" width={620} height={440} loading="lazy" />
                </div> */}


{/* <div className='mb-10'>
                        <div className='text-[#3c4043] text-6xl font-bold mt-4 mb-2'>
                            Why LOLVerse ?
                        </div>
                        <div className='text-[#222324] text-2xl font-semibold'>
                            Because we're not just a website; we're like your friends group—always ready to share a laugh,
                            make a joke, and make you feel at home. Whether you need a quick escape from the daily grind
                            or someone to brighten your day, we've got the perfect jokes and memes to keep you smiling.
                        </div>
                    </div> */}