const { HttpError } = require('../errors/httpError')

const errorHandlerInRoute = (error, req, res) => {
  if (error instanceof HttpError) {
    res.status(error.statusCode).json({ message: error.message })
    return
  }
  res.status(500).json({ message: 'Internal server error' })
}

module.exports = { errorHandlerInRoute }
