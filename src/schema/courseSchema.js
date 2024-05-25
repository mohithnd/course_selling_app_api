const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageLink: String,
});

module.exports = mongoose.model("Course", courseSchema);
