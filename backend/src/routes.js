const express = require('express');

const authMiddleware = require("./middlewares/auth");

const UserController = require("./controllers/UserController");
const SensorController = require("./controllers/SensorController");
const ReportController = require("./controllers/ReportController");
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/', SessionController.store);
routes.post('/users', UserController.store);

routes.use(authMiddleware);
routes.use((req, res, next) => {console.log(); return next()})

routes.get('/users', UserController.index);
routes.get('/currentuser', UserController.currentUser);
routes.get('/users/:id', UserController.getUser);
routes.patch('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.delete);

routes.get('/sensors', SensorController.index);
routes.get('/sensors/:id', SensorController.getSensor);
routes.post('/sensors/', SensorController.store);
routes.patch('/sensors/:id', SensorController.update);
routes.delete('/sensors/:id', SensorController.delete);

routes.get('/reports/:sensor_id', ReportController.index);
routes.get('/reports/:sensor_id/:year', ReportController.getReportByYear);
routes.get('/reports/:sensor_id/:year/:month', ReportController.getReportByMonth);
routes.get('/reports/:sensor_id/:year/:month/:day', ReportController.getReportByDay);
routes.get('/reports/:sensor_id/:year/:month/:day/:hour', ReportController.getReportByHour);

module.exports = routes;