const mongoose = require("mongoose");
const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    cuisine: {
      type: String,
      enum: [
        "Italian",
        "Mexican",
        "Chinese",
        "Indian",
        "American",
        "French",
        "Japanese",
        "Mediterranean",
        "Thai",
        "Vegetarian",
        "Vegan",
        "Other",
      ],
    },
    location: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    website: {
      type: String,
    },
    openingYear: {
      type: Number,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 5,
    },
    specialDishes: {
      type: String,
      enum: ["Pizza", "Burger", "Wrap", "Tacos"],
    },
    photoUrls: {
      type: String,
      enum: [
        "https://placehold.co/600x400?text=Food+Image",
        "https://placehold.co/600x400?text=Food+Image",
        "https://placehold.co/600x400?text=Food+Image",
      ],
    },
  },
  {
    timestamps: true,
  }
);
const Restaurant = momgoose.model("Restaurant", restaurantSchema);
module.exports = Restaurant;
