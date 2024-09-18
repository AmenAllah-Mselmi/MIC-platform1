const jwt = require('jsonwebtoken');
const {User}=require('../models/user')
const bcrypt=require('bcrypt')
const authenticateJWT = async(req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const {email}=decoded
        const user=await User.findOne({Email:email})
        if(!user){
            req.status(404).json({message:"User not finded"})
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};

module.exports = authenticateJWT;