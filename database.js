const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DB_SCHEMA, process.env.DB_USER,
    process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "postgres"
    });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User = require("./models/User")(sequelize, Sequelize);

module.exports = db;