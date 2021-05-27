const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  town: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  streetNumber: {
    type: String,
    required: true,
  },
  postCode: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  cart: {
    type: Array,
    default: [],
    expireAt: {
      type: Date,
      default: Date.now,
      index: { expires: "1m" },
    },
  },
  history: {
    type: Array,
    default: [
      [" ", " "],
      [" ", " "],
    ],
  },
  billingNumber: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("user", UserSchema);
