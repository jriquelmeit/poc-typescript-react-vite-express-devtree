import {Router} from 'express';
import { body } from 'express-validator';
import {createUser, getUser, updateUser, uploadImage} from "./controllers/users";
import {login} from "./controllers/auth";
import {handleInputError} from "./middleware/validation";
import {authenticate} from "./middleware/auth";

const router = Router();

/** Autentucaccion y Registro **/
router.post('/auth/register',
    body('email').isEmail().withMessage('El email es inválido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('handle').notEmpty().withMessage('El handle es obligatorio'),
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    handleInputError,
    createUser)

router.post('/auth/login',
    body('email').isEmail().withMessage('El email es inválido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    handleInputError,
    login)

router.get('/user', authenticate, getUser)
router.patch('/user',
    body('handle').notEmpty().withMessage('El handle es obligatorio'),
    body('description').notEmpty().withMessage('El description es obligatorio')
        .isLength({ max: 200 }).withMessage('La descripción no puede tener más de 200 caracteres'),
    handleInputError,
    authenticate,
    updateUser)

router.post('/user/image', authenticate,uploadImage)

export default router;
