'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      uniqueId: {
        type: Sequelize.UUID
      },
      healthId: {
        type: Sequelize.STRING
      },
      firstName: {
        type: Sequelize.STRING
      },
      middleName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      dateOfBirth: {
        type: Sequelize.DATEONLY
      },
      yearOfBirth: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.ENUM('M', 'F', 'O')
      },
      profilePhoto: {
        type: Sequelize.STRING
      },
      emailId: {
        type: Sequelize.INTEGER,
        references: { model: 'userEmails', key: 'id' }
      },
      phoneNumberId: {
        type: Sequelize.INTEGER,
        references: { model: 'userPhones', key: 'id' }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Users')
  }
}
