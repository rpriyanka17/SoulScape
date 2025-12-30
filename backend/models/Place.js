const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    info: {
      type: String,
    },
    image: {
      type: String,
    },
    category: {
      type: String,
      required: true,
      enum: ["beach", "hill", "historical", "adventure", "spiritual"]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Place", placeSchema);
