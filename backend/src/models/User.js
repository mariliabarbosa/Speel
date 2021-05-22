const { Model, Sequelize } = require('sequelize');

const bcrypt = require("bcrypt");

class User extends Model{
    static init(sequelize){
        super.init({
            id: {
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            cnpj: Sequelize.STRING,
            password: Sequelize.VIRTUAL,
            password_hash: Sequelize.STRING,
            created_at: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW,
            },
            updated_at: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW,
            },
        }, {
            sequelize,
            tableName: 'users'
        });

        this.addHook('beforeSave', async(user) => {
            if(user.password){
                user.password_hash = await bcrypt.hash(user.password, 8);
            }
        });

        return this
    }
    static associate(models){
        this.hasMany(models.Sensors, { foreignKey: 'sensor_id', as: 'sensors'});
    }
}

module.exports = User;
