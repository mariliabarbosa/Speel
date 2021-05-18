const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');

const models = [User];

const connection = new Sequelize(dbConfig);

models.map((model) => model.init(connection));

models.map((model) => model.associate && model.associate(connection.models));

module.exports = connection;