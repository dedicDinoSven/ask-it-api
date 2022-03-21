const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const UsersService = require("../services/usersService");

const createUser = async (req, res) => {
    const data = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty())
        return res.status(404).json({ errors: errors.array() }).end();
    else {
        try {
            const user = await UsersService.createUser(data);

            res.status(201).send(user);
        } catch (err) {
            res.status(500).send({ message: err.message }).end();
        }
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await UsersService.getUsers();

        res.status(200).send(users);
    } catch (err) {
        res.status(500).send({ message: err.message }).end();
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await UsersService.getUserById(req.params.id);

        if (!user)
            return res.status(404).send({ message: "User not found!" }).end();

        res.status(200).send(user);
    } catch (err) {
        res.status(500).send({ message: err.message }).end();
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const token = req.header("x-auth-token");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    try {
        const user = await UsersService.getUserById(id);
        if (!user)
            return res.status(404)
                .send({ message: "User does not exist!" })
                .end();
        else {
            if (data.password)
                data.password = await bcrypt.hash(data.password, 10);

            if (id.toString() === decoded.user.id.toString()) {
                const updatedUser = await UsersService.updateUser(id, data);
                return res.status(200).send(updatedUser);
            } else
                return res.status(403).send({
                    message: "You are not authorized to update this user!"
                });
        }
    } catch (err) {
        res.status(403).send({ message: err.message }).end();
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await UsersService.getUserById(id);

        if (!user)
            return res.status(404)
                .send({ message: "User does not exist!" })
                .end();

        await UsersService.deleteUser(id);

        res.status(204).send({ message: "User deleted!" }).end();
    } catch (err) {
        res.status(500).send({ message: err.message }).end();
    }
};

const UsersController = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
};

module.exports = UsersController;