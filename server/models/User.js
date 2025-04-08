const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  flows: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Flow' }] // 👈 Add this
});

module.exports = mongoose.model('User', userSchema);
