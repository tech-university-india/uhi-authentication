require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())
app.use(express.text())

const PORT = process.env.PORT || 9007

const authRoutes = require('./src/routes/auth')
const userRoutes = require('./src/routes/users')
app.use('/auth/users', authRoutes)
app.use('/users', userRoutes)
app.listen(PORT, () => console.log(`Started on port ${PORT}`))
