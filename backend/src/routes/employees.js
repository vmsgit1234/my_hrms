
const express = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');
const {
  listEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee
} = require('../controllers/employeeController');

const router = express.Router();

router.use(authMiddleware);

router.get('/', listEmployees);

router.post('/', createEmployee);

router.put('/:id', updateEmployee);

router.delete('/:id', deleteEmployee);

module.exports = router;
