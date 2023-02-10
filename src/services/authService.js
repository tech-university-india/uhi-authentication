const abdmPhoneUtils = require('../util/abdm/abdmPhoneLoginUtil')

const loginWithPhoneNumber = async (mobile) => {
  const data = await abdmPhoneUtils.generatePhoneLoginOTP(mobile)
  return data
}

module.exports = { loginWithPhoneNumber }
