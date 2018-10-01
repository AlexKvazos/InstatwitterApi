const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes');
const database = require('./modules/database');
const session = require('./middleware/session');
const cors = require('./middleware/cors');
const app = express()
const port = 3000

database.init();

app.use(session);
app.use(cors);

// Leer el JSON de las solicitudes POST
app.use(bodyParser.json())
app.use(routes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
