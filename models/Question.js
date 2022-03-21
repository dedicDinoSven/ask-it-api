module.exports = (sequelize, Sequelize) => {
    return sequelize.define("question", {
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        text: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
};