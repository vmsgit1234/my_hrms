/* backend/src/models/index.js */
const sequelize = require('../db');

const Organisation = require('./organisation');
const User = require('./user');
const Employee = require('./employee');
const Team = require('./team');
const EmployeeTeam = require('./employeeTeam');
const Log = require('./log');

// Associations
Organisation.hasMany(User, { foreignKey: 'organisation_id' });
User.belongsTo(Organisation, { foreignKey: 'organisation_id' });

Organisation.hasMany(Employee, { foreignKey: 'organisation_id' });
Employee.belongsTo(Organisation, { foreignKey: 'organisation_id' });

Organisation.hasMany(Team, { foreignKey: 'organisation_id' });
Team.belongsTo(Organisation, { foreignKey: 'organisation_id' });

Employee.belongsToMany(Team, { through: EmployeeTeam, foreignKey: 'employee_id' });
Team.belongsToMany(Employee, { through: EmployeeTeam, foreignKey: 'team_id' });

module.exports = {
  sequelize,
  Organisation,
  User,
  Employee,
  Team,
  EmployeeTeam,
  Log
};
