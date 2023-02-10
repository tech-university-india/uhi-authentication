const { default: axios } = require('axios')
const { getJWTToken } = require('../abdm/authToken')
const ABDM_HEALTH_SERVICE_URL = 'https://healthidsbx.abdm.gov.in/api'
const GENERATE_OTP_MOBILE_URL = '/v2/registration/mobile/login/generateOTP'
const generatePhoneLoginOTP = async (phone) => {
  const token = await getJWTToken()
  const response = await axios.post(ABDM_HEALTH_SERVICE_URL + GENERATE_OTP_MOBILE_URL, {
    mobile: phone
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  if (response.status >= 500) {
    throw new Error('ABDM Server Error', 500)
  }
  return response.data
}

module.exports = { generatePhoneLoginOTP }
