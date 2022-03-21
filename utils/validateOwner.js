const jwt = require("jsonwebtoken");

const validateOwner = (userId, token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return decoded.user.id.toString() === userId.toString();
};

module.exports = validateOwner;