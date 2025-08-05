import {Request, Response} from "express";
import slug from 'slug';
import formidable from 'formidable'
import User from "../models/Users";
import { v4 as uuid} from 'uuid'
import {hashPassword} from "../utils/auth"
import cloudinary from "../config/cloudinary";

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

export const uploadImage = async (req: Request, res: Response) => {
    const form = formidable({multiples: false})
    form.parse(req, (err, fields, files) => {
        console.log('uploadImage', files.image[0].filepath)
        if (err) {
            return res.status(500).json({
                message: 'Error al procesar el formulario',
                error: err.message
            });
        }
        cloudinary.uploader.upload(files.image[0].filepath, {public_id: uuid()}, async (error, result) => {
            if (error) {
                return res.status(500).json({
                    message: 'Error al subir la imagen',
                    error: error.message
                });
            }
            if(result){
                req.user.image = result.secure_url;
                await req.user.save();
                return res.status(200).json({
                    message: 'Imagen subida correctamente',
                    image: result.secure_url
                });
            }
        })
    })

    try {
    } catch (error) {
        res.status(500).json({
            message: 'Error al subir la imagen',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
}
