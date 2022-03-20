const { validationResult } = require("express-validator");
const AuthService = require("../services/authService");

const login = async (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        try {
            const token = await AuthService.login(email, password);

            res.status(200).send(token).end();
        } catch (err) {
            res.status(500).send({ message: err.message }).end();
        }
    } else
        res.status(400).json({ errors: errors.array() }).end();
};

const AuthController = {
    login
};

module.exports = AuthController;