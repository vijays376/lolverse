import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"

import signupFormImg from "../../../assets/images/signup.png"
import { NavLink } from 'react-router-dom'

const SignupForm = () => {

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
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: "",
            })
        }
    }, [reset, isSubmitSuccessful])

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    return (
        <div className="mt-24 flex flex-row justify-center">
            <div className='-ml-28 mt-2'>
                <img
                    src={signupFormImg}
                    alt="Signup Image"
                    width={680}
                    height={504}
                />
            </div>
            <div className='mt-6 ml-16'>
                <div className="gradient-text mb-4">
                    <p className='text-5xl font-bold'>
                        Create an Account
                    </p>
                    <p className='text-lg font-semibold'>
                        Join us to enjoy our Jokes and Memes!
                    </p>
                </div>
                <div className="border-4 border-blue-600 p-3 rounded-xl mr-6">
                    <form
                        onSubmit={handleSubmit(submitSignupForm)}
                    >
                        <div className='flex flex-row space-x-10'>
                            <div className='flex flex-col '>
                                <label htmlFor='firstName' className='font-semibold'>
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    name='firstName'
                                    id="firstName"
                                    placeholder='Enter first name'
                                    className="border-blue-400 border-2 rounded-md pl-1 py-1"
                                    {...register("firstName", { required: true })}
                                />
                                {
                                    errors.firstName && (
                                        <span className="text-[12px] text-red-600">
                                            Please enter your first name.
                                        </span>
                                    )
                                }
                            </div>

                            <div className='flex flex-col '>
                                <label htmlFor='lastName' className='font-semibold'>
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    name='lastName'
                                    id="lastName"
                                    placeholder='Enter last name'
                                    className="border-blue-400 border-2 rounded-md pl-1 py-1"
                                    {...register("lastName")}
                                />
                            </div>
                        </div>
                        <div className='flex flex-col my-4'>
                            <label htmlFor='email' className='font-semibold'>
                                Email Address
                            </label>
                            <input
                                type='email'
                                name='email'
                                id='email'
                                placeholder='Enter your email address'
                                className="border-blue-400 border-2 rounded-md pl-1 py-1"
                                {...register("email", { required: true })}
                            />
                            {
                                errors.email && (
                                    <span className="text-[12px] text-red-600">
                                        Please enter your Email Address
                                    </span>
                                )
                            }
                        </div>

                        <div className='flex flex-row space-x-10'>
                            <div className='flex flex-col'>
                                <label htmlFor='password' className='font-semibold'>
                                    Password
                                </label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name='password'
                                    id='password'
                                    placeholder='Enter password'
                                    className="border-blue-400 border-2 rounded-md pl-1 py-1"
                                    {...register("password", { required: true })}
                                />
                                <span
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute z-[10] cursor-pointer mt-7 ml-40"
                                >
                                    {showPassword ? (
                                        <AiOutlineEyeInvisible fontSize={26} />
                                    ) : (
                                        <AiOutlineEye fontSize={26} />
                                    )}
                                </span>
                                {
                                    errors.password && (
                                        <span className="text-[12px] text-red-600">
                                            Please enter your password
                                        </span>
                                    )
                                }
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor='confirmPassword' className='font-semibold'>
                                    Confirm Password
                                </label>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name='confirmPassword'
                                    id='confirmPassword'
                                    placeholder='Enter confirm password'
                                    className="border-blue-400 border-2 rounded-md pl-1 py-1"
                                    {...register("confirmPassword", { required: true })}
                                />
                                <span
                                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                                    className="absolute z-[10] cursor-pointer mt-7 ml-40"
                                >
                                    {showConfirmPassword ? (
                                        <AiOutlineEyeInvisible fontSize={26} />
                                    ) : (
                                        <AiOutlineEye fontSize={26} />
                                    )}
                                </span>
                                {
                                    errors.confirmPassword && (
                                        <span className="text-[12px] text-red-600">
                                            Please enter confirm password
                                        </span>
                                    )
                                }
                            </div>
                        </div>
                        <button
                            type='submit'
                            className='w-full mt-6 bg-blue-600 text-2xl rounded-md  font-medium text-white p-1 space-x-1'
                        >
                            Create Account
                        </button>
                    </form>
                </div>

                <div className="flex flex-col mt-2 font-normal">
                    <div className="flex flex-row space-x-1">
                        <p>By signing up, you agree to our</p>
                        <button className='text-blue-600 font-medium '>Terms and Conditions</button>
                    </div>
                    <div className="flex flex-row space-x-1">
                        <p>Already have an account?</p>
                        <NavLink to="/login">
                            <button className='text-blue-600 font-medium '>Login</button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignupForm














// import { useState } from "react"
// // import { toast } from "react-hot-toast"
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
// import { useDispatch } from "react-redux"
// import { useNavigate } from "react-router-dom"

// // import { sendOtp } from "../../../services/operations/authAPI"
// import { setSignupData } from "../../../slices/authSlice"
// import signupFormImg from "../../../assets/images/signup.png"

// function SignupForm() {
//     const navigate = useNavigate()
//     const dispatch = useDispatch()

//     const [formData, setFormData] = useState({
//         firstName: "",
//         lastName: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//     })

//     const [showPassword, setShowPassword] = useState(false)
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false)

