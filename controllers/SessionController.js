const crypto = require('crypto');
const UserModel = require('../models/User');

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
        res.send(user);
      })

      .catch((err) => {
        res.send({ error: 'Error al registrarse' });
      });

    });
  },

  login() {}

};

module.exports= SessionController;
