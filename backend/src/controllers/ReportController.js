const Reports = require("../models/Reports");

module.exports = {
    async index(req, res){
        const { sensor_id } = req.params;
        
        const report = await Reports.findAll({ where: { sensor_id }});

        return res.json(report);
    },
    async getReportByYear(req, res){
        const { sensor_id, year } = req.params;

        const reports = await Reports.findAll({ where: {  sensor_id, created_at: created_at.includes(year) }});

        return res.json(reports);
    },
    async getReportByMonth(req, res){
        const { sensor_id, year, month } = req.params;

        const reports = await Reports.findAll({ where: {  sensor_id, created_at: created_at.includes(year&&month) }});

        return res.json(reports);
    },
    async getReportByDay(req, res){
        const { year, month, day } = req.params;

        const reports = await Reports.findAll({ where: {  sensor_id, created_at: created_at.includes(year&&month&&day) }});
        
        return res.json(reports);
    },
}