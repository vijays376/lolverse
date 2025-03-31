const express = require("express")
const router = express.Router()

const { auth } = require("../middlewares/authMiddleware")

const {
    userDashboard,
    updateProfilePhoto,
    updateProfile,
    getUserAllDetails,
    deleteAccount,
} = require("../controllers/profileController")

router.get("/user-dashboard", auth, userDashboard)
router.put("/update-profile-photo", auth, updateProfilePhoto)
router.put("/update-profile", auth, updateProfile)
router.get("/get-user-all-details", auth, getUserAllDetails)
router.delete("/delete-account", auth, deleteAccount)

module.exports = router