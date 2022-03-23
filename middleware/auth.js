const jwt = require("jsonwebtoken");

// middleware for checking if user has authentication token

const auth = (req, res, next) => {
    const token = req.header("x-auth-token");

    if (!token)
        res.status(401).json({
            message: "Unauthorized access, no token provided!"
        }).end();

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);        
        req.user = decoded.id;
        next();
    } catch (err) {
        res.status(401).send({ message: "Authorization error!" }).end();
    }
};

module.exports = auth;