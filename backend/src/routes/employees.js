/* backend/src/routes/employees.js */
const express = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');
const {
  listEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee
} = require('../controllers/employeeController');

const router = express.Router();

// Protect all employee routes
router.use(authMiddleware);

// GET /api/employees
router.get('/', listEmployees);

// POST /api/employees
router.post('/', createEmployee);

// PUT /api/employees/:id
router.put('/:id', updateEmployee);

// DELETE /api/employees/:id
router.delete('/:id', deleteEmployee);

module.exports = router;
