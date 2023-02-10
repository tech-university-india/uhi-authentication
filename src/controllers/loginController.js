const authService = require('../services/loginService')
const { errorHandlerInRoute } = require('../util/middleware/errorHandler')

const login = async (request, response) => {
  try {
    const { mobile } = request.body
    const data = await authService.loginWithPhoneNumber(mobile)
    response.status(201).json({ message: 'OTP sent', data })
  } catch (error) {
    errorHandlerInRoute(error, request, response)
  }
}

const resendOtp = async (request, response) => {
  try {
    const { txnId, authMethod } = request.body
    const data = await authService.resendOtpForLoginWithPhoneNumber(txnId, authMethod)
    response.status(201).json({ message: 'OTP resent', data })
  } catch (error) {
    errorHandlerInRoute(error, request, response)
  }
}

const verifyOtp = async (request, response) => {
  try {
    const { otp, txnId } = request.body
    const data = await authService.verifyOtpForLoginWithPhoneNumber(txnId, otp)

    response.status(201).json({ message: 'OTP verified', data })
  } catch (error) {
    errorHandlerInRoute(error, request, response)
  }
}

module.exports = { login, verifyOtp, resendOtp }
