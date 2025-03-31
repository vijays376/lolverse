const mongoose = require("mongoose")

const jokeMemesSchema = new mongoose.Schema(
    {
        category: {
            type: String,
            required: true,
            enum: ["Hindi Joke", "English Joke", "Meme"],
        },
        hindiJoke: {
            type: String,
        },
        englishJoke: {
            type: String,
        },
        memeImage: {
            type: String,
            // trim: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
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
        //         type : mongoose.Schema.Types.ObjectId,
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

module.exports = mongoose.model("JokeMeme", jokeMemesSchema)