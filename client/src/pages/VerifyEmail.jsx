import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { NavLink } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
// import { sendOtp, signUp } from "../services/operations/authAPI";
import { useNavigate } from "react-router-dom";

function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const { signupData, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   // Only allow access of this route when user has filled the signup form
  //   if (!signupData) {
  //     navigate("/signup");
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const handleVerifyAndSignup = (e) => {
    e.preventDefault();
    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData;

    // dispatch(
    //   signUp(
    //     accountType,
    //     firstName,
    //     lastName,
    //     email,
    //     password,
    //     confirmPassword,
    //     otp,
    //     navigate
    //   )
    // );
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
      {loading ? (
        <div>
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8">
          <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
            Verify Email
          </h1>
          <p className="text-[1.125rem] leading-[1.625rem] mt-2 mb-4 text-richblack-100">
            A 6-digit verification OTP has been sent to your email. Enter the OTP below.
          </p>
          <form onSubmit={handleVerifyAndSignup}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-[48px] lg:w-[60px] border-0 bg-gray-200 rounded-[0.5rem] text-black text-2xl aspect-square text-center focus:border-0 focus:outline-2 focus:outline-blue-400"
                />
              )}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 6px",
              }}
            />
            <button
              type="submit"
              className="w-full  py-[12px] px-[12px] rounded-[8px] mt-8 font-medium bg-blue-600 text-xl text-white"
            >
              Verify OTP
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between">
            <NavLink to="/signup">
              <p className="text-richblack-5 flex items-center gap-x-2 text-blue-600 font-medium">
                <BiArrowBack /> Back To Signup
              </p>
            </NavLink>
            <button
              className="flex items-center gap-x-2 text-blue-600 font-medium"
            //   onClick={() => dispatch(sendOtp(signupData.email))}
            >
              <RxCountdownTimer />
              Resend it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default VerifyEmail;