import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from '../models/userModel.js'; // Import your User model

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.cookies && req.cookies.jwt) { // Check if req.cookies exists and has jwt property
        token = req.cookies.jwt;
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        } catch (error) {
            res.status(401);
            throw new Error('Not authorized, invalid token');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

export { protect };
