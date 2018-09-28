const validation = require('../validation');

const TweetController = {

  getTweets(req, res) {
    res.send([
      {
        id: 1,
        body: "Hola mundo",
        likes: 10,
        retweets: 50,
        user: "Alex",
        comments: []
      },
      {
        id: 2,
        body: "Hola mundo",
        likes: 10,
        retweets: 50,
        user: "Alex",
        comments: []
      },
      {
        id: 3,
        body: "Hola mundo",
        likes: 10,
        retweets: 50,
        user: "Alex",
        comments: []
      }
    ])
  },

  getSingleTweet(req, res) {
    res.send({
      id: req.params.tweetId,
      body: "Hola mundo",
      likes: 10,
      retweets: 50,
      user: "Alex",
      comments: []
    })
  },

  postTweet(req, res) {
    // conseguir las propiedades que queremos
    const tweet = {
      body: req.body.body
    }

    if (!tweet.body) {
      res.send({ error: 'Tweet no puede estar vacio' })
      return;
    }

    if (!validation.isValidLength(tweet.body, 140)) {
      res.json({ error: 'Tweet no puede ser mayor de 140 caracteres.' });
      return;
    }

    // Guardar en base de datos

    res.send(tweet);
  },

  postComment(req, res) {
    const comment = {
      body: req.body.body,
      replyTo: req.body.replyTo
    };

    if (!comment.body || !comment.replyTo) {
      res.send({ error: 'Comment no puede estar vacio' })
      return;
    }

    if (!validation.isValidLength(comment.body, 140)) {
      res.send({ error: 'Comment no puede ser mayor de 140 caracteres.' });
      return;
    }

    res.send(comment);
  }

};

module.exports = TweetController;
