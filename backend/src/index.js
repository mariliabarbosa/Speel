const express = require('express');
const routes = require('./routes');

const app = express();
var port = 8000;

require('express-async-errors');
require("./database");

app.use(express.json());
app.use(routes);

app.listen(port, () => console.log(`Rodando em http://localhost:${port}`));