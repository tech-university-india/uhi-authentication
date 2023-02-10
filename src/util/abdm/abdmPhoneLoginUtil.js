const { default: axios, Axios, AxiosError } = require('axios')
const { getJWTToken } = require('../abdm/authToken')
const { HttpError } = require('../httpError')
const ABDM_HEALTH_SERVICE_URL = 'https://healthidsbx.abdm.gov.in/api'
const GENERATE_OTP_MOBILE_URL = '/v2/registration/mobile/login/generateOtp'
const VERIFY_OTP_MOBILE_URL = '/v2/registration/mobile/login/verifyOtp'
const publicKeyFetcher = require('./publicKeyFetcher')
const encryptionUtils = require('./encryptionUtil')
const generatePhoneLoginOTP = async (mobile) => {
  const { token } = await getJWTToken()

  const response = await axios.post(ABDM_HEALTH_SERVICE_URL + GENERATE_OTP_MOBILE_URL, {
    mobile
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  console.log(response.data)
  if (response.status === 400) {
    throw new HttpError('The mobile number is incorrect', 400)
  }
  return response.data
}

const verifyPhoneLoginOTP = async (txnId, otp) => {
  try {
    const { token } = await getJWTToken()
    const publicKey = await publicKeyFetcher.getPublicKey('v2')
    const encryptedOtp = await encryptionUtils.getEncrypted(otp, publicKey)
    const response = await axios.post(ABDM_HEALTH_SERVICE_URL + VERIFY_OTP_MOBILE_URL, {
      otp: encryptedOtp, txnId
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      const response = error.response
      if (response.status === 422) {
        throw new HttpError('The OTP is incorrect', 400)
      }
    }
  }
}

const resendPhoneLoginOTP = async (mobile) => {}

module.exports = { generatePhoneLoginOTP, resendPhoneLoginOTP, verifyPhoneLoginOTP }
