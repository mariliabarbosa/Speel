const { Model, Sequelize } = require('sequelize');

const bcrypt = require("bcrypt");

class User extends Model{
    static init(sequelize){
        super.init({
            id: {
                primaryKey: true,
                type: Sequelize.INTEGER,
                autoIncrement: true,
            },
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            cnpj: Sequelize.STRING,
            password: Sequelize.VIRTUAL,
            password_hash: Sequelize.STRING,
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
        this.hasMany(models.Sensors, { foreignKey: 'id', as: 'sensors'});
    }
}

module.exports = User;
