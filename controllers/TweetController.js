const validation = require('../validation');
const TweetModel = require('../models/Tweet');

const TweetController = {

  getTweets(req, res) {
    TweetModel.find().sort('-createdAt').populate('user', 'username').exec((err, data) => {
      if (err) {
        res.send({ error: 'Error al leer datos' });
        return;
      }

      res.send(data);
    });
  },

  getSingleTweet(req, res) {
    TweetModel.findById(req.params.tweetId, (err, data) => {
      if (err) {
        res.send({ error: 'Error al leer datos' });
        return;
      }

      res.send(data);
    })
  },

  postTweet(req, res, next) {
    if (!req.user) return next(403);

    // conseguir las propiedades que queremos
    const fields = {
      body: req.body.body,
      user: req.user._id
    };

    if (!fields.body) {
      res.send({ error: 'Tweet no puede estar vacio' })
      return;
    }

    if (!validation.isValidLength(fields.body, 140)) {
      res.json({ error: 'Tweet no puede ser mayor de 140 caracteres.' });
      return;
    }

    // Guardar en base de datos
    let tweet = new TweetModel(fields)
    tweet.save().then(() => {
      tweet.user = req.user;
      res.send(tweet);
    })
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

    let query = { _id: comment.replyTo };
    let update = { $push: { comments: comment } };

    TweetModel.update(query, update, (err, data) => {
      if (err) {
        res.send({ error: 'Error al postear comment' });
        return;
      }

      res.send(data);
    });
  }

};

module.exports = TweetController;
