const db = require('../database/models')

const addUserService = async (user) => {
  // eslint-disable-next-line no-unused-vars
  const userData = await db.Users.create({
    userName: user.userName,
    healthId: user.healthId,
    firstName: user.firstName,
    middleName: user.middleName,
    lastName: user.lastName,
    profilePhoto: user.profilePhoto,
    emailId: user.emailId,
    phoneNumber: user.phoneNumber,
    address: user.address,
    gender: user.gender,
    dateOfBirth: user.dateOfBirth
  }, { returning: true })
}

module.exports = addUserService
