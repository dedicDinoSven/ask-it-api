const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DB_SCHEMA, process.env.DB_USER,
    process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "postgres",
        logging: false
    });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// connecting models with database
db.User = require("./models/User")(sequelize, Sequelize);
db.Answer = require("./models/Answer")(sequelize, Sequelize);
db.Question = require("./models/Question")(sequelize, Sequelize);
db.Rating = require("./models/Rating")(sequelize, Sequelize);

// relations between models

// one user can have multiple answers
// adds userId field to answer model
db.User.hasMany(db.Answer);
db.Answer.belongsTo(db.User,
    { foreignKey: { name: "userId", allowNull: false } });

// one user can have multiple questions
// adds userId field to question model
db.User.hasMany(db.Question);
db.Question.belongsTo(db.User,
    { foreignKey: { name: "userId", allowNull: false } });

// one user can have multiple ratings
// adds userId field to rating model
db.User.hasMany(db.Rating);
db.Rating.belongsTo(db.User,
    { foreignKey: { name: "userId", allowNull: false } });

// question & answer one-to-many,
// adds questionId to answer model
db.Question.hasMany(db.Answer);
db.Answer.belongsTo(db.Question,
    { foreignKey: { name: "questionId", allowNull: false } });

// rating & question one-to-one
// adds questionId to rating model
db.Question.hasMany(db.Rating);
db.Rating.belongsTo(db.Question,
    { foreignKey: { name: "questionId", allowNull: true } });

// rating & answer one-to-one
// adds answer to rating model
db.Answer.hasMany(db.Rating);
db.Rating.belongsTo(db.Answer,
    { foreignKey: { name: "answerId", allowNull: true } });

module.exports = db;