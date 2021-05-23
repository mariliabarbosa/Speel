const { Model, Sequelize } = require("sequelize");

class Reports extends Model{
    static init(sequelize){
        super.init({
            created_at: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW,
            },
            updated_at: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW,
            },
        },{
            sequelize
        });
    }
    static associate(models){
        this.belongsTo(models.Sensors, { foreignKey: 'id', as: 'sensor_id'})
    }
}

module.exports = Reports;