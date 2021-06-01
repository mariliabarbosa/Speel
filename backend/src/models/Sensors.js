const { Model, Sequelize } = require("sequelize");

class Sensors extends Model{
    static init(sequelize){
        super.init({
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
            },
            state: Sequelize.BOOLEAN,
            name: Sequelize.STRING,
            user_id: Sequelize.INTEGER,
        }, {
            sequelize
        });
    }

}

module.exports = Sensors;