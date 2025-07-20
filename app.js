require('dotenv').config();
const express = require('express');
const app = express();
const userRouter = require('./router/user');
const newsRouter = require('./router/news');
const { dropUsers } = require('./model/user');
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);
app.use('/news', newsRouter);

const server = app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});

process.on('SIGINT', shutDown);
process.on('SIGTERM', shutDown);

async function shutDown() {
    console.log('SIGTERM/SIGINT signal received: closing HTTP server')
    await dropUsers();
    server.close(() => {
        console.log('HTTP server closed')
    })
}



module.exports = app;