module.exports = {
    DB: 'mongodb://localhost:27017/todos',
    APP_PORT: process.env.APP_PORT ? process.env.APP_PORT : 80,
};