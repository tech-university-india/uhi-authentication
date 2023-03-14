const addUserService = require('../services/user')

const register = async (req, res) => {
  try {
    await addUserService(req.body)
    res.status(200).send('User added successfully')
  } catch (e) {
    res.status(500).send(e.message)
  }
}

module.exports = { register }
