const UtilitesController = {

  handle404(req, res) {
    res.status(404);
    res.send({ error: "Invalid API" });
  },

  handle500(err, req, res, next) {
    console.log('Error!!!');
    res.send({
      error: 'Internal server error'
    });
  }

};

module.exports = UtilitesController;
