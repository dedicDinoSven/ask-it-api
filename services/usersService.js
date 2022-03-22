const bcrypt = require("bcryptjs");
const db = require("../database");
const User = db.User;
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");

const createUser = async (data) => {
    if (!data.email) throw new Error("Email is required!");
    else if (!data.password) throw new Error("Password is required!");
    else if (data.password.length < 5 || data.password.length > 100)
        throw new Error("Password must be 5 to 100 characters long!");
    else if (!data.password2)
        throw new Error("Confirmed password is required!");
    else if (data.password !== data.password2)
        throw new Error("Passwords do not match!");

    const user = await User.findOne({ where: { email: data.email } });

    if (user) throw new Error("User with given email already exists!");

    return bcrypt.hash(data.password, 10).then(async (hash) => {
        data.password = hash;

        return User.create(data)
            .then((user) => {
                if (user) {
                    const token = jwt.sign(
                        { id: user.id },
                        process.env.JWT_SECRET,
                        {
                            expiresIn: "30d",
                        }
                    );

                    return {
                        id: user.id,
                        email: user.email,
                        firstName: user.firstName ?? "",
                        lastName: user.lastName ?? "",
                        token: token,
                    };
                }
            })
            .catch((err) => {
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
        const existingUser = await User.findOne({
            where: {
                email: data.email,
                id: { [Op.ne]: id },
            },
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
    deleteUser,
};

module.exports = UsersService;
