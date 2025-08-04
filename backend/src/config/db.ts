import mongoose from 'mongoose';
import config from "./config";
import colors from "colors";

export const connectDB = async () => {
    try{
        console.log('Connecting to MongoDB...');
        await mongoose.connect(config.MONGO_URI)
        const { host, port, name } = mongoose.connection;
        const url = `${host}:${port}/${name}`;
        console.log(colors.green.italic(`MongoDB connected: ${url}`));
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit the process with failure
    }
}
