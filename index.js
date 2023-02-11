require('dotenv').config();

const express = require('express');
const app = express();

//current
app.use(express.json());
app.use(express.text());
const authRoutes = require('./src/routes/authRoutes');

app.use('/users', authRoutes);
app.listen(9007, () => console.log('Started on port 9007'));
//incoming
app.use(express.json())
app.use(express.text())
const loginRoutes = require('./src/routes/loginRoutes')

app.use('/auth/users/login', loginRoutes)
app.listen(9007, () => console.log('Started on port 9007'))
