const phoneLoginService = require('./abdm/login/phone')
const abhaLoginService = require('./abdm/login/abha')

const loginWithPhoneNumber = async (mobile) => {
  const data = await phoneLoginService.generatePhoneLoginOTP(mobile)
  return data
}
const verifyOtpForLoginWithPhoneNumber = async (txnId, otp) => {
  const data = await phoneLoginService.verifyPhoneLoginOTP(txnId, otp)
  if (data.mobileLinkedHid && data.mobileLinkedHid.length === 1) {
    const userToken = await phoneLoginService.getUserTokenByHealthId(
      data.mobileLinkedHid[0].healthIdNumber,
      data.txnId,
      data.token
    )
    return { token: userToken.token, single: true }
  }

  return { token: data.token, single: false }
}

const resendOtpForLoginWithPhoneNumber = async (txnId, authMethod) => {
  const data = await phoneLoginService.resendPhoneLoginOTP(authMethod, txnId)
  return data
}

const loginWithABHA = async (healthID, yearOfBirth, authMethod) => {
  await abhaLoginService.checkHealthID(healthID, yearOfBirth)
  const { txnId } = await abhaLoginService.generateABHALoginOTP(
    healthID,
    authMethod
  )
  return txnId
}

const verifyOtpForLoginWithABHA = async (txnId, otp, authMethod) => {
  let data = null
  if (authMethod === 'AADHAAR_OTP') {
    data = await abhaLoginService.verifyABHALoginOTPAadhaar(txnId, otp)
  } else {
    data = await abhaLoginService.verifyABHALoginOTPMobile(txnId, otp)
  }
  return data
}

const resendOtpForLoginWithABHA = async (txnid, authMethod) => {
  const data = await abhaLoginService.resendABHALoginOTP(authMethod, txnid)
  return data
}

const getAccountDetailsFromHealthID = async (healthId, txnId, authToken) => {
  const data = await phoneLoginService.getUserTokenByHealthId(
    healthId,
    txnId,
    authToken
  )
  return { message: `Token for ABHA ${healthId} generated`, data }
}

module.exports = {
  getAccountDetailsFromHealthID,
  resendOtpForLoginWithABHA,
  loginWithPhoneNumber,
  resendOtpForLoginWithPhoneNumber,
  verifyOtpForLoginWithPhoneNumber,
  loginWithABHA,
  verifyOtpForLoginWithABHA
}
