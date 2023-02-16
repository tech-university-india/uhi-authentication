const axios = require('axios')
const { client } = require('../redisConnection')
const TOKEN_EXPIRE = process.env.ABHA_SERVER_TOKEN_EXPIRY || 60 * 9
const SANDBOX_URL = process.env.SANDBOXURL
const adapterCallback = (config) => async (resolve, reject) => {
  try {
    const redisData = await client.get(config.url)
    if (redisData) {
      resolve({ data: redisData })
    } else {
      const data = await axios.get(SANDBOX_URL)
      await client.set(config.url, data.data, { EX: TOKEN_EXPIRE })
      resolve(data)
    }
  } catch (error) {
    reject(error)
  }
}

const redisAdapter = (config) => {
  return new Promise(adapterCallback(config))
}

const axiosInstance = axios.create({
  adapter: redisAdapter
})

const fetchJWTTokenFromAdapter = async () => {
  const response = await axiosInstance.get(SANDBOX_URL)
  return response.data
}

module.exports = { fetchJWTTokenFromAdapter }
