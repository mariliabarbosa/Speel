const express = require('express');
const routes = require('./routes');

const app = express();
var port = process.env.PORT || 3005;

app.use(express.json());
app.use(routes);

app.listen(port, () => console.log("RODANDO"));