module.exports = {
    up: (queryInterface, Sequelize) => 
      queryInterface.createTable('Users', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        facebookid: {
          type: Sequelize.STRING,
        },
        facebooktoken: {
          type: Sequelize.STRING,
        },
        firstname: {
          type: Sequelize.STRING,
        },
        lastname: {
          type: Sequelize.STRING,
        },
        email: {
          type: Sequelize.STRING,
        },
        password: {
          type: Sequelize.STRING,
        },
        resetPasswordToken: {
          type: Sequelize.STRING,
        },
        resetPasswordExpires: {
          type: Sequelize.DATE,          
        },        
        createdAt: {
          type: Sequelize.DATE,
        },
        updatedAt: {
          type: Sequelize.DATE,
        },
      }),
      down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('Users'),    
  };