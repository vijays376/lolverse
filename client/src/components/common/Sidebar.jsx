import React from 'react'
import { NavLink } from 'react-router-dom';

import { MdDashboard } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import { IoIosAddCircleOutline } from "react-icons/io";
import { BsCurrencyRupee } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { RiLogoutBoxLine } from "react-icons/ri";

export const Sidebar = () => {
    return (
        <div className='mt-[73px] border-r-2 border-b-2 h-[297px]'>
            <NavLink to="/dashboard/main-dashboard"
                className={({ isActive }) => isActive ? 'text-[#fc1c76]' : 'hover:text-fuchsia-500'}>
                <div className='flex flex-row space-x-2  border-b-2 px-2 py-2'>
                    <MdDashboard className='text-[30px]' />
                    <div className='font-semibold text-2xl '>
                        Dashboard
                    </div>
                </div>
            </NavLink>

            <NavLink to="/dashboard/my-profile"
                className={({ isActive }) => isActive ? 'text-[#fc1c76]' : 'hover:text-fuchsia-500'}>
                <div className='flex flex-row space-x-2  border-b-2 px-2 py-2'>
                    <VscAccount className='text-[30px]' />
                    <div className='font-semibold text-2xl '>
                        My Profile
                    </div>
                </div>
            </NavLink>

            <NavLink to="/dashboard/add-joke-meme"
                className={({ isActive }) => isActive ? 'text-[#fc1c76]' : 'hover:text-fuchsia-500'}>
                <div className='flex flex-row space-x-2  border-b-2 px-2 py-2'>
                    <IoIosAddCircleOutline className='text-[30px]' />
                    <div className='font-semibold text-2xl '>
                        Add Joke/Meme
                    </div>
                </div>
            </NavLink>

            <NavLink to="/dashboard/premium-details"
                className={({ isActive }) => isActive ? 'text-[#fc1c76]' : 'hover:text-fuchsia-500'}>
                <div className='flex flex-row space-x-2  border-b-2 px-2 py-2'>
                    <BsCurrencyRupee className='text-[30px]' />
                    <div className='font-semibold text-2xl '>
                        Premium Details
                    </div>
                </div>
            </NavLink>

            <NavLink to="/dashboard/settings"
                className={({ isActive }) => isActive ? 'text-[#fc1c76]' : 'hover:text-fuchsia-500'}>
                <div className='flex flex-row space-x-2  border-b-2 px-2 py-2'>
                    <IoSettingsOutline className='text-[30px]' />
                    <div className='font-semibold text-2xl '>
                        Settings
                    </div>
                </div>
            </NavLink>

            <NavLink to="/dashboard/logout"
                className={({ isActive }) => isActive ? 'text-[#fc1c76]' : 'hover:text-fuchsia-500'}>
                <div className='flex flex-row space-x-2 border-b-2 px-2 py-2'>
                    <RiLogoutBoxLine className='text-[30px]' />
                    <div className='font-semibold text-2xl '>
                        Logout
                    </div>
                </div>
            </NavLink>

        </div>
    )
}
export default Sidebar