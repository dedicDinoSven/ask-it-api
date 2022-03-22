const AuthService = require("../services/authService");

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await AuthService.login(email, password);

        res.status(200).send(user).end();
    } catch (err) {
        res.status(404).send({ message: err.message }).end();
    }
};

const AuthController = {
    login,
};

module.exports = AuthController;
