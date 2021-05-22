const express = require('express');
const routes = express.Router();

const authMiddleware = require("./middlewares/auth");

const UserController = require("./controllers/UserController");
const SensorController = require("./controllers/SensorController");
const ReportController = require("./controllers/ReportController");

const UserValidator = require("./validators/UserValidator");

routes.post('/users', UserValidator, UserController.store);

routes.use(authMiddleware);

routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.getUser);
routes.patch('/users/:id', UserValidator, UserController.update);
routes.delete('/users/:id', UserController.delete);

routes.get('/sensors', SensorController.index);
routes.get('/sensors/:id', SensorController.getSensor);
routes.post('/sensors', SensorController.store);
routes.patch('/sensors/:id', SensorController.update);
routes.delete('/sensors/:id', SensorController.delete);

routes.get('/reports/:sensor_id', ReportController.index);
routes.get('/reports/:sensor_id/:year/', ReportController.getReportByYear);
routes.get('/reports/:sensor_id/:year/:month', ReportController.getReportByMonth);
routes.get('/reports/:sensor_id/:year/:month/:day', ReportController.getReportByDay);

module.exports = routes;