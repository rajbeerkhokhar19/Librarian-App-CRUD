/**
 * File name : Books Model
 * Student’s Name : 
 * StudentID : 
 * Date :
 */
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  rating: Number,
  publishedYear: Number,
  pages: Number,
  genre: String,
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
