const abdmPhoneUtils = require('../util/abdm/abdmPhoneLoginUtil')

const loginWithPhoneNumber = async (mobile) => {
  const data = await abdmPhoneUtils.generatePhoneLoginOTP(mobile)
  return data
}
const verifyPhoneOtp = async (txnId, otp) => {
  const data = await abdmPhoneUtils.verifyPhoneLoginOTP(txnId, otp)
  return data
}

module.exports = { loginWithPhoneNumber, verifyPhoneOtp }
