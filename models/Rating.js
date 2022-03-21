module.exports = (sequelize, Sequelize) => {
    return sequelize.define("rating", {
        value: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
    });
};