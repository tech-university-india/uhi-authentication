const joi = require('joi')

const REQ_PARAMTERS = {
  BODY: 'body',
  QUERY: 'query',
  PARAMS: 'params'
}

const schemas = {
  generateTokenByHealthId: joi.object({
    token: joi.string().min(3).max(1000).required(),
    healthId: joi.string().min(14).required(),
    txnId: joi.string().required()

  }),

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
    authMethod: joi.string(),
    loginType: joi.string().valid('MOBILE', 'ABHA').required()
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
  userOnboardingDetails: joi.object({
    userName: joi.string().max(100).min(3).required(),
    healthId: joi.string().required(),
    firstName: joi.string().max(100).min(3).required(),
    middleName: joi.string().max(100).allow(null, ''),
    lastName: joi.string().max(100),
    profilePhoto: joi.string().max(10000).required(),
    emailId: joi.string().email().max(256).required(),
    phoneNumber: joi.string().min(10).max(10).required(),
    address: joi.string().required(),
    gender: joi.string().valid('M', 'F', 'O').required(),
    dateOfBirth: joi.string().required(),
    aadhaarNumber: joi.string().min(12).max(12).required(),
    healthIdNumber: joi.string().min(14).max(18).required()
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
