require('dotenv').config();
const mongoose = require('mongoose');

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: process.env.DB_NAME
        });
        console.log('Connected to database');
    } catch (error) {
        console.error(error);
    }
};

module.exports = connectToDatabase;