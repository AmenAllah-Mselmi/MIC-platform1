import jwt from 'jsonwebtoken';
import {User} from '../models/user.js';

const authenticateJWT = async (req, res, next) => {
  // Extract the token from the Authorization header
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No token provided' });
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id } = decoded; // Extract email from the token payload

    // Find the user by email
    const user = await User.findOne({ _id: id });
    
    if (!user) {
      return res.status(404).json({ message: "User not found" }); // Ensure response is returned
    }

    // Attach the user to the request object for further middleware or route handling
    req.user = user;
    next(); // Proceed to the next middleware
  } catch (error) {
    // Handle invalid token error
    return res.status(400).json({ message: 'Invalid Token' });
  }
};

export default authenticateJWT;
