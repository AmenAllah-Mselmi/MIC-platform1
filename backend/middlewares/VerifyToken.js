const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

const authenticateJWT = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  console.log(token)


  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id } = decoded; 

    const user = await User.findOne({ _id: id });
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(400).json({ message: 'Invalid Token' });
  }
};

module.exports = authenticateJWT;
