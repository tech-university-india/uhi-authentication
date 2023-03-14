const phoneLoginService = require('../services/abdm/login/phone')
const abhaLoginService = require('../services/abdm/login/abha')
const { errorHandlerInRoute } = require('../util/errors/errorHandler')

const login = async (request, response) => {
  try {
    const { loginType } = request.body
    let data = null
    if (loginType === 'MOBILE') {
      const { credentials } = request.body
      data = await phoneLoginService.generateOtp(credentials)
    } else {
      const { credentials, yearOfBirth, authMethod } = request.body
      data = await abhaLoginService.generateOtp(credentials, yearOfBirth, authMethod === undefined ? 'MOBILE_OTP' : authMethod)
    }
    response.status(201).json({ message: 'OTP sent', data })
  } catch (error) {
    errorHandlerInRoute(error, request, response)
  }
}

const resendOtp = async (request, response) => {
  try {
    const { txnId, authMethod, loginType } = request.body
    let data = null
    if (loginType === 'MOBILE') {
      data = await phoneLoginService.resendOtp(txnId, authMethod === undefined ? 'MOBILE_OTP' : authMethod)
    } else {
      data = abhaLoginService.resendOtp(txnId, authMethod === undefined ? 'MOBILE_OTP' : authMethod)
    }
    response.status(201).json({ message: 'OTP resent', data })
  } catch (error) {
    errorHandlerInRoute(error, request, response)
  }
}

const verifyOtp = async (request, response) => {
  try {
    const { otp, txnId, loginType } = request.body
    let data = null
    if (loginType === 'MOBILE') {
      data = await phoneLoginService.verifyOtpForLoginWithPhoneNumber(txnId, otp)
    } else {
      const { otp, txnId, authMethod } = request.body
      if (authMethod === 'AADHAAR_OTP') {
        data = abhaLoginService.verifyAadhaarOtp(txnId, otp)
      } else {
        data = abhaLoginService.verifyMobileOtp(txnId, otp)
      }
    }
    response.status(201).json({ message: 'OTP verified', data })
  } catch (error) {
    errorHandlerInRoute(error, request, response)
  }
}

const generateTokenByHealthId = async (request, response) => {
  try {
    const { token, txnId, healthId } = request.body
    const data = await phoneLoginService.getUserTokenByHealthId(healthId, txnId, token)
    response.status(201).json(data)
  } catch (error) {
    errorHandlerInRoute(error, request, response)
  }
}

module.exports = { login, verifyOtp, resendOtp, generateTokenByHealthId }
