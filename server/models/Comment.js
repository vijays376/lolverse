const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    jokeMeme: {
        type : mongoose.Schema.Types.ObjectId,
        ref: "JokeMeme",
        required: true,
    },
    commentText: {
        type: String,
        required: true,
    }
}, { timestamps: true})

module.exports = mongoose.model("Comment", commentSchema)