const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  author: { type: String, required: true },
  created: { type: Date, required: true },
  updated: { type: Date, required: true },
  status: { type: String, required: true },
  title: { type: String, minlength: 10, required: true },
  content: { type: String, minlength: 20, required: true },
  image: { type: String },
  price: { type: Number },
  phone: { type: String },
  location: { type: String },
});

module.exports = mongoose.model('Post', postSchema);
