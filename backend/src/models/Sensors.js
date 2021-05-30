const { Model, Sequelize } = require("sequelize");

class Sensors extends Model{
    static init(sequelize){
        super.init({
            id: {
                type: Sequelize.STRING,
                primaryKey: true,
            },
            state: Sequelize.BOOLEAN,
            name: Sequelize.STRING,
        }, {
            sequelize
        });
    }

    static associate(models){
        this.belongsTo(models.User, { foreignKey: { name: "id", allowNull: "false" }, as: 'user_id' });
        this.hasMany(models.Reports);
    }
}

module.exports = Sensors;