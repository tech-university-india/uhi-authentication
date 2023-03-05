const router1 = require('express').Router()
const addUserController = require('../controllers/addUser')
const userValidator = require('../util/middleware/userOnboardingValidator')

router1.post('/', userValidator, addUserController)

module.exports = router1
