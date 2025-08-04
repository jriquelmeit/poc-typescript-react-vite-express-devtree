import {Request, Response} from 'express'
import User from '../models/Users';
import {comparePassword} from "../utils/auth";
import {generateJwt} from "../utils/jwt";

export const login = async (req: Request, res: Response) => {


    const {email, password} = req.body;

    try {// Find user by email
        const user = await User.findOne({email});
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        // Check password
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json({message: 'Invalid credentials'});
        }

        // Generate token (assuming you have a method to generate JWT)
        //const token = user.generateAuthToken();

        const token = generateJwt({id: user._id});

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                email: user.email,
                handle: user.handle
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({message: 'Server error'});
    }
}
