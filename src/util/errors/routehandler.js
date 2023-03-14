const { AxiosError } = require('axios')
const HttpError = require('./httpError')

const handleAxiosError = (error) => {
  if (error instanceof AxiosError) {
    const response = error.response
    if ([500, 401].includes(response.status)) { throw new Error() }
    throw new HttpError(response.data.message, error.response.status)
  }
  throw Error()
}

module.exports = { handleAxiosError }
