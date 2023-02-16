const jose = require('jose')
const { fetchJWTTokenFromAdapter } = require('../util/axiosAdapter/adapter')

const parseJWT = (jwt) => jose.decodeJwt(jwt)

const getJWTToken = async () => {
  const token = await fetchJWTTokenFromAdapter()
  return { token, decoded: parseJWT(token) }
}

module.exports = { getJWTToken }
