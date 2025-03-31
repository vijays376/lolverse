const mongoose = require("mongoose")

const laughSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    jokeMeme: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "JokeMeme",
        required: true,
    },
}, { timestamps: true })

module.exports = mongoose.model("Laugh", laughSchema)