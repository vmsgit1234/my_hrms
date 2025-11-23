require('dotenv').config();
const express = require('express');
const { sequelize } = require('./models'); // loads models & associations

const authRoutes = require('./routes/auth');      // /api/auth
const employeeRoutes = require('./routes/employees'); // /api/employees
const teamRoutes = require('./routes/teams');     // /api/teams
const logRoutes = require('./routes/logs');       // /api/logs
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Health route
app.get('/', (req, res) => res.json({ message: 'HRMS backend running (MySQL)' }));

// Mount API routes
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/logs', logRoutes);

// Basic error handler (keeps responses friendly)
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await sequelize.authenticate();
    console.log('DB connected (MySQL)');
    // Dev convenience — creates tables automatically. Use migrations for production.
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();