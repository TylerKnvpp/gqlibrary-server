const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  bookCover: { type: String, required: true },
  authorID: { type: String, required: false }
});

module.exports = mongoose.model("Book", BookSchema);
