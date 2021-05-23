const Reports = require("../models/Reports");
const sequelize = require("sequelize");

module.exports = {
    async index(req, res){
        const { sensor_id } = req.params;
        
        const report = await Reports.findAll({ where: { sensor_id }});

        const number = reports.length;

        return res(number);
    },
    async getReportByYear(req, res){
        const { sensor_id, year } = req.params;
        
        const reports = await Reports.findAll({ where: { year, sensor_id }});

        const number = reports.length;

        return res(number);
    },
    async getReportByMonth(req, res){
        const { sensor_id, year, month } = req.params;

        var reports = await Reports.findAll({ where: { sensor_id, year, month }});

        const number = reports.length;

        return res(number);
    },
    async getReportByDay(req, res){
        const { sensor_id, year, month, day } = req.params;

        const reports = await Reports.findAll({ where: {  sensor_id, year, month, day }});
        
        const number = reports.length;

        return res(number);
    },
    async getReportByHour(req, res){
        const { sensor_id, year, month, day, hour } = req.params;

        const reports = await Reports.findAll({ where: {  sensor_id, year, month, day, hour }});
        
        const number = reports.length;

        return res(number);
    },
}