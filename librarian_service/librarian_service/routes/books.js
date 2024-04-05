/**
 * File name : Books Routes
 * Student’s Name : 
 * StudentID : 
 * Date :
 */
const express = require('express');
const router = express.Router();
const { createNewBook, deleteBookById, getAllBooks, getBookById, updateBookById } = require('../controllers/books');

/**
 * Endpoint to create a new book.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - Returns the newly created book object if successful, or an error message if unsuccessful.
 */
router.post('/', async (req, res) => {
    const createPayload = {
        title: req.body.title,
        author: req.body.author,
        rating: req.body.rating,
        publishedYear: req.body.publishedYear,
        pages: req.body.pages,
        genre: req.body.genre,
        addedBy: req.user._id
    };
    try {
        const newBook = await createNewBook(createPayload);
        res.status(201).json(newBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

/**
 * Endpoint to get a list of all books.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - Returns an array of book objects if successful, or an error message if unsuccessful.
 */
router.get('/', async (req, res) => {
    try {
        const userId = req.user._id;
        const books = await getAllBooks(userId);
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * Endpoint to get a book by its ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - Returns the book object if found, or an error message if not found.
 */
router.get('/:id', async (req, res) => {
    try {
        const bookId = req.params.id;
        const userId = req.user._id;
        const book = await getBookById(bookId, userId);
        res.json(book);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
});

/**
 * Endpoint to update a book by its ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - Returns the updated book object if successful, or an error message if unsuccessful.
 */
router.put('/:id', async (req, res) => {
    try {
        const bookId = req.params.id;
        const userId = req.user._id;
        const updatePayload = {
            title: req.body.title || undefined,
            author: req.body.author || undefined,
            rating: req.body.rating || undefined,
            publishedYear: req.body.publishedYear || undefined,
            pages: req.body.pages || undefined,
            genre: req.body.genre || undefined,
            addedBy: req.user._id || undefined
        };
        const updatedBook = await updateBookById(bookId, userId, updatePayload);
        res.json(updatedBook);
    } catch {
        res.status(400).json({ message: err.message });
    }
});

/**
 * Endpoint to delete a book by its ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - Returns a success message if deletion is successful, or an error message if unsuccessful.
 */
router.delete('/:id', async (req, res) => {
    try {
        const bookId = req.params.id;
        const userId = req.user._id;
        const bookTitle = await deleteBookById(bookId, userId);
        res.json({ message: `Deleted Book: ${bookTitle}` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
