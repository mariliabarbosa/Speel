const Reports = require("../models/Reports")
const sequelize = require("sequelize");

module.exports = {
    async index(req, res){
        const { sensor_id } = req.params;
        
        const reports = await Reports.findAll({ where: { sensor_id }});

        return res.json(reports);
    },
    async getReportByYear(req, res){
        const { sensor_id, year } = req.params;
        
        const reports = await Reports.findAll({ where: { year, sensor_id }});

        return res.json(reports);
    },
    async getReportByMonth(req, res){
        const { sensor_id, year, month } = req.params;

        var reports = await Reports.findAll({ where: { sensor_id, year, month }});

        return res.json(reports);
    },
    async getReportByDay(req, res){
        const { sensor_id, year, month, day } = req.params;

        var reports = await Reports.findAll({ where: { sensor_id, year, month, day }});
        
        return res.json(reports);
    },
    async store(req, res){
        const { sensor_id, year, month, day, hour } = req.params;

        const reports = await Reports.create();
        
        const number = reports.length;

        return res.json(reports);
    },
}