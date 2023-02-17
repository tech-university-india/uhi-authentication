const authService = require('../services/loginService')
const { errorHandlerInRoute } = require('../util/middleware/errorHandler')

const login = async (request, response) => {
  try {
    const { loginType } = request.body
    let data = null
    if (loginType === 'MOBILE') {
      const { credentials } = request.body
      data = await authService.loginWithPhoneNumber(credentials)
    } else {
      const { credentials, yearOfBirth, authMethod } = request.body
      data = await authService.loginWithABHA(credentials, yearOfBirth, authMethod === undefined ? 'MOBILE_OTP' : authMethod)
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
      data = await authService.resendOtpForLoginWithPhoneNumber(txnId, authMethod === undefined ? 'MOBILE_OTP' : authMethod)
    } else {
      data = authService.resendOtpForLoginWithABHA(txnId, authMethod === undefined ? 'MOBILE_OTP' : authMethod)
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
      data = await authService.verifyOtpForLoginWithPhoneNumber(txnId, otp)
    } else {
      const { otp, txnId, authMethod } = request.body
      data = await authService.verifyOtpForLoginWithABHA(txnId, otp, authMethod === undefined ? 'MOBILE_OTP' : authMethod)
    }
    response.status(201).json({ message: 'OTP verified', data })
  } catch (error) {
    errorHandlerInRoute(error, request, response)
  }
}

module.exports = { login, verifyOtp, resendOtp }
