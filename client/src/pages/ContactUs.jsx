import React from 'react'

import { SlLocationPin } from "react-icons/sl";
import { SiGmail } from "react-icons/si";
import { LuPhoneCall } from "react-icons/lu";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { FaLinkedin } from "react-icons/fa";


import { ContactUsForm } from '../components/common/ContactUsForm'
import Footer from '../components/common/Footer';


export const ContactUs = () => {
    return (
        <div className='mt-24'>
            <div className='gradient-text py-5 text-7xl  px-2 text-center font-semibold'>
                Get in touch with Us
            </div>

            <div className='flex flex-row mt-20 ml-40 mb-80'>
                <div className='flex flex-col w-1/2 '>
                    <div className='text-[#222324]  gradient-text  text-5xl font-bold mb-3'>
                        Our Official Details
                    </div>
                    <div className='flex flex-row my-6'>
                        <div className='text-6xl text-green-600'>
                            <SlLocationPin />
                        </div>
                        <div className='text-4xl my-2 ml-6'>
                            Indore M.P. 453332
                        </div>
                    </div>

                    <div className='flex flex-row my-6'>
                        <div className='text-6xl text-rose-600'>
                            <SiGmail />
                        </div>
                        <div className='text-4xl my-2 ml-6'>
                            dev4vijay@gmail.com
                        </div>
                    </div>

                    <div className='flex flex-row my-6'>
                        <div className='text-6xl text-indigo-500'>
                            <LuPhoneCall />
                        </div>
                        <div className='text-4xl my-2 ml-6'>
                            77XXXXXX05
                        </div>
                    </div>

                    <div className='flex flex-col my-6'>
                        <div className='text-[#222324] text-4xl my-3 font-semibold'>
                            Follow us on Social Media
                        </div>
                        <div className='flex flex-row space-x-3 text-4xl'>
                            <BsTwitterX />
                            <FcGoogle />
                            <FaYoutube className='text-rose-600'/>
                            <FaInstagram className='text-red-600'/>
                            <FaFacebook className='text-indigo-500'/>
                            <FaLinkedin className='text-violet-900'/>
                        </div>
                    </div>
                </div>

                <div className='w-1/2'>
                    <ContactUsForm />
                </div>
            </div>

            <Footer />
        </div>
    )
}