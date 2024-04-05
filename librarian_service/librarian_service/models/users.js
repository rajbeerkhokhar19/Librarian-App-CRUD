/**
 * File name : Users Model
 * Student’s Name : 
 * StudentID : 
 * Date :
 */
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
