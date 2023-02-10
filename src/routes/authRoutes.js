const router = require('express').Router()
const phoneAuthController = require('../controllers/phoneAuthController')
router.post('/users/login/mobile', phoneAuthController.login)

module.exports = router
