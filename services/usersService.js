const bcrypt = require("bcryptjs");
const db = require("../database");
const User = db.User;
const { Op } = require("sequelize");

const createUser = async (data) => {
    const user = await User.findOne({ where: { email: data.email } });

    if (user) throw new Error("User with given email already exists!");

    return bcrypt.hash(data.password, 10).then(async (hash) => {
        data.password = hash;

        return User.create(data).catch((err) => {
            throw err.message || "Error while creating new user!";
        });
    });
};

const getUsers = async () => {
    try {
        return await User.findAll();
    } catch (err) {
        throw err.message || "Error while getting users list!";
    }
};

const getUserById = async (id) => {
    try {
        return await User.findByPk(id);
    } catch (err) {
        throw err.message || "Error while getting user with given ID!";
    }
};

const updateUser = async (id, data) => {
    try {
        const existingUser = await User.findOne(
            {
                where: {
                    email: data.email,
                    id: { [Op.ne]: id }
                }
            });

        if (existingUser && data.email)
            return new Error("Email is used by someone else!");

        return await User.update({ ...data }, { where: { id: id } });
    } catch (err) {
        throw err.message || "Error while trying to update user!";
    }
};

const deleteUser = async (id) => {
    try {
        return await User.destroy({ where: { id: id } });
    } catch (err) {
        throw err.message || "Error while trying to delete user!";
    }
};

const UsersService = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
}

module.exports = UsersService;