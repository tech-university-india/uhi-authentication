const Joi = require('joi')

const userSchema = Joi.object({
  userName: Joi.string().max(100).min(3).required(),
  healthId: Joi.string().min(14).max(18).required(),
  firstName: Joi.string().max(100).min(3).required(),
  middleName: Joi.string().max(100),
  lastName: Joi.string().max(100),
  profilePhoto: Joi.string().max(10000).required(),
  emailId: Joi.string().email().max(256).required(),
  phoneNumber: Joi.string().min(10).max(10).required(),
  address: Joi.string().required(),
  gender: Joi.string().valid('M', 'F', 'O').required(),
  dateOfBirth: Joi.string().required()
})

const userValidator = (req, res, next) => {
  const { error } = userSchema.validate(req.body)
  if (error) {
    return res.status(400).json({ message: error.message })
  }
  next()
}

module.exports = userValidator
