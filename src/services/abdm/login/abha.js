const { default: axios, AxiosError } = require('axios')

const publicKeyUtil = require('../../../util/abdm/publicKeyUtil')
const encryptionUtils = require('../../../util/abdm/encryptionUtil')
const { HttpError } = require('../../../util/httpError')
const { ABDM_API_URL } = require('../../../../config')

const handleAxiosErrorForABHALogin = (error) => {
  if (error instanceof AxiosError) {
    const response = error.response
    throw new HttpError(response.data.details[0].message, 400)
  }
  throw Error(error)
}

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
    handleAxiosErrorForABHALogin(error)
  }
}

const generateABHALoginOTP = async (healthId, authMethod) => {
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
    handleAxiosErrorForABHALogin(error)
  }
}

const verifyABHALoginOTPAadhaar = async (txnId, otp) => {
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
    handleAxiosErrorForABHALogin(error)
  }
}

const verifyABHALoginOTPMobile = async (txnId, otp) => {
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
    handleAxiosErrorForABHALogin(error)
  }
}

const resendABHALoginOTP = async (authMethod, txnId) => {
  try {
    await axios.post(ABDM_API_URL.HEALTH_ID.LOGIN_RESEND_OTP_ABHA_URL, {
      authMethod,
      txnId
    })
    return true
  } catch (error) {
    handleAxiosErrorForABHALogin(error)
  }
}

module.exports = {
  checkHealthID,
  generateABHALoginOTP,
  verifyABHALoginOTPAadhaar,
  verifyABHALoginOTPMobile,
  resendABHALoginOTP
}
