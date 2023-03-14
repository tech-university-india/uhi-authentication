const registerRoutes = require('express').Router()
const addUserController = require('../controllers/user')
const { validate, REQ_PARAMTERS, schemas } = require('../util/middleware/validator')

registerRoutes.post('/', validate(schemas.userOnboardingDetails, REQ_PARAMTERS.BODY), addUserController)

module.exports = registerRoutes
