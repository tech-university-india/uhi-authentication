'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userPhrAddress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  userPhrAddress.init({
    userId: DataTypes.NUMBER,
    phrAddress: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'userPhrAddress',
  });
  return userPhrAddress;
};