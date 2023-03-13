'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  users.init({
    userName: DataTypes.STRING,
    healthId: DataTypes.STRING,
    firstName: DataTypes.STRING,
    middleName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    profilePhoto: DataTypes.STRING,
    emailId: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING,
    dateOfBirth: DataTypes.DATEONLY,
    gender: DataTypes.ENUM('M', 'F', 'O'),
    aadhaarNumber: DataTypes.STRING,
    healthIdNumber: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users'
  })
  return users
}
