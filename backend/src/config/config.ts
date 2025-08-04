import dotenv from 'dotenv'


dotenv.config()

const config = {
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase',
    PORT: process.env.PORT || 4000,
    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
    JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret',

};
export default config;
