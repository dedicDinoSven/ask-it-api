const required = (value) => value.length !== 0;

const validateEmail = (email) => {
    const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
};

const validatePasswordLength = (password) =>
    password.length >= 5 && password.length <= 100;

const Validation = {
    required,
    validateEmail,
    validatePasswordLength
};

export default Validation;