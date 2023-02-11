const abdmPhoneUtils = require('../util/abdm/abdmPhoneLoginUtil')

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
module.exports = { loginWithPhoneNumber, resendOtpForLoginWithPhoneNumber, verifyOtpForLoginWithPhoneNumber }
