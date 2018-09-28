const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, lowercase: true, required: true, unique: true, index: true },
  username: { type: String, required: true },
  hash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
})

const User = mongoose.model('User', UserSchema);

module.exports = User;
