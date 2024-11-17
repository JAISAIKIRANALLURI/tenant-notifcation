// config/config.js
const config = {
    development: {
        MONGODB_URI: 'your_local_mongodb_uri',
        EMAIL_USER: 'your_email@gmail.com',
        EMAIL_PASSWORD: 'your_email_password',
        PORT: 3000
    },
    production: {
        MONGODB_URI: process.env.MONGODB_URI,
        EMAIL_USER: process.env.EMAIL_USER,
        EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
        PORT: process.env.PORT || 3000
    }
};

module.exports = config[process.env.NODE_ENV || 'development'];