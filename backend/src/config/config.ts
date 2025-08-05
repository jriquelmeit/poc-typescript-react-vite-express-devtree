import dotenv from 'dotenv'


dotenv.config()

const config = {
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase',
    PORT: process.env.PORT || 4000,
    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
    JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret',
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || 'your_cloud_name',
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || 'your_api_key',
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || 'your_api_secret',
};
export default config;
