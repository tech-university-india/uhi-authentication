'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn('Users', 'dateOfBirth', {
          type: Sequelize.DATEONLY
        }, { transaction: t }),
        queryInterface.addColumn('Users', 'genders', {
          type: Sequelize.ENUM('M', 'F', 'O')
        }, { transaction: t })
      ])
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('Users', 'dateOfBirth', {
          type: Sequelize.DATEONLY
        }, { transaction: t }),
        queryInterface.removeColumn('Users', 'genders', {
          type: Sequelize.ENUM('M', 'F', 'O')
        }, { transaction: t })
      ])
    })
  }
}
