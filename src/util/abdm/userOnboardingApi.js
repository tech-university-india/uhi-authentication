const axios = require('axios')
const { ABDM_API_URLS } = require('../../../config')

const generateOtp = async (encAadhar, token) => {
  const response = axios.post(ABDM_API_URLS.HEALTH_ID.ONBOARDING_GENERATE_OTP_AADHAAR_URL, {
    aadhaar: encAadhar
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response
}

const verifyOtp = async (encOtp, txnId, token) => {
  const response = await axios.post(ABDM_API_URLS.HEALTH_ID.ONBOARDING_VERIFY_OTP_AADHAAR_URL, {
    // if v2 use encryptedOTP
    otp: encOtp, // userOtp,
    txnId
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response
}

const checkAndGenerateMobileOTP = async (mobileNum, txnId, token) => {
  const response = await axios.post(ABDM_API_URLS.HEALTH_ID.ONBOARDING_CHECK_AND_GENERATE_MOBILE_OTP_URL, {
    mobile: mobileNum,
    txnId
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response
}

const verifyMobileOtp = async (otp, txnId, token) => {
  const response = await axios.post(ABDM_API_URLS.HEALTH_ID.ONBOARDING_VERIFY_MOBILE_OTP_URL, {
    otp,
    txnId
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response
}

const createHealthIdWithPreVerified = async (userData, userDetails, txnId, token) => {
  const response = await axios.post(ABDM_API_URLS.HEALTH_ID.ONBOARDING_CREATE_HEALTH_ID_WITH_PRE_VERIFIED_URL_V1, {
    // "mobile": userMobileNum,
    // "txnId": transactioId
    ...userData,
    ...userDetails,
    txnId
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response
}

module.exports = {
  generateOtp,
  verifyOtp,
  checkAndGenerateMobileOTP,
  verifyMobileOtp,
  createHealthIdWithPreVerified
}
