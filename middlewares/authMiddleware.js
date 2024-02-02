import JWT from 'jsonwebtoken';
import asyncHandler from 'express-async-handler'
export const protect = asyncHandler(async (req, res, next) => {
    try {

        const verify = await JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = verify;
        next();
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error: error,
            message: 'Unauthorized Access'
        });
    }
});