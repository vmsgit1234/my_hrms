/* backend/src/controllers/logsController.js */
const { Log, User } = require("../models");

/** GET /api/logs */
async function listLogs(req, res) {
  try {
    const logs = await Log.findAll({
      where: { organisation_id: req.user.orgId },
      include: [{ model: User, attributes: ["id", "email", "name"] }],
      order: [["timestamp", "DESC"]]
    });

    return res.json(logs);
  } catch (err) {
    console.error("listLogs error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = { listLogs };
