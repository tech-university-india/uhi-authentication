const authService = require('../services/authService')

const login = async (request, response) => {
  try {
    const { phone } = request.body
    const data = await authService.loginWithPhoneNumber(phone)
    response.status(201).json({ message: 'OTP sent', data })
  } catch (error) {}
}

module.exports = { login }
