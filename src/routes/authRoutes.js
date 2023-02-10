const router = require('express').Router()
const phoneAuthController = require('../controllers/phoneAuthController')
router.post('/users/login/mobile', phoneAuthController.login)
router.post('/users/login/mobile/verify', phoneAuthController.verifyOtp)

module.exports = router
