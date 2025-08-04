import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import config from "../config/config";
import Users,  {IUser} from "../models/Users";


declare global {
    namespace Express {
        interface Request {
            user?: IUser; // Define el tipo de usuario según tu modelo
        }
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const bearer = req.headers.authorization;
    if (!bearer) {
        return res.status(401).json({
            message: 'No autorizado'
        });
    }

    const [, token] = bearer.split(' ');
    if (!token) {
        return res.status(401).json({
            message: 'No autorizado'
        });
    }

    try {
        const result = jwt.verify(token, config.JWT_SECRET);
        if (typeof result === 'object' && result.id) {
            req.user = await Users.findById(result.id).select('-password -__v');
            next();
        } else {
            return res.status(401).json({
                message: 'No autorizado'
            });
        }
    } catch (error) {
        return res.status(401).json({
            message: 'Token inválido'
        });
    }
}

