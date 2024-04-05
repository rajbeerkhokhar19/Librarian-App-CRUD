/**
 * File name : Index
 * Student’s Name : 
 * StudentID : 
 * Date :
 */
const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bookRouter = require('./routes/books');
const userRouter = require('./routes/users');
const auth = require('./middlewares/authMiddleware');

const app = express();

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

app.use(express.json())

app.use('/api/books', auth, bookRouter);
app.use('/api/users', userRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
