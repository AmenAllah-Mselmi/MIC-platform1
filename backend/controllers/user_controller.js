const { User } = require('../models/user.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { body, validationResult } = require('express-validator')

const controller = {
  login: [
    // Input validation
    body('Email').isEmail().withMessage('Invalid email format'),
    body('Password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),

    async (req, res) => {
      try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() })
        }

        const { Email, Password } = req.body

        const user = await User.findOne({ Email })
        if (!user) {
          return res.status(401).json({ message: 'Invalid mail credentials' })
        }

        const isMatch = await bcrypt.compare(Password, user.Password)
        if (!isMatch) {
          return res.status(401).json({ message: 'Invalid pass credentials' })
        }

        const token = jwt.sign(
          { id: user._id, role: user.Role },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        )

        res
          .status(200)
          .json({ message: 'Login successful', token, role: user.Role })
      } catch (error) {
        console.error('Error in authentication:', error)
        res.status(500).json({ message: 'Error performing authentication' })
      }
    }
  ]
}

module.exports = controller
