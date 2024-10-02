const { department } = require('../models/department')

const controller = {
  afficher_All: async (req, res) => {
    try {
      const alldepartment = await department.find()
      res.status(200).json(alldepartment)
    } catch (error) {
      res.status(404).json({ message: 'Error in getting all Departement' })
    }
  },

  create_Departement: async (req, res) => {
    try {
      console.log('Request body before creation:', req.body) // Log request body

      const create = await department.create(req.body)

      console.log('Request body after creation:', req.body) // Log request body after creation (if this point is reached)

      res.status(201).json({
        message: 'Departement created successfully',
        department: create
      })
    } catch (error) {
      console.error('Error in creating Instructor:', error) // Log the error for better insight
      res
        .status(400)
        .json({ message: 'Error in creating Instructor', error: error.message })
    }
  }
}

module.exports = controller
