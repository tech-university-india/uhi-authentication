const router = require('express').Router()
const loginController = require('../controllers/loginController')
router.post('/mobile/login', loginController.login)
router.post('/mobile/verify', loginController.verifyOtp)
router.post('/mobile/resend', loginController.resendOtp)

router.post('/abha/login', loginController.loginWithABHA)
router.post('/abha/login/verifyOtp', loginController.verifyOtpABHA)

module.exports = router
