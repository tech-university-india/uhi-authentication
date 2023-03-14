require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())
app.use(express.text())

const PORT = process.env.PORT || 9007

const loginRoutes = require('./src/routes/loginRoutes')
const registerRoutes = require('./src/routes/user.js')
app.use('/auth/users', loginRoutes)
app.use('/user', registerRoutes)
app.listen(PORT, () => console.log(`Started on port ${PORT}`))
