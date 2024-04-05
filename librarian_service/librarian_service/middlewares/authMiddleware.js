/**
 * File name : Authentication Middleware
 * Student’s Name : 
 * StudentID : 
 * Date :
 */
const jwt = require('jsonwebtoken');
const User = require('../models/users'); 

/**
 * Middleware to authenticate user requests.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Function} - Calls the next middleware function if authentication is successful.
 */
function auth(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401); // if there isn't any token

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
    if (err) return res.sendStatus(403);
    
    // Add the user's information to the request
    req.user = await User.findById(user._id);
    
    next(); // continue with the request
  });
}

module.exports = auth;

