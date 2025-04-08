const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

// SECRET KEY
const JWT_SECRET =process.env.JWT_SECRET;

// Register
router.post('/auth/register', async (req, res) => {
  const { email, password } = req.body;
  
  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ error: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  
  const newUser = new User({ email, password: hashedPassword });
  await newUser.save();

  res.status(201).json({ message: 'User registered successfully' });
});

// Login
router.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });

  
  res.json({ token });
});


// Middleware to protect routes
const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];
  
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

router.get('/profile', authMiddleware, async (req, res) => {
  const user = await User.findById(req.userId).select('email');
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  // console.log(user)
  res.json(user);
});

module.exports = router;