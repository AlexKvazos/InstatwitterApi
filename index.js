const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes');
const database = require('./modules/database');
const app = express()
const port = 3000

database.init();

app.use(function(req, res, next) {
  console.log(req.method, req.url);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Leer el JSON de las solicitudes POST
app.use(bodyParser.json())
app.use(routes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
