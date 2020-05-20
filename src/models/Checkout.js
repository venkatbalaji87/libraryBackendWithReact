const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const CheckoutSchema = new Schema({
  bookid: {
    type: Number,
    required: true
  },
  bookName: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  authorName: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
});

const Checkout = model("Checkout", CheckoutSchema);

module.exports = Checkout;
