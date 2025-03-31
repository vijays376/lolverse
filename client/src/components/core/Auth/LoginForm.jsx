import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"

import loginImg from "../../../assets/images/login.png"
import { NavLink } from 'react-router-dom'

const LoginForm = () => {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm()

  const submitLoginForm = async (data) => {
    console.log("Login Data: ", data);
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        password: "",
      })
    }
  }, [reset, isSubmitSuccessful])

  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className='mt-24 flex flex-row justify-center'>
      <div className='mt-10 ml-40'>
        <div className="gradient-text mb-4">
          <p className='text-5xl font-bold'>
            Welcome Back!
          </p>
          <p className='text-lg font-semibold'>
            Please Login to Continue.
          </p>
        </div>
        <div className="border-4 border-blue-600 p-3 rounded-xl mr-6 w-[400px]">
          <form
            onSubmit={handleSubmit(submitLoginForm)}
          >
            <div className='flex flex-col my-4'>
              <label htmlFor='username' className='font-semibold'>
                Username
              </label>
              <input
                type='username'
                name='userName'
                id='userName'
                placeholder='Enter Username'
                className="border-blue-400 border-2 rounded-md pl-1 py-1"
                {...register("userName")}
              />
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
                {...register("email")}
              />
              {
                errors.email && (
                  <span>
                    Please enter your Email Address
                  </span>
                )
              }
            </div>
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
                className="absolute z-[10] cursor-pointer mt-7 ml-[21rem]"
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
            <div className='flex justify-end'>
              <NavLink to="/forgot-password">
                <button className='text-blue-600 font-medium'>
                  Forgot Password?
                </button>
              </NavLink>
            </div>
            <button
              type='submit'
              className='w-full mt-6 bg-blue-600 text-2xl rounded-md  font-medium text-white p-1 space-x-1'
            >
              Login
            </button>
          </form>
        </div>
        <div className="flex flex-col mt-2 font-normal">
          <div className="flex flex-row space-x-1">
            <div className="flex flex-row space-x-1">
              <p>By Logging in, you agree to our</p>
              <button className='text-blue-600 font-medium '>Terms and Conditions</button>
            </div>
          </div>
          <div className="flex flex-row space-x-1">
            <p>
              Don't have an account?
            </p>
            <NavLink to="/signup">
              <button className='text-blue-600 font-medium'>Create One</button>
            </NavLink>
          </div>
        </div>
      </div>
      <div className='ml-20 -mt-3'>
        <img
          src={loginImg}
          alt="Login Image"
          width={600}
          height={504}
        />
      </div>
    </div>
  )
}

export default LoginForm















// import { useState } from "react"
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
// import { useDispatch } from "react-redux"
// import { Link, useNavigate } from "react-router-dom"

// // import { login } from "../../../services/operations/authAPI"
// import loginImg from "../../../assets/images/login.png"

// function LoginForm() {
//   const navigate = useNavigate()
//   const dispatch = useDispatch()
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   })

//   const [showPassword, setShowPassword] = useState(false)

//   const { email, password } = formData

//   const handleOnChange = (e) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       [e.target.name]: e.target.value,
//     }))
//   }

//   const handleOnSubmit = (e) => {
//     e.preventDefault()
//     // dispatch(login(email, password, navigate))
//   }

//   return (
//     <div className="mt-24 flex flex-row">
//       <div className="">
//         <form
//           onSubmit={handleOnSubmit}
//           className="mt-6 flex w-full flex-col gap-y-4"
//         >
//           <label className="w-full">
//             <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
//               Email Address <sup className="text-pink-200">*</sup>
//             </p>
//             <input
//               required
//               type="text"
//               name="email"
//               value={email}
//               onChange={handleOnChange}
//               placeholder="Enter email address"
//               style={{
//                 boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
//               }}
//               className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
//             />
//           </label>
//           <label className="relative">
//             <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
//               Password <sup className="text-pink-200">*</sup>
//             </p>
//             <input
//               required
//               type={showPassword ? "text" : "password"}
//               name="password"
//               value={password}
//               onChange={handleOnChange}
//               placeholder="Enter Password"
//               style={{
//                 boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
//               }}
//               className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
//             />
//             <span
//               onClick={() => setShowPassword((prev) => !prev)}
//               className="absolute right-3 top-[38px] z-[10] cursor-pointer"
//             >
//               {showPassword ? (
//                 <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
//               ) : (
//                 <AiOutlineEye fontSize={24} fill="#AFB2BF" />
//               )}
//             </span>
//             <Link to="/forgot-password">
//               <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
//                 Forgot Password
//               </p>
//             </Link>
//           </label>
//           <button
//             type="submit"
//             className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
//           >
//             Login
//           </button>
//         </form>
//         <div className="flex flex-col">
//           {/* <div className="flex flex-row">
//           <p>By signing up, you agree to our </p>
//           <button>Terms and Conditions</button>
//         </div> */}
//           <div className="flex flex-row">
//             <p>Don't have an account?</p>
//             <button>Create One</button>
//           </div>
//         </div>
//       </div>
//       <div>
//         <img
//           src={loginImg}
//           alt="Login Image"
//           width={558}
//           height={504}
//           loading="lazy"
//         />
//       </div>
//     </div>
//   )
// }

// export default LoginForm



















// // import loginImg from "../assets/images/login.png"
// // import Template from "../components/core/Auth/Template"

// // function Login() {
// //   return (
// //     <Template
// //       title="Welcome Back!"
// //       description1="Please log in to continue."
// //       // description2="Education to future-proof your career."
// //       image={loginImg}
// //       formType="login"
// //     />
// //   )
// // }

// // export default Login