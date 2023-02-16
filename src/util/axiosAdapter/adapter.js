const axios = require('axios')
const { client } = require('../redisConnection')
const TOKEN_EXPIRE = 3500
const redisAdapter = (config) => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const redisData = await client.get(config.url)
        if (redisData) {
          resolve({ data: redisData })
        } else {
          const data = await axios.get(process.env.SANDBOXURL)
          await client.set(config.url, data.data, { EX: TOKEN_EXPIRE })
          resolve(data)
        }
      } catch (error) {
        reject(error)
      }
    })()
  })
}

const axiosInstance = axios.create({
  adapter: redisAdapter

})
const fetchJWTTokenFromAdapter = async () => {
  const response = await axiosInstance.get(process.env.SANDBOXURL)
  return response.data
}

module.exports = { fetchJWTTokenFromAdapter }
