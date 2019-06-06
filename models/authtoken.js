'use strict';
module.exports = (sequelize, DataTypes) => {
  const AuthToken = sequelize.define('AuthToken', {
    token: DataTypes.STRING,
    email: DataTypes.STRING,
  }, {});
  AuthToken.associate = function(models) {
    // associations can be defined here
  };
  return AuthToken;
};