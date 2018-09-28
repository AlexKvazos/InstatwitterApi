const mongoose = require('mongoose');
const User = require('./User');

const TweetSchema = new mongoose.Schema({
  body: { type: String, required: true },
  likes: { type: Array, required: true },
  retweets: { type: Array, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref:'User', required: false },
  comments: { type: Array, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Tweet = mongoose.model('Tweet', TweetSchema);

module.exports = Tweet;
