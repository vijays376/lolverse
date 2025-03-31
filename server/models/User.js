const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
        mobileNumber: {
            type: Number,
            trim: true,
        },
        dateOfBirth: {
            type: Date,
        },
        gender: {
            type: String,
            enum: ["Male", "Female", "Other"],
        },
        bio: {
            type: String,
        },
        profilePhoto: {
            type: String,
        },
        token: {
            type: String,
        },
        resetPasswordExpires: {
            type: Date,
        },
        premiumDetails: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Premium"
        },
        jokeMemes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "JokeMeme",
            },
        ],
        laughs: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Laugh",
            },
        ],
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Like",
            },
        ],
        // thinks: [
        //     {
        //         type: mongoose.Schema.Types.ObjectId,
        //         ref: "Think",
        //     },
        // ],
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment",
            },
        ],
    },
    { timestamps: true }
)

module.exports = mongoose.model("User", userSchema)