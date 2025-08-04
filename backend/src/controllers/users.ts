import {Request, Response} from "express";
import slug from 'slug';
import User from "../models/Users";
import {hashPassword} from "../utils/auth"

export const createUser = async (req: Request, res: Response) => {

    const {email, password, handle} = req.body;

    const userExists = await User.findOne({email})
    if (userExists) {
        return res.status(409).json({
            message: 'El usuario ya existe'
        });
    }
    const handleExists = await User.findOne({handle: slug(handle, '')});
    if (handleExists) {
        return res.status(409).json({
            message: 'El handle ya está en uso'
        });
    }
    const user = new User(req.body);
    user.password = await hashPassword(password);
    user.handle = slug(handle, '');
    await user.save();
    res.status(201).json({
        message: 'Usuario registrado correctamente',
        user
    });
}

export const getUser = async (req: Request, res: Response) => {

    res.status(200).json(req.user);

}
export const updateUser = async (req: Request, res: Response) => {
    try {
        const {description} = req.body;

        const hundle = slug(req.body.handle, '');
        const handleExists = await User.findOne({handle: hundle});
        if (handleExists && handleExists.email !== req.user.email) {
            return res.status(409).json({
                message: 'El handle no disponible, ya está en uso por otro usuario'
            });
        }
        req.user.description = description;
        req.user.handle = hundle;
        await req.user.save();
        res.status(200).json({
            message: 'Usuario actualizado correctamente'
        });

    }catch (error){
        res.status(500).json({
            message: 'Error al actualizar el usuario',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
}
