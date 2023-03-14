const { default: axios } = require('axios')

const publicKeyUtil = require('../../../util/abdm/publicKey')
const encryptionUtils = require('../../../util/abdm/encryption')
const { ABDM_API_URL } = require('../../../../config')
const { handleAxiosError } = require('../../../util/errors/routehandler')

const checkHealthID = async (healthId, yearOfBirth) => {
  try {
    const { data } = await axios.post(
      ABDM_API_URL.HEALTH_ID.CHECK_ABHA_ID_URL,
      {
        healthId,
        yearOfBirth
      }
    )

    return data
  } catch (error) {
    handleAxiosError(error)
  }
}

const generateOtp = async (healthId, authMethod) => {
  try {
    const { data } = await axios.post(
      ABDM_API_URL.HEALTH_ID.LOGIN_GENERATE_OTP_ABHA_URL,
      {
        healthid: healthId,
        authMethod
      }
    )

    return data
  } catch (error) {
    handleAxiosError(error)
  }
}

const verifyAadhaarOtp = async (txnId, otp) => {
  try {
    const publicKey = await publicKeyUtil.getPublicKey('v2')
    const encryptedOtp = await encryptionUtils.getEncrypted(otp, publicKey)
    const response = await axios.post(
      ABDM_API_URL.HEALTH_ID.LOGIN_VERIFY_OTP_ABHA_AADHAAR_OTP_URL,
      {
        otp: encryptedOtp,
        txnId
      }
    )
    return response.data
  } catch (error) {
    handleAxiosError(error)
  }
}

const verifyAbhaOtp = async (txnId, otp) => {
  try {
    const publicKey = await publicKeyUtil.getPublicKey('v2')
    const encryptedOtp = await encryptionUtils.getEncrypted(otp, publicKey)
    const response = await axios.post(
      ABDM_API_URL.HEALTH_ID.LOGIN_VERIFY_OTP_ABHA_AADHAAR_OTP_URL,
      {
        otp: encryptedOtp,
        txnId
      }
    )
    return response.data
  } catch (error) {
    handleAxiosError(error)
  }
}

const resendOtp = async (authMethod, txnId) => {
  try {
    await axios.post(ABDM_API_URL.HEALTH_ID.LOGIN_RESEND_OTP_ABHA_URL, {
      authMethod,
      txnId
    })
    return true
  } catch (error) {
    handleAxiosError(error)
  }
}

module.exports = {
  checkHealthID,
  generateOtp,
  verifyAadhaarOtp,
  verifyAbhaOtp,
  resendOtp
}
