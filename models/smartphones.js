const mongoose = require("mongoose");
const smartphonesSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    releaseYear: {
      type: Number,
      required: true,
    },
    operatingSystem: {
      type: String,
      enum: ["iOS", "Android", "Windows", "Other"],
    },
    displaySize: {
      type: String,
    },
    storage: {
      type: String,
    },
    ram: {
      type: String,
    },
    cameraSpecs: {
      megaPixelCount: {
        type: Number,
        required: true,
      },
      lensType: {
        type: String,
      },
      numberOflens: Number,
    },
    batteryCapacity: {
      type: String,
    },
    connectivity: {
      type: String,
      enum: ["4G LTE", "5G", "Wi-Fi", "Bluetooth", "NFC"],
    },
    price: {
      type: Number,
    },
    colorsAvailable: {
      type: String,
      enum: ["Royal Blue", "Midnight Grey", "Black", "Titanium"],
    },
    features: {
      type: String,
      enum: ["Dynamic HD display", "Smooth proccessor", "IP 68 Waterproof"],
    },
  },
  {
    timestamps: true,
  }
);

const Smartphone = mongoose.model("Smartphone", smartphonesSchema);
module.exports = Smartphone;
