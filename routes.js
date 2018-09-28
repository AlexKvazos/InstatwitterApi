const { Router } = require('express');
const TweetController = require('./controllers/TweetController');
const UtilitiesController = require('./controllers/UtilitiesController');
const routes = Router();

routes.get('/api/tweets', TweetController.getTweets);
routes.get('/api/tweet/:tweetId', TweetController.getSingleTweet);
routes.post('/api/tweet', TweetController.postTweet);
routes.post('/api/tweet/comment', TweetController.postComment);

routes.use(UtilitiesController.handle404);
routes.use(UtilitiesController.handle500);

module.exports = routes;
