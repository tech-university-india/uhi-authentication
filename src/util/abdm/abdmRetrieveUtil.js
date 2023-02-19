const { default: axios, AxiosError } = require('axios')
const { getJWTToken } = require('../../services/authToken')

const publicKeyFetcher = require('../../services/publicKeyFetcher')
const encryptionUtil = require('./encryptionUtil')
const { HttpError } = require('../httpError')
const { ABDM_API_URLS } = require('../../../config')

const handleAxiosError = (error) => {
  if (error instanceof AxiosError) {
    const response = error.response
    throw new HttpError(response.data.details[0].message, 400)
  }
  throw Error(error)
}

const generateOTP = async (authMethod, healthid) => {
  try {
    const { token } = await getJWTToken()
    console.log(token)
    const response = await axios.post(ABDM_API_URLS.HEALTH_ID.RETRIEVE_GENERATE_OTP_URL, {
      authMethod, healthid
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (error) {
    handleAxiosError(error)
  }
}

const reactivateHealthId = async (authMethod, otp, txnId) => {
  try {
    const { token } = await getJWTToken()
    const publicKey = await publicKeyFetcher.getPublicKey('v2')
    const encryptedOtp = await encryptionUtil.getEncrypted(otp, publicKey)
    const response = await axios.post(ABDM_API_URLS.HEALTH_ID.RETRIEVE_VERIFY_OTP_URL, {
      authMethod, otp: encryptedOtp, txnId
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (error) {
    handleAxiosError(error)
  }
}

const searchByHealthId = async (healthId) => {
  try {
    const { token } = await getJWTToken()
    const response = await axios.post(ABDM_API_URLS.HEALTH_ID.FORGOT_AABHA_SEARCH_BY_HEALTH_ADDRESS_URL, {
      healthId
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (error) {
    console.log(error)
    handleAxiosError(error)
  }
}

const generateForgotOtpUsingAadhar = async (aadhaar) => {
  try {
    const { token } = await getJWTToken()
    const response = await axios.post(ABDM_API_URLS.HEALTH_ID.FORGOT_ABHA_GENERATE_AADHAAR_OTP_URL, {
      aadhaar
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (error) {
    handleAxiosError(error)
  }
}

const verifyForgotOtpUsingAadhar = async (txnId, otp) => {
  try {
    const { token } = await getJWTToken()
    const response = await axios.post(ABDM_API_URLS.HEALTH_ID.FORGOT_ABHA_VERIFY_AADHAAR_OTP_URL, {
      txnId, otp
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (error) {
    handleAxiosError(error)
  }
}

const generateForgotOtpUsingMobile = async (mobile) => {
  try {
    const { token } = await getJWTToken()
    const response = await axios.post('https://healthidsbx.abdm.gov.in/api/v1/forgot/healthId/mobile/generateOtp', {
      mobile
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (error) {
    handleAxiosError(error)
  }
}
const verifyForgotOtpUsingMobile = async (txnId, otp, yearOfBirth) => {
  try {
    const { token } = await getJWTToken()
    const response = await axios.post('https://healthidsbx.abdm.gov.in/api/v1/forgot/healthId/mobile', {
      otp: '762757',
      status: 'Active',
      txnId: '6fb942bd-bce4-44d0-8f1d-780ef091f1d2',
      yearOfBirth: '2001',
      name: 'Ishit Singh',
      dayOfBirth: '01',
      firstName: 'Ishit',
      gender: 'M',
      lastName: 'Singh',
      monthOfBirth: '03'
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (error) {
    handleAxiosError(error)
  }
}

module.exports = {
  generateOTP,
  reactivateHealthId,
  searchByHealthId,
  generateForgotOtpUsingAadhar,
  verifyForgotOtpUsingAadhar,
  generateForgotOtpUsingMobile,
  verifyForgotOtpUsingMobile
}
