const bcrypt = require("bcryptjs");
const db = require("../database");
const User = db.User;
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");

const createUser = async (data) => {
    if (!data.email) throw new Error("Email is required!");
    else if (!data.password) throw new Error("Password is required!");
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
        return await User.findAll({ attributes: { exclude: ["password"] } });
    } catch (err) {
        throw err.message || "Error while getting users list!";
    }
};

const getUserById = async (id) => {
    try {
        return await User.findByPk(id, {
            attributes: { exclude: ["password"] },
        });
    } catch (err) {
        throw err.message || "Error while getting user with given ID!";
    }
};

const updateUser = async (id, data) => {
    const allowedUpdates = ["firstName", "lastName", "email"];
    const fieldsForUpdate = Object.keys(data);

    const isValid = fieldsForUpdate.every((field) =>
        allowedUpdates.includes(field)
    );

    if (!isValid)
        throw new Error(
            "Invalid fields for update! Allowed updates are: first name, last name and email"
        );
    try {
        const user = await User.findByPk(id, {
            attributes: { exclude: ["password"] },
        });

        if (!user) throw new Error("User does not exist!");

        if (!data.email) throw new Error("Email is required!");

        const existingUser = await User.findOne({
            where: {
                email: data.email,
                id: { [Op.ne]: id },
            },
        });

        if (existingUser) throw new Error("Email is used by someone else!");

        user.set({
            firstName: data?.firstName,
            lastName: data?.lastName,
            email: data?.email,
        });
        await user.save();

        return user;
    } catch (err) {
        throw err.message || "Error while trying to update user!";
    }
};

const updatePassword = async (id, data) => {
    const allowedUpdate = "password";
    const fieldsForUpdate = Object.keys(data);

    const isValid = fieldsForUpdate.some((field) => allowedUpdate === field);
    if (!isValid) throw new Error("Invalid field for update!");

    try {
        const user = await User.findByPk(id);

        if (!user) throw new Error("User does not exist!");

        if (!data.password) throw new Error("Password is required!");
        else if (!data.password2)
            throw new Error("Confirmed password is required!");
        else if (data.password !== data.password2)
            throw new Error("Passwords do not match!");

        const isOldPassword = await bcrypt.compare(
            data.password,
            user.password
        );

        if (isOldPassword)
            throw new Error(
                "You cannot use your current password as a new one!"
            );

        user.password = await bcrypt.hash(data.password, 10);
        await user.save();

        const updatedUser = await User.findByPk(id, {
            attributes: { exclude: ["password"] },
        });
        return updatedUser;
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
    updatePassword,
    deleteUser,
};

module.exports = UsersService;
