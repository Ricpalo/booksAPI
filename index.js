const express = require('express');
const mongoose = require('mongoose');
const booksRoute = require('./routes/books');
const winston = require('winston');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Create a logger
const logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(winston.format.colorize({all:true}))
        }),
        new winston.transports.File({filename: 'error.log', level:'error'})
    ],
    exceptionHandlers: [
        new winston.transports.File({filename: 'exceptions.log'})
    ]
});

// Routes
app.use('/api/books', booksRoute);

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true}).then(() => {
    logger.info("Connected to MongoDB");
}).catch(error => {
    logger.error(error)
})

app.listen(PORT, () => {
    logger.info(`Server started at Port ${PORT}`);
})