const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true}).then(() => {
    console.log("Connected");
}).catch(error => {
    console.log("Something wrong happended, " ,error)
})

app.listen(PORT, () => {
    console.log("Server started at PORT ", PORT);
})