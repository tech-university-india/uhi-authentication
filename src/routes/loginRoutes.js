const router = require('express').Router()
const phoneAuthController = require('../controllers/loginController')
router.post('/mobile/login', phoneAuthController.login)
router.post('/mobile/verify', phoneAuthController.verifyOtp)
router.post('/mobile/resend', phoneAuthController.resendOtp)

module.exports = router
