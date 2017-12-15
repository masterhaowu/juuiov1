module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    facebookid: {
      type: DataTypes.STRING,
    },
    facebooktoken: {
      type: DataTypes.STRING,
    },
    firstname: {
      type: DataTypes.STRING,
    },
    lastname: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  });
  return User;
};