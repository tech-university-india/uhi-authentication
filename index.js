require('dotenv').config();

const express = require('express');
const app = express();

app.use(express.json())
app.use(express.text())
const loginRoutes = require('./src/routes/loginRoutes')

app.use('/auth/users/login', loginRoutes)
app.listen(9007, () => console.log('Started on port 9007'))
