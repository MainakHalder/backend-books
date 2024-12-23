const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  productPic: String,
  productName: String,
  productType: String,
  productInfo: String,
  color: [
    {
      type: String,
      enum: ["blue", "red", "green", "black", "lightred"],
    },
  ],
  size: {
    min: 7,
    max: 11,
    default: 7,
  },
  productPrice: Number,
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
