import User from '../models/userModel.js';
import asyncHandler from "express-async-handler"
import { hashPassword, comparePassword } from '../utils/authHelper.js';

export const createUser = asyncHandler(async (req, res) => {
    try {
        
        const { name, email, password, role } = req.body;
        if (!name) {
            res.send({ error: 'Enter Name' });
            return;
        }
        if (!email) {
            res.send({ error: 'Enter Email' });
            return;
        }
        if (!password) {
            res.send({ error: 'Enter Password' });
            return;
        }
        if (!role) {
            res.send({ error: 'Enter Role' });
            return;
        }
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(200).send({ 
                success: false,
                message:'User already exist',
            })
        }
        const newPassword = await hashPassword(password);
        const user = User.create({ name: name, email: email, password: newPassword, role: role });
        if (user) {
            res.status(200).send({ 
                message: 'USer Registered SuccessFully',
                success: true,
                
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ 
            success: false,
            message:error
        })
    }
});
