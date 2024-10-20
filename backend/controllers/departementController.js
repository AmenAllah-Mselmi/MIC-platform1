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
  },
  get_Departments_names_and_ids: async (req, res) => {
    try {
      const result = await department
        .find()
        .select('DepartmentName _id ')

      return res.status(200).json({ departments: result })
    } catch (error) {
      console.error('Error fetching instructors:', error)
      return res.status(500).json({ message: 'Erreur serveur' })
    }
  }
}

module.exports = controller
