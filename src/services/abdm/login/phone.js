const { default: axios } = require('axios')
const publicKeyFetcher = require('../../../util/abdm/publicKey')
const encryptionUtils = require('../../../util/abdm/encryption')
const { ABDM_API_URL } = require('../../../../config')
const { handleAxiosError } = require('../../../util/errors/routehandler')

const generateOtp = async (mobile) => {
  try {
    const { data } = await axios.post(
      ABDM_API_URL.HEALTH_ID.LOGIN_GENERATE_OTP_MOBILE_URL,
      {
        mobile
      }
    )

    return data
  } catch (error) {
    handleAxiosError(error)
  }
}

const verifyOtp = async (txnId, otp) => {
  try {
    const publicKey = await publicKeyFetcher.getPublicKey('v2')
    const encryptedOtp = await encryptionUtils.getEncrypted(otp, publicKey)
    const { data } = await axios.post(
      ABDM_API_URL.HEALTH_ID.LOGIN_VERIFY_OTP_MOBILE_URL,
      {
        otp: encryptedOtp,
        txnId
      }
    )

    if (data.mobileLinkedHid && data.mobileLinkedHid.length === 1) {
      const userToken = await getUserTokenByHealthId(
        data.mobileLinkedHid[0].healthIdNumber,
        data.txnId,
        data.token
      )
      return { token: userToken.token, single: true }
    }

    return { token: data.token, single: false }
  } catch (error) {
    handleAxiosError(error)
  }
}

const resendOtp = async (authMethod, txnId) => {
  try {
    const { data } = await axios.post(
      ABDM_API_URL.HEALTH_ID.LOGIN_RESEND_OTP_MOBILE_URL,
      {
        authMethod,
        txnId
      }
    )
    return data
  } catch (error) {
    handleAxiosError(error)
  }
}

const getUserTokenByHealthId = async (healthId, txnId, authToken) => {
  try {
    const { data } = await axios.post(
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
    return { message: `Token for ABHA ${healthId} generated`, data }
  } catch (error) {
    handleAxiosError(error)
  }
}

module.exports = {
  generateOtp,
  resendOtp,
  verifyOtp,
  getUserTokenByHealthId
}
