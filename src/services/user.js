const db = require('../database/models')

const addUserService = async (user) => {
  await db.users.create({
    ...user
  }, { returning: true })
}

module.exports = addUserService
