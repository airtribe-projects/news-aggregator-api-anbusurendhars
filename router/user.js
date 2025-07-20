const express = require('express');
const router = express.Router();
const { checkSchema } = require('express-validator');

const { registerUserController, loginController, getPreferencesController, updatePreferencesController } = require('../controller/user-controller');
const { loginSchema, registerUserSchema, updatePreferencesSchema, validate } = require('../middleware/validations');
const { isUserAuthenticated } = require('../middleware/authentication');

router.post('/signup', checkSchema(registerUserSchema, ['body']), validate, registerUserController);

router.post('/login', checkSchema(loginSchema, ['body']), validate, loginController);

router.get('/preferences', isUserAuthenticated, getPreferencesController);

router.put('/preferences', isUserAuthenticated, checkSchema(updatePreferencesSchema, ['body']), validate, updatePreferencesController);



module.exports = router