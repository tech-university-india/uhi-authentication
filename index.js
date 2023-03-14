require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())
app.use(express.text())

const PORT = process.env.PORT || 9007

const loginRoutes = require('./src/routes/loginRoutes')
app.use('/auth/users', loginRoutes)
app.listen(PORT, () => console.log(`Started on port ${PORT}`))
