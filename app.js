const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = require('./config/database');

const clientRoutes = require('./routes/clientRoutes');
const bankRoutes = require('./routes/bankRoutes');
const accountRoutes = require('./routes/accountRoutes');
const transferRoutes = require('./routes/transferRoutes');

const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());

app.use('/clients', clientRoutes);
app.use('/banks', bankRoutes);
app.use('/accounts', accountRoutes);
app.use('/transfers', transferRoutes);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

const listener = app.listen(PORT, () => {
    console.log(`Server is running on port ${listener.address().port}`);
});