const express = require('express');
const Book = require('../models/book');

const booksRouter = express.Router();

booksRouter.get("/", async (req, res) => {
    const books = await getAllbooks();
    res.send(books).status(200);
});

booksRouter.post("/", async (req, res) => {
    const targetBook = req.body;
    const result = await createBook(targetBook);
    if (result === -1) {
        res.statusCode(404).send("No such book");
    } else {
        res.send(result);
    }
});

booksRouter.get("/:id", async (req, res) => {

});

booksRouter.put("/:id", async (req, res) => {

});

booksRouter.delete("/:id", async (req, res) => {

});


// helper methods:

async function getAllbooks() {
    const books = await Book.find();
    console.log("Books are fetched...");
    return books;
}

async function createBook(targetBook) {
    console.log("Got request for new book: ", targetBook);
    const book = new Book(targetBook);

    const res = await book.save();
    console.log("Book is persisted: ", res);
    return book;
}

module.exports = booksRouter;