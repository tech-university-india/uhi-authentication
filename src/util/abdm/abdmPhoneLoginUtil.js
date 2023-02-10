const { default: axios } = require('axios')

const ABDM_HEALTH_SERVICE_URL = 'https://healthidsbx.abdm.gov.in/api'
const GENERATE_OTP_MOBILE_URL = '/v2/registration/mobile/login/generateOTP'
const generatePhoneLoginOTP = async (phone) => {

const token = await fetchJWTToken()
  const response = axios.post(ABDM_HEALTH_SERVICE_URL + GENERATE_OTP_MOBILE_URL, {
    mobile: phone
  }, {
    headers: {
        Authorization: 

    }
  })
}

module.exports = { generatePhoneLoginOTP }
