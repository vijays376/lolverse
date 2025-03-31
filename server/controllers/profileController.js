const mongoose = require("mongoose")

const User = require("../models/User")
const JokeMeme = require("../models/JokeMeme");
const Laugh = require("../models/Laugh")
const Like = require("../models/Like")
const Comment = require("../models/Comment")

const { uploadToCloudinary } = require("../utils/imageUploader")


// Function to get the user dashboard data
exports.userDashboard = async (req, res) => {
    try {
        // Get the user ID from the authenticated user
        const userId = req.user.id;

        // Find the user by ID and populate necessary fields
        const user = await User.findById(userId)
            .populate('jokeMemes') // Assuming `jokeMemes` is a reference to a list of JokeMeme documents
            .select('username firstName lastName email profilePhoto jokeMemes createdAt'); // Select relevant fields

        // Check if the user exists
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Get user's joke/memes
        const userJokesMemes = await JokeMeme.find({ _id: { $in: user.jokeMemes } });

        // Return the user dashboard data
        return res.status(200).json({
            success: true,
            user: {
                username: user.username, // Include the username
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                profilePhoto: user.profilePhoto,
                createdAt: user.createdAt,
                jokeMemes: userJokesMemes,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Something went wrong.",
        });
    }
};


// Function to update the user's profile photo
exports.updateProfilePhoto = async (req, res) => {
    try {
        // Get user ID from the authenticated user
        const userId = req.user.id;

        // Get the profile photo image from request files
        const profilePhoto = req.files.profilePhoto;

        // Check if the profile photo is provided
        if (!profilePhoto) {
            return res.status(400).json({
                success: false,
                message: "Profile photo is required",
            });
        }

        // Upload the profile photo to Cloudinary
        const uploadedPhoto = await uploadToCloudinary(
            profilePhoto,
            process.env.FOLDER_NAME // You should have a folder name or adjust as needed
        );

        // Update the user's profile with the new profile photo URL
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePhoto: uploadedPhoto.secure_url }, // Assuming `secure_url` contains the URL of the uploaded image
            { new: true, runValidators: true }
        );

        // Check if the user exists
        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "Error in updating Profile photo, Try again.",
            });
        }

        // Return the updated user details
        return res.status(200).json({
            success: true,
            user: {
                // username: updatedUser.username, // Include the username
                // firstName: updatedUser.firstName,
                // lastName: updatedUser.lastName,
                // email: updatedUser.email,
                profilePhoto: updatedUser.profilePhoto,
                createdAt: updatedUser.createdAt,
            },
            message: "Profile photo updated successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Something went wrong.",
        });
    }
};


// Function to update the user's profile
exports.updateProfile = async (req, res) => {
    try {
        // Get user ID from the authenticated user
        const userId = req.user.id;

        // Get updated fields from request body
        const {
            username,
            firstName,
            lastName,
            mobileNumber,
            dateOfBirth,
            gender,
            bio,
        } = req.body;

        // Check if the username is already taken by another user
        if (username) {
            const existingusername = await User.findOne({ username, _id: { $ne: userId } });
            if (existingusername) {
                return res.status(400).json({
                    success: false,
                    message: "Username already taken, please try another one.",
                });
            }
        }

        // Create an object with the fields to be updated
        const updateFields = {};

        if (username) updateFields.username = username;
        if (firstName) updateFields.firstName = firstName;
        if (lastName) updateFields.lastName = lastName;
        if (mobileNumber) updateFields.mobileNumber = mobileNumber;
        if (dateOfBirth) updateFields.dateOfBirth = dateOfBirth;
        if (gender) updateFields.gender = gender;
        if (bio) updateFields.bio = bio;


        // Update the user's profile
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updateFields,
            { new: true, runValidators: true } // Return updated document and run validators
        );

        // Check if the user exists
        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Return the updated user details
        return res.status(200).json({
            success: true,
            user: {
                username: updatedUser.username,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                // email: updatedUser.email,
                mobileNumber: updatedUser.mobileNumber,
                dateOfBirth: updatedUser.dateOfBirth,
                gender: updatedUser.gender,
                bio: updatedUser.bio,
                // profilePhoto: updatedUser.profilePhoto,
                createdAt: updatedUser.createdAt,
            },
            message: "Profile updated successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Something went wrong.",
        });
    }
};


// Function to get all details of the authenticated user
exports.getUserAllDetails = async (req, res) => {
    try {
        // Get user ID from the authenticated user
        const userId = req.user.id;

        // Fetch user details from the database
        const user = await User.findById(userId)
            .populate('jokeMemes') // Populate jokeMemes if you have a reference to joke memes
            .exec();

        // Check if the user exists
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Return the user details
        return res.status(200).json({
            success: true,
            user: {
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                mobileNumber: user.mobileNumber,
                dateOfBirth: user.dateOfBirth,
                gender: user.gender,
                bio: user.bio,
                profilePhoto: user.profilePhoto,
                // premiumDetails: user.premiumDetails,
                jokeMemes: user.jokeMemes, // Include populated joke memes if applicable
                laughs: user.laughs,
                likes: user.likes,
                comments: user.comments,
                createdAt: user.createdAt,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Something went wrong.",
        });
    }
};


exports.deleteAccount = async (req, res) => {
    try {
        // Get user ID from the authenticated user
        const userId = req.user.id;

        // Delete the user from the User collection
        const deletedUser = await User.findByIdAndDelete(userId);

        // Check if the user was found and deleted
        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Delete all user-related data from other collections
        await Promise.all([
            JokeMeme.deleteMany({ user: userId }), // Assuming `user` is the field linking to the user
            Laugh.deleteMany({ user: userId }),
            Like.deleteMany({ user: userId }),
            Comment.deleteMany({ user: userId }),
            // Premium.deleteMany({ user: userId }), // Uncomment if needed
        ]);

        // Return a success response
        return res.status(200).json({
            success: true,
            message: "Account and related data deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Something went wrong.",
        });
    }
};
