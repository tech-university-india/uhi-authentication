const { default: axios, AxiosError } = require('axios')
const { getJWTToken } = require('../abdm/authToken')

const publicKeyFetcher = require('./publicKeyFetcher')
const encryptionUtils = require('./encryptionUtil')
const { HttpError } = require('../httpError')
const { ABDM_API_URLS } = require('../../../config')
const generatePhoneLoginOTP = async (mobile) => {
  try {
    const { token } = await getJWTToken()
    const response = await axios.post(ABDM_API_URLS.HEALTH_ID.LOGIN_GENERATE_OTP_MOBILE_URL, {
      mobile
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
      } else if (response.status === 400) {
        throw new HttpError(response.data.details[0].message, 400)
      }
    } else {
      throw Error(error)
    }
  }
}

const verifyPhoneLoginOTP = async (txnId, otp) => {
  try {
    const { token } = await getJWTToken()
    const publicKey = await publicKeyFetcher.getPublicKey('v2')
    const encryptedOtp = await encryptionUtils.getEncrypted(otp, publicKey)
    const response = await axios.post(ABDM_API_URLS.HEALTH_ID.LOGIN_VERIFY_OTP_MOBILE_URL, {
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
      } else if (response.status === 400) {
        throw new HttpError(response.data.details[0].message, 400)
      }
    } else {
      throw Error(error)
    }
  }
}

const resendPhoneLoginOTP = async (authMethod, txnId) => {
  try {
    const { token } = await getJWTToken()
    const response = await axios.post(ABDM_API_URLS.HEALTH_ID.LOGIN_RESEND_OTP_MOBILE_URL, {
      authMethod, txnId
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
        throw new HttpError('Could not Resend OTP or No Account Found with given Transaction.', 400)
      } else if (response.status === 400) {
        throw new HttpError(response.data.details[0].message, 400)
      }
    } else {
      throw Error(error)
    }
  }
}

module.exports = { generatePhoneLoginOTP, resendPhoneLoginOTP, verifyPhoneLoginOTP }
