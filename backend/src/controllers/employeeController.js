
const { Employee, Log } = require('../models');

async function listEmployees(req, res) {
  try {
    const employees = await Employee.findAll({ where: { organisation_id: req.user.orgId } });
    return res.json(employees);
  } catch (err) {
    console.error('listEmployees error', err);
    return res.status(500).json({ message: 'Server error' });
  }
}

async function createEmployee(req, res) {
  const { first_name, last_name, email, phone } = req.body;
  try {
    const employee = await Employee.create({
      first_name, last_name, email, phone,
      organisation_id: req.user.orgId
    });

    await Log.create({
      organisation_id: req.user.orgId,
      user_id: req.user.userId,
      action: 'employee_created',
      meta: { employeeId: employee.id, first_name: employee.first_name, last_name: employee.last_name }
    });

    return res.status(201).json(employee);
  } catch (err) {
    console.error('createEmployee error', err);
    return res.status(500).json({ message: 'Server error' });
  }
}

async function updateEmployee(req, res) {
  const id = Number(req.params.id);             
  const { first_name, last_name, email, phone } = req.body;

  try {
    const employee = await Employee.findOne({
      where: { id, organisation_id: req.user.orgId }
    });
    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    await employee.update({ first_name, last_name, email, phone });
    await Log.create({
      organisation_id: req.user.orgId,
      user_id: req.user.userId,
      action: 'employee_updated',
      meta: { employeeId: employee.id, first_name, last_name, email, phone }
    });

    return res.json(employee);
  } catch (err) {
    console.error('updateEmployee error', err);
    return res.status(500).json({ message: 'Server error' });
  }
}

async function deleteEmployee(req, res) {
  const { id } = req.params;
  try {
    const employee = await Employee.findOne({ where: { id, organisation_id: req.user.orgId }});
    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    await employee.destroy();

    await Log.create({
      organisation_id: req.user.orgId,
      user_id: req.user.userId,
      action: 'employee_deleted',
      meta: { employeeId: id }
    });

    return res.json({ message: 'Deleted' });
  } catch (err) {
    console.error('deleteEmployee error', err);
    return res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {
  listEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee
};
