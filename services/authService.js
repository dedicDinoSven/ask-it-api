const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../database");
const User = db.User;

const login = async (email, password) => {
    const user = await User.findOne({ where: { email } });

    if (!user)
        throw new Error("User with given email does not exist!");

    const validatePassword = await bcrypt.compare(password, user.password);

    if (!validatePassword)
        throw new Error("Incorrect password!");

    const payload = {
        user: {
            id: user.id
        }
    };

    return jwt.sign(payload, process.env.JWT_SECRET,
        { expiresIn: "30d" });
};

const AuthService = {
    login
};

module.exports = AuthService;