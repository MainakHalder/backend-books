const mongoose = require("mongoose");
const cardSchema = new mongoose.Schema({
  cardNumber: String,
  validTill: String,
  cardHolderName: String,
});

const Card = mongoose.model("Card", cardSchema);
module.exports = Card;
