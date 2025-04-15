import express, { request } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import {Book} from './models/book.model.js';
import bookRoute from './routes/book.route.js';
import cors from 'cors';

dotenv.config()

const port = process.env.PORT || 5000;

const app = express();

// Middleware for parsing JSON bodies
app.use(express.json());

// Middleware for handling CORS
// Option 1: Allow all origins (not recommended for production)
// app.use(cors());
// Option 2: Allow specific origin (recommended for production)
app.use(cors({
    origin: process.env.ALLOWED_ORIGIN || 'http://localhost:3000', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use('/books', bookRoute); 

app.get('/', (req, res) => {
    console.log(req.body);
    return res.status(200).send('Welcome');
});

// database
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log(`Database connected successfully`);
    app.listen(port, () => {
        console.log(`Server is running on port http://localhost:${port}/`);
    });

})
.catch((error)=>{
    console.log(error.message);
});


