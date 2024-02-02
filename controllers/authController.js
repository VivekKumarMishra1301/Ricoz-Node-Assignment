import User from '../models/userModel.js';
import asyncHandler from "express-async-handler"
import { hashPassword, comparePassword } from '../utils/authHelper.js';
import JWT from 'jsonwebtoken'
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

export const loginUser = asyncHandler(async (req,res) => {
    try {
        const { email, password } = req.body;
         if (!email) {
            res.send({ error: 'Enter Email' });
            return;
        }
        if (!password) {
            res.send({ error: 'Enter Password' });
            return;
        }
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Email is not registered',
              
            });
        }

        const matchPassword = await comparePassword(password, user.password);
        if (!matchPassword) {
            return res.status(404).send({
                success: false,
                message: 'Password Is Incorrect',
                error:error
            })
        }

        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '30d'
        });

        return res.status(200).send({ 
            success: true,
            message: 'Now You Are Logged In ',
            user: {
                name: user.name,
                email: user.email,
                role:user.role
            },
            token,
        })


    } catch (error) {
        console.log(error);
        res.status(500).send({ 
            success: false,
            message:error
        })
    }
});
