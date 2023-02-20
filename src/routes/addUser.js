const router1 = require('express').Router()
const addUserController = require('../controllers/addUser')

router1.post('/', addUserController)

module.exports = router1
