const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OfferSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  name: {
    type: String,
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
    type: Schema.Types.ObjectId,
    ref: "categories",
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
  status: {
    type: String,
    default: "Aktywna",
  },
  reservation: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      totalCost: {
        type: String,
      },
      message: {
        type: String,
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
      date_in: {
        type: Date,
      },
      date_out: {
        type: Date,
      },
      status: {
        type: String,
        default: "nadchodząca",
      },
    },
  ],
});

module.exports = Offer = mongoose.model("offer", OfferSchema);
