const express = require('express');
const routes = express.Router();

const UserController = require("./controllers/UserController");

routes.get('/', (req, res) => res.send(":)"));

routes.post('/users', UserController.store);

module.exports = routes;