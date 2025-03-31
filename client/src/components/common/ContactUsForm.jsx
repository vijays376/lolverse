import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import CountryCode from "../../data/countrycode.json"
// import { apiConnector } from "../../services/apiconnector"
// import { contactusEndpoint } from "../../services/apis"

export const ContactUsForm = () => {
    const [loading, setLoading] = useState(false)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm()

    const submitContactForm = async (data) => {
        console.log("Form Data - ", data)
        try {
          setLoading(true)
        //   const res = await apiConnector(
        //     "POST",
        //     contactusEndpoint.CONTACT_US_API,
        //     data
        //   )
        //   // console.log("Email Res - ", res)
          setLoading(false)
        } catch (error) {
          console.log("ERROR MESSAGE - ", error.message)
          setLoading(false)
        }
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                email: "",
                firstname: "",
                lastname: "",
                message: "",
                mobileNo: "",
            })
        }
    }, [reset, isSubmitSuccessful])

    return (
        <div className="mr-28">
            <div className="gradient-text text-center text-5xl font-bold mb-9">
                Fill the Form
            </div>
            <div className="border-4 border-blue-600 p-3 rounded-xl mr-6">
                <form
                    className="flex flex-col gap-3"
                    onSubmit={handleSubmit(submitContactForm)}
                >
                    <div className="flex flex-col gap-20 lg:flex-row">
                        <div className="flex flex-col gap-2 w-1/2">
                            <label htmlFor="firstname" className="font-bold">
                                First Name
                            </label>
                            <input
                                type="text"
                                name="firstname"
                                id="firstname"
                                placeholder="Enter first name"
                                className="border-blue-400 border-2 rounded-md pl-1 py-1"
                                {...register("firstname", { required: true })}
                            />
                            {errors.firstname && (
                                <span className="-mt-1 text-[12px] text-red-600">
                                    *Please enter your name.
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col gap-2 w-1/2">
                            <label htmlFor="lastname" className="font-bold">
                                Last Name
                            </label>
                            <input
                                type="text"
                                name="lastname"
                                id="lastname"
                                placeholder="Enter last name"
                                className="border-blue-400 border-2 rounded-md pl-1 py-1 "
                                {...register("lastname")}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 ">
                        <label htmlFor="email" className="font-bold">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter email address"
                            className="border-blue-400 border-2 rounded-md pl-1 py-1"
                            {...register("email", { required: true })}
                        />
                        {errors.email && (
                            <span className="-mt-1 text-[12px] text-red-600">
                                *Please enter your Email address.
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="mobileNumber" className="font-bold">
                            Mobile Number
                        </label>

                        <div className="flex gap-5">
                            <div className="flex w-[53px] flex-col gap-2">
                                <select
                                    type="text"
                                    name="countrycode"
                                    id="countrycode"
                                    className="border-blue-400 border-2 rounded-md py-1"
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
                            <div className="flex w-[calc(100%-90px)] flex-col gap-2">
                                <input
                                    type="number"
                                    name="mobileNumber"
                                    id="mobileNumber"
                                    inputMode="numeric"
                                    placeholder="9876543210"
                                    className="border-blue-400 border-2 rounded-md pl-1 py-1 "
                                    {...register("mobileNumber", {
                                        required: {
                                            value: true,
                                            message: "*Please enter your Mobile Number.",
                                        },
                                        pattern: { value: /^[1-9][0-9]{9}$/, message: "Invalid Mobile Number" },
                                        maxLength: { value: 10, message: "Invalid Mobile Number" },
                                        minLength: { value: 10, message: "Invalid Mobile Number" },
                                    })}
                                />
                            </div>
                        </div>
                        {errors.mobileNumber && (
                            <span className="-mt-1 text-[12px] text-red-600">
                                {errors.mobileNumber.message}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="message" className="font-bold">
                            Message
                        </label>
                        <textarea
                            name="message"
                            id="message"
                            cols="30"
                            rows="7"
                            placeholder="Enter your message here"
                            className="border-blue-400 border-2 rounded-md pl-1 py-1"
                            {...register("message", { required: true })}
                        />
                        {errors.message && (
                            <span className="-mt-1 text-[12px] text-red-600">
                                *Please enter your Message.
                            </span>
                        )}
                    </div>

                    <button
                        disabled={loading}
                        type="submit"
                        className={`rounded-md bg-yellow-300 px-6 py-3 text-center text-lg font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
                        ${!loading &&
                            "transition-all duration-200 hover:scale-95 hover:shadow-none"
                            }  disabled:bg-richblack-500 `}
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ContactUsForm