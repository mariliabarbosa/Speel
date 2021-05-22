const { Model, Sequelize } = require("sequelize");

class Reports extends Model{
    static init(sequelize){
        super.init({
            date: Sequelize.STRING,
            hour: Sequelize.STRING,
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
        this.belongsTo(models.Sensors, { foreignKey: 'sensor_id', as: 'sensor'})
    }
}