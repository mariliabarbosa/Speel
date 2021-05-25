const { Model, Sequelize } = require("sequelize");

class Reports extends Model{
    static init(sequelize){
        super.init({
        },{
            sequelize
        });
    }
    static associate(models){
        this.belongsTo(models.Sensors, { foreignKey: 'id', as: 'sensor_id'})
    }
}

module.exports = Reports;