const mongoose = require("mongoose")

const premiumSchema = new mongoose.Schema(
    {
        plan: {
            type: String,
            enum: ["Standard", "Pro"],
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        premiumExpires: {
            type: Date,
            required: true,
        }
    },
    { timestamps: true}
)

module.exports = mongoose.model("Premium", premiumSchema)