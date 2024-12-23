const mongoose = require("mongooose");
const cameraSchema = new mongoose.Schema({
  productImage: String,
  productName: String,
  productRating: {
    totalRating: Number,
    avgRating: Number,
  },
  productReviews: Number,
  productPrice: Number,
  discount: Number,
  freeDelivery: Boolean,
  inStock: Number,
  productDescription: String,
  effectivePexels: Number,
  sensorType: String,
  wifi: Boolean,
  hd: String,
  warranty: Number,
  assured: Boolean,
});

const Camera = mongoose.model("Camera", cameraSchema);
module.exports = Camera;
