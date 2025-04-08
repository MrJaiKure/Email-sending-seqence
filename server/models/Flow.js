const mongoose = require('mongoose');

const flowSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',  // 👈 Reference the User model
    required: true
  },
  nodes: Array,
  edges: Array
});

module.exports = mongoose.model('Flow', flowSchema);
