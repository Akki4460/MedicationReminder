const bcrypt = require('bcrypt');
const { User } = require('../models/User');
const { generateToken } = require('../utils/JWT');

const SALT_ROUNDS = 10;

// Register
const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: 'Email is already in use' });
    }

    // Hashing
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    await User.create({ name, email, password_hash: passwordHash, role });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Comparing password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken({ id: user.id, role: user.role });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { register, login };
