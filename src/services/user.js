const db = require('../database/models')

const addUserService = async (user) => {
  // eslint-disable-next-line no-unused-vars
  await db.Users.create({
    ...user
  }, { returning: true })
}

module.exports = addUserService
