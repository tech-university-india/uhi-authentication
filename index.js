require('dotenv').config()

const express = require('express')
const app = express()
const { client } = require('./src/util/redisConnection')
client.connect()
client.on('connect', () => console.log('Redis client connected'))
app.use(express.json())
app.use(express.text())
const loginRoutes = require('./src/routes/loginRoutes')

app.use('/auth/users', loginRoutes)
app.listen(9007, () => console.log('Started on port 9007'))
