require('dotenv').config()

const express = require('express')
const app = express()
const { client } = require('./src/util/redisConnection')

client.connect()
client.on('connect', () => console.log('Redis client connected'))
app.use(express.json())
app.use(express.text())

const PORT = process.env.PORT || 9007

const loginRoutes = require('./src/routes/loginRoutes')
const registerRoutes = require('./src/routes/addUser.js')
app.use('/auth/users', loginRoutes)
app.use('/user', registerRoutes)
app.listen(PORT, () => console.log(`Started on port ${PORT}`))
