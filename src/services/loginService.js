const abdmPhoneUtils = require('../util/abdm/abdmPhoneLoginUtil')
const abdmABHAUtils = require('../util/abdm/abdmABHALoginUtil')

const loginWithPhoneNumber = async (mobile) => {
  const data = await abdmPhoneUtils.generatePhoneLoginOTP(mobile)
  return data
}
const verifyOtpForLoginWithPhoneNumber = async (txnId, otp) => {
  const data = await abdmPhoneUtils.verifyPhoneLoginOTP(txnId, otp)
  if (data.mobileLinkedHid && data.mobileLinkedHid.length === 1) { 
    const userToken = await abdmPhoneUtils.getUserTokenByHealthId(data.mobileLinkedHid[0].healthIdNumber, data.txnId, data.token)
    return { token: userToken.token, single: true }
  }

  return { token: data.token, single: false }
}

const resendOtpForLoginWithPhoneNumber = async (txnId, authMethod) => {
  const data = await abdmPhoneUtils.resendPhoneLoginOTP(authMethod, txnId)
  return data
}

const loginWithABHA = async (healthID, yearOfBirth, authMethod) => {
  await abdmABHAUtils.checkHealthID(healthID, yearOfBirth)
  const { txnId } = await abdmABHAUtils.generateABHALoginOTP(healthID, authMethod)
  return txnId
}

const verifyOtpForLoginWithABHA = async (txnId, otp, authMethod) => {
  let data = null
  if (authMethod === 'AADHAAR_OTP') {
    data = await abdmABHAUtils.verifyABHALoginOTPAadhaar(txnId, otp)
  } else {
    data = await abdmABHAUtils.verifyABHALoginOTPMobile(txnId, otp)
  }
  return data
}

const resendOtpForLoginWithABHA = async (txnid, authMethod) => {
  const data = await abdmABHAUtils.resendABHALoginOTP(authMethod, txnid)
  return data
}

const getAccountDetailsFromHealthID = async (healthId, txnId, authToken) => {
  const data = await abdmPhoneUtils.getUserTokenByHealthId(healthId, txnId, authToken)
  return { message: `Token for ABHA ${healthId} generated`, data }
}

module.exports = { getAccountDetailsFromHealthID, resendOtpForLoginWithABHA, loginWithPhoneNumber, resendOtpForLoginWithPhoneNumber, verifyOtpForLoginWithPhoneNumber, loginWithABHA, verifyOtpForLoginWithABHA }
