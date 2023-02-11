const abdmPhoneUtils = require('../util/abdm/abdmPhoneLoginUtil')
const abdmABHAUtils = require('../util/abdm/abdmABHALoginUtil')

const loginWithPhoneNumber = async (mobile) => {
  const data = await abdmPhoneUtils.generatePhoneLoginOTP(mobile)
  return data
}
const verifyOtpForLoginWithPhoneNumber = async (txnId, otp) => {
  const data = await abdmPhoneUtils.verifyPhoneLoginOTP(txnId, otp)
  return data
}

const resendOtpForLoginWithPhoneNumber = async (txnId, authMethod) => {
  const data = await abdmPhoneUtils.resendPhoneLoginOTP(authMethod, txnId)
  return data
}

const loginWithABHA = async (healthID, yearOfBirth, authMethod) => {
  const data = await abdmABHAUtils.checkHealthID(healthID, yearOfBirth)
  const { txnId } = await abdmABHAUtils.generateABHALoginOTP(healthID, authMethod);
  return txnId;
}

const verifyOtpForLoginWithABHAWithAadhaar = async (txnId, otp) => {
  const data = await abdmABHAUtils.verifyABHALoginOTPAadhaar(txnId, otp)
  return data
}

const verifyOtpForLoginWithABHAWithMobile = async (txnId, otp) => {
  
  const data = await abdmABHAUtils.verifyABHALoginOTPMobile(txnId, otp)
  return data
}

module.exports = { loginWithPhoneNumber, resendOtpForLoginWithPhoneNumber, verifyOtpForLoginWithPhoneNumber, loginWithABHA, verifyOtpForLoginWithABHAWithAadhaar, verifyOtpForLoginWithABHAWithMobile }
