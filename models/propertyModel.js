const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    size: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: String },
    description: { type: String, required: true },
    phone: { type: Number, required: true },
    cityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
      required: true,
    },
    buyOrRent: {
      type: String,
      enum: ["buy", "rent"],
      required: true,
    },
    propertyType: {
      type: String,
      enum: [
        "house",
        "flat",
        "room",
        "residencial plot",
        "commercial plot",
        "banglo",
      ],
      required: true,
    },
    agency_id: { type: mongoose.Schema.Types.ObjectId, ref: "Agency" },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    is_featured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
