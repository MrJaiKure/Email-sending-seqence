const Flow = require('../models/Flow');
const User = require('../models/User');

const agenda = require('../jobs/agenda');
const sendEmail = require('../utils/sendEmail');

const jwt = require('jsonwebtoken'); // if you're using JWT for authentication

const saveFlow = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Get token from Authorization header
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // replace 'your_secret_key' with your actual secret
    const userId = decoded.id; // assuming your token payload has user ID

    const { nodes, edges } = req.body;

    const newFlow = new Flow({
      user: userId,  // 👈 attach user id here
      nodes,
      edges,
    });

    await newFlow.save();
    await User.findByIdAndUpdate(userId, { $push: { flows: newFlow._id } });
    res.status(201).json({ message: 'Flow saved successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error saving flow' });
  }
};


const scheduleEmail = async (req, res) => {
  const { email, subject, body } = req.body;

  try {
    await agenda.schedule('in 1 hour', 'send-email', { email, subject, body });
    res.status(200).json({ message: 'Email scheduled successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error scheduling email' });
  }
};

module.exports = { saveFlow, scheduleEmail };
