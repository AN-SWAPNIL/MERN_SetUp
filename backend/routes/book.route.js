import express from 'express';
import {Book} from '../models/book.model.js';

const router = express.Router();

// route
router.post('/', async (req, res) => { 
    try {
        console.log(req.body);
        if( !req.body.title || !req.body.author || !req.body.publishYear ) {
            return res.status(400).send({
                message: 'Send all the required fields',
            });
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
            image: req.body.image || undefined, // Let Mongoose handle the default if undefined
        };

        const book = await Book.create(newBook);

        return res.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({
            message: error.message,
        });
    }
});

router.get('/', async (req, res) => {
    try {
        const books = await Book.find({}).sort({ createdAt: -1 });
        return res.status(200).send({
            count: books.length,
            data: books,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({
            message: error.message,
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const book = await Book.findById(id);
        return res.status(200).send(book);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({
            message: error.message,
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        console.log(req.body);
        
        if( !req.body.title || !req.body.author || !req.body.publishYear ) {
            return res.status(400).send({
                message: 'Send all the required fields',
            });
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
            image: req.body.image || undefined, // Let Mongoose handle the default if undefined
        };

        const unsetFields = {};
        if (!req.body.image) unsetFields.image = 1;

        const {id} = req.params;
        
        const book = await Book.findByIdAndUpdate(
            id, 
            { 
                ...newBook,
                ...(Object.keys(unsetFields).length > 0 ? { $unset: unsetFields } : {}), 
            },
            { new: true }
        );
        
        if(!book) {
            return res.status(404).send({
                message: 'Book not found',
            });
        }
        return res.status(200).send({
            message: 'Book updated successfully',
            data: book
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({
            message: error.message,
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const book = await Book.findByIdAndDelete(id);
        if(!book) {
            return res.status(404).send({
                message: 'Book not found',
            });
        }
        return res.status(200).send({
            message: 'Book deleted successfully'
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({
            message: error.message,
        });
    }
});

export default router;