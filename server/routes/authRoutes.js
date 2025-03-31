const express = require("express")
const router = express.Router()

const {
    signup,
    sendotp,
    login,
    changePassword,
} = require("../controllers/authController")

const {
    resetPasswordToken,
    resetPassword,
} = require("../controllers/resetPasswordController")

const { auth } = require("../middlewares/authMiddleware")

// Routes for Login, Signup, and Authentication

router.post("/signup", signup)
router.post("/sendotp", sendotp)
router.post("/login", login)

// Changing Password when you already LoggedIn the application
router.put("/change-password", auth, changePassword)

// On clicking on Forgot password(Login page) we moved to these routes
router.post("/reset-password-token", resetPasswordToken)
router.put("/reset-password/:token", resetPassword)

module.exports = router