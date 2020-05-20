const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const LibrarySchema = new Schema({
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
});

const Library = model("Library", LibrarySchema);

module.exports = Library;
