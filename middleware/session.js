const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');

const JWT_SECRET = 'awg828ag29';

function session(req, res, next) {
  let token = req.headers.token;
  if (!token) return next();

  // si hay un token
  jwt.verify(token, JWT_SECRET, (err, data) => {
    if (err) {
      res.status(403);
      res.send({ error: 'Sesión inválida' });
      return;
    }

    UserModel.findById(data._id, (err, user) => {
      if (err) return next(err);
      req.user = user;
      next();
    });
  });
}

module.exports = session;
