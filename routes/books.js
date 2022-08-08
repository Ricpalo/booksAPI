const express = require('express');
const multer = require('multer');
const fs = require('fs');

const router = express.Router();
const {Book, validateBook} = require('../models/books');
const Image = require('../models/image');

// Storage
// const storage = multer.diskStorage({
//     destination: (req,file,cb) => {
//         cb(null, 'uploads');
//     },
//     filename: (req, res, cb) => {
//         cb(null ,file.originalName)
//     }
// })

// const upload = multer({storage: storage});

// POST: Create a new book
router.post("/",  /*upload.single('image'), */async (req, res) => {
    console.log(req.body)
    const message = await validateBook(req.body);

    if ( message.message ) {
        res.status(400).send(message.message);
        return
    }

    // const saveImage = new Image({
    //     name:request.body.imageName,
    //     image: {
    //         data:fs.readFileSync('uploads/', req.file.filename),
    //         contentType: 'image/png'
    //     }
    // });

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
        res.status(500).send(error);
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