const axios = require('axios')

const getPublicKey = async (version = 'v1') => {
  const CERT_URL = `https://healthidsbx.abdm.gov.in/api/${version}/auth/cert`
  const publicKey = await axios.get(CERT_URL)
  return publicKey.data
}

module.exports = { getPublicKey }
