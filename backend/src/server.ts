import express from 'express';
import cors from 'cors';
import router from "./routers";
import {connectDB} from "./config/db";
import {corsOptions} from './config/cors';

const app = express();

//conexion a la base de datos
connectDB()


//Cors
app.use(cors(corsOptions));

// leer datos de body
app.use(express.json());

app.use('/', router);

export default app;
