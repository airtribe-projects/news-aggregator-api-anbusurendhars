const { v4: uuidv4 } = require('uuid');
const jsonfile = require('jsonfile');
const path = require('node:path');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const getAllUsers = () => {
    return readUsersFile();
};

const addUser = async (userData) => {

    userData.id = uuidv4();
    userData.password = await bcrypt.hash(userData.password, saltRounds);

    const users = await readUsersFile();
    users.push(userData)

    return writeUsersFile(users);
};

const getUserByEmail = async (userEmail) => {

    const users = await readUsersFile();

    return users.find(user => user.email === userEmail);
};

const updateUser = async (userEmail, updatedData) => {

    const users = await readUsersFile();
    const userIndex = users.findIndex(user => userEmail === user.email);

    users[userIndex] = {...users[userIndex], ...updatedData};

    return writeUsersFile(users);
};


const dropUsers = async () => {

    return writeUsersFile([]);
};

readUsersFile = () => {
    return jsonfile.readFile(path.resolve(__dirname, 'users.json'));
}

writeUsersFile = (data) => {
    return jsonfile.writeFile(path.resolve(__dirname, 'users.json'), data, { spaces: 2 });
}

module.exports = {
    getAllUsers,
    addUser,
    getUserByEmail,
    updateUser,
    dropUsers
};