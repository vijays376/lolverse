import { useState } from "react"
import { BiArrowBack } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"

// import { getPasswordResetToken } from "../services/operations/authAPI"

function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [emailSent, setEmailSent] = useState(false)
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.auth)

  const handleOnSubmit = (e) => {
    e.preventDefault()
    // dispatch(getPasswordResetToken(email, setEmailSent))
  }

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
            {!emailSent ? "Reset your password" : "Check email"}
          </h1>
          <p className="my-4 text-[1.125rem] leading-[1.625rem] mt-2 mb-4  text-richblack-100">
            {!emailSent
              ? "We'll send you an email with a link to reset your password."
              : `We have sent the reset email to ${email}`}
          </p>
          <form onSubmit={handleOnSubmit}>
            {!emailSent && (
              <label className="w-full">
                <p className="mb-1 text-[1.125rem] leading-[1.625rem] font-semibold">
                  Email Address<sup className="text-red-600">*</sup>
                </p>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full border-blue-400 border-2 rounded-md pl-1 py-1"
                />
              </label>
            )}
            <button
              type="submit"
              className="w-full py-[12px] px-[12px] rounded-[8px] mt-8 font-medium bg-blue-600 text-xl text-white"
            >
              {!emailSent ? "Submit" : "Resend Email"}
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between">
            <NavLink to="/login">
              <p className="flex items-center gap-x-2 text-blue-600 font-medium">
                <BiArrowBack /> Back To Login
              </p>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  )
}

export default ForgotPassword