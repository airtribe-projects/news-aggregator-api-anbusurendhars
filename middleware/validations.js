const { validationResult } = require('express-validator');

const registerUserSchema = {
    name: { notEmpty: true },
    email: { isEmail: true, notEmpty: true },
    password: { notEmpty: true },
    preferences: { isArray: true, notEmpty: true },
};

const loginSchema = {
    email: { isEmail: true, notEmpty: true },
    password: { notEmpty: true },
};

const updatePreferencesSchema = {
    preferences: { isArray: true, notEmpty: true },
};

const validate = (request, response, next) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.mapped() })
    }
    else {
        next();
    }
};

module.exports = {
    registerUserSchema,
    loginSchema,
    updatePreferencesSchema,
    validate
}
