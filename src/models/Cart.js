const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const CartSchema = new Schema({
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

const Cart = model("Cart", CartSchema);

module.exports = Cart;
