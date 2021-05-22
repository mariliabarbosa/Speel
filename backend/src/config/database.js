require('dotenv/config');

module.exports = {
    dialect: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    dialectOptions: { //for reading from database
        dateStrings: true,
        typeCast: true,
        timezone: "-03:00"
    },
    timezone: "-03:00", //for writing to database
    define: {
        timestamps: true,
        underscored: true
    }
}