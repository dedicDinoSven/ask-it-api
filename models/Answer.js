module.exports = (sequelize, Sequelize) => {
    return sequelize.define("answer", {
        text: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
};