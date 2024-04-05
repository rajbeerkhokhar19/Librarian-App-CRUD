/**
 * File name : Books Controller
 * Student’s Name : 
 * StudentID : 
 * Date :
 */
const Book = require('../models/books');

/**
 * Retrieves a book from the database by its ID.
 * @param {string} bookId - The ID of the book to retrieve.
 * @param {string} userId - The ID of the user retrieving the book.
 * @returns {Promise<Book>} - Returns the book object if found.
 * @throws {Error} - Throws an error if the book is not found.
 */
const getBookById = async (bookId, userId) => {
    try {
        const book = await Book.findOne({ addedBy: userId, _id: bookId });
        if (book == null) {
            throw new Error(`Cannot Find Book`);
        }
        return book;
    } catch (error) {
        console.error(`Cannot Find Book ${error.message}`);
        throw new Error(`Cannot Find Book`);
    }
}

/**
 * Creates a new book in the database.
 * @param {Object} createPayload - The payload containing book details.
 * @returns {Promise<Book>} - Returns the newly created book object.
 */
const createNewBook = async (createPayload) => {
    try {
        const book = new Book(createPayload);
        const newBook = await book.save();
        return newBook;
    } catch (error) {
        console.error(`Cannot Create New Book ${error.message}`);
    }
}

/**
 * Updates a book in the database by its ID.
 * @param {string} bookId - The ID of the book to update.
 * @param {string} userId - The ID of the user updating the book.
 * @param {Book} updatedValues - The updated values for the book.
 * @returns {Promise<Book>} - Returns the updated book object.
 */
const updateBookById = async (bookId, userId, updatedValues) => {
    try {
        await getBookById(bookId, userId);
        const updatePayload = { ...updatedValues };
        return Book.findByIdAndUpdate(bookId, updatePayload);
    } catch (error) {
        throw error;
    }
}

/**
 * Deletes a book from the database by its ID.
 * @param {string} bookId - The ID of the book to delete.
 * @param {string} userId - The ID of the user deleting the book.
 * @returns {Promise<string>} - Returns the title of the deleted book.
 */
const deleteBookById = async (bookId, userId) => {
    try {
        const book = await getBookById(bookId, userId);
        await Book.findByIdAndDelete(bookId);
        return book.title;
    } catch (error) {
        throw error;
    }
}

/**
 * Retrieves all books from the database belonging to a specific user.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Array<Book>>} - Returns an array of book objects.
 * @throws {Error} - Throws an error if books cannot be found.
 */
const getAllBooks = async (userId) => {
    try {
        const books = await Book.find({ addedBy: userId });
        return books;
    } catch (error) {
        console.error(`Cannot Find Books ${error.message}`);
        throw new Error(`Cannot Find Books`);
    }
}

module.exports = {
    getAllBooks,
    createNewBook,
    updateBookById,
    deleteBookById,
    getBookById,
}
