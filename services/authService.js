const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../database");
const User = db.User;

const login = async (email, password) => {
    
    if (!email) throw new Error("Email is required!");
    else if (!password) throw new Error("Password is required!");

    const user = await User.findOne({ where: { email } });

    if (!user) throw new Error("User with given email does not exist!");

    const validatePassword = await bcrypt.compare(password, user.password);

    if (user && validatePassword) {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });

        return {
            id: user.id,
            email: user.email,
            firstName: user.firstName ?? "",
            lastName: user.lastName ?? "",
            token: token,
        };
    } else throw new Error("Incorrect password!");
};

const AuthService = {
    login,
};

module.exports = AuthService;
