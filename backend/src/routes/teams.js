/* backend/src/routes/teams.js */
const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const {
  listTeams,
  createTeam,
  updateTeam,
  deleteTeam,
  assignEmployee,
  unassignEmployee
} = require("../controllers/teamController");

const router = express.Router();

router.use(authMiddleware);

router.get("/", listTeams);
router.post("/", createTeam);
router.put("/:id", updateTeam);
router.delete("/:id", deleteTeam);

// Assign employee to team
router.post("/:teamId/assign", assignEmployee);

// Unassign employee
router.delete("/:teamId/unassign", unassignEmployee);

module.exports = router;
