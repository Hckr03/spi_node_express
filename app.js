const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = require('./config/database');

const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

const listener = app.listen(PORT, () => {
    console.log(`Server is running on port ${listener.address().port}`);
});