import {CorsOptions} from 'cors'
import config from "./config";
import colors from "colors";

export const corsOptions: CorsOptions = {
    origin: function(origin, callback) {
        const whitelist = [config.FRONTEND_URL];

        if(process.argv[2] === '--api') {
            whitelist.push(undefined)
        }

        if (whitelist.includes(origin)) {
            // Allow requests from any origin
            callback(null, true);
        }else{
            // If no origin is provided, allow the request
            callback(new Error('Not allowed by CORS'));
        }
    }
}
