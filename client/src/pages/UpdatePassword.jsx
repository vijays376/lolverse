import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { BiArrowBack } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useLocation, useNavigate } from "react-router-dom"

// import { resetPassword } from "../services/operations/authAPI"

function UpdatePassword() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const { loading } = useSelector((state) => state.auth)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm()

  const submitUpdatePassword = async (data) => {
    console.log("UpdatePassword Data: ", data);
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        newPassword: "",
        confirmNewPassword: "",
      })
    }
  }, [reset, isSubmitSuccessful])


  const [formData, setFormData] = useState({
    newPassword: "",
    confirmNewPassword: "",
  })

  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false)

  const { newPassword, confirmNewPassword } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    const token = location.pathname.split("/").at(-1)
    // dispatch(resetPassword(password, confirmPassword, token, navigate))
  }

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem1]">
            Choose new password
          </h1>
          <p className="text-[1.125rem] leading-[1.625rem] mt-2 mb-4 text-richblack-100">
            Almost done. Enter your new password and you're all set.
          </p>
          <form
            onSubmit={handleSubmit(submitUpdatePassword)}
          >
            <div className="space-y-5">
              <div className='flex flex-col relative'>
                <label className="font-semibold">
                  New Password <sup className="text-red-600">*</sup>
                </label>
                <input
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  id="newPassword"
                  placeholder="Enter New Password"
                  className="w-full border-blue-400 border-2 rounded-md pl-1 py-1"
                  {...register("newPassword", { required: true })}
                />
                <span
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  className="absolute right-3 top-[30px] z-[10] cursor-pointer "
                >
                  {showNewPassword ? (
                    <AiOutlineEyeInvisible fontSize={26} />
                  ) : (
                    <AiOutlineEye fontSize={26} />
                  )}
                </span>
                {
                  errors.newPassword && (
                    <span className="text-[12px] text-red-600">
                      Please enter new password.
                    </span>
                  )
                }
              </div>

              <div className='flex flex-col relative'>
                <label className="font-semibold">
                  Confirm New Password <sup className="text-red-600">*</sup>
                </label>
                <input
                  type={showConfirmNewPassword ? "text" : "password"}
                  name="confirmNewPassword"
                  id="confirmNewPassword"
                  placeholder="Enter confirm new Password"
                  className="w-full border-blue-400 border-2 rounded-md pl-1 py-1"
                  {...register("confirmNewPassword", { required: true })}
                />
                <span
                  onClick={() => setShowConfirmNewPassword((prev) => !prev)}
                  className="absolute right-3 top-[30px] z-[10] cursor-pointer "
                >
                  {
                    showConfirmNewPassword ? (
                      <AiOutlineEyeInvisible fontSize={26} />
                    ) : (
                      <AiOutlineEye fontSize={26} />
                    )
                  }
                </span>
                {
                  errors.confirmNewPassword && (
                    <span className="text-[12px] text-red-600">
                      Please enter new confirm password.
                    </span>
                  )
                }
              </div>
            </div>

            {/* <label className="">
              <p className="mb-1 font-semibold">
                New Password <sup className="text-red-600">*</sup>
              </p>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Enter Password"
                className="w-full border-blue-400 border-2 rounded-md pl-1 py-1"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[32px] z-[10] cursor-pointer "
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={25} />
                ) : (
                  <AiOutlineEye fontSize={25} />
                )}
              </span>
            </label>
            <label className=" mt-3 block">
              <p className="mb-1 font-semibold">
                Confirm New Password <sup className="text-red-600">*</sup>
              </p>
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm Password"
                className="w-full border-blue-400 border-2 rounded-md pl-1 py-1"
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-[32px] z-[10] cursor-pointer"
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible fontSize={25} />
                ) : (
                  <AiOutlineEye fontSize={25} />
                )}
              </span>
            </label> */}

            <button
              type="submit"
              className='w-full mt-6 bg-blue-600 text-2xl rounded-md  font-medium text-white p-1 space-x-1'
            >
              Reset Password
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between">
            <NavLink to="/login">
              <p className="flex items-center gap-x-1 text-blue-600 font-medium">
                <BiArrowBack /> Back To Login
              </p>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  )
}

export default UpdatePassword