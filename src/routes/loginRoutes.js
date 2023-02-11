const router = require('express').Router()
const loginController = require('../controllers/loginController')
const { validate, REQ_PARAMTERS, schemas } = require('../util/middleware/validator')

router.post('/mobile/login', validate(schemas.login, REQ_PARAMTERS.BODY), loginController.login)
router.post('/mobile/verify', validate(schemas.verifyOtp, REQ_PARAMTERS.BODY), loginController.verifyOtp)
router.post('/mobile/resend', validate(schemas.resendOtp, REQ_PARAMTERS.BODY), loginController.resendOtp)

router.post('/abha/login', validate(schemas.loginWithABHA, REQ_PARAMTERS.BODY), loginController.loginWithABHA)
router.post('/abha/login/verifyOtp', validate(schemas.verifyOtpABHA, REQ_PARAMTERS.BODY), loginController.verifyOtpABHA)

module.exports = router
