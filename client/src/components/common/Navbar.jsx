import React from 'react'
import { NavLink, } from "react-router-dom"



import logo from "../../assets/logos/LOLVerse_logo.png"


export const Navbar = () => {
    return (
        <div className='flex flex-col fixed bg-white z-50 w-full mb-7'>
            <nav>
                <div className='flex flex-row'>
                    <div className='flex flex-row ml-3'>
                        <NavLink to="/">
                            <img src={logo} alt='Logo' className='mt-2' width={220} loading='lazy' />
                        </NavLink>
                        <div className='flex flex-row ml-4 '>
                            <input className='relative space-x-1 bg-slate-300  text-xl pl-4 pr-2 rounded-full h-10 mt-5 border-blue-600 border-2'
                                type='text'
                                placeholder='Search'
                            />
                            <button className='absolute font-medium bg-blue-700 text-xl text-white rounded-full px-3 h-[33px] mt-6 ml-[165px]'>
                                Search
                            </button>
                        </div>
                    </div>

                    <div className='flex flex-row ml-28'>
                        <NavLink to="/login">
                            <div className='new-gradient font-bold text-xl text-lime-300 rounded-full h-9  mt-5 py-1 px-2'>
                                <button className='flex flex-row'>
                                    +Add Joke/Meme
                                </button>
                            </div>
                        </NavLink>


                        <div className='flex flex-row w-20 ml-10 space-x-10 mt-[22px] justify-between'>
                            <NavLink to="/"
                                className={({ isActive }) => isActive ? 'text-[#fc1c76]' : 'hover:text-fuchsia-500'
                                }>
                                <div className='font-bold text-2xl'>
                                    <button className=''>
                                        Home
                                    </button>
                                </div>
                            </NavLink>
                            <NavLink to="/about"
                                className={({ isActive }) => isActive ? 'text-[#fc1c76]' : 'hover:text-fuchsia-500'
                                }>
                                <div className=' font-bold text-2xl '>
                                    <button className=''>
                                        About
                                    </button>
                                </div>
                            </NavLink>
                            <NavLink to="/contact"
                                className={({ isActive }) => isActive ? 'text-[#fc1c76]' : 'hover:text-fuchsia-500'
                                }>
                                <div className=' font-bold text-2xl '>
                                    <button>
                                        Contact
                                    </button>
                                </div>
                            </NavLink>
                        </div>

                        <div className='flex flex-row space-x-2 mt-5 ml-[275px]'>
                            <NavLink to="/signup">
                                <div className=' font-medium rounded-md p-1 px-2 bg-blue-700 text-xl text-white'>
                                    <button>
                                        Signup
                                    </button>
                                </div>
                            </NavLink>
                            <NavLink to="/login">
                                <div className=' font-medium rounded-md p-1 px-2 bg-blue-700 text-xl text-white'>
                                    <button className='pb-0'>
                                        Login
                                    </button>
                                </div>
                            </NavLink>
                        </div>

                        <div>
                            <NavLink to="/premium">
                                <div className='bg-gradient-premium font-bold text-2xl mt-4 ml-4 text-white rounded-lg px-4 p-1 h-10'>
                                    <button className='text-fuchsia-700'>
                                        Premium
                                    </button>
                                </div>
                            </NavLink>
                        </div>

                    </div>
                </div>
                <div className='w-full border-y border-slate-300 mt-1'>

                </div>
            </nav>
        </div>
    )
}
