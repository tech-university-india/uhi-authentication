// // This parses the the token fetched from the sandbox
// // and saves it to a local file
// // If the token expires then a new token will be fetched and parsed.

// const fs = require('fs')
// const FILE_NAME = 'fetchedToken.txt'
// const tokenFileExists = () =>
//   fs.existsSync(FILE_NAME)

// const fetchJWTFromServer = async () => {
//   // console.log(process.env.SANDBOXURL)
//   const response = await fetch(process.ENV.SANDBOXURL)
//   const token = await response.text()
//   return token
// }

// const writeTokenFileWithNewToken = (token) => new Promise((resolve, reject) => {
//   fs.writeFile(FILE_NAME, token, { flag: 'w' }, (error) => {
//     if (error) { reject(error) }
//     resolve(true)
//   })
// })

// const readTokenFile = () => {
//   if (tokenFileExists()) {
//     return new Promise((resolve, reject) => {
//       fs.readFile(FILE_NAME, 'utf-8', (error, data) => {
//         error ? reject(error) : resolve(data)
//       })
//     })
//   }
//   return '' // File do not exist
// }

const jose = require('jose')
const { fetchJWTTokenFromAdapter } = require('../util/axiosAdapter/adapter')

const parseJWT = (jwt) => jose.decodeJwt(jwt)

const getJWTToken = async () => {
  const token = await fetchJWTTokenFromAdapter()
  return { token, decoded: parseJWT(token) }
}

module.exports = { getJWTToken }
