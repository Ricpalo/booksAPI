const express = require('express');
const router = express.Router();
const {Book, validateBook} = require('../models/books');

// POST: Create a new book
router.post('/', async (req, res) => {
    const message = await validateBook(req.body);

    if ( message.message ) {
        res.status(400).send(message.message);
        return
    }

    book = new Book({
        name:req.body.bookName,
        author: {
            name:req.body.authorName,
            age:req.body.authorAge
        },
        genre:req.body.genre
    });

    book.save().then(book => {
        res.send(book);
    }).catch(error => {
        res.status(500).send("Book was not stored in db");
    });
});

// Get All Books
router.get("/", (req, res) => {
    Book.find()
    .then((books) => res.send(books))
    .catch((error) => {
        res.status(500).send("Something Went Wrong ", error);
    });
});

// Get Book By Id

router.get("/:id", async (req, res) => {
    const book = await Book.findById(req.params.id);

    if ( !book ) res.status(404).send("Book Does Not Exist");
    else res.send(book);
});

// Update Book 
router.put("/:id", async (req, res) => {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, {
        name:req.body.bookName,
        author: {
            name:req.body.authorName,
            age:req.body.authorAge
        },
        genre:req.body.genre
    },
    {new:true});

    if(!updatedBook) res.status(404).send("Book not found");
    else res.send(updatedBook);
});

// Delete Book
router.delete("/:id", async (req, res) => {
    const book = await Book.findByIdAndRemove(req.params.id);

    if ( !book ) res.status(404).send("Book Does Not Exist");
    else res.send(book);
});


module.exports = router;