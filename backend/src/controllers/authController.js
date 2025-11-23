
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Organisation, User, Log } = require('../models');

async function register(req, res) {
  const { orgName, adminName, email, password } = req.body;
  if (!orgName || !email || !password) {
    return res.status(400).json({ message: 'orgName, email and password are required' });
  }

  try {
    const org = await Organisation.create({ name: orgName });

    
    const password_hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      organisation_id: org.id,
      email,
      password_hash,
      name: adminName
    });

    const token = jwt.sign(
      { userId: user.id, orgId: org.id },
      process.env.JWT_SECRET || 'devsecret',
      { expiresIn: '8h' }
    );

    
    await Log.create({
      organisation_id: org.id,
      user_id: user.id,
      action: 'organisation_created',
      meta: { orgName, adminEmail: email }
    });

    return res.status(201).json({ token, user: { id: user.id, email: user.email, name: user.name }});
  } catch (err) {
    console.error('register error', err);
    return res.status(500).json({ message: 'Server error' });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'email and password required' });

  try {
    const user = await User.findOne({ where: { email }});
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { userId: user.id, orgId: user.organisation_id },
      process.env.JWT_SECRET || 'devsecret',
      { expiresIn: '8h' }
    );

    await Log.create({
      organisation_id: user.organisation_id,
      user_id: user.id,
      action: 'user_login',
      meta: {}
    });

    return res.json({ token, user: { id: user.id, email: user.email, name: user.name }});
  } catch (err) {
    console.error('login error', err);
    return res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {
  register,
  login
};
