const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const SigninSchema = new Schema({
  email: {
    type: String,
    required: true
  },
});

const Signindata = model("Signindata", SigninSchema);

module.exports = Signindata;
