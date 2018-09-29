const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');

const JWT_SECRET = 'awg828ag29';

const SessionController = {

  register(req, res) {
    let query = { email: req.body.email };
    UserModel.find(query, (err, data) => {
      if (err) {
        res.send({ error: 'Error en registro' });
        return;
      }

      // Ya hay usuarios con ese correo
      if (data.length) {
        res.send({ error: 'Correo ya utilizado' });
        return;
      }

      const hash = crypto.createHash('sha256').update(req.body.password).digest('hex');

      let user = new UserModel({
        email: req.body.email,
        username: req.body.username,
        hash: hash
      });

      user.save()

      .then((user) => {
        let { _id, email, username } = user;
        let token = jwt.sign({ _id }, JWT_SECRET);

        res.send({ _id, email, username, token });
      })

      .catch((err) => {
        res.send({ error: 'Error al registrarse' });
      });

    });
  },

  login(req, res) {
    const hash = crypto.createHash('sha256').update(req.body.password).digest('hex');

    let query ={
      email: req.body.email,
      hash: hash
    }

    UserModel.findOne(query, (err, data) => {
      if (err) {
        res.send({ error: 'Error al login' });
        return;
      }

      if (data) {
        let { _id, email, username } = data;
        let token = jwt.sign({ _id }, JWT_SECRET);

        res.send({ _id, email, username, token });
      } else {
        res.send({ error: 'Usuario o contraseña inválida' });
      }
    })

  }

};

module.exports= SessionController;
