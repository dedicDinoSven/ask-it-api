const { check } = require("express-validator");

module.exports = {
    registerValidator: [
        check("email", "Email is required!")
            .notEmpty()
            .bail()
            .isEmail()
            .withMessage("Invalid email!")
            .normalizeEmail(),
        check("password", "Password is required!")
            .notEmpty()
            .bail()
            .isLength({ min: 6, max: 100 })
            .withMessage("Password must be 6 to 100 characters long!"),
        check("password2", "Confirmed password is required!")
            .notEmpty()
            .bail()
            .custom((val, { req }) => val === req.body.password)
            .withMessage("Passwords do not match!")
    ]
};