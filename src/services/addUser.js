const db = require('../database/models')

const addUserService = async (user) => {
  const mobileId = await db.userPhone.create({
    phoneNumber: user.mobile
  },
  { returning: true })

  const emailId = await db.userEmail.create({
    email: user.email
  }, { returning: true })

  const userObj = {
    firstName: user.firstName,
    lastName: user.lastName,
    emailId: emailId.id,
    phoneNumberId: mobileId.id,
    name: user.name,
    uniqueId: null,
    healthId: user.healthIdNumber,
    dateOfBirth: user.dateOfBirth,
    middleName: user.middleName,
    gender: user.gender,
    profilePhoto: user.profilePhoto
  }

  const userDetails = await db.Users.create(userObj, { returning: true })

  const userId = userDetails.id
  await db.userLocation.create({
    userId,
    stateCode: user.stateCode,
    districtCode: user.districtCode,
    subDistrictCode: user.subDistrictCode,
    pinCode: user.pinCode,
    address: user.address
  }, { returning: true })
}

module.exports = addUserService
