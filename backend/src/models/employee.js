/* backend/src/models/employee.js */
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Employee = sequelize.define('Employee', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  organisation_id: { type: DataTypes.INTEGER, allowNull: false },
  first_name: { type: DataTypes.STRING },
  last_name: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  phone: { type: DataTypes.STRING }
}, {
  tableName: 'employees',
  timestamps: true
});

module.exports = Employee;
