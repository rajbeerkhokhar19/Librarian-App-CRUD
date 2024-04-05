/**
 * File name : Users Controller
 * Student’s Name : 
 * StudentID : 
 * Date :
 */
const User = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * Registers a new user.
 * @param {string} username - The username of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<string>} - Returns the ID of the newly registered user.
 */
const registerUser = async (username, password) => {
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            throw new Error("Username Not Available");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            username: username,
            password: hashedPassword,
        });
        const newUser = await user.save();
        return newUser._id;
    } catch (error) {
        console.error(`User Registration Failed ${error.message}`);
        throw new Error(`User Registration Failed : ${error.message}`);
    }
}

/**
 * Logs in a user.
 * @param {string} username - The username of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<string>} - Returns an access token if login is successful.
 */
const userLogin = async (username, password) => {
    const user = await User.findOne({ username: username });
    if (user == null) {
        throw new Error('User Not Found');
    }
    try {
        if (await bcrypt.compare(password, user.password)) {
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET);
            return accessToken;
        } else {
            throw new Error('Not Allowed');
        }
    } catch (error) {
        console.error(`User Login Failed ${error.message}`);
        throw error;
    }
}

module.exports = {
    registerUser,
    userLogin,
}
