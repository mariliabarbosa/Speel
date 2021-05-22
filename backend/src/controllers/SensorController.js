const Sensors = require("../models/Sensors");

module.exports = {
    async index(req, res){
        const id = req.id;

        const sensors = await Sensors.findAll({ where:{ user_id:id }});

        return res.json(sensors);
    },
    async getSensor(req, res){
        const { id } = req.params;

        const sensor = await Sensors.findOne({ where: { id }});

        return res.json(sensor);
    },
    async store(req, res){
        const user_id = req.id;
        const { id } = req.body;

        const sensor = await Sensors.create({ id, user_id, name: null, state: null});

        return res.json(sensor);
    },
    async update(req, res){
        const { sensor_id } = req.params;
        const { name, state, id } = req.body;

        const sensor = await Sensors.findOne({ where: { id:sensor_id }});

        if(!sensor) return res.status(401).send("Sensor not found");

        sensor.update({ name, state, id });
        sensor.save();

        return res.json(sensor);
    },
    async delete(req, res){
        const { id } = req.params;

        const sensor = await Sensors.findOne({ where: { id }});
        
        if(!sensor) return res.status(401).send("Sensor not found");

        sensor.destroy();

        return res(`Sensor ${id} deleted`);
    }
}