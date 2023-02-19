const abdmRetrieveUtils = require('../util/abdm/abdmRetrieveUtil')

const generateOTP = async (authMethod, healthid) => {
  const resp = await abdmRetrieveUtils.generateOTP(authMethod, healthid)
  return resp
}
const verifyOTP = async (authMethod, otp, txnId) => {
  const resp = await abdmRetrieveUtils.reactivateHealthId(authMethod, otp, txnId)
  return resp
}
const search = async (healthId) => {
  const resp = await abdmRetrieveUtils.searchByHealthId(healthId)
  return resp
}

const generateAadharOtpForForgotAbha = async (aadhaar) => {
  const resp = await abdmRetrieveUtils.generateForgotOtpUsingAadhar(aadhaar)
  return resp
}
const verifyAadhaarOtpForForgotAbha = async (txnId, otp) => {
  const resp = await abdmRetrieveUtils.verifyForgotOtpUsingAadhar(txnId, otp)
  return resp
}
const generateMobileOtpForForgotAbha = async (mobile) => {
  const resp = await abdmRetrieveUtils.generateForgotOtpUsingMobile(mobile)
  return resp
}
const verifyMobileOtpForForgotAbha = async (txnId, otp, yearOfBirth) => {
  const resp = await abdmRetrieveUtils.verifyForgotOtpUsingMobile(txnId, otp, yearOfBirth)
  return resp
}

module.exports = {
  generateOTP,
  verifyOTP,
  search,
  generateAadharOtpForForgotAbha,
  verifyAadhaarOtpForForgotAbha,
  generateMobileOtpForForgotAbha,
  verifyMobileOtpForForgotAbha
}
