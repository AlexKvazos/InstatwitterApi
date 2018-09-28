var mongoose = require('mongoose');

const database = {

  init() {
    mongoose.connect('mongodb://cerouno-alex:cerouno1@ds113873.mlab.com:13873/instatwitter', { useNewUrlParser: true });
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
      console.log('Conectado a la base de datos');
    });
  }

};

module.exports = database;
