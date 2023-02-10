const authService = require('../services/authService')

const login = async (request, response) => {
  try {
    const { mobile } = request.body
    const data = await authService.loginWithPhoneNumber(mobile)
    response.status(201).json({ message: 'OTP sent', data })
  } catch (error) {
    console.log(error)
    response.send(error)
  }
}

module.exports = { login }
