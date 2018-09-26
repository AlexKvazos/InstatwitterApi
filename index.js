const express = require('express')
const bodyParser = require('body-parser')
var mongoose = require('mongoose');
const validation = require('./validation');
const app = express()
const port = 3000

mongoose.connect('mongodb://cerouno-alex:cerouno1@ds113873.mlab.com:13873/instatwitter', { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Conectado a la base de datos');
});

// Leer el JSON de las solicitudes POST
app.use(bodyParser.json())

app.get('/api/tweets', (req, res) => {
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
});

app.get('/api/tweet/:tweetId', (req, res) => {
  res.send({
    id: req.params.tweetId,
    body: "Hola mundo",
    likes: 10,
    retweets: 50,
    user: "Alex",
    comments: []
  })
});

app.post('/api/tweet', (req, res) => {
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
});

app.post('/api/tweet/comment', (req, res) => {
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
})

// 404 handler
app.use((req, res) => {
  res.status(404);
  res.send({ error: "Invalid API" });
})

// Error handler
app.use((err, req, res, next) => {
  console.log('Error!!!');
  res.send({
    error: 'Internal server error'
  });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
