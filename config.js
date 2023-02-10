const SERVICE_URLS = {
  ABDM_HEALTH_SERVICE_URL: 'https://healthidsbx.abdm.gov.in/api'
}

const ABDM_API_URLS = {
  HEALTH_ID: {
    LOGIN_GENERATE_OTP_MOBILE_URL: SERVICE_URLS.ABDM_HEALTH_SERVICE_URL + '/v2/registration/mobile/login/generateOtp',
    LOGIN_VERIFY_OTP_MOBILE_URL: SERVICE_URLS.ABDM_HEALTH_SERVICE_URL + '/v2/registration/mobile/login/verifyOtp',
    LOGIN_RESEND_OTP_MOBILE_URL: SERVICE_URLS.ABDM_HEALTH_SERVICE_URL + '/v2/registration/mobile/login/resendOtp'
  }

}

module.exports = { SERVICE_URLS, ABDM_API_URLS }
