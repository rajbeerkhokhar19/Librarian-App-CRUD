/**
 * File name : Users Routes
 * Student’s Name : 
 * StudentID : 
 * Date :
 */
const express = require('express');
const { registerUser, userLogin } = require('../controllers/users');

const router = express.Router();

/**
 * Endpoint to register a new user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - Returns the newly registered user object if successful, or an error message if unsuccessful.
 */
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = await registerUser(username, password);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * Endpoint to log in a user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - Returns an access token if login is successful, or an error message if unsuccessful.
 */
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const accessToken = await userLogin(username, password);
    res.json({ accessToken: accessToken });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
