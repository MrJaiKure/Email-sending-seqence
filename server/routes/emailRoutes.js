const express = require('express');
const router = express.Router();
const { agenda } = require('../config/agenda');
const { sendEmail } = require('../utils/sendEmail');

// Save the flow (from frontend)
router.post('/save-flow', async (req, res) => {
  const { nodes } = req.body;

  try {
    // Loop through nodes and schedule emails
    for (const node of nodes) {
      if (node.data.label.includes('Cold Email')) {
        await agenda.schedule('in 1 hour', 'send-email', {
          to: 'recipient@example.com', // You can customize or fetch dynamically
          subject: 'Cold Email Subject',
          text: 'Hello! This is a cold email from your flowchart app.',
        });
      }
      // You can also handle Wait/Delay or Lead Source nodes if needed
    }

    res.status(200).json({ message: 'Flow saved and emails scheduled' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error saving flow' });
  }
});

module.exports = router;
