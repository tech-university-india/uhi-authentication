const router = require('express').Router()
const loginController = require('../controllers/loginController')
router.post('/mobile/login', loginController.login)
router.post('/mobile/verify', loginController.verifyOtp)
router.post('/mobile/resend', loginController.resendOtp)

module.exports = router
