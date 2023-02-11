const joi = require('joi')

const REQ_PARAMTERS = {
  BODY: 'body',
  QUERY: 'query',
  PARAMS: 'params'
}

const schemas = {
    login: joi.object({
        mobile: joi.string().required()
    }),
    verifyOtp: joi.object({
        txnId: joi.string().required(),
        otp: joi.string().required()
    }),
    resendOtp: joi.object({
        txnId: joi.string().required(),
        authMethod: joi.string().required(),
    }),
    loginWithABHA: joi.object({
        healthId: joi.number().required(),
        yearOfBirth: joi.number().required(),
        authMethod: joi.string().valid('AADHAAR_OTP','MOBILE_OTP').required(),
    }),
    verifyOtpABHA: joi.object({
        txnId: joi.string().required(),
        otp: joi.string().required(),
        authMethod: joi.string().valid('AADHAAR_OTP','MOBILE_OTP').required(),
    })
}

/**
 *
    * @param {joi.Schema} schema
 * @param {String} parameterType
 */

const validate = (schema, parameterType) => (req, res, next) => {
    console.log("ENTERED");
  const { error } = schema.validate(req[parameterType])
  if (error) {
    return res.status(400).json({ message: error.message })
  }
  next()
}

module.exports = { validate, REQ_PARAMTERS, schemas }