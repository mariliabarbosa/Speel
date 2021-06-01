const { Model, Sequelize } = require("sequelize");

class Reports extends Model{
    static init(sequelize){
        super.init({
            sensor_id: {
                type: Sequelize.STRING,
            },
            year: Sequelize.INTEGER,
            month: Sequelize.INTEGER,
            day: Sequelize.INTEGER,
            hour: Sequelize.STRING
        },{
            sequelize
        });
    }
}
module.exports = Reports;