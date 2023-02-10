const router = require('express').Router()
const phoneAuthController = require('../controllers/loginController')
router.post('/users/login/mobile', phoneAuthController.login)
router.post('/users/login/mobile/verify', phoneAuthController.verifyOtp)
router.post('/users/login/mobile/resend', phoneAuthController.resendOtp)

module.exports = router
