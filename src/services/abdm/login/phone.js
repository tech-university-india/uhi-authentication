const { default: axios, AxiosError } = require('axios')
const publicKeyFetcher = require('../../../util/abdm/publicKeyUtil')
const encryptionUtils = require('../../../util/abdm/encryptionUtil')
const { HttpError } = require('../../../util/httpError')
const { ABDM_API_URL } = require('../../../../config')

const handleAxiosErrorForPhoneLogin = (error) => {
  if (error instanceof AxiosError) {
    const response = error.response
    if ([500, 401].includes(response.status)) throw new Error()
    throw new HttpError(response.data.details[0].message, 400)
  }
  throw Error(error)
}

const generatePhoneLoginOTP = async (mobile) => {
  try {
    const response = await axios.post(
      ABDM_API_URL.HEALTH_ID.LOGIN_GENERATE_OTP_MOBILE_URL,
      {
        mobile
      }
    )

    return response.data
  } catch (error) {
    handleAxiosErrorForPhoneLogin(error)
  }
}

const verifyPhoneLoginOTP = async (txnId, otp) => {
  try {
    const publicKey = await publicKeyFetcher.getPublicKey('v2')
    const encryptedOtp = await encryptionUtils.getEncrypted(otp, publicKey)
    const response = await axios.post(
      ABDM_API_URL.HEALTH_ID.LOGIN_VERIFY_OTP_MOBILE_URL,
      {
        otp: encryptedOtp,
        txnId
      }
    )

    return response.data
  } catch (error) {
    handleAxiosErrorForPhoneLogin(error)
  }
}

const resendPhoneLoginOTP = async (authMethod, txnId) => {
  try {
    const response = await axios.post(
      ABDM_API_URL.HEALTH_ID.LOGIN_RESEND_OTP_MOBILE_URL,
      {
        authMethod,
        txnId
      }
    )
    return response.data
  } catch (error) {
    handleAxiosErrorForPhoneLogin(error)
  }
}

const getUserTokenByHealthId = async (healthId, txnId, authToken) => {
  try {
    const response = await axios.post(
      ABDM_API_URL.HEALTH_ID.FETCH_USER_AUTHORIZED_TOKEN,
      {
        healthId,
        txnId
      },
      {
        headers: {
          'T-Token': `Bearer ${authToken}`
        }
      }
    )
    return response.data
  } catch (error) {
    handleAxiosErrorForPhoneLogin(error)
  }
}

module.exports = {
  generatePhoneLoginOTP,
  resendPhoneLoginOTP,
  verifyPhoneLoginOTP,
  getUserTokenByHealthId
}
