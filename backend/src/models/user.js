/* backend/src/models/user.js */
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  organisation_id: { type: DataTypes.INTEGER, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password_hash: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING }
}, {
  tableName: 'users',
  timestamps: true
});

module.exports = User;
