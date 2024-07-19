const mongoose = require("mongoose");

const agencySchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        rating: { type: Number, default: 0 },
        description: { type: String },
        contactInfo: { type: String },
        properties: [{ type: mongoose.Schema.Types.ObjectId, ref: "Property" }],
        isApproved: { type: Boolean, default: false }, // New field for approval status
        image: { type: String },
        docs: { type: String },

    },
    {
        timestamps: true,
    }

);

const Agency = mongoose.model("Agency", agencySchema)

module.exports = Agency;