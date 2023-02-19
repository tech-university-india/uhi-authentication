const router = require('express').Router()
const retrieveController = require('../controllers/retrievalController')
const { validate, REQ_PARAMTERS, schemas } = require('../util/middleware/validator')

router.post('/retrieve', validate(schemas.retrieveAccount, REQ_PARAMTERS.BODY), retrieveController.retrieve)
router.post('/verifyOTP', validate(schemas.verifyOTPforAccountRecovery, REQ_PARAMTERS.BODY), retrieveController.verifyOTP)
router.post('/forgot/searchByAddress', validate(schemas.searchProfile, REQ_PARAMTERS.BODY), retrieveController.searchProfile)

router.post('/forgot/generateAadharOTP', validate(schemas.generateForgotAbhaOtp, REQ_PARAMTERS.BODY), retrieveController.generateAadhaarOtpForForgotAbha)
router.post('/forgot/verifyAadharOTP', validate(schemas.verifyForgotAbhaOtp, REQ_PARAMTERS.BODY), retrieveController.verifyAadhaarOtpForForgotAbha)

router.post('/forgot/generateMobileOTP', retrieveController.generateMobileOtpForForgotAbha)
router.post('/forgot/verifyMobileOTP', retrieveController.verifyMobileOtpForForgotAbha)

module.exports = router
