const { User } = require('../models/user.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { body, validationResult } = require('express-validator')

const controller = {
  login: [
    // Input validation
    // body('email').isEmail().withMessage('Invalid email format'),
    // body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

    async (req, res) => {
      try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() })
        }

        const { email, password } = req.body

        const user = await User.findOne({ Email: email })
        if (!user) {
          return res.status(401).json({ message: 'User not found' })
        }

        const isMatch = await bcrypt.compare(password, user.Password)
        if (!isMatch) {
          return res.status(401).json({ message: 'Invalid credentials' })
        }

        const token = jwt.sign(
          { id: user._id, role: user.Role },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        )

        // Return user data along with the token
        res.status(200).json({
          message: 'Login successful',
          token,
          user: {
            id: user._id,
            email: user.Email,
            role: user.Role,
            nomPrenom: user.NomPrenom,
            adresse: user.Adresse,
            imageLink: user.ImageLink,
            departmentId: user.DepartmentId
          }
        })
      } catch (error) {
        console.error('Error in authentication:', error)
        res.status(500).json({ message: 'Error performing authentication' })
      }
    }
  ]
}

module.exports = controller
