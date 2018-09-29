const { Router } = require('express');
const TweetController = require('./controllers/TweetController');
const UtilitiesController = require('./controllers/UtilitiesController');
const SessionController = require('./controllers/SessionController');
const routes = Router();

routes.get('/api/tweets', TweetController.getTweets);
routes.get('/api/tweet/:tweetId', TweetController.getSingleTweet);
routes.post('/api/tweet', TweetController.postTweet);
routes.post('/api/tweet/comment', TweetController.postComment);

routes.post('/api/register', SessionController.register);
routes.post('/api/login', SessionController.login);

// routes.use(UtilitiesController.handle404);
routes.use(UtilitiesController.handle500);

module.exports = routes;
