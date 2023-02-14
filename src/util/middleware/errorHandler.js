const { HttpError } = require('../httpError')

const errorHandlerInRoute = (error, req, res) => {
  if (error instanceof HttpError) {
    res.status(error.statusCode).json({ message: error.message })
    return
  }
  console.log(error.toString())
  res.status(500).json({ message: 'Internal server error' })
}

module.exports = { errorHandlerInRoute }
