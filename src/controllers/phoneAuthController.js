const authService = require('../services/authService')
const errorHandlerInRoute = require('../util/middleware/errorHandlerMiddleware')

const login = async (request, response) => {
  try {
    const { mobile } = request.body
    const data = await authService.loginWithPhoneNumber(mobile)
    response.status(201).json({ message: 'OTP sent', data })
  } catch (error) {
    errorHandlerInRoute(error, request, response)
  }
}
const verifyOtp = async (request, response) => {
  try {
    const { otp, txnId } = request.body
    const data = await authService.verifyPhoneOtp(txnId, otp)

    response.status(201).json({ message: 'OTP verified', data })
  } catch (error) {
    errorHandlerInRoute(error, request, response)
  }
}

module.exports = { login, verifyOtp }
