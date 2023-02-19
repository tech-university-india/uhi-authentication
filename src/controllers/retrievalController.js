const retrievalService = require('../services/retrievalService')
const { errorHandlerInRoute } = require('../util/middleware/errorHandler')

const retrieve = async (req, resp) => {
  try {
    const { authMethod, healthid } = req.body
    const data = await retrievalService.generateOTP(authMethod, healthid)
    resp.status(201).json({ message: 'OTP sent', data })
  } catch (error) {
    errorHandlerInRoute(error, req, resp)
  }
}

const verifyOTP = async (req, resp) => {
  try {
    const { authMethod, otp, txnId } = req.body
    const data = await retrievalService.verifyOTP(authMethod, otp, txnId)
    resp.status(200).json({ message: 'OTP verified', data })
  } catch (error) {
    errorHandlerInRoute(error, req, resp)
  }
}
const searchProfile = async (req, resp) => {
  try {
    const { healthId } = req.body
    const data = await retrievalService.search(healthId)
    resp.status(200).json({ message: 'Profile found', data })
  } catch (error) {
    errorHandlerInRoute(error, req, resp)
  }
}

const generateAadhaarOtpForForgotAbha = async (req, resp) => {
  try {
    const { aadhaar } = req.body
    const data = await retrievalService.generateAadharOtpForForgotAbha(aadhaar)
    resp.status(200).json({ message: 'OTP sent', data })
  } catch (error) {
    errorHandlerInRoute(error, req, resp)
  }
}
const verifyAadhaarOtpForForgotAbha = async (req, resp) => {
  try {
    const { txnId, otp } = req.body
    const data = await retrievalService.verifyAadhaarOtpForForgotAbha(txnId, otp)
    resp.status(200).json({ message: 'OTP verified', data })
  } catch (error) {
    errorHandlerInRoute(error, req, resp)
  }
}

const generateMobileOtpForForgotAbha = async (req, resp) => {
  try {
    const { mobile } = req.body
    const data = await retrievalService.generateMobileOtpForForgotAbha(mobile)
    resp.status(200).json({ message: 'OTP sent', data })
  } catch (error) {
    errorHandlerInRoute(error, req, resp)
  }
}
const verifyMobileOtpForForgotAbha = async (req, resp) => {
  try {
    const { txnId, otp, yearOfBirth } = req.body
    const data = await retrievalService.verifyMobileOtpForForgotAbha(txnId, otp, yearOfBirth)
    resp.status(200).json({ message: 'OTP verified', data })
  } catch (error) {
    errorHandlerInRoute(error, req, resp)
  }
}

module.exports = {
  retrieve,
  verifyOTP,
  searchProfile,
  generateAadhaarOtpForForgotAbha,
  verifyAadhaarOtpForForgotAbha,
  generateMobileOtpForForgotAbha,
  verifyMobileOtpForForgotAbha
}
