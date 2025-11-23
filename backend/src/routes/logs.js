/* backend/src/routes/logs.js */
const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { Log } = require("../models");

const router = express.Router();

// Only authenticated users can see logs (simple version)
router.use(authMiddleware);

router.get("/", async (req, res) => {
  try {
    const logs = await Log.findAll({
      where: { organisation_id: req.user.orgId },
      order: [["timestamp", "DESC"]],
    });
    res.json(logs);
  } catch (err) {
    console.error("logs error", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
