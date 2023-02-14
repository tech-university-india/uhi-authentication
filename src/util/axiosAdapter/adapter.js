
const { AxiosRedis } = require('@tictactrip/axios-redis')
const axios = require('axios')
const { client } = require('../redisConnection')
const axiosRedis = new AxiosRedis(client, {
  expirationInMS: 3600 * 1000,
  separator: '____',
  prefix: '@sepit',
  axiosConfigPaths: [
    'url',
    'method',
    'params',
    'data'
  ]

})
const axiosInstance = axios.create({
  adapter: (config) => AxiosRedis.ADAPTER(config, axiosRedis)
})
const fetchJWTTokenFromAdapter = async () => {
  console.log(process.env.SANDBOXURL)
  const response = await axiosInstance.get(process.env.SANDBOXURL)
  return response.data

  // await client.disconnect()
}

module.exports = { fetchJWTTokenFromAdapter }