//     const { firstName, lastName, email, password, confirmPassword } = formData

//     // Handle input fields, when some value changes
//     const handleOnChange = (e) => {
//         setFormData((prevData) => ({
//             ...prevData,
//             [e.target.name]: e.target.value,
//         }))
//     }

//     // Handle Form Submission
//     const handleOnSubmit = (e) => {
//         e.preventDefault()

//         if (password !== confirmPassword) {
//             //   toast.error("Passwords Do Not Match")
//             return;
//         }
//         const signupFormData = {
//             ...formData,
//         }

//         // Setting signupForm data to state
//         // To be used after otp verification
//         dispatch(setSignupData(signupFormData))
//         // Send OTP to user for verification
//         // dispatch(sendOtp(formData.email, navigate))

//         // Reset
//         setFormData({
//             firstName: "",
//             lastName: "",
//             email: "",
//             password: "",
//             confirmPassword: "",
//         })

//     }

//     return (
//         <div className="mt-24 flex flex-row justify-center">
//             <div className="">
//                 <img
//                     src={signupFormImg}
//                     alt="SignUpForm Image"
//                     width={558}
//                     height={504}
//                     loading="lazy"
//                 />
//             </div>
//             <div>
//                 <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
//                     <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
//                         Create an Account
//                     </h1>
//                     <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
//                         <span className="text-richblack-100">Join us to enjoy our Jokes and Memes!</span>{" "}
//                         {/* <span className="font-edu-sa font-bold italic text-blue-100">
//               {description2}
//             </span> */}
//                     </p>
//                 </div>
//                 <div className="border-4 border-blue-600 p-3 rounded-xl mr-6">
//                     <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4">
//                         <div className="flex gap-x-4">
//                             <label>
//                                 <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
//                                     First Name <sup className="text-pink-200">*</sup>
//                                 </p>
//                                 <input
//                                     required
//                                     type="text"
//                                     name="firstName"
//                                     value={firstName}
//                                     onChange={handleOnChange}
//                                     placeholder="Enter first name"
//                                     style={{
//                                         boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
//                                     }}
//                                     className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
//                                 />
//                             </label>
//                             <label>
//                                 <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
//                                     Last Name <sup className="text-pink-200">*</sup>
//                                 </p>
//                                 <input
//                                     required
//                                     type="text"
//                                     name="lastName"
//                                     value={lastName}
//                                     onChange={handleOnChange}
//                                     placeholder="Enter last name"
//                                     style={{
//                                         boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
//                                     }}
//                                     className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
//                                 />
//                             </label>
//                         </div>
//                         <label className="w-full">
//                             <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
//                                 Email Address <sup className="text-pink-200">*</sup>
//                             </p>
//                             <input
//                                 required
//                                 type="text"
//                                 name="email"
//                                 value={email}
//                                 onChange={handleOnChange}
//                                 placeholder="Enter email address"
//                                 style={{
//                                     boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
//                                 }}
//                                 className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
//                             />
//                         </label>
//                         <div className="flex gap-x-4">
//                             <label className="relative">
//                                 <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
//                                     Create Password <sup className="text-pink-200">*</sup>
//                                 </p>
//                                 <input
//                                     required
//                                     type={showPassword ? "text" : "password"}
//                                     name="password"
//                                     value={password}
//                                     onChange={handleOnChange}
//                                     placeholder="Enter Password"
//                                     style={{
//                                         boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
//                                     }}
//                                     className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
//                                 />
//                                 <span
//                                     onClick={() => setShowPassword((prev) => !prev)}
//                                     className="absolute right-3 top-[38px] z-[10] cursor-pointer"
//                                 >
//                                     {showPassword ? (
//                                         <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
//                                     ) : (
//                                         <AiOutlineEye fontSize={24} fill="#AFB2BF" />
//                                     )}
//                                 </span>
//                             </label>
//                             <label className="relative">
//                                 <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
//                                     Confirm Password <sup className="text-pink-200">*</sup>
//                                 </p>
//                                 <input
//                                     required
//                                     type={showConfirmPassword ? "text" : "password"}
//                                     name="confirmPassword"
//                                     value={confirmPassword}
//                                     onChange={handleOnChange}
//                                     placeholder="Confirm Password"
//                                     style={{
//                                         boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
//                                     }}
//                                     className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
//                                 />
//                                 <span
//                                     onClick={() => setShowConfirmPassword((prev) => !prev)}
//                                     className="absolute right-3 top-[38px] z-[10] cursor-pointer"
//                                 >
//                                     {showConfirmPassword ? (
//                                         <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
//                                     ) : (
//                                         <AiOutlineEye fontSize={24} fill="#AFB2BF" />
//                                     )}
//                                 </span>
//                             </label>
//                         </div>
//                         <button
//                             type="submit"
//                             className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
//                         >
//                             Create Account
//                         </button>
//                     </form>
// <div className="flex flex-col">
//     <div className="flex flex-row">
//         <p>By signing up, you agree to our </p>
//         <button>Terms and Conditions</button>
//     </div>
//     <div className="flex flex-row">
//         <p>Already have an account?</p>
//         <button>Log in</button>
//     </div>
// </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default SignupForm