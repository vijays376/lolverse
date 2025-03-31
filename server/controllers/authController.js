const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const otpGenerator = require("otp-generator")

const User = require("../models/User")
const OTP = require("../models/OTP")
const mailSender = require("../utils/mailSender")
const { passwordUpdated } = require("../mail/templates/passwordUpdate")
const { userRegistration } = require("../mail/templates/userRegistration")

require("dotenv").config()

// Signup controller for Registering users
exports.signup = async (req, res) => {
    try {
        const {
            username,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp,
        } = req.body

        // console.log("Request Body:", req.body);

        // Check if All Details are there or not
        if (
            !username ||
            !firstName ||
            !lastName ||
            !email ||
            !password ||
            !confirmPassword ||
            !otp
        ) {
            return res.status(400).send({
                success: false,
                message: "All Fields are required",
            })
        }

        // Check if password and confirm password match
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and Confirm Password do not match. Please try again.",
            })
        }

        // Checking if username already exists
        const existingusername = await User.findOne({ username })
        if (existingusername) {
            return res.status(400).json({
                success: false,
                message: "Username already taken, try with another one.",
            })
        }

        // Checking if email already exists
        const existingemail = await User.findOne({ email })
        if (existingemail) {
            return res.status(400).json({
                success: false,
                message: "User with these email already exists, Please Login to continue.",
                error: error.message,
            })
        }

        // Find the most recent OTP for the email
        const response = await OTP.findOne({ email }).sort({ createdAt: -1 });
        if (!response) {
            // OTP not found for the email
            return res.status(400).json({
                success: false,
                message: "Please enter correct OTP",
            });
        } else if (otp !== response.otp) {
            // Invalid OTP
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Creating User
        const user = await User.create({
            username,
            firstName,
            lastName,
            email,
            password: hashedPassword,
        })

        // Email sent to the user
        const userEmailRes = await mailSender(
            email,
            "User Registered Successfully",
            userRegistration(firstName, lastName, email, username)
        );
        console.log("User Email Res ", userEmailRes);

        return res.status(200).json({
            success: true,
            user,
            message: "User registered successfully",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "User cannot be registered, Please try again."
        })
    }
}


// Login with username or email
// Login controller for authenticating users
exports.login = async (req, res) => {
    try {
        // `loginField` can be username or email from request body
        const { loginField, password } = req.body

        // console.log("Request Body:", req.body);

        // Check if email or password is missing
        if (!loginField || !password) {
            // Return 400 Bad Request status code with error message
            return res.status(400).json({
                success: false,
                message: `Please fill up all the required fields`,
            })
        }

        // Find user by username or email
        const user = await User.findOne({
            $or: [{ username: loginField }, { email: loginField }]
        })

        // If user not found with provided username or email
        if (!user) {
            // Return 401 Unauthorized status code with error message
            return res.status(401).json({
                success: false,
                message: `User is not Registered with us. Please SignUp to Continue`,
            })
        }

        // Compare Password and Generate JWT token
        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(
                { email: user.email, id: user._id, },
                process.env.JWT_SECRET,
                {
                    expiresIn: "24h",
                }
            )

            // console.log("token ", token);
            // Save token to user document in database
            user.token = token
            user.password = undefined   // Do not send password back in the response

            // Set cookie for token and return success response
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),  //3 days
                httpOnly: true,
            }
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: `User Logged In Successfully`,
            })
        } else {
            return res.status(401).json({
                success: false,
                message: `Password is incorrect`,
            })
        }
    } catch (error) {
        // Return 500 Internal Server Error status code with error message
        return res.status(500).json({
            success: false,
            error: error.message,
            message: `Login Failure Please try Again`,
        })
    }
}

// Send OTP For Email Verification
exports.sendotp = async (req, res) => {
    try {
        const { email } = req.body

        // Check if user is already present
        // Find user with provided email
        const checkUserPresent = await User.findOne({ email })
        // to be used in case of signup

        // If user found with provided email
        if (checkUserPresent) {
            // Return 401 Unauthorized status code with error message
            return res.status(401).json({
                success: false,
                message: `User is Already Registered`,
            })
        }

        let newotp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        })

        // newotp is already present in otp database
        const result = await OTP.findOne({ otp: newotp })
        console.log("Result is Generate OTP Func")
        console.log("New OTP", newotp)
        console.log("Result", result)
        //Generating Unique and previously not used otp
        while (result) {
            newotp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            })
        }

        const otpPayload = { email, otp: newotp }
        // Create otpPayload entry in db
        const otpBody = await OTP.create(otpPayload)
        console.log("OTP Body", otpBody)
        return res.status(200).json({
            success: true,
            message: `OTP Sent Successfully`,
            // newotp,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Error in generating OTP. Please try again."
        })
    }
}

// Controller for Changing Password when you already LoggedIn the application
exports.changePassword = async (req, res) => {
    try {
        // Get user data from req.user
        const userDetails = await User.findById(req.user.id)

        // Get current password, new password, and confirm new password from req.body
        const { currentPassword, newPassword } = req.body

        // Validate current password
        const isPasswordMatch = await bcrypt.compare(
            currentPassword,
            userDetails.password
        )
        if (!isPasswordMatch) {
            // If current password does not match, return a 401 (Unauthorized) error
            return res.status(401).json({
                success: false,
                message: "Current password is incorrect"
            })
        }

        // Changing password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10)
        const updatedUserDetails = await User.findByIdAndUpdate(
            req.user.id,
            { password: hashedNewPassword },
            { new: true }
        )

        // Send notification email
        try {
            const emailResponse = await mailSender(
                updatedUserDetails.email,
                "Password for your account has been changed",
                passwordUpdated(
                    updatedUserDetails.email,
                    `Password changed successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
                )
            )
            // console.log("Email sent successfully:", emailResponse.response)
        } catch (error) {
            // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
            // console.error("Error occurred while sending email:", error)
            return res.status(500).json({
                success: false,
                error: error.message,
                message: "Error occurred while sending email",
            })
        }

        // Return success response
        return res.status(200).json({
            success: true,
            message: "Password changed successfully"
        })
    } catch (error) {
        // If there's an error while changing the password, log the error and return a 500 (Internal Server Error) error
        // console.error("Error occurred while changing password:", error)
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Error occurred while changing password",
        })
    }
}