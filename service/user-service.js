var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { addUser, getAllUsers, getUserByEmail, updateUser } = require('../model/user');
const jwtSecret = process.env.JWT_SECRET;

const registerUser = (registerUserRequest) => {
    return addUser(registerUserRequest);
};

const loginUser = async (loginUserRequest) => {
    const userFound = await getUserByEmail(loginUserRequest.email);

    if (!userFound){
        const error = new Error(`Invalid Email or Password`);
        error.name = 'UNAUTHORIZED_ERROR';
        throw error;
    }

    const isPasswordMatch = await bcrypt.compare(loginUserRequest.password, userFound.password);

    if (!isPasswordMatch){
        const error = new Error(`Invalid Email or Password`);
        error.name = 'UNAUTHORIZED_ERROR';
        throw error;
    }

    delete userFound.password;

    return jwt.sign(userFound, jwtSecret);

};

const getUserPreferences = async (user) => {
    const userFound = await getUserByEmail(user.email);

    if (!userFound){
        const error = new Error(`Invalid user`);
        error.name = 'UNAUTHORIZED_ERROR';
        throw error;
    }

    return userFound.preferences;
};

const updateUserPreferences = async (user, updateData) => {
    const userFound = await getUserByEmail(user.email);

    if (!userFound){
        const error = new Error(`Invalid user`);
        error.name = 'UNAUTHORIZED_ERROR';
        throw error;
    }

    return await updateUser(user.email, updateData);
};

module.exports = {
    registerUser,
    loginUser,
    getUserPreferences,
    updateUserPreferences
};