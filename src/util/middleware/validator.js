const joi = require('joi')

const REQ_PARAMTERS = {
  BODY: 'body',
  QUERY: 'query',
  PARAMS: 'params'
}

const schemas = {
  login: joi.object({
    credentials: joi.string().min(10).max(14).required(),
    loginType: joi.string().valid('MOBILE', 'ABHA').required(),
    yearOfBirth: joi.number(),
    authMethod: joi.valid('MOBILE_OTP', 'AADHAAR_OTP')

  }),
  verifyOtp: joi.object({
    txnId: joi.string().required(),
    otp: joi.string().required(),
    loginType: joi.string().valid('MOBILE', 'ABHA').required()
  }),
  resendOtp: joi.object({
    txnId: joi.string().required(),
    authMethod: joi.string()
  }),
  loginWithABHA: joi.object({
    healthId: joi.number().required(),
    yearOfBirth: joi.number().required(),
    authMethod: joi.string().valid('AADHAAR_OTP', 'MOBILE_OTP').required()
  }),
  verifyOtpABHA: joi.object({
    txnId: joi.string().required(),
    otp: joi.string().required(),
    authMethod: joi.string().valid('AADHAAR_OTP', 'MOBILE_OTP').required()
  }),
  retrieveAccount: joi.object({
    authMethod: joi.string().valid('AADHAAR_OTP', 'MOBILE_OTP').required(),
    healthid: joi.string().required()
  }),
  verifyOTPforAccountRecovery: joi.object({
    authMethod: joi.string().valid('AADHAAR_OTP', 'MOBILE_OTP').required(),
    otp: joi.string().required(),
    txnId: joi.string().required()
  }),
  searchProfile: joi.object({
    healthId: joi.string().required()
  }),
  generateForgotAbhaOtp: joi.object({
    aadhaar: joi.number().required()
  }),
  verifyForgotAbhaOtp: joi.object({
    txnId: joi.string().required(),
    otp: joi.string().required()
  })

}

/**
 *
    * @param {joi.Schema} schema
 * @param {String} parameterType
 */

const validate = (schema, parameterType) => (req, res, next) => {
  const { error } = schema.validate(req[parameterType])
  if (error) {
    return res.status(400).json({ message: error.message })
  }
  next()
}

module.exports = { validate, REQ_PARAMTERS, schemas }
