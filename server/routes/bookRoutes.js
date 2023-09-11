import express from "express"
import { Book } from "../models/bookModel.js";
const router = express.Router();


//route for save a new book
router.post('/', async (req, res) => {
    try {
        //validation to check the fields
        if (!req.body.title ||
            !req.body.author ||
            !req.body.publishYear) {
            return res.status(400).send({
                message: "send all fields:title,author,publishYear",
            })
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        };
        //creating by using model "Book"
        const book = await Book.create(newBook)
        return res.status(200).send(book)
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: err.message })
    }
})

//route for getting all books from db
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({});
        //.json(books) it's a good practice to use ,explicit about sending (content-type)JSON data
        return res.status(200).json({
            //giving shape to o/p
            count: books.length,
            data: books
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: error.message })
    }
})

//to get particular id book
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        return res.status(200).json(book)
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: error.message })
    }
})

//update book
router.put('/:id', async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({
                message: "send all required fields:title,author,publishYear"
            })
        }
        const { id } = req.params;

        const result = await Book.findByIdAndUpdate(id, req.body)
        if (!result) {
            return res.status(404).json({ message: 'book not found' })
        }

        return res.status(200).send({ message: 'book updated successfully' })

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message })
    }
})

//to delete book
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await Book.findByIdAndDelete(id);
        if (!result) {
            return res.status(400).json({ message: 'Book not found' })
        }
        return res.status(200).send({ message: "Book deleted successfully" })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})


export default router;