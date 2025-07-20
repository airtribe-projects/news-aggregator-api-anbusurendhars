const { matchedData } = require('express-validator');
const { loginUser, getUsers, registerUser, getUserPreferences, updateUserPreferences } = require('../service/user-service');

const registerUserController = async (request, response) => {

    try {
        const registerUserRequest = matchedData(request);
        await registerUser(registerUserRequest);

        return response.send({message: "User registered successfully"});
    } catch (error) {
        return response.status(500).send({ message: 'Something went wrong' });
    }
};

const loginController = async (request, response) => {

    try {

        const loginUserRequest = matchedData(request);
        const token = await loginUser(loginUserRequest);

        return response.send({token});
    } catch (error) {
        if (error.name == 'UNAUTHORIZED_ERROR'){
            return response.status(401).send({ message: error.message });
        }
        
        return response.status(500).send({ message: 'Something went wrong' });
    }
};

const getPreferencesController = async (request, response) => {

    try {
        const user = request.user;
        const result = await getUserPreferences(user);

        return response.send({ "preferences": result });
    } catch (error) {
        if (error.name == 'UNAUTHORIZED_ERROR'){
            return response.status(401).send({ message: error.message });
        }

        return response.status(500).send({ message: 'Something went wrong' });
    }
};



const updatePreferencesController = async (request, response) => {

    try {
        const user = request.user;
        const preferencesRequest = matchedData(request);
        await updateUserPreferences(user, preferencesRequest);

        return response.send({ message: "User preference updated successfully" });
    } catch (error) {
        if (error.name == 'UNAUTHORIZED_ERROR'){
            return response.status(401).send({ message: error.message });
        }

        return response.status(500).send({ message: 'Something went wrong' });
    }
};

module.exports = {
    registerUserController,
    loginController,
    getPreferencesController,
    updatePreferencesController
};