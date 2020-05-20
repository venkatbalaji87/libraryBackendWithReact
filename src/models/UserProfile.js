const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const ProfileSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  
});

const Profile = model("Profile", ProfileSchema);

module.exports = Profile;
