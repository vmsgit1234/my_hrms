
const { Team, Employee, EmployeeTeam, Log } = require("../models");

async function listTeams(req, res) {
  try {
    const teams = await Team.findAll({
      where: { organisation_id: req.user.orgId },
      include: [{ model: Employee, as: "Employees", through: { attributes: [] } }]
    });
    return res.json(Array.isArray(teams) ? teams : { value: teams });
  } catch (err) {
    console.error("listTeams error", err);
    return res.status(500).json({ message: "Server error" });
  }
}

async function createTeam(req, res) {
  try {
    const { name, description } = req.body;
    const team = await Team.create({ name, description, organisation_id: req.user.orgId });
    await Log.create({ organisation_id: req.user.orgId, user_id: req.user.userId, action: "team_created", meta: { teamId: team.id } });
    return res.status(201).json(team);
  } catch (err) {
    console.error("createTeam error", err);
    return res.status(500).json({ message: "Server error" });
  }
}

async function updateTeam(req, res) {
  try {
    const id = Number(req.params.id);
    const { name, description } = req.body;
    const team = await Team.findOne({ where: { id, organisation_id: req.user.orgId } });
    if (!team) return res.status(404).json({ message: "Team not found" });

    await team.update({ name, description });
    await Log.create({ organisation_id: req.user.orgId, user_id: req.user.userId, action: "team_updated", meta: { teamId: team.id, name, description } });
    return res.json(team);
  } catch (err) {
    console.error("updateTeam error", err);
    return res.status(500).json({ message: "Server error" });
  }
}

async function deleteTeam(req, res) {
  try {
    const id = Number(req.params.id);
    const team = await Team.findOne({ where: { id, organisation_id: req.user.orgId } });
    if (!team) return res.status(404).json({ message: "Team not found" });

    await team.destroy();
    await Log.create({ organisation_id: req.user.orgId, user_id: req.user.userId, action: "team_deleted", meta: { teamId: id } });
    return res.json({ message: "Team deleted" });
  } catch (err) {
    console.error("deleteTeam error", err);
    return res.status(500).json({ message: "Server error" });
  }
}

async function assignEmployee(req, res) {
  try {
    const teamId = Number(req.params.teamId);
    const { employeeId } = req.body;
    if (!employeeId) return res.status(400).json({ message: "employeeId required" });

    const team = await Team.findOne({ where: { id: teamId, organisation_id: req.user.orgId }});
    const employee = await Employee.findOne({ where: { id: employeeId, organisation_id: req.user.orgId }});
    if (!team || !employee) return res.status(404).json({ message: "Team or Employee not found" });

    await EmployeeTeam.findOrCreate({ where: { team_id: teamId, employee_id: employeeId } });

    await Log.create({ organisation_id: req.user.orgId, user_id: req.user.userId, action: "assigned_employee_to_team", meta: { teamId, employeeId }});
    return res.json({ message: "Employee assigned to team" });
  } catch (err) {
    console.error("assignEmployee error", err);
    return res.status(500).json({ message: "Server error" });
  }
}

async function unassignEmployee(req, res) {
  try {
    const teamId = Number(req.params.teamId);
    const { employeeId } = req.body;
    if (!employeeId) return res.status(400).json({ message: "employeeId required" });

    const assoc = await EmployeeTeam.findOne({ where: { team_id: teamId, employee_id: employeeId } });
    if (!assoc) return res.status(404).json({ message: "Assignment not found" });

    await assoc.destroy();
    await Log.create({ organisation_id: req.user.orgId, user_id: req.user.userId, action: "unassigned_employee_from_team", meta: { teamId, employeeId }});
    return res.json({ message: "Employee unassigned from team" });
  } catch (err) {
    console.error("unassignEmployee error", err);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  listTeams,
  createTeam,
  updateTeam,
  deleteTeam,
  assignEmployee,
  unassignEmployee
};
