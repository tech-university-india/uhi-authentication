const router = require('express').Router()
const loginController = require('../controllers/login')
const registrationController = require('../controllers/registration')
const { validate, REQ_PARAMTERS, schemas } = require('../util/middleware/validator')

router.post('/login', validate(schemas.login, REQ_PARAMTERS.BODY), loginController.login)
router.post('/login/verifyOtp', validate(schemas.verifyOtp, REQ_PARAMTERS.BODY), loginController.verifyOtp)
router.post('/login/resendOtp', validate(schemas.resendOtp, REQ_PARAMTERS.BODY), loginController.resendOtp)
router.post('/login/generateTokenByHealthId', validate(schemas.generateTokenByHealthId, REQ_PARAMTERS.BODY), loginController.generateTokenByHealthId)
router.post('/register', validate(schemas.userOnboardingDetails, REQ_PARAMTERS.BODY), registrationController.register)
module.exports = router
