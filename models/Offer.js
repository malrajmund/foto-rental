const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OfferSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  text: {
    type: String,
    required: true,
  },
  offerName: {
    type: String,
  },
  avatar: {
    type: String,
  },
  category: {
    type: String,
  },
  pricePerDay: {
    type: Number,
  },
  pricePerWeek: {
    type: Number,
  },
  annulPriceTo: {
    type: Number,
  },
  annulPriceAbove: {
    type: Number,
  },
  file: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  reserved: {
    type: Array,
  },
});

module.exports = Offer = mongoose.model("offer", OfferSchema);
