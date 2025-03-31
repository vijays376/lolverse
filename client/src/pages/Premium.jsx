import React from 'react'

import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";

import paymentImage from "../assets/images/Paytm_UPI.jpg"
import Footer from '../components/common/Footer';

export const Premium = () => {
    return (
        <div className='mt-24 flex flex-col'>
            {/* section 1 */}
            <div className='mx-auto'>
                <div className='text-fuchsia-700 font-bold text-center text-7xl my-2'>
                    Go Premium with LOLVerse!
                </div>
                <div className='text-red-600 text-3xl text-center mx-auto font-semibold w-[1000px]'>
                    Unlock the ultimate LOLVerse experience with our Premium subscription!
                    Get more jokes, more memes, and more laughs with exclusive benefits.
                </div>
            </div>

            {/* Section 2 */}
            <div className='my-20 flex flex-row'>
                <div className='w-1/2 ml-52'>
                    <div className='text-fuchsia-700 font-bold text-4xl mb-6'>
                        Why Upgrade ?
                    </div>
                    <div>
                        <div className='mb-7'>
                            <div className='text-2xl font-bold'>
                                Exclusive Content
                            </div>
                            <div className='text-lg font-medium'>
                                Access jokes and memes you won't find anywhere else.
                            </div>
                        </div>

                        <div className='mb-7'>
                            <div className='text-2xl font-bold'>
                                Ad-Free
                            </div>
                            <div className='text-lg font-medium'>
                                Enjoy an uninterrupted, hilarious experience.
                            </div>
                        </div>

                        <div className='mb-7'>
                            <div className='text-2xl font-bold'>
                                Early Access
                            </div>
                            <div className='text-lg font-medium'>
                                Be the first to see our newest content
                            </div>
                        </div>

                        <div className=''>
                            <div className='text-2xl font-bold'>
                                Unlimited Jokes and Memes
                            </div>
                            <div className='text-lg font-medium'>
                                Dive into an ever-expanding library of jokes and memes without any limits.
                            </div>
                        </div>
                    </div>
                </div>

                <div className='w-1/2 ml-10'>
                    <div className='flex flex-row space-x-16'>
                        <div className=''>
                            <div className='text-fuchsia-600 font-bold text-[30px] text-center mt-4'>
                                Standard
                            </div>
                            <div className='gradient-border text-white text-[34px] text-center px-20 pt-4 space-y-14 h-[335px]'>
                                <FaCheck className='' />
                                <FaCheck className='' />
                                <ImCross className='' />
                                <ImCross className='' />
                            </div>
                            <button className='bg-gradient-premium font-bold text-2xl text-slate-900 rounded-lg h-10 mt-4 px-5 ml-3'>
                            &#8377; 79/month
                            </button>
                        </div>

                        <div className=''>
                            <div className='text-fuchsia-600 font-bold text-[30px] text-center mt-4'>
                                Pro
                            </div>
                            <div className='gradient-border text-white text-[34px] text-center px-20 pt-4 space-y-14 h-[335px]'>
                                <FaCheck className='' />
                                <FaCheck className='' />
                                <FaCheck className='' />
                                <FaCheck className='' />
                            </div>
                            <button className='bg-gradient-premium font-bold text-2xl text-slate-900 rounded-lg h-10 mt-4 px-5 ml-3'>
                                &#8377; 99/month
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 3 */}
            <div className='flex flex-row mt-10 mb-40'>
                <div className='w-9/12 ml-52 '>
                    <div className=' font-bold text-4xl mb-6'>
                        FAQs
                    </div>
                    <div>
                        <div className='mb-7'>
                            <div className='text-2xl font-bold'>
                            How do I access premium content?
                            </div>
                            <div className='text-lg font-medium'>
                            Log in to your account to access exclusive content.
                            </div>
                        </div>

                        <div className='mb-7'>
                            <div className='text-2xl font-bold'>
                            Payment Methods
                            </div>
                            <div className='text-lg font-medium'>
                            Credit/Debit Cards, UPI, Net Banking.
                            </div>
                        </div>

                        <div className='mb-7'>
                            <div className='text-2xl font-bold'>
                            Is my payment info secure?
                            </div>
                            <div className='text-lg font-medium'>
                            Yes, it's encrypted and processed securely.
                            </div>
                        </div>

                        <div className=''>
                            <div className='text-2xl font-bold'>
                            Have any other questions?
                            </div>
                            <div className='text-lg font-medium'>
                            Contact us at dev4vijay@gmail.com
                            </div>
                        </div>
                    </div>
                </div>

                <div className=' mx-28 h-60 mt-8'>
                    <img src={paymentImage} alt="Payment Image" height={500} />
                </div>
            </div>

            <Footer />
        </div>
    )
}
