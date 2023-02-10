const { default: axios } = require('axios')
const { getJWTToken } = require('../abdm/authToken')
const { HttpError } = require('../httpError')
const ABDM_HEALTH_SERVICE_URL = 'https://healthidsbx.abdm.gov.in/api'
const GENERATE_OTP_MOBILE_URL = '/v2/registration/mobile/login/generateOtp'
const generatePhoneLoginOTP = async (mobile) => {
  const { token } = await getJWTToken()

  const response = await axios.post(ABDM_HEALTH_SERVICE_URL + GENERATE_OTP_MOBILE_URL, {
    mobile
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  if (response.status === 400) {
    throw new HttpError('The mobile number is incorrect', 400)
  }
  return response.data
}

module.exports = { generatePhoneLoginOTP }
