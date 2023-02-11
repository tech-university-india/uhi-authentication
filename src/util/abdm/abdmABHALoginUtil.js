const { default: axios, AxiosError } = require('axios')
const { getJWTToken } = require('../abdm/authToken')

const publicKeyFetcher = require('./publicKeyFetcher')
const encryptionUtils = require('./encryptionUtil')
const { HttpError } = require('../httpError')
const { ABDM_API_URLS } = require('../../../config')

const handleAxiosErrorForABHALogin = (error) => {
  if (error instanceof AxiosError) {
    const response = error.response
    throw new HttpError(response.data.details[0].message, 400)
  }
  throw Error(error)
}

const checkHealthID = async (healthId, yearOfBirth) => {
  try {
    const { token } = await getJWTToken()

    const { data } = await axios.post(ABDM_API_URLS.HEALTH_ID.CHECK_ABHA_ID_URL, {
      healthId,
      yearOfBirth
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return data
  } catch (error) {
    handleAxiosErrorForABHALogin(error)
  }
}

const generateABHALoginOTP = async (healthId, authMethod) => {
  try {
    const { token } = await getJWTToken()
    const { data } = await axios.post(ABDM_API_URLS.HEALTH_ID.LOGIN_GENERATE_OTP_ABHA_URL, {
      healthid: healthId,
      authMethod
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return data
  } catch (error) {
    handleAxiosErrorForABHALogin(error)
  }
}

const verifyABHALoginOTPAadhaar = async (txnId, otp) => {
  try {
    const { token } = await getJWTToken()
    const publicKey = await publicKeyFetcher.getPublicKey('v2')
    const encryptedOtp = await encryptionUtils.getEncrypted(otp, publicKey)
    const response = await axios.post(ABDM_API_URLS.HEALTH_ID.LOGIN_VERIFY_OTP_ABHA_AADHAAR_OTP_URL, {
      otp: encryptedOtp, txnId
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (error) {
    handleAxiosErrorForABHALogin(error)
  }
}

const verifyABHALoginOTPMobile = async (txnId, otp) => {
  try {
    const { token } = await getJWTToken()
    const publicKey = await publicKeyFetcher.getPublicKey('v2')
    const encryptedOtp = await encryptionUtils.getEncrypted(otp, publicKey)
    const response = await axios.post(ABDM_API_URLS.HEALTH_ID.LOGIN_VERIFY_OTP_ABHA_AADHAAR_OTP_URL, {
      otp: encryptedOtp, txnId
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (error) {
    handleAxiosErrorForABHALogin(error)
  }
}

module.exports = {
  checkHealthID,
  generateABHALoginOTP,
  verifyABHALoginOTPAadhaar,
  verifyABHALoginOTPMobile
}
