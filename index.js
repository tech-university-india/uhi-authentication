require('dotenv').config();

const express = require('express');
const app = express();

app.use(express.json());
app.use(express.text());
const authRoutes = require('./src/routes/authRoutes');

app.use('/users', authRoutes);
app.listen(9007, () => console.log('Started on port 9007'));
