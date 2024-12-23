const mongoose = require("mongoose");
const fruitSchema = new mongoose.Schema({
  fruit: String,
  fruitDescription: String,
  fruitImage: String,
  calories: Number,
  carbohydrates: String,
  protien: String,
  fat: String,
  addToFavourite: Boolean,
});

const Fruit = mongoose.model("Fruit", fruitSchema);
module.exports = Fruit;
