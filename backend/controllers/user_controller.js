import { User } from '../models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const controller = {
  login: async (req, res) => {
    try {
      const { Email, Password } = req.body;

      console.log('Email:', Email);
      console.log('Password:', Password);

      if (!Email || !Password) {
        return res.status(400).json({ message: 'Email and Password are required' });
      }

      const user = await User.findOne({ Email });

      console.log('User found:', user);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const isMatch = await bcrypt.compare(Password, user.Password);

      console.log('Password match:', isMatch);

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { id: user._id, role: user.Role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error('Error in authentication:', error);
      res.status(500).json({ message: 'Error performing authentication', error: error.message });
    }
  }
};

export default controller;