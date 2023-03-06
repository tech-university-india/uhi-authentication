const addUserService = require('../services/addUser')

const addUserController = async (req, res) => {
  try {
    await addUserService(req.body)
    res.status(200).send('User added successfully')
  } catch (e) {
    res.status(500).send(e.message)
  }
}

module.exports = addUserController
