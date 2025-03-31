import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { FaRegEdit } from "react-icons/fa";

import CountryCode from "../../../data/countrycode.json"
import user from "../../../data/user"
import bittusharma from "../../../assets/images/bittusharmamiddle.png"

export const MyProfile = () => {

  const [enable, setEnabled] = useState(true)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm()

  const submitSignupForm = async (data) => {
    console.log("Signup Data: ", data);
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        userName: "",
        email: "",
        firstName: "",
        lastName: "",
        mobileNumber: "",
        dateOfBirth: "",
        gender: "",
        bio: "",
      })
    }
  }, [reset, isSubmitSuccessful])

  const {
    firstName,
    lastName,
    email,
    dateOfBirth,
    gender,
    mobileNumber,
    profilePhoto,
    bio,
  } = user

  return (
    <div className='pl-4'>
      <div className='text-3xl font-bold mb-2'>
        My Profile
      </div>

      <div className=''>
        <div className='flex flex-row justify-between'>
          <div className='text-xl font-bold'>
            Profile Details
          </div>

          <button className='flex flex-row bg-blue-600 text-xl rounded-lg -mt-3 font-medium text-white p-1 px-2 space-x-1 mr-8 mb-1'
            onClick={() => {
              setEnabled(false)
            }}>
            <FaRegEdit className='text-[27px]' />
            <p>
              Edit
            </p>
          </button>
        </div>

        <div className='w-[705px]'>
          <div className=" border-4 border-blue-600 p-3 rounded-xl mr-6">
            <form
              onSubmit={handleSubmit(submitSignupForm)}
            >
              <div className='flex flex-row space-x-28'>
                <div className='flex flex-col mb-4'>
                  <label htmlFor='userName' className='font-semibold'>
                    Username
                  </label>
                  <input
                    type='text'
                    name='userName'
                    id='userName'
                    placeholder='Enter your Username'
                    disabled={enable}
                    className="border-blue-400 border-2 rounded-md pl-1 py-1 pr-20"
                    {...register("userName", { required: true })}
                    defaultValue={user?.userName}
                  />
                  {
                    errors.userName && (
                      <span className="text-[12px] text-red-600">
                        Please enter your Username
                      </span>
                    )
                  }
                </div>

                <div className='flex flex-col mb-4'>
                  <label htmlFor='email' className='font-semibold'>
                    Email Address
                  </label>
                  <input
                    type='email'
                    name='email'
                    id='email'
                    disabled={enable}
                    placeholder='Enter your email address'
                    className="border-blue-400 border-2 rounded-md pl-1 py-1 pr-20"
                    {...register("email", { required: true })}
                    defaultValue={user?.email}
                  />
                  {
                    errors.email && (
                      <span className="text-[12px] text-red-600">
                        Please enter your Email Address
                      </span>
                    )
                  }
                </div>
              </div>
              <div className='flex flex-row space-x-28'>
                <div className='flex flex-col '>
                  <label htmlFor='firstName' className='font-semibold'>
                    First Name
                  </label>
                  <input
                    type="text"
                    name='firstName'
                    id="firstName"
                    placeholder='Enter first name'
                    disabled={enable}
                    className="border-blue-400 border-2 rounded-md pl-1 py-1 pr-20"
                    {...register("firstName", { required: true })}
                    defaultValue={user?.firstName}
                  />
                  {
                    errors.firstName && (
                      <span className="text-[12px] text-red-600">
                        Please enter your first name.
                      </span>
                    )
                  }
                </div>

                <div className='flex flex-col'>
                  <label htmlFor='lastName' className='font-semibold'>
                    Last Name
                  </label>
                  <input
                    type="text"
                    name='lastName'
                    id="lastName"
                    placeholder='Enter last name'
                    disabled={enable}
                    className="border-blue-400 border-2 rounded-md pl-1 py-1 pr-20"
                    {...register("lastName")}
                    defaultValue={user?.lastName}
                  />
                </div>
              </div>

              <div className='flex flex-row my-4 space-x-28'>
                <div className=''>
                  <label htmlFor="mobileNumber" className="font-semibold">
                    Mobile Number
                  </label>

                  <div className="flex gap-3">
                    <div className="flex flex-col w-[87px]">
                      <select
                        type="text"
                        name="countrycode"
                        id="countrycode"
                        className="border-blue-400 border-2 rounded-md pl-1 py-1"
                        disabled={enable}
                        {...register("countrycode", { required: true })}
                      >
                        {CountryCode.map((ele, i) => {
                          return (
                            <option key={i} value={ele.code}>
                              {ele.code}-{ele.country}
                            </option>
                          )
                        })}
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <input
                        type="number"
                        name="mobileNumber"
                        id="mobileNumber"
                        placeholder="9876543210"
                        inputMode='numeric'
                        disabled={enable}
                        className="border-blue-400 w-[170px] border-2 rounded-md pl-1 py-1 tracking-widest"
                        {...register("mobileNumber", {
                          required: {
                            value: true,
                            message: "Please enter your Mobile Number.",
                          },
                          maxLength: { value: 10, message: "Invalid Mobile Number" },
                          minLength: { value: 10, message: "Invalid Mobile Number" },
                        })}
                        defaultValue={user?.mobileNumber}
                      />
                    </div>
                  </div>
                  {errors.mobileNumber && (
                    <span className="-mt-1 text-[12px] text-red-600">
                      {errors.mobileNumber.message}
                    </span>
                  )}
                </div>
                <div>
                  <label htmlFor='profilePhoto' className='font-semibold'>
                    Profile Photo
                  </label>
                  <input
                    type='file'
                    name='profilePhoto'
                    id='profilePhoto'
                    placeholder='Choose Profile Photo'
                    disabled={enable}
                    className="border-blue-400 w-[266px] border-2 rounded-md pl-1 py-1"
                    {...register("profilePhoto", { required: true })}
                  // defaultValue={user?.profilePhoto}
                  />
                  {
                    errors.profilePhoto && (
                      <span className="text-[12px] text-red-600">
                        Please choose your Profile Photo
                      </span>
                    )
                  }
                </div>
              </div>

              <div className='flex flex-row space-x-60 my-4'>
                <div className='flex flex-col'>
                  <label htmlFor='dateOfBirth' className='font-semibold'>
                    Date of Birth
                  </label>
                  <input
                    type='date'
                    name='dateOfBirth'
                    id='dateOfBirth'
                    placeholder='Enter Date of Birth'
                    disabled={enable}
                    className="border-blue-400 border-2 rounded-md pl-1 py-1"
                    {...register("dateOfBirth", { required: true })}
                    defaultValue={user?.dateOfBirth}
                  />
                  {
                    errors.dateOfBirth && (
                      <span className="text-[12px] text-red-600">
                        Please enter your Date Of Birth
                      </span>
                    )
                  }
                </div>
                <div className='flex flex-col w-20'>
                  <label htmlFor='gender' className='font-semibold'>
                    Gender
                  </label>
                  <select
                    type="text"
                    name="gender"
                    id="gender"
                    placeholder="Select Gender"
                    disabled={enable}
                    className="border-blue-400 border-2 rounded-md pl-1 py-1"
                    {...register("gender", { required: true })}
                    defaultValue={user?.gender}>

                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className='flex flex-col'>
                <label htmlFor='bio' className='font-semibold'>
                  Bio
                </label>
                <textarea
                  name="bio"
                  id="bio"
                  cols="30"
                  rows="3"
                  placeholder="Add bio"
                  disabled={enable}
                  className="border-blue-400 border-2 rounded-md pl-1 py-1"
                  {...register("bio", { required: true })}
                  defaultValue={user?.bio}
                />
                {errors.message && (
                  <span className="-mt-1 text-[12px] text-red-600">
                    *Please enter your bio.
                  </span>
                )}
              </div>
              <div className='flex flex-row space-x-2'>
                <button type='submit'
                  disabled={enable}
                  className='mt-6 bg-blue-600 text-2xl rounded-lg  font-medium text-white p-1 px-2 space-x-1'>
                  Save
                </button>
                <button
                  disabled={enable}
                  className='mt-6 bg-blue-600 text-2xl rounded-lg  font-medium text-white p-1 px-2 space-x-1'>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
